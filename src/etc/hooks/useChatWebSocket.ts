import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ChatClientMessage, ChatServerMessage } from "../chat/chatWsTypes";
import { serverPayloadToDisplayText } from "../chat/chatWsTypes";

export type ChatConnectionStatus =
  | "disabled"
  | "idle"
  | "connecting"
  | "open"
  | "closed"
  | "error";

export type ChatFeedItem = {
  id: string;
  /** system | self | peer */
  variant: "system" | "self" | "peer";
  author: string;
  body: string;
  raw?: ChatServerMessage;
};

function randomId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getWsAuthMode(): "query" | "first_message" {
  const m = import.meta.env.VITE_CHAT_WS_AUTH;
  return m === "query" ? "query" : "first_message";
}

function buildWsUrl(url: string, accessToken: string | null, auth: "query" | "first_message") {
  if (auth !== "query" || !accessToken) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}access_token=${encodeURIComponent(accessToken)}`;
}

export function useChatWebSocket(roomId: string) {
  const url = import.meta.env.VITE_CHAT_WS_URL?.trim() || "";
  const authMode = getWsAuthMode();

  const [status, setStatus] = useState<ChatConnectionStatus>(
    url ? "idle" : "disabled",
  );
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<ChatFeedItem[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempt = useRef(0);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldConnect = useRef(true);
  /** 재연결 시 connect 선언 순서 이슈(ref로 최신 핸들러 호출) */
  const connectRef = useRef<(token: string | null) => void>(() => {});

  const appendSystem = useCallback((body: string) => {
    setItems((prev) => [
      ...prev,
      { id: randomId(), variant: "system", author: "시스템", body },
    ]);
  }, []);

  const sendPayload = useCallback((payload: ChatClientMessage) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    ws.send(JSON.stringify(payload));
    return true;
  }, []);

  const sendChat = useCallback(
    (text: string, accessToken: string | null) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN || !accessToken) return;

      const ok = sendPayload({
        type: "MSG",
        roomId,
        text: trimmed,
      });
      if (ok) {
        setItems((prev) => [
          ...prev,
          { id: randomId(), variant: "self", author: "나", body: trimmed },
        ]);
      }
    },
    [roomId, sendPayload],
  );

  useEffect(() => {
    shouldConnect.current = true;
    return () => {
      shouldConnect.current = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, []);

  const connect = useCallback(
    (accessToken: string | null) => {
      if (!url) {
        setStatus("disabled");
        return;
      }
      if (!accessToken) {
        setStatus("error");
        setError("로그인 토큰이 없습니다.");
        return;
      }

      wsRef.current?.close();
      setError(null);
      setStatus("connecting");

      let wsUrl: string;
      try {
        wsUrl = buildWsUrl(url, accessToken, authMode);
        // 상대 URL이면 현재 origin 기준
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          reconnectAttempt.current = 0;
          setStatus("open");
          if (authMode === "first_message") {
            const authMsg: ChatClientMessage = {
              type: "AUTH",
              token: accessToken,
              roomId,
            };
            ws.send(JSON.stringify(authMsg));
          }
          appendSystem("연결되었습니다.");
        };

        ws.onmessage = (ev) => {
          const raw = typeof ev.data === "string" ? ev.data : "";
          try {
            const data = JSON.parse(raw) as ChatServerMessage;
            const t = String(data.type ?? "").toUpperCase();
            if (
              t === "PONG" ||
              t === "PING" ||
              t === "READY" ||
              t === "AUTH_OK"
            ) {
              return;
            }
            const body = serverPayloadToDisplayText(data);
            const author =
              (typeof data.nickname === "string" && data.nickname) ||
              (typeof data.userId === "number" && String(data.userId)) ||
              (typeof data.user_id === "number" && String(data.user_id)) ||
              "알 수 없음";
            setItems((prev) => [
              ...prev,
              {
                id: randomId(),
                variant: "peer",
                author,
                body,
                raw: data,
              },
            ]);
          } catch {
            setItems((prev) => [
              ...prev,
              {
                id: randomId(),
                variant: "peer",
                author: "서버",
                body: raw || "(빈 메시지)",
              },
            ]);
          }
        };

        ws.onerror = () => {
          setError("WebSocket 오류가 발생했습니다.");
          setStatus("error");
        };

        ws.onclose = () => {
          if (!shouldConnect.current) return;
          wsRef.current = null;
          setStatus("closed");
          const attempt = ++reconnectAttempt.current;
          const delay = Math.min(30_000, 800 * Math.pow(2, attempt));
          appendSystem(`${delay / 1000}초 후 재연결합니다… (${attempt}회)`);
          reconnectTimer.current = setTimeout(() => {
            connectRef.current(accessToken);
          }, delay);
        };
      } catch (e) {
        setStatus("error");
        setError(e instanceof Error ? e.message : "연결 URL이 올바르지 않습니다.");
      }
    },
    [url, authMode, roomId, appendSystem],
  );

  useLayoutEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  return {
    url,
    authMode,
    status,
    error,
    items,
    setItems,
    connect,
    sendChat,
    appendSystem,
  };
}

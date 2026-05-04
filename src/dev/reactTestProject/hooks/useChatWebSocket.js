import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { serverPayloadToDisplayText } from "../chat/chatWsTypes.js";

/** @typedef {'disabled'|'idle'|'connecting'|'open'|'closed'|'error'} ChatConnectionStatus */

function randomId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getWsAuthMode() {
  const m =
    typeof import.meta !== "undefined" ? import.meta.env?.VITE_CHAT_WS_AUTH : "";
  return m === "query" ? "query" : "first_message";
}

function buildWsUrl(url, accessToken, auth) {
  if (auth !== "query" || !accessToken) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}access_token=${encodeURIComponent(accessToken)}`;
}

/**
 * @param {string} roomId
 */
export function useChatWebSocket(roomId) {
  const url =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_CHAT_WS_URL?.trim()) || "";
  const authMode = getWsAuthMode();

  const [status, setStatus] = useState(/** @type {ChatConnectionStatus} */ (url ? "idle" : "disabled"));
  const [wsError, setWsError] = useState(/** @type {string|null} */ (null));
  const [items, setItems] = useState(/** @type {Array<{id:string,variant:string,author:string,body:string,raw?:object}>} */ ([]));

  const wsRef = useRef(/** @type {WebSocket|null} */ (null));
  const reconnectAttempt = useRef(0);
  const reconnectTimer = useRef(/** @type {ReturnType<typeof setTimeout>|null} */ (null));
  const shouldConnect = useRef(true);
  const connectRef = useRef(/** @type {(token: string|null) => void} */ () => {});

  const appendSystem = useCallback((body) => {
    setItems((prev) => [...prev, { id: randomId(), variant: "system", author: "시스템", body }]);
  }, []);

  const sendPayload = useCallback((payload) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    ws.send(JSON.stringify(payload));
    return true;
  }, []);

  const sendChat = useCallback(
    (text, accessToken) => {
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
        setItems((prev) => [...prev, { id: randomId(), variant: "self", author: "나", body: trimmed }]);
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
    (accessToken) => {
      if (!url) {
        setStatus("disabled");
        return;
      }
      if (!accessToken) {
        setStatus("error");
        setWsError("로그인 토큰이 없습니다.");
        return;
      }

      wsRef.current?.close();
      setWsError(null);
      setStatus("connecting");

      try {
        const wsUrl = buildWsUrl(url, accessToken, authMode);
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          reconnectAttempt.current = 0;
          setStatus("open");
          if (authMode === "first_message") {
            ws.send(
              JSON.stringify({
                type: "AUTH",
                token: accessToken,
                roomId,
              }),
            );
          }
          appendSystem("연결되었습니다.");
        };

        ws.onmessage = (ev) => {
          const raw = typeof ev.data === "string" ? ev.data : "";
          try {
            const data = JSON.parse(raw);
            const t = String(data.type ?? "").toUpperCase();
            if (t === "PONG" || t === "PING" || t === "READY" || t === "AUTH_OK") {
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
              { id: randomId(), variant: "peer", author, body, raw: data },
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
          setWsError("WebSocket 오류가 발생했습니다.");
          setStatus("error");
        };

        ws.onclose = () => {
          if (!shouldConnect.current) return;
          wsRef.current = null;
          setStatus("closed");
          const attempt = ++reconnectAttempt.current;
          const delay = Math.min(30000, 800 * Math.pow(2, attempt));
          appendSystem(`${delay / 1000}초 후 재연결합니다… (${attempt}회)`);
          reconnectTimer.current = setTimeout(() => {
            connectRef.current(accessToken);
          }, delay);
        };
      } catch (e) {
        setStatus("error");
        setWsError(e instanceof Error ? e.message : "연결 URL이 올바르지 않습니다.");
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
    error: wsError,
    items,
    setItems,
    connect,
    sendChat,
    appendSystem,
  };
}

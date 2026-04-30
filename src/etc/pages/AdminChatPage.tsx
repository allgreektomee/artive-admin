import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Input,
  List,
  Space,
  Typography,
  theme,
} from "antd";
import { MessageOutlined, SendOutlined, WifiOutlined } from "@ant-design/icons";
import { useChatWebSocket } from "../hooks/useChatWebSocket";
import { useUser } from "../hooks/useUser";

const { Text } = Typography;

const defaultRoom =
  import.meta.env.VITE_CHAT_ROOM_ID?.trim() || "global";

const AdminChatPage: React.FC = () => {
  const { token } = theme.useToken();
  const { user, fetchMyProfile } = useUser();
  const accessToken = localStorage.getItem("accessToken");

  const roomId = defaultRoom;
  const {
    url,
    authMode,
    status,
    error,
    items,
    setItems,
    connect,
    sendChat,
  } = useChatWebSocket(roomId);

  const [draft, setDraft] = useState("");

  useEffect(() => {
    void fetchMyProfile();
    // 마운트 시 프로필 1회 (useUser의 fetch는 매 렌더마다 새 참조)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (url && accessToken) connect(accessToken);
  }, [url, roomId, connect, accessToken]);

  const statusLabel = useMemo(() => {
    switch (status) {
      case "open":
        return { text: "연결됨", status: "success" as const };
      case "connecting":
        return { text: "연결 중", status: "processing" as const };
      case "closed":
        return { text: "끊김(재연결 중)", status: "warning" as const };
      case "error":
        return { text: "오류", status: "error" as const };
      case "disabled":
        return { text: "미설정", status: "default" as const };
      default:
        return { text: "대기", status: "default" as const };
    }
  }, [status]);

  const onSend = () => {
    sendChat(draft, accessToken);
    setDraft("");
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <Space align="center" style={{ marginBottom: 16 }}>
        <MessageOutlined style={{ fontSize: 22 }} />
        <Typography.Title level={4} style={{ margin: 0 }}>
          내부 채팅
        </Typography.Title>
        <Badge
          status={statusLabel.status}
          text={
            <Text type="secondary">
              <WifiOutlined /> {statusLabel.text}
            </Text>
          }
        />
      </Space>

      {!url ? (
        <Alert
          type="warning"
          showIcon
          message="WebSocket URL이 없습니다"
          description={
            <>
              루트에 <code>.env</code> 에{" "}
              <code>VITE_CHAT_WS_URL=wss://…</code> 를 넣고 다시 빌드하세요.{" "}
              Spring 네이티브 WS라면 서버 핸드셰이크 경로와 동일해야 합니다.
              SockJS+STOMP를 쓰는 경우 이 페이지 대신 STOMP 클라이언트를 붙여야
              합니다.
            </>
          }
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {error ? (
        <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />
      ) : null}

      <Alert
        type="info"
        showIcon
        message={`방: ${roomId} · 인증: ${authMode}${
          user?.nickname ? ` · 로그인: ${user.nickname}` : ""
        }`}
        style={{ marginBottom: 16 }}
      />

      <div
        style={{
          border: `1px solid ${token.colorBorderSecondary}`,
          borderRadius: token.borderRadiusLG,
          background: token.colorBgContainer,
          minHeight: 360,
          maxHeight: "min(55vh, 520px)",
          overflow: "auto",
          padding: 12,
          marginBottom: 12,
        }}
      >
        <List
          size="small"
          dataSource={items}
          locale={{ emptyText: "메시지가 없습니다." }}
          renderItem={(item) => (
            <List.Item style={{ border: "none", padding: "6px 0" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <Text
                    strong
                    style={{
                      color:
                        item.variant === "self"
                          ? token.colorPrimary
                          : item.variant === "system"
                            ? token.colorTextSecondary
                            : token.colorText,
                    }}
                  >
                    {item.author}
                  </Text>
                </div>
                <Text
                  style={{
                    display: "block",
                    marginTop: 2,
                    whiteSpace: "pre-wrap",
                    wordBreak: "keep-all",
                  }}
                >
                  {item.body}
                </Text>
              </div>
            </List.Item>
          )}
        />
      </div>

      <Space.Compact style={{ width: "100%" }}>
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 4 }}
          placeholder="메시지 입력 (Enter로 줄바꿈)"
          value={draft}
          disabled={status !== "open"}
          onChange={(e) => setDraft(e.target.value)}
          onPressEnter={(e) => {
            if (e.shiftKey) return;
            e.preventDefault();
            onSend();
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          disabled={status !== "open"}
          onClick={onSend}
        >
          전송
        </Button>
      </Space.Compact>

      <Button
        type="link"
        size="small"
        style={{ paddingLeft: 0, marginTop: 8 }}
        onClick={() => setItems([])}
      >
        대화 목록 지우기
      </Button>
    </div>
  );
};

export default AdminChatPage;

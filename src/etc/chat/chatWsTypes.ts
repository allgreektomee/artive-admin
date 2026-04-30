/**
 * 클라이언트 → 서버 (백엔드 스펙에 맞춰 필드명만 맞추면 됨)
 */
export type ChatClientMessage =
  | {
      type: "AUTH";
      token: string;
      roomId: string;
    }
  | {
      type: "MSG" | "CHAT" | "MESSAGE";
      roomId: string;
      text: string;
    };

/** 서버 → 클라이언트: 최소 공통분모 + 나머지는 Record로 둠 */
export type ChatServerMessage = {
  type?: string;
  text?: string;
  message?: string;
  content?: string;
  nickname?: string;
  userId?: number;
  user_id?: number;
  sentAt?: string;
  timestamp?: string;
  roomId?: string;
  [key: string]: unknown;
};

export function serverPayloadToDisplayText(payload: ChatServerMessage): string {
  const t = payload.text ?? payload.message ?? payload.content;
  return typeof t === "string" ? t : JSON.stringify(payload);
}

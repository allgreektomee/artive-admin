/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 예: wss://api.artivefor.me/ws/chat (서버 WS 엔드포인트와 동일해야 함) */
  readonly VITE_CHAT_WS_URL?: string;
  /**
   * query: URL에 ?access_token=… 붙임 (서버에서 허용할 때만)
   * first_message: 연결 직후 JSON { type, token, roomId } 전송 (권장)
   */
  readonly VITE_CHAT_WS_AUTH?: "query" | "first_message";
  /** 기본 채팅방 ID (서버 스펙에 맞게) */
  readonly VITE_CHAT_ROOM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

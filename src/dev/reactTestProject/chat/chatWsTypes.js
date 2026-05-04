/**
 * 원본: `src/etc/chat/chatWsTypes.ts`
 * 클라이언트 → 서버 메시지 형태 (문서화용 JSDoc)
 * @typedef {Object} ChatAuthMessage
 * @property {'AUTH'} type
 * @property {string} token
 * @property {string} roomId
 *
 * @typedef {Object} ChatTextMessage
 * @property {'MSG'|'CHAT'|'MESSAGE'} type
 * @property {string} roomId
 * @property {string} text
 *
 * @typedef {ChatAuthMessage|ChatTextMessage} ChatClientMessage
 */

/**
 * 서버 → 클라이언트 (느슨한 형태)
 * @typedef {Object} ChatServerMessage
 * @property {string} [type]
 * @property {string} [text]
 * @property {string} [message]
 * @property {string} [content]
 * @property {string} [nickname]
 * @property {number} [userId]
 * @property {number} [user_id]
 * @property {string} [sentAt]
 * @property {string} [timestamp]
 * @property {string} [roomId]
 */

/** @param {ChatServerMessage} payload */
export function serverPayloadToDisplayText(payload) {
  const t = payload.text ?? payload.message ?? payload.content;
  return typeof t === "string" ? t : JSON.stringify(payload);
}

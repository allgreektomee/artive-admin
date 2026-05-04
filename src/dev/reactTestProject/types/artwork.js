/**
 * JSDoc — 원본: `src/etc/types/artwork.ts` (작품 API 페이로드/응답)
 *
 * @typedef {'KO'|'EN'|'JP'|'CH'} LanguageCode
 *
 * @typedef {Object} ArtworkListResponse
 * @property {number} id
 * @property {string} thumbnailUrl
 * @property {string} title
 * @property {string} status
 * @property {number} totalHistoryCount
 * @property {string} createdAt
 *
 * @typedef {Object} ArtworkCreate
 * @property {string} koTitle
 * @property {string} [enTitle]
 * @property {string} [koDescription]
 * @property {string} [enDescription]
 * @property {string} thumbnailUrl
 * @property {string[]} images
 * @property {'PUBLIC'|'PRIVATE'} visibility
 * @property {string} [medium]
 * @property {string} [size]
 * @property {string} [status]
 * @property {string} [startedAt]
 * @property {string} [finishedAt]
 *
 * @typedef {Object} ArtworkDetailResponse
 * @property {number} id
 * @property {string} koTitle
 * @property {string} [enTitle]
 * — 나머지 필드는 ArtworkCreate 와 동일 계열 (백엔드 스펙 따름)
 */

export {};

import type { BaseEntry } from "../../01.domain/models/BaseEntry";
import type { WpPost } from "../api/wp-api";

/**
 * [DATA] Mapper
 * 역할: API 원본 데이터(WpPost)를 도메인 모델(BaseEntry)로 변환함.
 */
export function toBaseEntry(post: WpPost): BaseEntry {
  const getType = (categories: number[]): BaseEntry["type"] => {
    if (categories.includes(3)) return "Artwork"; // 작품 ID: 3
    if (categories.includes(4)) return "Insight"; // 인사이트 ID: 4
    if (categories.includes(5)) return "Log"; // 로그 ID: 5
    if (categories.includes(32)) return "Banner"; // 배너 ID: 32
    return "Unknown";
  };

  return {
    id: post.id,
    type: getType(post.categories),
    title: post.title.rendered,
    thumbnail: post.acf?.art_image || "", // 이미지가 없으면 빈 문자열
    date: new Date(post.date).toLocaleDateString("ko-KR"),
  };
}

import { useState } from "react";
import { artworkApi } from "../api/artworkApi";
import { message } from "antd";
import type { 
  ArtworkListResponse, 
  ArtworkCreateRequest, 

} from "../types/artwork";
// import type { PageResponse } from "../types/common";

interface ArtworkFormValues {
  koTitle: string;
  koDesc: string;
  enTitle?: string;
  enDesc?: string;
  isPublic: boolean;
}
export const useArtwork = () => {
  const [loading, setLoading] = useState(false);
  const [artworks, setArtworks] = useState<ArtworkListResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0); // 페이징용 전체 개수
 const [currentPage, setCurrentPage] = useState(1); // UI는 1부터 시작

  const [error, setError] = useState(false); // 🚀 이 줄 추가
  const [imageList, setImageList] = useState<string[]>([]); // 등록/수정 시 이미지 순서 관리

  // 1. 작품 목록 가져오기
  const fetchArtworks = async (page: number = 0) => {
    setLoading(true);
    setError(false);
    try {
      const res = await artworkApi.getMyArtworks(page);
      if (res.data.success) {
        // ApiResponse<PageResponse<ArtworkListResponse>> 구조에서 데이터 추출
        const { content, totalElements } = res.data.data;
        setArtworks(content);
        setTotalElements(totalElements);
        setCurrentPage(res.data.data.number + 1);
      }
    } catch (err) {
      console.error("목록 조회 실패:", err);
      message.error("작품 목록을 불러오지 못했습니다.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 2. 작품 등록 로직 (다국어 구조 포함)
 const createArtwork = async (values: ArtworkFormValues) => {
    if (imageList.length === 0) {
      message.warning("이미지를 최소 하나 이상 등록해주세요.");
      return false;
    }

    setLoading(true);
    try {
      // 🚀 백엔드 ArtworkCreateRequest DTO 구조에 맞게 변환
      const requestData: ArtworkCreateRequest = {
        koTitle: values.koTitle,
        enTitle: values.enTitle,
        koDescription: values.koDesc,
        enDescription: values.enDesc,
        thumbnailUrl: imageList[0], // 첫 번째 이미지를 대표로
        isPublic: values.isPublic ?? true,
      };

      const res = await artworkApi.createArtwork(requestData);
      
      if (res.data.success) {
        message.success("작품이 성공적으로 등록되었습니다.");
        setImageList([]); 
        return true;
      }
      return false;
    } catch (err) {
      console.error("작품 등록 실패:", err);
      message.error("저장 중 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 3. 작품 삭제 로직
  const deleteArtwork = async (id: number) => {
    try {
      const res = await artworkApi.deleteArtwork(id);
      if (res.data.success) {
        message.success("작품이 삭제되었습니다.");
        await fetchArtworks(); // 목록 새로고침
      }
    } catch (err) {
      message.error("삭제에 실패했습니다.");
    }
  };

  return {
    loading,
    error,
    artworks,
    totalElements, // 페이징 정보 추가 반환
    currentPage,
    imageList,
    setImageList,
    fetchArtworks,
    createArtwork,
    deleteArtwork,
  };
};
import { useState } from "react";
import { artworkApi } from "../api/artworkApi";
import { message } from "antd";
import type { ArtworkListResponse, ArtworkCreate } from "../types/artwork";

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
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);

  // 헬퍼: 폼 데이터를 서버 DTO 규격으로 변환
  const convertToRequest = (values: ArtworkFormValues): ArtworkCreate => ({
    koTitle: values.koTitle,
    enTitle: values.enTitle,
    koDescription: values.koDesc,
    enDescription: values.enDesc,
    thumbnailUrl: imageList[0], // 현재 세팅된 이미지 리스트의 첫 번째
    isPublic: values.isPublic ?? true,
  });

  // [1] 목록 조회
  const fetchArtworks = async (page: number = 0) => {
    setLoading(true);
    setError(false);
    try {
      const res = await artworkApi.getMyArtworks(page);
      if (res.data.success) {
        const { content, totalElements, number } = res.data.data;
        setArtworks(content);
        setTotalElements(totalElements);
        setCurrentPage(number + 1);
      }
    } catch (err) {
      setError(true);
      message.error("목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // [2] 수정용 상세 데이터 조회 (수정 폼 세팅용)
  const getArtworkForEdit = async (id: number) => {
    setLoading(true);
    try {
      const res = await artworkApi.getArtworkDetail(id);

      if (res.data?.success) {
        const d = res.data.data;
        setImageList([d.thumbnailUrl]);

        // 🚀 리턴 객체에 모든 필드를 포함시켜야 ArtworkPost.tsx의 에러가 사라집니다.
        return {
          koTitle: d.koTitle,
          enTitle: d.enTitle,
          koDesc: d.koDescription,
          enDesc: d.enDescription,
          // 백엔드 visibility(ENUM)를 프론트 isPublic(boolean)으로 변환
          isPublic: d.visibility === "PUBLIC",
          status: d.status,
          medium: d.medium,
          size: d.size,
          startedAt: d.startedAt, // 👈 이거 빠지면 에러!
          finishedAt: d.finishedAt, // 👈 이거 빠지면 에러!
        };
      }
    } catch (err) {
      message.error("작품 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
    return null;
  };

  // [3] 작품 등록 실행
  const createArtwork = async (values: ArtworkFormValues) => {
    if (imageList.length === 0)
      return message.warning("이미지를 등록해주세요.");
    setLoading(true);
    try {
      const res = await artworkApi.createArtwork(convertToRequest(values));
      if (res.data.success) {
        message.success("등록되었습니다.");
        return true;
      }
    } catch (err) {
      message.error("등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
    return false;
  };

  // [4] 작품 수정 실행
  const updateArtwork = async (id: number, values: ArtworkFormValues) => {
    if (imageList.length === 0) return message.warning("이미지는 필수입니다.");
    setLoading(true);
    try {
      const res = await artworkApi.updateArtwork(id, convertToRequest(values));
      if (res.data.success) {
        message.success("수정되었습니다.");
        return true;
      }
    } catch (err) {
      message.error("수정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
    return false;
  };

  // [5] 삭제
  const deleteArtwork = async (id: number) => {
    try {
      const res = await artworkApi.deleteArtwork(id);
      if (res.data.success) {
        message.success("삭제되었습니다.");
        await fetchArtworks(currentPage - 1);
      }
    } catch (err) {
      message.error("삭제 실패");
    }
  };

  return {
    loading,
    error,
    artworks,
    totalElements,
    currentPage,
    imageList,
    setImageList,
    fetchArtworks,
    getArtworkForEdit,
    createArtwork,
    updateArtwork,
    deleteArtwork,
  };
};

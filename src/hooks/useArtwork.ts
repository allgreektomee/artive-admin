import { useState } from "react";
import { artworkApi } from "../api/artworkApi";
import { message } from "antd";
import type {
  ArtworkListResponse,
  ArtworkCreate,
  ArtworkFormValues,
  ArtworkDetailResponse,
} from "../types/artwork";

export const useArtwork = () => {
  const [loading, setLoading] = useState(false);
  const [artworks, setArtworks] = useState<ArtworkListResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageList, setImageList] = useState<string[]>([]);
  const [error, setError] = useState(false);

  // [목록 조회]
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
      message.error("목록을 불러오지 못했습니다.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // [상세 조회 및 수정 폼 세팅]
  const getArtworkForEdit = async (id: number) => {
    setLoading(true);
    setError(false);
    try {
      const res = await artworkApi.getArtworkDetail(id);
      if (res.data?.success) {
        const d: ArtworkDetailResponse = res.data.data;
        setImageList(d.images || []);

        // 서버에서 이미 평면화(Flatten)해서 주므로 그대로 리턴하되 UI용 변환만 추가
        return {
          ...d,
          isPublic: d.visibility === "PUBLIC",
        };
      }
    } catch (err) {
      message.error("정보를 불러오지 못했습니다.");
      setError(true);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // [등록/수정 통합 저장 로직]
  const saveArtwork = async (id: number | null, values: ArtworkFormValues) => {
    if (imageList.length === 0)
      return message.warning("이미지를 등록해주세요.");

    // 서버 DTO 규격에 맞춰 스프레드 연산자로 병합
    const payload: ArtworkCreate = {
      ...values,
      images: imageList,
      thumbnailUrl: imageList[0] || "",
      visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
    };

    setLoading(true);
    setError(false);
    try {
      const res = id
        ? await artworkApi.updateArtwork(id, payload)
        : await artworkApi.createArtwork(payload);

      if (res.data.success) {
        message.success(id ? "수정되었습니다." : "등록되었습니다.");
        return true;
      }
    } catch (err) {
      message.error("저장 중 오류가 발생했습니다.");
      setError(true);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const deleteArtwork = async (id: number) => {
    setLoading(true);
    setError(false);
    try {
      const res = await artworkApi.deleteArtwork(id);
      if (res.data.success) {
        message.success("삭제되었습니다.");
        await fetchArtworks(currentPage - 1);
      }
    } catch (err) {
      message.error("삭제 실패");
      setError(true);
    } finally {
      setLoading(false);
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
    createArtwork: (values: ArtworkFormValues) => saveArtwork(null, values),
    updateArtwork: (id: number, values: ArtworkFormValues) =>
      saveArtwork(id, values),
    deleteArtwork,
  };
};

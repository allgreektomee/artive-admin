import { useState, useCallback } from "react"; // 🚀 useCallback 추가
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

  // [목록 조회] - useCallback으로 함수 고정
  const fetchArtworks = useCallback(async (page: number = 0) => {
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
  }, []);

  // [상세 조회 및 수정 폼 세팅]
  const getArtworkForEdit = useCallback(async (id: number) => {
    setLoading(true);
    setError(false);
    try {
      const res = await artworkApi.getArtworkDetail(id);
      if (res.data?.success) {
        const d: ArtworkDetailResponse = res.data.data;
        setImageList(d.images || []);
        return {
          ...d,
          isPublic: d.visibility === "PUBLIC",
        };
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
    return null;
  }, []);

  // [등록/수정 통합 저장 로직] - 가장 핵심적인 안전장치
  const saveArtwork = useCallback(
    async (id: number | null, values: ArtworkFormValues) => {
      if (!imageList || imageList.length === 0) {
        message.warning("이미지를 최소 1장 이상 등록해주세요.");
        return false;
      }

      let startedAt = "";
      let finishedAt = "";

      if (values.workPeriod && values.workPeriod.length === 2) {
        startedAt = values.workPeriod[0]?.format("YYYY-MM-DD") || "";
        finishedAt = values.workPeriod[1]?.format("YYYY-MM-DD") || "";
      }

      const payload: ArtworkCreate = {
        ...values,
        startedAt,
        finishedAt,
        images: imageList,
        thumbnailUrl: imageList[0] || "",
        visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
      };

      setLoading(true);
      try {
        console.log(
          `🚀 [DEBUG] API 호출 시도: ${id ? "UPDATE(PUT)" : "CREATE(POST)"}`,
          payload,
        );

        const res = id
          ? await artworkApi.updateArtwork(id, payload)
          : await artworkApi.createArtwork(payload);

        if (res.data.success) {
          message.success(id ? "수정되었습니다." : "등록되었습니다.");
          return true;
        }
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || "저장 중 오류가 발생했습니다.";
        message.error(errorMsg);
        setError(true);
      } finally {
        setLoading(false);
      }
      return false;
    },
    [imageList],
  ); // imageList가 변경될 때만 함수 갱신

  // [삭제 로직]
  const deleteArtwork = useCallback(
    async (id: number) => {
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
    },
    [currentPage, fetchArtworks],
  );

  // 🚀 리턴되는 함수들도 useCallback으로 메모이제이션하여 참조 무결성 유지
  const createArtwork = useCallback(
    (values: ArtworkFormValues) => saveArtwork(null, values),
    [saveArtwork],
  );

  const updateArtwork = useCallback(
    (id: number, values: ArtworkFormValues) => saveArtwork(id, values),
    [saveArtwork],
  );

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

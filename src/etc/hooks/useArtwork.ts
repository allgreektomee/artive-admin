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
        // 💡 중요: 데이터를 가져온 직후에만 이미지 리스트를 바꿉니다.
        setImageList(d.images || []);
        return {
          ...d,
          isPublic: d.visibility === "PUBLIC",
        };
      }
    } catch (err) {
      // 403 에러 발생 시 여기서 잡힙니다.
      setError(true);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // [등록/수정 통합 저장 로직]
  const saveArtwork = async (id: number | null, values: ArtworkFormValues) => {
    // 💡 방어 로직: 이미지가 없으면 아예 API를 쏘지도 않음
    if (!imageList || imageList.length === 0) {
      message.warning("이미지를 최소 1장 이상 등록해주세요.");
      return false;
    }
    // 1. workPeriod 배열에서 시작일과 종료일 추출 (Antd RangePicker 대응)
    let startedAt = "";
    let finishedAt = "";

    if (values.workPeriod && values.workPeriod.length === 2) {
      // dayjs 객체인 경우 format()을 호출하여 "2026-01-20" 형태의 문자열로 변환
      startedAt = values.workPeriod[0]?.format("YYYY-MM-DD");
      finishedAt = values.workPeriod[1]?.format("YYYY-MM-DD");
    }
    // 서버 DTO 규격에 맞춰 스프레드 연산자로 병합
    const payload: ArtworkCreate = {
      ...values,
      startedAt: startedAt,
      finishedAt: finishedAt,
      images: imageList,
      thumbnailUrl: imageList[0] || "",
      visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
    };
    setLoading(true);
    try {
      // 💡 로그를 찍어서 언제 호출되는지 감시하세요
      console.log(
        `🚀 API 호출 시도: ${id ? "UPDATE(PUT)" : "CREATE(POST)"}`,
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
      // 💡 에러 메시지를 구체적으로 확인 (403인지 400인지)
      const errorMsg =
        err.response?.data?.message || "저장 중 오류가 발생했습니다.";
      message.error(errorMsg);
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

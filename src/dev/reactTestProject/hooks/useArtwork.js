/**
 * 16장 · 데이터 레이어 커스텀 훅 — 목록/상세 로드·저장·삭제를 한곳에 모음.
 *
 * 목록 페이지는 주로 `fetchArtworks` 만 쓰고,
 * 상세는 ArtworkDetailPage 가 `artworkApi` 직접 호출(같은 API 계층, 다른 사용 패턴 비교용).
 * save/delete 는 운영 폼 예제와 맞춰 두었고, 목록 UI에서는 alert 로 막을 수 있음.
 */
import { useState, useCallback } from "react";
import { message } from "antd";
import { artworkApi } from "../api/artworkApi.js";

/** 폼 기간(dayjs 등) → API 가 기대하는 ISO 문자열 쌍 */
function periodToIsoStrings(workPeriod) {
  if (!workPeriod || workPeriod.length !== 2) return { startedAt: "", finishedAt: "" };
  const [a, b] = workPeriod;
  const toStr = (v) => {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (typeof v.format === "function") return v.format("YYYY-MM-DD");
    return String(v);
  };
  return { startedAt: toStr(a), finishedAt: toStr(b) };
}

export function useArtwork() {
  const [loading, setLoading] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const [error, setError] = useState(false);

  // 16장: 목록 — GET /artworks?page
  const fetchArtworks = useCallback(async (page = 0) => {
    setLoading(true);
    setError(false);
    try {
      const res = await artworkApi.getMyArtworks(page);
      if (res.data.success) {
        const { content, totalElements: total, number } = res.data.data;
        setArtworks(content);
        setTotalElements(total);
        setCurrentPage(number + 1);
      }
    } catch (err) {
      message.error("목록을 불러오지 못했습니다.");
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // 16장: 편집 초기값 — 상세 + 이미지 목록(실제 폼 연동 시 사용)
  const getArtworkForEdit = useCallback(async (id) => {
    setLoading(true);
    setError(false);
    try {
      const res = await artworkApi.getArtworkDetail(id);
      if (res.data?.success) {
        const d = res.data.data;
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

  // 16장: 생성/수정 공통 — payload 가공 후 POST 또는 PUT
  const saveArtwork = useCallback(
    async (id, values) => {
      if (!imageList || imageList.length === 0) {
        message.warning("이미지를 최소 1장 이상 등록해주세요.");
        return false;
      }

      const { startedAt, finishedAt } = periodToIsoStrings(values.workPeriod);

      const payload = {
        ...values,
        startedAt,
        finishedAt,
        images: imageList,
        thumbnailUrl: imageList[0] || "",
        visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
      };

      setLoading(true);
      try {
        const res = id
          ? await artworkApi.updateArtwork(id, payload)
          : await artworkApi.createArtwork(payload);

        if (res.data.success) {
          message.success(id ? "수정되었습니다." : "등록되었습니다.");
          return true;
        }
      } catch (err) {
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
  );

  // 16장: 삭제 후 목록 갱신(페이지 유지)
  const deleteArtwork = useCallback(
    async (artworkId) => {
      setLoading(true);
      setError(false);
      try {
        const res = await artworkApi.deleteArtwork(artworkId);
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

  const createArtwork = useCallback((values) => saveArtwork(null, values), [saveArtwork]);

  const updateArtwork = useCallback((artworkId, values) => saveArtwork(artworkId, values), [saveArtwork]);

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
}

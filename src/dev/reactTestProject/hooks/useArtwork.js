import { useState, useCallback } from "react";
import { message } from "antd";
import { artworkApi } from "../api/artworkApi.js";

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

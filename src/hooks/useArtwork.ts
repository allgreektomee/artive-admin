import { useState } from 'react';
import { artworkApi } from '../api/artworkApi';
import { message } from 'antd';
// import { useNavigate } from 'react-router-dom';

export const useArtwork = () => {

  const [loading, setLoading] = useState(false);
  const [artworks, setArtworks] = useState<any[]>([]); // 목록용
  const [error, setError] = useState(false); // 🚀 이 줄 추가
  const [imageList, setImageList] = useState<string[]>([]); // 등록/수정 시 이미지 순서 관리

  // 1. 작품 목록 가져오기
  const fetchArtworks = async () => {
    setLoading(true);
    setError(false); // 🚀 초기화
    try {
      const res = await artworkApi.getArtworks();
      const data = res.data?.data || res.data || [];
      setArtworks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("목록 조회 실패:", err);
      message.error("작품 목록을 불러오지 못했습니다.");
      setError(true); // 🚀 2. 에러 발생 시 상태 변경
    } finally {
      setLoading(false);
    }
  };

  // 2. 작품 등록 로직 (다국어 구조 포함)
  const createArtwork = async (values: any) => {
    if (imageList.length === 0) {
      message.warning("이미지를 최소 하나 이상 등록해주세요.");
      return false;
    }

    setLoading(true);
    try {
      const [startedAt, finishedAt] = values.workPeriod || [null, null];
      
      const requestData = {
        thumbnailUrl: imageList[0], // 첫 번째 이미지를 대표 이미지로
        imageUrls: imageList,       // 드래그로 정렬된 전체 리스트
        medium: values.medium,
        size: values.size,
        status: values.status,
        startedAt: startedAt?.format("YYYY-MM-DD"),
        finishedAt: finishedAt?.format("YYYY-MM-DD"),
        visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
        // 💡 백엔드 엔티티 구조에 맞춘 다국어 맵핑
        translations: {
          KO: { title: values.koTitle, description: values.koDesc },
          EN: { title: values.enTitle, description: values.enDesc },
          // 추후 여기에 JA, CN 필드만 추가하면 확장 끝!
        },
      };

      await artworkApi.createArtwork(requestData);
      setImageList([]); // 저장 후 이미지 리스트 초기화
      return true;
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
      await artworkApi.deleteArtwork(id);
      message.success("작품이 삭제되었습니다.");
      await fetchArtworks(); // 목록 새로고침
    } catch (err) {
      message.error("삭제에 실패했습니다.");
    }
  };

  return {
    loading,
    artworks,
    imageList,
    setImageList,
    fetchArtworks,
    createArtwork,
    deleteArtwork,
    error,
  };
};
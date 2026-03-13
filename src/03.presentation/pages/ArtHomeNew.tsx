/**
 * [PRESENTATION LAYER] View (Page Component)
 * 역할: 사용자에게 실제로 보이는 화면을 렌더링하고, 각 섹션을 조립합니다.
 * 특징: 로직은 ViewModel(Hook)에게 맡기고, 전달받은 데이터를 하위 View 컴포넌트로 전달합니다.
 */

import React from "react";
import { useBaseVM } from "../hooks/useBaseVM"; // ViewModel
import ArtworkGrid from "../components/ArtworkGrid"; // Artwork 섹션 View

/**
 * [VIEW] /test-art 페이지
 * 역할: 새로운 아키텍처를 검증하고, 각 섹션(Artwork, Insight 등)을 조립하는 메인 화면.
 */
const ArtHomeNew: React.FC = () => {
  // 1. ViewModel을 사용해 Artwork(3) 데이터만 가져옵니다.
  const { data: artworks, loading, error } = useBaseVM(3);

  if (loading) return <div className="p-10 text-center">로딩 중...</div>;
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="w-full min-h-screen bg-white py-20">
      {/* 헤더 영역 */}
      <header className="text-center mb-20">
        <h1 className="text-4xl font-bold tracking-tight">Artive Archive</h1>
        <p className="text-gray-500 mt-2">
          The new architecture meets the archive.
        </p>
      </header>

      <main>
        {/* === [1] ARTWORK SECTION === */}
        {/* 🚀 /art 페이지의 디자인을 적용한 ArtworkGrid 컴포넌트 사용 */}
        <ArtworkGrid artworks={artworks} />
      </main>
    </div>
  );
};

export default ArtHomeNew;

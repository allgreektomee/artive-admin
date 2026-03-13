/**
 * [PRESENTATION LAYER] View (Page Component)
 * 역할: 사용자에게 실제로 보이는 화면을 렌더링합니다.
 * 특징: 로직은 ViewModel(Hook)에게 맡기고, 전달받은 Base 데이터를 시각적으로 표현하는 데 집중합니다.
 */

import React from "react";
import { useBaseVM } from "../hooks/useBaseVM";

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
    <div className="w-full min-h-screen bg-white">
      {/* 헤더 영역 */}
      <header className="px-6 py-8 mb-4 border-b">
        <h1 className="text-3xl font-bold">Artive Archive</h1>
        <p className="text-gray-500">새로운 아키텍처로 만나는 아카이브</p>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        {/* === [1] ARTWORK SECTION === */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Artworks</h2>

          {/* 그리드 레이아웃 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((art) => (
              <div key={art.id} className="group cursor-pointer">
                {/* 이미지 영역 */}
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-3">
                  {art.thumbnail ? (
                    <img
                      src={art.thumbnail}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                {/* 텍스트 정보 */}
                <h3 className="font-medium text-lg truncate">{art.title}</h3>
                <p className="text-sm text-gray-500">{art.date}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArtHomeNew;

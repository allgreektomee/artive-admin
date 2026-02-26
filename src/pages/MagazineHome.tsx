import React, { useEffect } from 'react';
import { useArtwork } from '../hooks/useArtwork';
import { Spin } from 'antd';

const MagazineHome: React.FC = () => {
  // 🚀 useArtwork 훅을 사용하여 작품 목록을 가져옵니다.
  const { loading, fetchArtworks } = useArtwork();

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  return (
    <Spin spinning={loading}>
      <h1>Artworks</h1>
      {/* 여기에 useArtwork로 가져온 artworks를 멋지게 전시하는 UI를 구현합니다. */}
    </Spin>
  );
};

export default MagazineHome;
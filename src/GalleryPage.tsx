import React from 'react';
import { Typography } from 'antd';
// import { useArtwork } from '../hooks/useArtwork';

const GalleryPage: React.FC = () => {
  // const { artworks } = useArtwork();
  return (
    <div style={{padding: '40px 0'}}>
      <Typography.Title level={2} style={{fontFamily: 'serif'}}>The Gallery</Typography.Title>
      <Typography.Paragraph>
        이곳에 작품 아카이브가 표시됩니다.
      </Typography.Paragraph>
    </div>
  );
};

export default GalleryPage;
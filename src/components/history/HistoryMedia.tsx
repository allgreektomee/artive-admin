import React from 'react';
import ReactPlayer from 'react-player';
import { Image, Empty } from 'antd';

interface HistoryMediaProps {
  type: "IMGURL" | "YOUTUBE" | "MANUAL";
  imageUrl: string;
  title?: string;
}
const Player = ReactPlayer as any;

const HistoryMedia: React.FC<HistoryMediaProps> = ({ type, imageUrl, title }) => {
  if (!imageUrl) return <Empty description="미디어가 없습니다." />;

  switch (type) {
    case 'YOUTUBE':
      return (

        <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
          <Player
            url={imageUrl}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            controls
          />
        </div>
      );

    case 'IMGURL':
      return (
        <Image
          src={imageUrl}
          alt={title}
          style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
          fallback="https://via.placeholder.com/400x225?text=No+Image"
        />
      );

    case 'MANUAL':
    default:
      return (
        <div style={{ padding: '20px', textAlign: 'center', background: '#f5f5f5', borderRadius: '8px' }}>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            🔗 외부 링크 바로가기 ({title || 'Link'})
          </a>
        </div>
      );
  }
};

export default HistoryMedia;
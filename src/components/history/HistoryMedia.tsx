import ReactPlayer from 'react-player';
import { Image, Card } from 'antd';

const HistoryMedia = ({ history }) => {
  // 유튜브 타입일 경우 비디오 플레이어 표시
  if (history.type === 'YOUTUBE') {
    return (
      <div style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 비율 */ }}>
        <ReactPlayer
          url={history.imageUrl}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          controls
        />
      </div>
    );
  }

  // 일반 기록(MANUAL)일 경우 이미지 썸네일 표시
  return (
    <Image
      src={history.imageUrl}
      alt={history.title}
      fallback="https://via.placeholder.com/400x225?text=No+Image"
      style={{ width: '100%', objectFit: 'cover' }}
    />
  );
};
import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
// import { useArtwork } from '../hooks/useArtwork'; // 추후 연결

const { Title, Paragraph } = Typography;

const MagazineHome: React.FC = () => {
  // const { artworks } = useArtwork(); 

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <Title level={1} style={{ fontFamily: 'serif', fontSize: '3rem', marginBottom: 0 }}>JUST ART</Title>
        <Paragraph type="secondary">Ordinary People's Artistic Archive</Paragraph>
      </div>
      
      <Row gutter={[24, 24]}>
        {/* 추후 useArtwork로 불러온 데이터를 매거진 그리드 형태로 배치 */}
        <Col span={24}><Card bordered={false}><Title level={3}>Issue No.1 : Beginning</Title></Card></Col>
      </Row>
    </div>
  );
};

export default MagazineHome;
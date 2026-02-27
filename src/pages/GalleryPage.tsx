import React from 'react';
import { Typography, Row, Col, Card, Tag } from 'antd';

const GalleryPage: React.FC = () => {
  // 목업용 임시 데이터 (나중에 API 데이터로 교체)
  const mockArtworks = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `Untitled Artwork ${i + 1}`,
    year: '2024',
    size: '100 x 100 cm',
    material: 'Oil on canvas',
    status: i % 2 === 0 ? 'Available' : 'Sold Out'
  }));

  return (
    <div style={{ padding: '40px 0', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <Typography.Title level={2} style={{ fontFamily: 'serif', marginBottom: 0 }}>THE GALLERY</Typography.Title>
        <Typography.Text type="secondary" style={{ fontFamily: 'serif', fontSize: '1.1rem' }}>
          2024 Art Fair Collection
        </Typography.Text>
      </div>

      <Row gutter={[24, 48]}>
        {mockArtworks.map((art) => (
          <Col xs={24} sm={12} md={8} key={art.id}>
            <Card
              hoverable
              bordered={false}
              cover={
                <div style={{ height: 300, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                  Artwork Image
                </div>
              }
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontFamily: 'serif', fontWeight: 'bold' }}>{art.title}</div>
                  <div style={{ color: '#666', marginTop: 4 }}>{art.material}, {art.year}</div>
                  <div style={{ color: '#999', fontSize: '0.9rem' }}>{art.size}</div>
                </div>
                {art.status === 'Sold Out' && <Tag color="red">SOLD</Tag>}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GalleryPage;
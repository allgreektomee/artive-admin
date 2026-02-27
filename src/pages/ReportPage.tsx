import React from 'react';
import { Typography, List, Tag } from 'antd';

const ReportPage: React.FC = () => {
  // 목업용 데이터
  const mockReports = [
    { id: 1, type: 'Exhibition', title: '2024 아트페어 현장 스케치', date: '2024.05.20', desc: '뜨거운 열기로 가득했던 오프닝 데이의 기록. 관람객들과의 만남, 그리고 새로운 영감에 대하여.' },
    { id: 2, type: 'Note', title: '작업 노트: 침묵의 소리', date: '2024.05.10', desc: '이번 신작 시리즈를 관통하는 주제인 "침묵"에 대한 단상. 소란스러운 도시 속에서 찾아낸 고요함.' },
    { id: 3, type: 'News', title: '6월 개인전 예고', date: '2024.04.25', desc: '다가오는 6월, 성수동 갤러리에서 열릴 개인전 준비 과정 미리보기.' },
  ];

  return (
    <div style={{ padding: '40px 0', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <Typography.Title level={2} style={{ fontFamily: 'serif' }}>ARTIVE REPORT</Typography.Title>
        <Typography.Text type="secondary">Artist's Journal & News</Typography.Text>
      </div>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={mockReports}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={<div style={{ width: 200, height: 130, background: '#f5f5f5', borderRadius: 4 }} />}
          >
            <div style={{ marginBottom: 8 }}><Tag>{item.type}</Tag> <span style={{ color: '#999' }}>{item.date}</span></div>
            <List.Item.Meta
              title={<a href="#" style={{ fontSize: '1.4rem', fontFamily: 'serif', color: '#333' }}>{item.title}</a>}
              description={<span style={{ fontSize: '1rem' }}>{item.desc}</span>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReportPage;
import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
// import { useArtwork } from '../hooks/useArtwork'; // 추후 연결

const { Title, Paragraph } = Typography;

// --- Mock Data ---
const mockArticles = [
  {
    category: 'Review',
    title: '바(Bar)에서 마주한 고독의 층위',
    lead: '고요한 공간 속, 작가 김민준이 포착한 도시인의 내면 풍경. 그의 신작은 단순한 풍경화를 넘어 우리 시대의 자화상을 그린다.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324626-a423b4a5b5b6?q=80&w=2070&auto=format&fit=crop',
    link: '/work/1'
  },
  {
    category: 'Insight',
    title: '2026 미술 시장의 색채 트렌드',
    lead: '팬톤이 선정한 올해의 컬러를 넘어, 미술계는 지금 어떤 색에 주목하고 있는가? 데이터로 분석한 상반기 옥션 결과.',
    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1887&auto=format&fit=crop',
    link: '/work/2'
  },
  {
    category: 'Artist',
    title: '흙으로 빚어낸 시간, 도예가 이지은',
    lead: '전통과 현대를 아우르는 그녀의 작업실에서 나눈 대화. 흙 한 줌이 예술이 되기까지의 긴 호흡을 담았다.',
    imageUrl: 'https://images.unsplash.com/photo-1565333239312-58549c78a262?q=80&w=1887&auto=format&fit=crop',
    link: '/work/3'
  }
];

const MagazineHome: React.FC = () => {
  // const { artworks } = useArtwork(); 

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      {/* 1. 히어로 섹션 */}
      <section style={{ marginBottom: 80, position: 'relative', height: '60vh', background: '#1a1a1a' }}>
        <img 
          src="https://images.unsplash.com/photo-1549492423-4002122c3983?q=80&w=1928&auto=format&fit=crop"
          alt="웅장한 설치 컷"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center', width: '80%' }}>
          <Typography.Text style={{ color: '#EAA221', fontSize: '1rem', letterSpacing: '1px' }}>[FEATURE]</Typography.Text>
          <Title level={1} style={{ color: 'white', fontFamily: 'serif', fontSize: '3.5rem', margin: '10px 0' }}>
            그리움이 머무는 공간
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem' }}>
            작가 박재영의 시선으로 기록한 2026 아트페어 현장 리포트. 공간과 감정의 서사.
          </Paragraph>
          <Button type="link" style={{ color: '#EAA221', marginTop: 20, fontSize: '1rem' }}>
            READ MORE <ArrowRightOutlined />
          </Button>
        </div>
      </section>

      {/* 2. 최신 기사 그리드 */}
      <section style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2} style={{ fontFamily: 'serif', marginBottom: 40, textAlign: 'center' }}>Latest Articles</Title>
        <Row gutter={[48, 48]}>
          {mockArticles.map((article, index) => (
            <Col span={24} key={index}>
              <Card bordered={false} style={{ background: 'transparent' }}>
                <Row gutter={32} align="middle">
                  <Col xs={24} md={10}>
                    <div style={{
                      width: '100%',
                      paddingBottom: '65%', /* 3:2 Aspect Ratio */
                      background: `url(${article.imageUrl}) center center / cover no-repeat`,
                      borderRadius: '4px'
                    }} />
                  </Col>
                  <Col xs={24} md={14}>
                    <Typography.Text style={{ color: '#3D0E61', fontWeight: 'bold' }}>[{article.category}]</Typography.Text>
                    <Title level={3} style={{ fontFamily: 'serif', marginTop: 8, marginBottom: 16 }}>
                      {article.title}
                    </Title>
                    <Paragraph type="secondary" style={{ fontSize: '1rem', marginBottom: 24 }}>
                      {article.lead}
                    </Paragraph>
                    <Button type="text" href={article.link} style={{ fontWeight: 'bold' }}>
                      기사 전문 보기 <ArrowRightOutlined />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* 3. 이슈 넘버 섹션 (푸터 위) */}
      <div style={{ textAlign: 'center', marginTop: 80, borderTop: '1px solid #e8e8e8', paddingTop: 40 }}>
        <Typography.Text style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#888' }}>
          ISSUE NO. 60
        </Typography.Text>
      </div>
    </div>
  );
};

export default MagazineHome;
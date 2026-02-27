import React from 'react';
import { Typography, Row, Col, Button, Space } from 'antd';
import { InstagramOutlined, YoutubeOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const MagazineHome: React.FC = () => {
  // SNS 링크
  const snsLinks = {
    instagram: "https://www.instagram.com/artivefor.me",
    youtube: "https://www.youtube.com/@artiveforme"
  };

  return (
    <div style={{ background: '#fff', color: '#000', fontFamily: 'serif' }}>
      
      {/* 1. HERO 섹션: 전시 타이틀 */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <Text style={{ letterSpacing: '8px', fontSize: '0.9rem', marginBottom: '20px', fontWeight: 'bold' }}>
          JUST ART EXHIBITION 2026
        </Text>
        <Title level={1} style={{ 
          fontSize: 'clamp(3.5rem, 12vw, 8rem)', 
          fontWeight: 900, 
          lineHeight: 1, 
          margin: 0,
          letterSpacing: '-2px'
        }}>
          그리움이<br />머무는 공간
        </Title>
        <Paragraph style={{ fontSize: '1.2rem', marginTop: '40px', maxWidth: '600px', fontWeight: 300 }}>
          기록되지 못한 기억을 아카이빙하다. <br />
          보통 사람들의 날것 그대로의 기록, 저스트아트.
        </Paragraph>
        <div style={{ marginTop: '50px' }}>
          <ArrowDownOutlined style={{ fontSize: '2rem', animation: 'bounce 2s infinite' }} />
        </div>
      </section>

      {/* 2. GALLERY 섹션: 이미지 3개 목업 */}
      <section style={{ padding: '0 20px 100px 20px' }}>
        <Row gutter={[0, 150]} justify="center">
          
          {/* 작품 1: 강렬한 내면 (image_0.png) */}
          <Col span={24} style={{ maxWidth: '1000px' }}>
            <img 
              src="https://path-to-your-s3/image_0.png" // 실제 S3 주소나 로컬 경로로 교체
              alt="그리움 1"
              style={{ width: '100%', marginBottom: '30px' }}
            />
            <div style={{ textAlign: 'left' }}>
              <Title level={2} style={{ fontSize: '2.5rem', fontWeight: 800 }}>타오르는 그리움</Title>
              <Paragraph style={{ fontSize: '1.1rem', color: '#666' }}>
                가장 깊은 곳에 숨겨두었던 강렬한 감정의 파편들. 
                그때의 우리는 무엇을 그토록 갈망했을까.
              </Paragraph>
            </div>
          </Col>

          {/* 작품 2: 쌓인 시간 (image_1.png) */}
          <Col span={24} style={{ maxWidth: '1000px' }}>
            <img 
              src="https://path-to-your-s3/image_1.png" 
              alt="그리움 2"
              style={{ width: '100%', marginBottom: '30px' }}
            />
            <div style={{ textAlign: 'right' }}>
              <Title level={2} style={{ fontSize: '2.5rem', fontWeight: 800 }}>쌓인 시간의 층위</Title>
              <Paragraph style={{ fontSize: '1.1rem', color: '#666' }}>
                겹겹이 쌓인 질감 속에 갇힌 어제의 우리. 
                시간은 흘러도 그리움은 단단한 층이 되어 남는다.
              </Paragraph>
            </div>
          </Col>

          {/* 작품 3: 흩어지는 기억 (image_2.png) */}
          <Col span={24} style={{ maxWidth: '1000px' }}>
            <img 
              src="https://path-to-your-s3/image_2.png" 
              alt="그리움 3"
              style={{ width: '100%', marginBottom: '30px' }}
            />
            <div style={{ textAlign: 'left' }}>
              <Title level={2} style={{ fontSize: '2.5rem', fontWeight: 800 }}>흩어지는 기억의 끝</Title>
              <Paragraph style={{ fontSize: '1.1rem', color: '#666' }}>
                결국은 부드럽게 흩어지는, 그러나 결코 잊히지 않는 순간들. 
                그리움이 머무는 마지막 공간.
              </Paragraph>
            </div>
          </Col>

        </Row>
      </section>

      {/* 3. FOOTER 섹션: SNS & 공간 정보 */}
      <footer style={{ 
        padding: '120px 20px', 
        background: '#000', 
        color: '#fff', 
        textAlign: 'center' 
      }}>
        <Title level={2} style={{ color: '#fff', marginBottom: '40px', fontWeight: 800 }}>ARTIVE: 1층 상가 아지트</Title>
        <Space size="large" style={{ marginBottom: '50px' }}>
          <Button type="link" href={snsLinks.instagram} target="_blank" icon={<InstagramOutlined />} style={{ color: '#fff', fontSize: '1.2rem' }}> artivefor.me</Button>
          <Button type="link" href={snsLinks.youtube} target="_blank" icon={<YoutubeOutlined />} style={{ color: '#fff', fontSize: '1.2rem' }}> artiveforme</Button>
        </Space>
        <div style={{ borderTop: '1px solid #333', paddingTop: '40px' }}>
          <Text style={{ color: '#555' }}>© 2026 JUST ART EXHIBITION. ALL RIGHTS RESERVED.</Text>
        </div>
      </footer>

      {/* 단순 애니메이션용 스타일 */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
      `}</style>
    </div>
  );
};

export default MagazineHome;
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

  // 이미지 경로 (보내주신 S3 링크 적용)
  const images = {
    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/IMG_0261.HEIC", // 보내주신 링크
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/IMG_0264.HEIC", // 나머지 이미지 경로로 수정
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/IMG_9977.JPG"  // 나머지 이미지 경로로 수정
  };

  return (
    <div style={{ background: '#fff', color: '#000', fontFamily: "'Noto Serif KR', serif" }}>
      
      {/* 1. HERO 섹션 */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <Text style={{ letterSpacing: '8px', fontSize: '0.9rem', marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
          JUST ART EXHIBITION 2026
        </Text>
        <Title level={1} style={{ 
          fontSize: 'clamp(3.5rem, 12vw, 8rem)', 
          fontWeight: 900, 
          lineHeight: 1.1, 
          margin: 0,
          letterSpacing: '-3px'
        }}>
          그리움이<br />머무는 공간
        </Title>
        <Paragraph style={{ fontSize: '1.2rem', marginTop: '40px', maxWidth: '600px', fontWeight: 300, color: '#555' }}>
          보통 사람들의 날것 그대로의 기록. <br />
          우리가 지나온 시간과 그 속에 머문 감정들을 아카이빙합니다.
        </Paragraph>
        <div style={{ marginTop: '60px', animation: 'bounce 2s infinite' }}>
          <ArrowDownOutlined style={{ fontSize: '2rem' }} />
        </div>
      </section>

      {/* 2. 작품 전시 섹션 (이미지 3개 목업) */}
      <section style={{ padding: '0 20px 150px 20px' }}>
        <Row gutter={[0, 180]} justify="center">
          
          {/* 작품 1 */}
          <Col span={24} style={{ maxWidth: '1100px' }}>
            <img src={images.work1} alt="그리움 1" style={{ width: '100%', filter: 'grayscale(0.1)' }} />
            <div style={{ marginTop: '40px', textAlign: 'left' }}>
              <Title level={2} style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'serif' }}>타오르는 그리움</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: '#444', lineHeight: 1.8 }}>
                가장 깊은 곳에 숨겨두었던 강렬한 감정의 파편들. <br />
                기록되지 못한 찰나의 순간이 예술이 되어 머뭅니다.
              </Paragraph>
            </div>
          </Col>

          {/* 작품 2 */}
          <Col span={24} style={{ maxWidth: '1100px' }}>
            <img src={images.work2} alt="그리움 2" style={{ width: '100%', filter: 'grayscale(0.1)' }} />
            <div style={{ marginTop: '40px', textAlign: 'right' }}>
              <Title level={2} style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'serif' }}>쌓인 시간의 층위</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: '#444', lineHeight: 1.8 }}>
                겹겹이 쌓인 질감 속에 갇힌 어제의 우리. <br />
                시간은 흘러도 그리움은 단단한 기록이 되어 이곳에 남습니다.
              </Paragraph>
            </div>
          </Col>

          {/* 작품 3 */}
          <Col span={24} style={{ maxWidth: '1100px' }}>
            <img src={images.work3} alt="그리움 3" style={{ width: '100%', filter: 'grayscale(0.1)' }} />
            <div style={{ marginTop: '40px', textAlign: 'left' }}>
              <Title level={2} style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'serif' }}>흩어지는 기억의 끝</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: '#444', lineHeight: 1.8 }}>
                결국은 부드럽게 흩어지는, 그러나 결코 잊히지 않는 순간들. <br />
                저스트아트가 제안하는 그리움의 마지막 기록.
              </Paragraph>
            </div>
          </Col>

        </Row>
      </section>

      {/* 3. 푸터 섹션 */}
      <footer style={{ 
        padding: '150px 20px', 
        background: '#000', 
        color: '#fff', 
        textAlign: 'center' 
      }}>
        <Title level={2} style={{ color: '#fff', marginBottom: '40px', fontWeight: 900, letterSpacing: '-1px' }}>
          ARTIVE: 1층 상가 아지트
        </Title>
        <Space size="large" style={{ marginBottom: '60px' }}>
          <Button type="link" href={snsLinks.instagram} target="_blank" icon={<InstagramOutlined />} style={{ color: '#fff', fontSize: '1.1rem' }}> artivefor.me</Button>
          <Button type="link" href={snsLinks.youtube} target="_blank" icon={<YoutubeOutlined />} style={{ color: '#fff', fontSize: '1.1rem' }}> artiveforme</Button>
        </Space>
        <div style={{ borderTop: '1px solid #333', paddingTop: '50px', opacity: 0.5 }}>
          <Text style={{ color: '#fff' }}>© 2026 JUST ART. ALL RIGHTS RESERVED.</Text>
        </div>
      </footer>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-15px);}
          60% {transform: translateY(-7px);}
        }
      `}</style>
    </div>
  );
};

export default MagazineHome;
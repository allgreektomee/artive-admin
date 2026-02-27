import React from 'react';
import { Typography, Row, Col, Button, Space } from 'antd';
import { InstagramOutlined, YoutubeOutlined, ArrowDownOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const MagazineHome: React.FC = () => {
  const snsLinks = {
    instagram: "https://www.instagram.com/artivefor.me",
    youtube: "https://www.youtube.com/@artiveforme"
  };

  // 이미지 경로 (패턴에 맞춰 나머지 2개도 수정해서 사용하세요)
  const images = {
    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png", 
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png", 
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png"
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
        <Text style={{ letterSpacing: '8px', fontSize: '0.9rem', marginBottom: '20px', fontWeight: 'bold' }}>
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
        <Paragraph style={{ fontSize: '1.2rem', marginTop: '40px', maxWidth: '600px', fontWeight: 300 }}>
          보통 사람들의 날것 그대로의 기록, 저스트아트.<br />
          서울아트페어(SAF)에서 선보이는 특별한 아카이브.
        </Paragraph>
        <div style={{ marginTop: '60px', animation: 'bounce 2s infinite' }}>
          <ArrowDownOutlined style={{ fontSize: '2rem' }} />
        </div>
      </section>

      {/* 2. GALLERY 섹션 (이미지 3개) */}
      <section style={{ padding: '0 20px 150px 20px' }}>
        <Row gutter={[0, 180]} justify="center">
          <Col span={24} style={{ maxWidth: '1100px' }}>
            <img src={images.work1} alt="그리움 1" style={{ width: '100%' }} />
            <div style={{ marginTop: '40px' }}>
              <Title level={2} style={{ fontSize: '3rem', fontWeight: 800 }}>타오르는 그리움</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: '#444' }}>가장 깊은 곳에 숨겨두었던 강렬한 감정의 파편들.</Paragraph>
            </div>
          </Col>

          <Col span={24} style={{ maxWidth: '1100px' }}>
            <img src={images.work2} alt="그리움 2" style={{ width: '100%' }} />
            <div style={{ marginTop: '40px', textAlign: 'right' }}>
              <Title level={2} style={{ fontSize: '3rem', fontWeight: 800 }}>쌓인 시간의 층위</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: '#444' }}>겹겹이 쌓인 질감 속에 갇힌 어제의 우리.</Paragraph>
            </div>
          </Col>

          <Col span={24} style={{ maxWidth: '1100px' }}>
            <img src={images.work3} alt="그리움 3" style={{ width: '100%' }} />
            <div style={{ marginTop: '40px' }}>
              <Title level={2} style={{ fontSize: '3rem', fontWeight: 800 }}>흩어지는 기억의 끝</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: '#444' }}>결국은 부드럽게 흩어지는, 그러나 결코 잊히지 않는 순간들.</Paragraph>
            </div>
          </Col>
        </Row>
      </section>

      {/* 3. FOOTER 섹션 (전시 정보 추가) */}
      <footer style={{ 
        padding: '120px 20px', 
        background: '#000', 
        color: '#fff', 
        textAlign: 'center' 
      }}>
        <div style={{ marginBottom: '60px' }}>
          <Title level={2} style={{ color: '#fff', fontWeight: 900, marginBottom: '20px' }}>서울아트페어 (SAF)</Title>
          <Space direction="vertical" style={{ fontSize: '1.2rem', color: '#aaa' }}>
            <Text style={{ color: '#fff' }}><EnvironmentOutlined /> 양재동 세텍(SETEC)</Text>
            <Text style={{ color: '#fff' }}><CalendarOutlined /> 2026. 05. 14(목) — 05. 17(일)</Text>
          </Space>
        </div>

        <Space size="large" style={{ marginBottom: '50px' }}>
          <Button type="link" href={snsLinks.instagram} target="_blank" icon={<InstagramOutlined />} style={{ color: '#fff' }}> artivefor.me</Button>
          <Button type="link" href={snsLinks.youtube} target="_blank" icon={<YoutubeOutlined />} style={{ color: '#fff' }}> artiveforme</Button>
        </Space>
        
        <div style={{ borderTop: '1px solid #333', paddingTop: '40px', opacity: 0.4 }}>
          <Text style={{ color: '#fff', fontSize: '0.8rem' }}>© 2026 JUST ART. ALL RIGHTS RESERVED.</Text>
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
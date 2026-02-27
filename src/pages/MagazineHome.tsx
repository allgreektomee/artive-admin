import React from 'react';
import { Typography, Row, Col, Button, Space } from 'antd';
import { InstagramOutlined, YoutubeOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const MagazineHome: React.FC = () => {
  const snsLinks = {
    instagram: "https://www.instagram.com/artivefor.me",
    youtube: "https://www.youtube.com/@artiveforme"
  };

  const images = {
    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.jpg", 
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.jpg", 
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.jpg"
  };

  return (
    <div style={{ background: '#fff', color: '#000', fontFamily: "'Noto Serif KR', serif", overflowX: 'hidden' }}>
      
      {/* 1. HERO 섹션: 폰트 크기 유동적 조절 */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 15px ' ,
        width: '100%',

      }}>
        <Text style={{ letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '15px', fontWeight: 'bold' }}>
          JUST ART 2026
        </Text>
        <Title level={1} style={{ 
          fontSize: 'clamp(2.5rem, 10vw, 6rem)', // 모바일 최소 크기를 2.5rem으로 낮춤
          fontWeight: 900, 
          lineHeight: 1.2, 
          margin: 0,
          letterSpacing: '-1.5px',
          wordBreak: 'keep-all' // 단어 단위 줄바꿈
        }}>
          그리움이<br />머무는 공간
        </Title>
        <Paragraph style={{ 
          fontSize: '1rem', // 모바일에서 읽기 편한 크기
          marginTop: '30px', 
          maxWidth: '500px', 
          fontWeight: 300,
          lineHeight: 1.6,
          wordBreak: 'keep-all',
          padding: '0 10px' // 본문만 살짝 더 여백
        }}>
          보통 사람들의 날것 그대로의 기록, 저스트아트.<br />
          서울아트페어(SAF) 특별 아카이브 전시.
        </Paragraph>
        <div style={{ marginTop: '50px', animation: 'bounce 2s infinite' }}>
          <ArrowDownOutlined style={{ fontSize: '1.5rem' }} />
        </div>
      </section>

      {/* 2. GALLERY 섹션: 이미지 간격 및 여백 조정 */}
      <section style={{ padding: '0 25px 100px 25px' }}> {/* 전체 좌우 여백 확보 */}
        <Row gutter={[0, 100]} justify="center">
          
          {/* 작품 1 */}
          <Col span={24} style={{ maxWidth: '1000px' }}>
            <img src={images.work1} alt="그리움 1" style={{ width: '100%', display: 'block' }} />
            <div style={{ marginTop: '25px',padding: '0 5px' }}>
              <Title level={2} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>타오르는 그리움</Title>
              <Paragraph style={{ fontSize: '0.95rem', color: '#444', wordBreak: 'keep-all' }}>
                가장 깊은 곳에 숨겨두었던 강렬한 감정의 파편들.
              </Paragraph>
            </div>
          </Col>

          {/* 작품 2: 모바일에서도 자연스럽게 보이도록 좌측 정렬 유지 추천 */}
          <Col span={24} style={{ maxWidth: '1000px' }}>
            <img src={images.work2} alt="그리움 2" style={{ width: '100%', display: 'block' }} />
            <div style={{ marginTop: '25px', padding: '0 5px' , textAlign: 'left' }}> 
              <Title level={2} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>쌓인 시간의 층위</Title>
              <Paragraph style={{ fontSize: '0.95rem', color: '#444', wordBreak: 'keep-all' }}>
                겹겹이 쌓인 질감 속에 갇힌 어제의 우리.
              </Paragraph>
            </div>
          </Col>

          {/* 작품 3 */}
          <Col span={24} style={{ maxWidth: '1000px' }}>
            <img src={images.work3} alt="그리움 3" style={{ width: '100%', display: 'block' }} />
            <div style={{ marginTop: '25px',padding: '0 5px' }}>
              <Title level={2} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>흩어지는 기억의 끝</Title>
              <Paragraph style={{ fontSize: '0.95rem', color: '#444', wordBreak: 'keep-all' }}>
                부드럽게 흩어지는, 결코 잊히지 않는 순간들.
              </Paragraph>
            </div>
          </Col>
        </Row>
      </section>

      {/* 3. FOOTER 섹션: 높이 축소 및 아이콘 확대 */}
      <footer style={{ 
        padding: '50px 30px', // 상하 여백을 80px -> 50px로 줄여 높이 축소
        background: '#000', 
        color: '#fff', 
        textAlign: 'center' 
      }}>
        <div style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ 
            color: '#fff', 
            fontWeight: 800, 
            marginBottom: '10px', 
            fontSize: '1.3rem' // 제목 크기 살짝 조정
          }}>
            서울아트페어 (SAF)
          </Title>
          <Space direction="vertical" size={0} style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            <Text style={{ color: '#fff' }}>양재동 세텍(SETEC)</Text>
            <Text style={{ color: '#fff' }}>2026. 05. 14 — 05. 17</Text>
          </Space>
        </div>

        {/* 인스타, 유튭 아이콘 크기 확대 */}
        <Space size={40} style={{ marginBottom: '30px' }}>
          <Button 
            type="link" 
            href={snsLinks.instagram} 
            target="_blank" 
            icon={<InstagramOutlined style={{ fontSize: '1.8rem' }} />} // 아이콘 크기 키움
            style={{ color: '#fff', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ marginLeft: '8px', fontSize: '1rem' }}>Insta</span>
          </Button>
          <Button 
            type="link" 
            href={snsLinks.youtube} 
            target="_blank" 
            icon={<YoutubeOutlined style={{ fontSize: '1.8rem' }} />} // 아이콘 크기 키움
            style={{ color: '#fff', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ marginLeft: '8px', fontSize: '1rem' }}>Youtube</span>
          </Button>
        </Space>
      </footer>

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
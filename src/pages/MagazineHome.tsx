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
    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png", 
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png", 
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png"
  };

  return (
    <div style={{ background: '#fff', color: '#000', fontFamily: "'Noto Serif KR', serif", overflowX: 'hidden' }}>
      
      {/* 1. HERO 섹션: 폰트 크기 유동적 조절 */}
      <section style={{ 
        height: '75vh', 
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
          fontFamily: "'Helvetica Neue', Arial, sans-serif", 
          fontSize: 'clamp(3rem, 15vw, 8rem)', // 타이틀을 더 압도적으로 키움
          fontWeight: 900, 
          lineHeight: 0.9, 
          margin: '10px 0',
          letterSpacing: '-3px',
          color: '#000',
          textTransform: 'uppercase' // 대문자로 시크하게
        }}>
          Farewell
        </Title>
       
        <div style={{ marginBottom: '50px' }}>
          <Paragraph style={{ 
            fontSize: '1.25rem', 
            fontWeight: 500, 
            lineHeight: 1.8, 
            color: '#1a1a1a',
            wordBreak: 'keep-all',
            marginBottom: '15px'
          }}>
            그리움은 물감이 되고,<br />
            당신은 캔버스의 아름다운 꽃이 되었습니다.
          </Paragraph>
          
          <Paragraph style={{ 
            fontSize: '1rem', 
            fontWeight: 300, 
            lineHeight: 1.6, 
            color: '#888',
            wordBreak: 'keep-all'
          }}>
            이곳에 남긴 순간들이 당신의 안식이 되기를.
          </Paragraph>
        </div>

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

      {/* 3. FOOTER 섹션: 너비 100% 및 아이콘 가시성 극대화 */}
      <footer style={{ 
        width: '100%',        // 푸터가 화면 가로를 꽉 채우도록 설정
        padding: '40px 20px', // 상하 여백을 더 줄여 슬림하게 조절
        background: '#000', 
        color: '#fff', 
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ 
            color: '#fff', 
            fontWeight: 800, 
            marginBottom: '10px', 
            fontSize: '1.2rem',
            letterSpacing: '-0.5px'
          }}>
            서울아트페어 (SAF)
          </Title>
          <Space direction="vertical" size={2} style={{ fontSize: '1.0rem', opacity: 0.8 }}>
            <Text style={{ color: '#fff' }}>양재동 세텍(SETEC)</Text>
            <Text style={{ color: '#fff' }}>2026. 05. 14 — 05. 17</Text>
          </Space>
        </div>

        {/* SNS 버튼: justifyCenter 오타 수정 및 레이아웃 정리 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', // justifyCenter -> justifyContent로 수정
          gap: '50px',              // 아이콘 사이 간격을 더 넓게 (모바일 클릭 최적화)
          marginBottom: '30px',
          width: '100%'
        }}>
          <Button 
            type="link" 
            href={snsLinks.instagram} 
            target="_blank" 
            style={{ color: '#fff', padding: 0, height: 'auto' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <InstagramOutlined style={{ fontSize: '2.2rem' }} />
              <span style={{ fontSize: '0.85rem', marginTop: '8px', fontWeight: 300 }}>Instagram</span>
            </div>
          </Button>
          
          <Button 
            type="link" 
            href={snsLinks.youtube} 
            target="_blank" 
            style={{ color: '#fff', padding: 0, height: 'auto' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <YoutubeOutlined style={{ fontSize: '2.2rem' }} />
              <span style={{ fontSize: '0.85rem', marginTop: '8px', fontWeight: 300 }}>Youtube</span>
            </div>
          </Button>
        </div>
        
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
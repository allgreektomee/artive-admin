import React from 'react';
import { Typography, Row, Col, Button, Space } from 'antd';
import { InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';

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
          RECORD OF RECOVERY 
        </Text>
        <Title level={1} style={{ 
          fontFamily: "'Helvetica Neue', Arial, sans-serif", 
          fontSize: 'clamp(3rem, 15vw, 8rem)', // 타이틀을 더 압도적으로 키움
          fontWeight: 900, 
          lineHeight: 0.9, 
          margin: '10px 0',
          letterSpacing: '-3px',
          color: '#000',
          textTransform: 'uppercase' ,// 대문자로 시크하게
           marginBottom: '20px'
        }}>
          Farewell
        </Title>
       
        <div style={{ marginBottom: '50px' }}>
          <Paragraph style={{ 
            fontSize: '1rem', 
            fontWeight: 500, 
            lineHeight: 1.8, 
            color: '#615f5f',
            wordBreak: 'keep-all',
            marginBottom: '15px'
          }}>
            그리움은 물감이 되고,<br />
            그녀는 캔버스의<br />
            아름다운 꽃이 되었습니다.
          </Paragraph>
          
        </div>

      </section>

      {/* 2. GALLERY 섹션: 이미지 간격 및 여백 조정 */}
      <section style={{ padding: '0 25px 100px 25px' }}>
      <Row gutter={[0, 120]} justify="center"> {/* 작품 간 간격을 120으로 넓혀 여유 부여 */}
        
        {/* 작품 1 (IMG_0261: 노란 배경) */}
        <Col span={24} style={{ maxWidth: '1000px' }}>
          <img src={images.work1} alt="작별의 시작" style={{ width: '100%', display: 'block' }} />
          {/* 1. 이미지 바로 아래 오른쪽 정렬 규격 */}
          <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '11px', color: '#999', fontWeight: 300 }}>
            130.3 x 89.4 cm (60P), Acrylic on canvas
          </div>
          
          <div style={{ marginTop: '20px', padding: '0 5px' }}>
            {/* 2. 제목 */}
            <Title level={2} style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '15px', letterSpacing: '-1px' }}>
              그리움은 물감이 되고
            </Title>
            {/* 3. 3줄 소개 */}
            <Paragraph style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.8', wordBreak: 'keep-all' }}>
              쏟아진 슬픔을 주워 담는 대신 붓을 들었습니다.<br />
              마음의 병을 마주하며 캔버스에 채워 넣은 색채들은<br />
              멈춰버린 일상을 다시 움직이게 하는 첫 번째 숨 고르기였습니다.
            </Paragraph>
          </div>
        </Col>

        {/* 작품 2 (IMG_0264: 바 내부 전경) */}
        <Col span={24} style={{ maxWidth: '1000px' }}>
          <img src={images.work2} alt="기억의 공간" style={{ width: '100%', display: 'block' }} />
          <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '11px', color: '#999', fontWeight: 300 }}>
            130.3 x 89.4 cm (60P), Acrylic on canvas
          </div>

          <div style={{ marginTop: '20px', padding: '0 5px' }}>
            <Title level={2} style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '15px', letterSpacing: '-1px' }}>
              시간의 층위, 겹쳐진 순간
            </Title>
            <Paragraph style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.8', wordBreak: 'keep-all' }}>
              평범하게 살던 직장인의 시선에 맺힌 익숙한 풍경들.<br />
              그 풍경 속에 스며있는 당신의 흔적을 겹겹이 쌓아 올립니다.<br />
              이곳에 남긴 모든 순간이 당신에게 평온한 안식이 되기를 바랍니다.
            </Paragraph>
          </div>
        </Col>

        {/* 작품 3 (IMG_9977: 보라색 배경) */}
        <Col span={24} style={{ maxWidth: '1000px' }}>
          <img src={images.work3} alt="극복의 꽃" style={{ width: '100%', display: 'block' }} />
          <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '11px', color: '#999', fontWeight: 300 }}>
            130.3 x 89.4 cm (60P), Acrylic on canvas
          </div>

          <div style={{ marginTop: '20px', padding: '0 5px' }}>
            <Title level={2} style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '15px', letterSpacing: '-1px' }}>
              안식의 꽃으로 피어나다
            </Title>
            <Paragraph style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.8', wordBreak: 'keep-all' }}>
              가장 아픈 곳에서 비로소 가장 아름다운 꽃이 피어납니다.<br />
              이제 당신은 캔버스 위에서 영원히 시들지 않는 아름다움이 되었습니다.<br />
              그림으로 슬픔을 건너온 한 남자의 마지막 작별 인사입니다.
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
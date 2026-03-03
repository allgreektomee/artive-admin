import React from 'react';
import { Typography, Row, Col, Button, Space } from 'antd';
import { InstagramOutlined, YoutubeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const { Title, Paragraph, Text } = Typography;

const MagazineHome: React.FC = () => {
  const navigate = useNavigate();

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
          Just Art 2026
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
          <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '12px', color: '#111111', fontWeight: 300 }}>
            Trace of Yellow. 60P. Acrylic on canvas.
          </div>
          
          <div style={{ marginTop: '20px', padding: '0 5px' }}>
            {/* 2. 제목 */}
            <Title level={2} style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '15px', letterSpacing: '-1px' }}>
              그리움은 물감이 되고
            </Title>
            {/* 3. 3줄 소개 */}
            <Paragraph style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.8', wordBreak: 'keep-all' }}>
              쏟아진 슬픔을 주워 담는 대신 붓을 들었습니다.<br />
              캔버스에 채워 넣은 색채들은 멈춰버린 <br />
              일상을 다시 움직이게 하였습니다. 
             
            </Paragraph>
          </div>
        </Col>

        {/* 작품 2 (IMG_0264: 바 내부 전경) */}
        <Col span={24} style={{ maxWidth: '1000px' }}>
          <img src={images.work2} alt="기억의 공간" style={{ width: '100%', display: 'block' }} />
          <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '12px', color: '#111111', fontWeight: 300 }}>
            Shadow of Purple. 60P. Acrylic on canvas.
          </div>

          <div style={{ marginTop: '20px', padding: '0 5px' }}>
            <Title level={2} style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '15px', letterSpacing: '-1px' }}>
              그녀는 캔버스의 아름다운
            </Title>
            <Paragraph style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.8', wordBreak: 'keep-all' }}>
              익숙한 공간의 공기를 붓질로 층층이 쌓아<br />
              보라색 잔상 속에 스며있는 그녀의 흔적을 <br />
              찾아가는 시간입니다.
            </Paragraph>
          </div>
        </Col>

        {/* 작품 3 (IMG_9977: 보라색 배경) */}
        <Col span={24} style={{ maxWidth: '1000px' }}>
          <img src={images.work3} alt="극복의 꽃" style={{ width: '100%', display: 'block' }} />
          <div style={{ textAlign: 'right', marginTop: '10px',fontSize: '12px', color: '#111111', fontWeight: 300 }}>
           Still Half. 60P. Acrylic on canvas.
          </div>

          <div style={{ marginTop: '20px', padding: '0 5px' }}>
            <Title level={2} style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '15px', letterSpacing: '-1px' }}>
              꽃이 되었습니다.
            </Title>
            <Paragraph style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.8', wordBreak: 'keep-all' }}>
              시들지 않는 그리움으로 그려낸 마지막 작별인사. 
              이제 당신은 캔버스 위에서 영원히 시들지 않는 안식이 되었습니다. 잘가요.
            </Paragraph>
          </div>
        </Col>

      </Row>
      </section>
    
  

  
    <section style={{ 
        padding: '100px 20px', 
        textAlign: 'center', 
        background: '#fff' 
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          
          {/* 1. 상단 문구: 작고 차분하게 배치 */}
          <Paragraph style={{ 
            fontSize: '1.05rem', 
            color: '#666', 
            marginBottom: '40px', 
            wordBreak: 'keep-all',
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            슬픔을 건너온 한 남자가 전하는 <br /> 마지막 작별 인사.
          </Paragraph>

          {/* 2. 메인 버튼: EPILOGUE 강조 버전 */}
          <div 
            onClick={() => navigate('/profile')}
            style={{ 
              border: '2.5px solid #000', 
              padding: '60px 20px', 
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
            }}
          >
            {/* 타이틀 크게 강조 */}
            <Text style={{ 
              display: 'block', 
              letterSpacing: '8px', 
              fontSize: '2.2rem', // 글자 크기를 키워 존재감 부여
              fontWeight: 900,
              marginBottom: '15px',
              color: 'inherit'
            }}>
              EPILOGUE
            </Text>
            
            {/* 보조 설명은 상대적으로 작게 */}
            <Title level={4} style={{ 
              fontSize: '1rem', 
              fontWeight: 500, 
              lineHeight: 1.5, 
              margin: 0,
              color: 'inherit',
              opacity: 0.8,
              wordBreak: 'keep-all',
              fontFamily: 'serif'
            }}>
              낮에는 직장인으로, 밤에는 화가로.. 
            </Title>

            <div style={{ marginTop: '30px', fontSize: '1.2rem', color: 'inherit' }}>
              <ArrowRightOutlined />
            </div>
          </div>

          {/* 3. 하단 작가명: 다시 작고 세련되게 */}
          <Text style={{ 
            display: 'block', 
            marginTop: '40px', 
            fontSize: '0.85rem', 
            letterSpacing: '6px', 
            color: '#999',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            PARK JAE YOUNG
          </Text>
        </div>
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
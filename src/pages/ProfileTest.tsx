import React from 'react';
import { Typography, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ProfileTest: React.FC = () => {
  // S3 URL들을 이곳에 계속 추가하세요.
  const images = {
    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png", 
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png", 
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",
    // spain100: "https://...", 
    // studio: "https://...",
  };

  const archiveList = Object.values(images);

  return (
    <div style={{ background: '#fff', padding: '80px 0', fontFamily: "'Noto Serif KR', serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
        
        {/* 1. 작가 소개 섹션 */}
        <div style={{ marginBottom: '100px' }}>
          <Text style={{ letterSpacing: '8px', fontSize: '0.8rem', color: '#999', fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>
            ARTIST PROFILE
          </Text>
          <Title level={2} style={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 800, marginBottom: '40px' }}>
            박재영 <small style={{ fontSize: '1rem', color: '#888', fontWeight: 400, marginLeft: '10px' }}>Park Jae Young</small>
          </Title>
          
          <div style={{ maxWidth: '700px' }}>
            <Paragraph style={{ fontSize: '1.15rem', lineHeight: '2', color: '#333', wordBreak: 'keep-all' }}>
              낮에는 시스템을 설계하는 개발자로, 밤에는 감정을 기록하는 화가로 살아갑니다. <br />
              상실의 무게를 붓질로 옮기기 시작한 지 1년, <br />
              그리움은 물감이 되었고 그녀는 캔버스의 영원한 꽃이 되었습니다.
            </Paragraph>
            <Paragraph style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#666', marginTop: '30px', fontWeight: 300 }}>
              서울아트페어(SAF) 연작을 포함하여, 낯선 여행지에서의 고독과 <br />
              작업실에서의 몰입이 담긴 기록들을 이곳에 남깁니다.
            </Paragraph>
          </div>
        </div>

        {/* 2. 에필로그 아카이브 섹션 (Gritty Grid) */}
        <div style={{ marginTop: '120px' }}>
          <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <Text style={{ letterSpacing: '4px', fontSize: '0.85rem', color: '#000', fontWeight: 'bold' }}>
              EPILOGUE: THE DENSITY OF TIME
            </Text>
          </div>
          
          <div style={{ lineHeight: 0 }}> 
            <Row gutter={[4, 4]}> 
              {archiveList.map((url, index) => (
                <Col key={index} xs={12} sm={8} md={6}>
                  <div style={{ 
                    width: '100%', 
                    aspectRatio: '1/1', 
                    overflow: 'hidden',
                    background: '#f9f9f9' 
                  }}>
                    <img 
                      src={url} 
                      alt={`archive-${index}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        filter: 'grayscale(15%) contrast(1.05)',
                        transition: 'all 0.4s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'grayscale(0%) contrast(1)';
                        e.currentTarget.style.transform = 'scale(1.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'grayscale(15%) contrast(1.05)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* 3. 하단 저작권 정보 */}
        <div style={{ marginTop: '100px', textAlign: 'center', paddingTop: '40px' }}>
          <Text style={{ fontSize: '0.8rem', letterSpacing: '5px', color: '#ccc', fontWeight: 'bold' }}>
            PARK JAE YOUNG © 2026
          </Text>
        </div>

      </div>
    </div>
  );
};

export default ProfileTest;
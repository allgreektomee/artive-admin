import React from 'react';
import { Typography, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;

const EpilogueArchive = () => {
  // S3 URL들을 이곳에 계속 추가하시면 됩니다.
  const images = {
    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png", 
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png", 
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",
    spain100: "https://artive-uploads.s3.../spain100.jpg", // 스페인 100호 추가 시
    studio: "https://artive-uploads.s3.../studio.jpg",   // 작업실 사진 추가 시
    // ... 추가되는 대로 계속 나열
  };

  // 객체의 값들만 배열로 변환하여 매핑에 사용합니다.
  const archiveList = Object.values(images);

  return (
    <div style={{ background: '#fff', padding: '100px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 에필로그 헤더: 작가님의 서사를 담은 문구 */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <Text style={{ letterSpacing: '8px', fontSize: '0.9rem', color: '#999', fontWeight: 'bold' }}>
            EPILOGUE: THE DENSITY OF TIME
          </Text>
          <Title level={2} style={{ 
            marginTop: '20px', 
            fontSize: '2rem', 
            fontWeight: 800,
            fontFamily: "'Noto Serif KR', serif" 
          }}>
            평범한 하루의 기록
          </Title>
          <Paragraph style={{ 
            color: '#666', 
            fontSize: '1.1rem', 
            lineHeight: 1.8, 
            marginTop: '30px', 
            wordBreak: 'keep-all',
            fontWeight: 300
          }}>
            1년 남짓 이어진 낯선 풍경과 대작을 향한 질주를 이 한 장에 갈무리합니다.<br />
            이제는 비워진 캔버스 위에, 다시 시작될 저의 평범한 하루를 담담히 기록하려 합니다.
          </Paragraph>
        </div>

        {/* 촘촘한 그리드 콜라주 섹션 (Gritty Grid) */}
        <div style={{ lineHeight: 0 }}> 
          <Row gutter={[4, 4]}> 
            {archiveList.map((url, index) => (
              <Col 
                key={index} 
                xs={12} // 모바일 2열
                sm={8}  // 태블릿 3열
                md={6}  // PC 4열 (더 촘촘하게 하려면 4나 3으로 조절)
              >
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '1/1', 
                  overflow: 'hidden',
                  background: '#f9f9f9' 
                }}>
                  <img 
                    src={url} 
                    alt={`archive-work-${index}`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      filter: 'grayscale(10%) contrast(1.1)', // 약간의 대비를 주어 노동의 강렬함 표현
                      transition: 'all 0.4s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0%) contrast(1)';
                      e.currentTarget.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(10%) contrast(1.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* 하단 푸터: 작가명 강조 */}
        <div style={{ marginTop: '120px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '60px' }}>
          <Text style={{ 
            fontSize: '0.85rem', 
            letterSpacing: '6px', 
            color: '#bbb',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            PARK JAE YOUNG
          </Text>
          <div style={{ marginTop: '15px' }}>
            <Text style={{ fontSize: '0.75rem', color: '#ddd' }}>
              © 2026 ARTIVE. ALL RIGHTS RESERVED.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpilogueArchive;
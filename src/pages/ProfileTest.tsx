import React from 'react';
import { Typography, Row, Col, Space, Tag } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ProfileTest: React.FC = () => {
  const images = {
    studioView: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png", 
    mentorView: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/mentor.png", 
    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png", 
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png", 
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",
    work4: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/789.png",
  };

  const archiveList = Object.values(images);

  return (
    <div style={{ background: '#fff', padding: '100px 0', fontFamily: "'Pretendard', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
        
        {/* 1. HERO 섹션: 듀얼 라이프 강조 */}
        <div style={{ marginBottom: '120px', textAlign: 'center' }}>
          <Space size="middle" style={{ marginBottom: '25px' }}>
            <Tag color="#108ee9" style={{ borderRadius: '4px', padding: '2px 12px', fontWeight: 600 }}>BUILD</Tag>
            <span style={{ fontWeight: 900, color: '#eee' }}>/</span>
            <Tag color="#f50" style={{ borderRadius: '4px', padding: '2px 12px', fontWeight: 600 }}>PAINT</Tag>
          </Space>
          
          <Title level={1} style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px 0', letterSpacing: '-2px' }}>
            Build by Day,<br />Paint by Night
          </Title>
          
          <Text style={{ fontSize: '1.2rem', letterSpacing: '4px', color: '#999', fontWeight: 500, textTransform: 'uppercase' }}>
            The Dual Life of Park Jae Young
          </Text>
        </div>

        {/* 2. 인터뷰 스타일 자기소개 */}
        <div style={{ marginBottom: '150px', borderLeft: '5px solid #000', paddingLeft: '40px', marginLeft: '10px' }}>
          <Title level={2} style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '30px' }}>
            "논리로 세상을 짓고,<br /><span style={{ color: '#f50' }}>감각으로 캔버스를 채웁니다.</span>"
          </Title>
          <div style={{ maxWidth: '800px' }}>
            <Paragraph style={{ fontSize: '1.2rem', lineHeight: '2', color: '#333', wordBreak: 'keep-all' }}>
              낮에는 복잡한 금융 시스템의 아키텍처를 설계하고 코드로 견고한 성을 쌓습니다. 
              하지만 해가 지고 작업실 조명이 켜지면, 저는 정해진 답이 없는 색채의 세계로 뛰어듭니다. <br /><br />
              버그를 해결할 때의 쾌감과 빈 캔버스에 첫 붓질을 할 때의 설렘, 
              이 두 가지 에너지가 저를 움직이는 원동력입니다. 
              가장 이성적인 일과 가장 감성적인 일 사이의 균형, 그것이 제가 정의하는 진짜 '나'다운 삶입니다.
            </Paragraph>
          </div>
        </div>

        {/* 3. 스승 정세화 섹션: 정진의 즐거움 */}
        <section style={{ marginBottom: '150px' }}>
          <Row gutter={[60, 40]} align="middle">
            <Col xs={24} md={12}>
              <div style={{ position: 'relative' }}>
                <img src={images.mentorView} alt="Mentor" style={{ width: '100%', borderRadius: '4px', filter: 'grayscale(10%)' }} />
                <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: '#000', color: '#fff', padding: '20px', fontWeight: 800 }}>
                  MENTOR & ME
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Title level={3} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '25px' }}>
                독학의 열정에<br />기본기의 날개를 달다
              </Title>
              <Paragraph style={{ fontSize: '1.1rem', color: '#444', lineHeight: '2', wordBreak: 'keep-all' }}>
                정세화 선생님을 만난 건 제 예술 인생의 '터닝 포인트'였습니다. 
                그림을 대하는 진지한 태도와 화면을 구성하는 탄탄한 기본기, 
                무엇보다 캔버스를 끝까지 밀어붙이는 '화가의 근성'을 배웠습니다. <br /><br />
                선생님의 가르침 덕분에 독학 1년 만에 '입선'이라는 짜릿한 성취도 맛보았죠. 
                배움의 즐거움을 알게 해주신 선생님께 늘 감사합니다!
              </Paragraph>
            </Col>
          </Row>
        </section>

        {/* 4. 작업실 섹션: 5분 컷 아지트 */}
        <section style={{ marginBottom: '180px' }}>
          <div style={{ background: '#000', padding: '80px 40px', borderRadius: '4px', textAlign: 'center' }}>
            <Title level={3} style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 900, marginBottom: '20px' }}>
              STUDIO 5-MIN AWAY
            </Title>
            <Text style={{ color: '#666', fontSize: '1rem', display: 'block', marginBottom: '50px', letterSpacing: '2px' }}>
              화실 바로 앞, 퇴근 후 5분이면 시작되는 나의 두 번째 삶
            </Text>
            <img src={images.studioView} alt="Studio" style={{ width: '100%', maxWidth: '900px', borderRadius: '2px', border: '10px solid #222' }} />
            <div style={{ maxWidth: '700px', margin: '50px auto 0 auto' }}>
              <Paragraph style={{ fontSize: '1.15rem', color: '#ccc', lineHeight: '2' }}>
                몰입의 흐름을 깨지 않으려 화실 바로 앞에 작업실을 만들었습니다. <br />
                모니터의 블루라이트가 캔버스의 유채 향기로 바뀌는 순간, <br />
                120호 대작과 마주하며 저는 다시 태어납니다.
              </Paragraph>
            </div>
          </div>
        </section>

        {/* 5. 아카이브 섹션: 라이브 기록 */}
        <div style={{ marginTop: '120px' }}>
          <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Title level={4} style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900 }}>THE ARCHIVE</Title>
            <Text style={{ fontWeight: 700, color: '#f50' }}>1 YEAR OF PASSION</Text>
          </div>
          
          <Row gutter={[16, 16]}> 
            {archiveList.map((url, index) => (
              <Col key={index} xs={12} sm={8} md={6}>
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={url} 
                    alt={`archive-${index}`}
                    style={{ 
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.filter = 'brightness(0.7)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.filter = 'brightness(1)';
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* 6. 하단 푸터: 쿨한 마무리 */}
        <div style={{ marginTop: '150px', textAlign: 'center', padding: '80px 0', background: '#fafafa' }}>
          <Text style={{ fontSize: '1rem', letterSpacing: '8px', color: '#000', fontWeight: 900 }}>
            BUILD BETTER. PAINT DEEPER.
          </Text>
        </div>

      </div>
    </div>
  );
};

export default ProfileTest;
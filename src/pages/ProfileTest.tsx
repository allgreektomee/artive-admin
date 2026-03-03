import React from 'react';
import { Typography, Row, Col, Space, Tag } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ProfileTest: React.FC = () => {
  const images = {
    studioView: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png", 
    mentorView: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/mentor.png", 
    work100_1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/100-1.png", 
    work100_2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/100-2.png", 
    work120_process: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120-process.png",
    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png", 
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png", 
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",
    work4: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/789.png",
  };

  const archiveList = [images.work1, images.work2, images.work3, images.work4];

  // 핵심 컬러 정의
  const colors = {
    build: '#f1c40f', // 옐로우 연작 (논리/빌드)
    paint: '#8e44ad', // 퍼플 연작 (감각/페인트)
  };

  return (
    <div style={{ background: '#fff', padding: '100px 0', fontFamily: "'Pretendard', sans-serif", overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
        
        {/* 1. HERO 섹션: BUILD(Yellow) & PAINT(Purple) */}
        <div style={{ marginBottom: '120px', textAlign: 'center' }}>
          <Space size="middle" style={{ marginBottom: '25px' }}>
            <Tag color={colors.build} style={{ borderRadius: '4px', padding: '2px 15px', fontWeight: 800, color: '#000' }}>BUILD</Tag>
            <span style={{ fontWeight: 900, color: '#eee' }}>/</span>
            <Tag color={colors.paint} style={{ borderRadius: '4px', padding: '2px 15px', fontWeight: 800, color: '#fff' }}>PAINT</Tag>
          </Space>
          
          <Title level={1} style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px 0', letterSpacing: '-2px' }}>
            <span style={{ color: colors.build }}>Build</span> by Day,<br />
            <span style={{ color: colors.paint }}>Paint</span> by Night
          </Title>
          
          <Text style={{ fontSize: '1.2rem', letterSpacing: '6px', color: '#999', fontWeight: 600, textTransform: 'uppercase' }}>
            The Dual Life 
          </Text>
        </div>

        {/* 2. 인터뷰 스타일: 노랑(논리) / 보라(감각) */}
        <div style={{ marginBottom: '150px', borderLeft: '5px solid #000', paddingLeft: '40px', marginLeft: '10px' }}>
          <Title level={2} style={{ fontSize: '2.3rem', fontWeight: 900, marginBottom: '35px', lineHeight: 1.4 }}>
            "<span style={{ color: colors.build }}>논리</span>로 세상을 짓고,<br />
            <span style={{ color: colors.paint }}>감각</span>으로 캔버스를 채웁니다."
          </Title>
          <div style={{ maxWidth: '850px' }}>
            <Paragraph style={{ fontSize: '1.25rem', lineHeight: '2.1', color: '#333', wordBreak: 'keep-all' }}>
              낮에는 복잡한 IT 아키텍처를 설계하고 코드로 견고한 성을 쌓습니다. 
              하지만 해가 지고 작업실 조명이 켜지면, 저는 정해진 답이 없는 <span style={{ color: colors.paint, fontWeight: 700 }}>보라빛 감각의 세계</span>로 뛰어듭니다. <br /><br />
              <span style={{ color: colors.build, fontWeight: 700 }}>이성적인 노란색 설계</span>와 감성적인 보라색 붓질 사이의 균형, 그것이 제가 정의하는 진짜 '나'다운 삶입니다.
            </Paragraph>
          </div>
        </div>

        {/* 3. 스승 섹션: 워딩 유지 */}
        <section style={{ marginBottom: '150px' }}>
          <Row gutter={[60, 40]} align="middle">
            <Col xs={24} md={12}>
              <div style={{ position: 'relative' }}>
                <img src={images.mentorView} alt="Mentor" style={{ width: '100%', borderRadius: '4px' }} />
                <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: '#000', color: '#fff', padding: '20px', fontWeight: 800 }}>
                  MENTOR & ME
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Title level={3} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '25px' }}>
                Paint 열정에<br />기본기의 날개를 달다
              </Title>
              <Paragraph style={{ fontSize: '1.1rem', color: '#444', lineHeight: '2', wordBreak: 'keep-all' }}>
                정세화 선생님을 만난 건 제 예술 인생의 '터닝 포인트'였습니다. 
                그림을 대하는 진지한 태도와 화면을 구성하는 탄탄한 기본기, 
                무엇보다 캔버스를 끝까지 밀어붙이는 '화가의 근성'을 배웠습니다. <br /><br />
                선생님의 가르침 덕분에 '입선'이라는 짜릿한 성취도 맛보았죠. 
                배움의 즐거움을 알게 해주신 선생님께 늘 감사합니다!
              </Paragraph>
            </Col>
          </Row>
        </section>
      </div>

      {/* 4. 작업실 섹션 (1분 컷 / Full Black) */}
      <section style={{ 
        width: '100vw', marginLeft: '50%', transform: 'translateX(-50%)', 
        background: '#000', padding: '150px 0', color: '#fff', marginBottom: '150px' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={3} style={{ color: '#fff', fontSize: '2.8rem', fontWeight: 900, marginBottom: '20px' }}>
              STUDIO 1-MIN AWAY
            </Title>
            <Text style={{ color: '#666', fontSize: '1rem', display: 'block', marginBottom: '50px', letterSpacing: '2px' }}>
              화실 바로 앞, 퇴근 후 1분이면 시작되는 나의 두 번째 삶
            </Text>
            <img src={images.studioView} alt="Studio" style={{ width: '100%', maxWidth: '1000px', borderRadius: '2px', border: '1px solid #333' }} />
          </div>
        </div>
      </section>

      {/* 5. 대작 소개 (100호 & 120호) */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
        <section style={{ marginBottom: '180px' }}>
          <div style={{ marginBottom: '60px', borderBottom: '2px solid #000', paddingBottom: '20px' }}>
            <Title level={3} style={{ fontSize: '2rem', fontWeight: 900 }}>GRAND SCALE WORKS</Title>
          </div>
          
          <Row gutter={[40, 60]}>
            <Col xs={24} md={12}>
              <img src={images.work100_1} alt="100호" style={{ width: '100%', marginBottom: '20px' }} />
              <Title level={4} style={{ fontSize: '1.4rem', fontWeight: 800 }}>100F. 정적인 역동</Title>
            </Col>
            <Col xs={24} md={12}>
              <img src={images.work100_2} alt="100호" style={{ width: '100%', marginBottom: '20px' }} />
              <Title level={4} style={{ fontSize: '1.4rem', fontWeight: 800 }}>100F. 색채의 설계</Title>
            </Col>
            
            <Col span={24} style={{ marginTop: '40px' }}>
              <div style={{ background: '#f9f9f9', padding: '60px', borderRadius: '4px' }}>
                <Row gutter={[40, 40]} align="middle">
                  <Col xs={24} lg={14}>
                    <img src={images.work120_process} alt="120호" style={{ width: '100%' }} />
                  </Col>
                  <Col xs={24} lg={10}>
                    <Tag color={colors.paint} style={{ marginBottom: '15px' }}>ON PROGRESS</Tag>
                    <Title level={3} style={{ fontSize: '2.2rem', fontWeight: 900 }}>120호, 새로운 한계를 빌드하다</Title>
                    <Paragraph style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.9' }}>
                      현재 진행 중인 120호 작업은 가장 큰 도전입니다. 시스템 설계의 정교함을 캔버스의 압도적 크기로 치환하는 이 과정 자체가 저에겐 또 하나의 즐거운 빌드입니다.
                    </Paragraph>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </section>

        {/* 6. 아카이브 섹션 */}
        <div style={{ marginTop: '120px' }}>
          <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Title level={4} style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900 }}>THE ARCHIVE</Title>
            <Text style={{ fontWeight: 700, color: colors.paint }}>1 YEAR OF PASSION</Text>
          </div>
          
          <Row gutter={[16, 16]}> 
            {archiveList.map((url, index) => (
              <Col key={index} xs={12} sm={8} md={6}>
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={url} 
                    alt={`archive-${index}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.4s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* 7. 푸터 */}
        <div style={{ marginTop: '150px', textAlign: 'center', padding: '80px 0', background: '#fafafa' }}>
          <Text style={{ fontSize: '1.1rem', letterSpacing: '8px', color: '#000', fontWeight: 900 }}>
            <span style={{ color: colors.build }}>BUILD</span> BETTER. <span style={{ color: colors.paint }}>PAINT</span> DEEPER.
          </Text>
        </div>

      </div>
    </div>
  );
};

export default ProfileTest;
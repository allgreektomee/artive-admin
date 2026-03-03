import React from 'react';
import { Typography, Row, Col, Space, Tag } from 'antd';
import { InstagramOutlined } from '@ant-design/icons';

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
            <span style={{ fontWeight: 900, color: '#000' }}>/</span>
            <Tag color={colors.paint} style={{ borderRadius: '4px', padding: '2px 15px', fontWeight: 800, color: '#000' }}>PAINT</Tag>
          </Space>
          
          <Title level={1} style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px 0', letterSpacing: '-2px' }}>
            Build by Day,<br />
            Paint by Night
          </Title>
          
          <Text style={{ fontSize: '1.2rem', letterSpacing: '6px', color: '#999', fontWeight: 600, textTransform: 'uppercase' }}>
            The Dual Life 
          </Text>
        </div>

        {/* 2. 인터뷰 스타일: 노랑(논리) / 보라(감각) */}
        <div style={{ marginBottom: '150px', borderLeft: '5px solid #000', paddingLeft: '40px', marginLeft: '10px' }}>
          <Title level={2} style={{ fontSize: '2.0rem', fontWeight: 900, marginBottom: '35px', lineHeight: 1.4 }}>
            "<span style={{ color: colors.build }}>논리</span>로 세상을 짓고,<br />
            <span style={{ color: colors.paint }}>감각</span>으로 캔버스를 채웁니다."
          </Title>
          <div style={{ maxWidth: '850px' }}>
            <Paragraph style={{ fontSize: '1.25rem', lineHeight: '2.1', color: '#333', wordBreak: 'keep-all' }}>
              낮에는 복잡한 IT 아키텍처를 설계하고 개발 코드로 견고한 성을 쌓습니다. 
              하지만 해가 지고 작업실 조명이 켜지면, 저는 정해진 답이 없는 감각의 세계로 뛰어듭니다. <br /><br />
              이성적인 개발과 감성적인 붓질 사이의 균형, 그것이 제가 정의하는 진짜 '나'다운 삶입니다.
            </Paragraph>
          </div>
        </div>

        {/* 3. 스승 섹션: 워딩 유지 */}
        <section style={{ marginBottom: '150px' }}>
          <Row gutter={[60, 40]} align="middle">
            <Col xs={24} md={12}>
              <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                {/* 이미지 */}
                <img 
                  src={images.mentorView} 
                  alt="Mentor" 
                  style={{ width: '100%', borderRadius: '4px', filter: 'grayscale(10%)' }} 
                />
                
                {/* 인스타그램 블랙 앤 화이트 버튼 (이미지 우측 하단에 겹침) */}
                <a 
                  href="https://www.instagram.com/sewhajung" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    position: 'absolute', 
                    bottom: '-15px', 
                    right: '10px',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: '#000', // 기본 화이트 배경
                    color: '#fff', // 기본 블랙 텍스트
                    padding: '12px 24px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textDecoration: 'none',
                    zIndex: 10
                  }}
                 
                >
                  <InstagramOutlined style={{ fontSize: '1.3rem' }} />
                  <span style={{ letterSpacing: '1px' }}>Se-hwa Jung</span>
                </a>
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

            {/* 5. 대작 소개 (100호는 기존 유지, 120호만 와이드로 변경) */}
      <section style={{ marginBottom: '180px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
          <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '60px' }}>
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
          </Row>
        </div>

        {/* 120호 섹션: 여기서부터 꽉 차게 나갑니다 */}
        <div style={{ 
          width: '100vw', 
          marginLeft: '50%', 
          transform: 'translateX(-50%)', 
          background: '#f9f9f9', 
          padding: '120px 0', 
          marginTop: '100px',
          textAlign: 'center' 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
            {/* 이미지 섹션: 가로폭 1100px까지 확장 */}
            <div style={{ marginBottom: '60px', position: 'relative', display: 'inline-block', width: '100%' }}>
              <img 
                src={images.work120_process} 
                alt="120호 작업중" 
                style={{ 
                  width: '100%', 
                  maxWidth: '1100px', 
                  height: 'auto', 
                  boxShadow: '0 40px 80px rgba(0,0,0,0.12)', 
                  borderRadius: '2px'
                }} 
              />
              {/* 태그 위치 조정 */}
              <div style={{ marginTop: '30px' }}>
                <Tag color={colors.paint} style={{ padding: '6px 20px', fontSize: '1rem', fontWeight: 800 }}>ON PROGRESS</Tag>
              </div>
            </div>

            {/* 텍스트 섹션: 여백을 넓게 주어 시원하게 배치 */}
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
              <Title level={2} style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '40px', letterSpacing: '-1px' }}>
                120호, 새로운 한계를 빌드하다
              </Title>
              <Paragraph style={{ fontSize: '1.35rem', color: '#333', lineHeight: '2.2', wordBreak: 'keep-all' }}>
                현재 진행 중인 120호 작업은 저에게 가장 큰 도전이자 즐거움입니다. <br />
                시스템 설계의 정교함을 캔버스의 압도적 크기로 치환하는 이 과정 자체가 <br />
                저에겐 또 하나의 거대한 빌드입니다. <br /><br />
                비어있는 거대한 화이트 스페이스를 완전히 장악했을 때의 쾌감을 향해, <br />
                매일 밤 붓을 멈추지 않습니다.
              </Paragraph>
            </div>
          </div>
        </div>
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
    
  );
};

export default ProfileTest;
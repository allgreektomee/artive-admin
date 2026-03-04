import React, {useEffect} from 'react';
import { Typography, Row, Col, Space, Tag } from 'antd';
import { InstagramOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const ProfileTest: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = {
    studioView: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png", 
    mentorView: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/mentor.png", 
    work100_1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/100-1.png", 
    work100_2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/100-2.png", 
    work120_process: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_1.png",
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
        <div style={{ marginBottom: '150px', borderLeft: '5px solid #000', paddingLeft: '25px', marginLeft: '0px' }}>
          <Title level={2} style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '25px', lineHeight: 1.5, letterSpacing: '-0.02em' }}>
            "<span style={{ color: colors.build }}>논리</span>로 세상을 짓고,<br />
            <span style={{ color: colors.paint }}>감각</span>으로 캔버스를 채우다"
          </Title>
          <div style={{ maxWidth: '850px' }}>
            <Paragraph style={{ fontSize: '1.1rem', lineHeight: '2.1', color: '#333', wordBreak: 'keep-all' }}>
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
                배움의 즐거움을 알게 해주신 선생님께 늘 감사합니다.
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
        {/* 5. 대작 소개 (100호 섹션) */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
        <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '60px' }}>
          <Title level={3} style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '2px' }}>GRAND SCALE WORKS</Title>
        </div>
        
        <Row gutter={[40, 100]} style={{ marginBottom: '120px' }}>
          {/* 작품 1: Messenger of Flora */}
          <Col xs={24} md={12}>
            <div style={{ overflow: 'hidden', borderRadius: '2px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img src={images.work100_1} alt="Messenger of Flora" style={{ width: '100%' }} />
            </div>
            <Title level={4} style={{ marginTop: '30px', fontSize: '1.4rem', fontWeight: 800 }}>
              100F.
              <span style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>Messenger of Flora</span>
            </Title>
            <Paragraph style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.9', wordBreak: 'keep-all' }}>
              부드러운 손길로 생을 축복하는 존재. <br />
              캔버스를 가득 채운 꽃들은 영원히 시들지 않는 기억의 개화(開花)를 상징하며, 
              그 찰나의 아름다움을 영원으로 실어 나르는 전령을 담았습니다.
            </Paragraph>
          </Col>
          
          {/* 작품 2: Val d'Aran */}
          <Col xs={24} md={12}>
            <div style={{ overflow: 'hidden', borderRadius: '2px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img src={images.work100_2} alt="Val d'Aran" style={{ width: '100%' }} />
            </div>
            <Title level={4} style={{ marginTop: '30px', fontSize: '1.4rem', fontWeight: 800 }}>
              100F. 
              <span style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>Dawn in Val d'Aran</span>
            </Title>
            <Paragraph style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.9', wordBreak: 'keep-all' }}>
              스페인 피레네 산맥의 서늘한 공기, 그 정점에서 마주한 출발선. <br />
              한계를 넘어선 몰입 직전의 고요한 긴장과 뜨거운 박동을 기록하며, 
              "나"를 찾아가는 여정의 시작을 그렸습니다.
            </Paragraph>
          </Col>
        </Row>
      </div>
      </section>

      {/* 5-1. 120호 섹션 (The Solitude - FULL WIDE) */}
      <section style={{ 
        width: '100vw', 
        background: '#f9f9f9', 
        padding: '140px 0', 
        marginBottom: '150px',
        borderTop: '1px solid #eee'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px', textAlign: 'center' }}>
          <div style={{ marginBottom: '70px' }}>
            <img 
              src={images.work120_process} 
              alt="The Solitude" 
              style={{ 
                width: '100%', 
                maxWidth: '1100px', 
                boxShadow: '0 60px 120px rgba(0,0,0,0.18)',
                borderRadius: '2px'
              }} 
            />
          </div>
          
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <Tag color={colors.paint} style={{ marginBottom: '35px', padding: '6px 25px', fontSize: '0.9rem', fontWeight: 800, borderRadius: '0' }}>ON PROGRESS</Tag>
            <Title level={2} style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, marginBottom: '45px', letterSpacing: '-1.5px', wordBreak: 'keep-all', lineHeight: 1.3 }}>
              함께였던 공간, 이제는 홀로 앉아있는 시간
            </Title>
            <Paragraph style={{ fontSize: '1.35rem', color: '#333', lineHeight: '2.5', fontWeight: 400, wordBreak: 'keep-all' }}>
              "가장 거대한 캔버스는 가장 깊은 고독을 위해 비워두었습니다." <br /><br />
              온기가 머물던 자리, 그 익숙한 공간에 홀로 앉아있는 인물을 그리는 일은 
              막막한 부재를 마주하고 스스로를 다시 일으켜 세우는 침묵의 의식입니다. <br />
              120호의 광활한 여백은 그 상실의 크기이자, 동시에 다시 채워나가야 할 작가의 뒷모습입니다.
            </Paragraph>
          </div>
        </div>
      </section>

      {/* 6. 아카이브 섹션 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
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
            <span style={{ color: colors.build }}>BUILD</span> BETTER.<br /> 
            <span style={{ color: colors.paint }}>PAINT</span> DEEPER.
          </Text>
        </div>



      </div>
    
  );
};

export default ProfileTest;
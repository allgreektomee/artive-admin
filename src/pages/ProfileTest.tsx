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
    mentorView: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/jsh.jpg", 
    work100_1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/work100_1.png", 
    work100_2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/100ss.png", 
    work120_process: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_1.png",
   
    first: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/first.png",
    love: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/60.png",

    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png", 
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png", 
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",

    work4: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/100s.png",
    work5: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/gg.png",
    work6: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/sss.png",

    work7: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/ss.png",
    work8: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_2.png",
    work9: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/rome.png",
    work10: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/first.png",
  
  };

  const archiveList = [images.work1, images.work2, images.work3, images.work4, images.work5, images.work6, images.work7, images.work8, images.work9, images.work10];

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
          <Title level={2} style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: '25px', lineHeight: 1.5, letterSpacing: '-0.02em' }}>
            <span style={{ color: colors.build }}>논리</span>로 세상을 짓고,<br />
            <span style={{ color: colors.paint }}>감각</span>으로 캔버스를 채우다
          </Title>
          <div style={{ maxWidth: '850px' }}>
            <Paragraph style={{ fontSize: '1.1rem', lineHeight: '2.1', color: '#333', wordBreak: 'keep-all' }}>
              낮에는 복잡한 IT 아키텍처를 설계하고 개발 코드로 견고한 성을 쌓습니다. 
              하지만 해가 지고 작업실 조명이 켜지면, 저는 정해진 답이 없는 감각의 세계로 뛰어듭니다. <br /><br />
              이성적인 개발과 감성적인 붓질 사이의 균형, 그것이 제가 정의하는 진짜 '나'다운 삶입니다.
            </Paragraph>
          </div>
        </div>

        {/* 3. 스승 섹션 */}
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
                    bottom: '-10px', 
                    right: '-10px',
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
        width: '100vw', 
        marginLeft: '50%', 
        transform: 'translateX(-50%)', 
        background: '#000', 
        padding: '120px 0', 
        color: '#fff', 
        marginBottom: '100px' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 25px', textAlign: 'center' }}>
          
          {/* 타이틀을 '장소의 기록' */}
          <Text style={{ color: colors.build, letterSpacing: '4px', fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '3px' }}>
           두 세계가 교차하는 가장 짧은 경로
          </Text>
          <Text style={{ color: colors.paint, letterSpacing: '4px', fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '10px' }}>
            ART STUDIO
          </Text>
          <Title level={3} style={{ color: '#fff', fontSize: '2rem', fontWeight: 900, marginBottom: '50px', letterSpacing: '-1px' }}>
             LOG: 01-MIN AWAY
          </Title>

          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>

            <img 
              src={images.studioView} 
              alt="Studio Miniature" 
              style={{ 
                width: '100%', 
                maxWidth: '1100px', 
                borderRadius: '2px'
              }} 
            />
          </div>

          {/* 하단 서사: 슬로건을 서사 속으로 녹여냄 */}
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left', borderTop: '1px solid #333', paddingTop: '40px' }}>
            <Paragraph style={{ fontSize: '1.05rem', color: '#ccc', lineHeight: '2.1', wordBreak: 'keep-all', fontWeight: 300 }}>
              회현역 인근, 빌딩 숲 사이로 나의 하루는 가장 밀도 있게 흐릅니다. 
              회사와 화실, 그리고 작업실. 이 세 개의 점은 단 1분의 거리 안에 있습니다. <br /><br />
              
              모니터의 열기가 채 식기도 전에 도착한 화실의 문을 열면, 비로소 나의 두 번째 삶이 시작됩니다. <br />
              낮에는 논리로 세상을 더 견고하게 짓고, 밤에는 감각으로 캔버스 더 깊은 곳에 몰입합니다.<br /><br />
              
              도심의 정적과 몰입이 교차하는 이 1분의 거리에서, 나는 소란스러웠던 하루를 뒤로하고 오직 붓끝에만 집중합니다. 
           
            </Paragraph>
          </div>
        </div>
      </section>

           
     <section style={{ marginBottom: '100px' }}>
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
             <div style={{ textAlign: 'right', marginTop: '15px', marginBottom: '15px', fontSize: '14px', color: '#888', fontStyle: 'italic' }}>
                Flora. 100F. Acrylic on canvas.
            </div>
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
            <div style={{ textAlign: 'right', marginTop: '15px', marginBottom: '15px',fontSize: '14px', color: '#888', fontStyle: 'italic' }}>
                Dawn in Val d'Aran. 100F. Acrylic on canvas.
            </div>
            <Paragraph style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.9', wordBreak: 'keep-all' }}>
              스페인 피레네 산맥의 서늘한 공기, 그 정점에서 마주한 출발선. <br />
              한계를 넘어선 몰입 직전의 고요한 긴장과 뜨거운 박동을 기록하며, 
              "나"를 찾아가는 여정의 시작을 그렸습니다.
            </Paragraph>
          </Col>

          {/* 작품 3:  */}
          <Col xs={24} md={12}>
            <div style={{ overflow: 'hidden', borderRadius: '2px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img src={images.first} alt="first" style={{ width: '100%' }} />
            </div>
            <div style={{ textAlign: 'right', marginTop: '15px', marginBottom: '15px',fontSize: '14px', color: '#888', fontStyle: 'italic' }}>
            푸른 날의 기억. 30P. Acrylic on canvas.
            </div>
            <Paragraph style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.9', wordBreak: 'keep-all' }}>
              첫 공모전 입상작. <br />
              지금의 아트페어까지 이어지는 '화가의 근성'을 처음으로 인정받았던 소중한 기록입니다.
            </Paragraph>
          </Col>

          {/* 작품 4:  */}
          <Col xs={24} md={12}>
            <div style={{ overflow: 'hidden', borderRadius: '2px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img src={images.love} alt="love" style={{ width: '100%' }} />
            </div>
            <div style={{ textAlign: 'right', marginTop: '15px', marginBottom: '15px',fontSize: '14px', color: '#888', fontStyle: 'italic' }}>
             연화(年華,蓮華). 60F. Acrylic on canvas.
            </div>
            <Paragraph style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.9', wordBreak: 'keep-all' }}>
              첫 그룹전 전시. <br /><br />
              흐르는 시간 속의 찬란한 시절(年華)과 진흙 속에서도 맑게 피어나는 꽃(蓮華)의 의미를 모두 담아 60F의 캔버스에 담았습니다. <br />  <br /> 
              앞으로 네 삶에 수놓아질 수많은 꽃봉오리들이 하나둘 아름답길 바라는 나의 간절한 기도입니다. <br />  <br /> 
              진흙 속에서도 청초하게 피어나는 연꽃(蓮華)처럼, 언제나 따스한 꽃길로 이어지기를 
            </Paragraph>
          </Col>
        </Row>
      </div>
      </section>

      {/* 5-1. 120호 섹션 (The Solitude - FULL WIDE) */}
      <section style={{ 
        width: '100vw', 
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        background: '#f9f9f9', 
        padding: '140px 0', 
        marginBottom: '150px',
        borderTop: '1px solid #eee'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px', textAlign: 'center' }}>
          
          {/* 작품 이미지 영역 */}
          <div style={{ marginBottom: '10px' }}>
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

          {/* 작품 상세 정보 (연화 섹션과 동일한 포맷) */}
          <div style={{ textAlign: 'right', maxWidth: '1100px', margin: '0 auto 50px', fontSize: '14px', color: '#888', fontStyle: 'italic' }}>
            작업중 (In Progress). 120F. Acrylic on canvas.
          </div>
          
          {/* 서사 영역 */}
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
         
            
            <Title level={2} style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, marginBottom: '45px', letterSpacing: '-1.5px', wordBreak: 'keep-all', lineHeight: 1.3 }}>
              작업중인 작품을 소개합니다.
            </Title>
            
            <Paragraph style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.9', wordBreak: 'keep-all' }}>
              "가장 큰 캔버스는 나만의 온전한 휴식을 위해 비워두었습니다." <br /><br />
              
              온기가 머물던 자리, 그 익숙한 공간에 홀로 앉아 있는 나를 그리는 시간은
              나 자신을 들여다보는 평온한 순간입니다. 
              
             
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
            {/* 더 많은 작품 보기 섹션 */}
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          <div style={{ marginBottom: '30px' }}>
            
            <Title level={2} style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-1px' }}>
              Jae-young Park
            </Title>
          </div>

          <a 
            href="https://www.instagram.com/artivefor.me" // 실제 인스타 주소로 변경하세요
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              background: '#000', 
              color: '#fff', 
              padding: '18px 40px',
              borderRadius: '2px',
              fontWeight: 800,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <InstagramOutlined style={{ fontSize: '1.4rem' }} />
            <span style={{ letterSpacing: '1px' }}>VIEW ON INSTAGRAM</span>
          </a>
          <Text style={{ fontSize: '0.9rem', color: '#999', letterSpacing: '4px', display: 'block', marginTop: '10px', marginBottom: '10px' }}>
              EXPLORE MORE WORKS
          </Text>
        </div>
      
      </div>

   </div>
    
  );
};

export default ProfileTest;
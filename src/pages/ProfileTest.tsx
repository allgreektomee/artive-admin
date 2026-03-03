import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ProfileTest: React.FC = () => {
  // 이미지 데이터 관리 (S3 URL로 교체하세요)
  const images = {
    // 1. 작품 심화 섹션용
    yellowProcess: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/yellow-process.png", 
    purpleProcess:  "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/yellow-process.png", 
    // 2. 작업실 소개용
    studioView: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png",
    // 3. 아카이브 그리드용 (기존 리스트)
    work1: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png", 
    work2: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png", 
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",
  };

  const archiveList = Object.values(images);

  return (
    <div style={{ background: '#fff', padding: '80px 0', fontFamily: "'Noto Serif KR', serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 25px' }}>
        
        {/* 1. 작가 소개 섹션 (유지) */}
        <div style={{ marginBottom: '100px' }}>
          <Text style={{ letterSpacing: '8px', fontSize: '0.8rem', color: '#999', fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>
            ARTIST PROFILE
          </Text>
          <Title level={2} style={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 800, marginBottom: '40px' }}>
            박재영 <small style={{ fontSize: '1rem', color: '#888', fontWeight: 400, marginLeft: '10px' }}>Park Jae Young</small>
          </Title>
          
          <div style={{ maxWidth: '700px' }}>
            <Paragraph style={{ fontSize: '1.15rem', lineHeight: '2', color: '#333', wordBreak: 'keep-all' }}>
              낮에는 금융 서비스를 개발하는 프로그래머로, 밤에는 감정을 기록하는 화가로 살아갑니다. <br /> <br />
              상실의 무게를 붓질로 옮기기 시작한 지 1년, <br />
              그리움은 물감이 되었고 그녀는 캔버스의 영원한 꽃이 되었습니다.
            </Paragraph>
            <Paragraph style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#666', marginTop: '30px', fontWeight: 300 }}>
              서울아트페어(SAF) 소개할 3점의 작품, <br />
              낯선 여행지에서의 고독과 작업실에서의 몰입이 담긴 기록들을 이곳에 남깁니다.
            </Paragraph>
          </div>
        </div>

        <Divider style={{ margin: '80px 0', opacity: 0.5 }} />

        {/* 2. 작품 심화 서사 */}
        <section style={{ marginBottom: '150px' }}>
          <div style={{ marginBottom: '40px' }}>
            <Text style={{ color: '#888', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>01. Yellow, Purple, Half </Text>
            <Title level={3} style={{ fontSize: '1.8rem', marginTop: '10px', fontWeight: 700 }}>Trace of Yellow</Title>
          </div>
          
          <Row gutter={[0, 40]}>
            <Col span={24}>
              <img src={images.yellowProcess} alt="Yellow Process" style={{ width: '100%', display: 'block', marginBottom: '30px' }} />
              <div style={{ maxWidth: '800px' }}>
                <Title level={4} style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>Yellow. 따스한 온기</Title>
                <Paragraph style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.9', wordBreak: 'keep-all' }}>
                  노란색은 단순히 색채가 아닌, 멈춰버린 일상을 다시 움직이게 하는 온기이며
                  가장 찬란했던 순간들을 상징하는 빛의 기억이기도 합니다. <br /><br />

                  중심에 앉아있는 남자는 그 시절의 화려한 빛이자 
                  따스한 온기 속에 머물러 있는 저의 모습입니다. <br /><br />

                  그 빛은 가장 화려했던 기억을 의미하기도 하며, 
                  동시에 듬직한 동반자들과 함께 나누었던 견고하고 따뜻한 유대의 빛이기도 합니다. <br /><br />

                  그리움을 투영하여 그려낸 나의 첫 번째 자화상이자,
                  수천 번의 붓질을 통해 과거의 찬란함과 현재의 나를 잇는 정직한 기록입니다. <br /><br />

                  그 화려했던 노란 빛은 이제 캔버스 위에서 새로운 생명으로 흐르기 시작합니다. <br /><br />      

                </Paragraph>
              </div>
            </Col>
          </Row>
        </section>

        <section style={{ marginBottom: '150px' }}>
          <div style={{ marginBottom: '40px' }}>
            <Title level={3} style={{ fontSize: '1.8rem', marginTop: '10px', fontWeight: 700 }}>Shadow of Purple</Title>
          </div>
          
          <Row gutter={[0, 40]}>
            <Col span={24}>
              {/* 카페에서의 순간이나 퍼플 작품 이미지 S3 URL */}
              <img src={images.purpleProcess} alt="Purple Process" style={{ width: '100%', display: 'block', marginBottom: '30px' }} />
              <div style={{ maxWidth: '800px' }}>
                <Title level={4} style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>Purple. 고요한 흔적</Title>
               <Paragraph style={{ fontSize: '1.1rem', color: '#444', lineHeight: '2', wordBreak: 'keep-all' }}>
                보라색으로 물든 카페의 구석 자리는 소란스러운 하루를 마무리하는 나만의 공간이며
                함께했던 기억이 머무는 마지막 장소였습니다. <br /><br />

                창 너머 쉼 없이 흐르는 사람들의 물결은 무채색의 소음으로 흩어지고,
                오직 이 공간을 가득 채운 보라색 잔상만이 나를 깊게 감싸 안았습니다. <br /><br />

                때로는 책을 읽고, 때로는 술 한 잔의 온기에 기대어 얻은 평온함을 
                캔버스 위 짙은 퍼플의 층으로 겹겹이 쌓여갔습니다. <br /><br />

                나에게 보라색은 온 마음을 다해 머물고 싶은 고요한 흔적입니다. <br /><br />

                </Paragraph>
              </div>
            </Col>
          </Row>
        </section>
        {/* 3. 작업실 소개 */}
        <section style={{ marginBottom: '150px' }}>
          <div style={{ marginBottom: '40px' }}>
            <Text style={{ color: '#888', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>02. THE ATELIER</Text>
            <Title level={3} style={{ fontSize: '1.8rem', marginTop: '10px', fontWeight: 700 }}>사유의 공간</Title>
          </div>
          <Row gutter={[40, 40]} align="middle">
            <Col xs={24} md={14}>
              <img src={images.studioView} alt="Studio" style={{ width: '100%', display: 'block' }} />
            </Col>
            <Col xs={24} md={10}>
              <Paragraph style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.9', wordBreak: 'keep-all' }}>
                밤이 깊어지면 작업실은 오직 캔버스와 나만이 존재하는 정적이 흐릅니다. <br /><br />
                이곳에서 120호, 100호 대작과 60호 연작들이 탄생했습니다. 
                물감 냄새 섞인 공기 속에서 시스템 설계자가 아닌 한 사람의 인간으로서 스스로를 마주하며, 
                지난 1년의 시간을 캔버스 위에 층층이 쌓아 올렸습니다.
              </Paragraph>
            </Col>
          </Row>
        </section>

        {/* 4. 에필로그 아카이브 섹션 (Gritty Grid) */}
        <div style={{ marginTop: '120px' }}>
          <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <Text style={{ letterSpacing: '4px', fontSize: '0.85rem', color: '#000', fontWeight: 'bold' }}>
              03. THE DENSITY OF TIME (ARCHIVE)
            </Text>
          </div>
          
          <div style={{ lineHeight: 0 }}> 
            <Row gutter={[4, 4]}> 
              {archiveList.map((url, index) => (
                <Col key={index} xs={12} sm={8} md={6}>
                  <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#f9f9f9' }}>
                    <img 
                      src={url} 
                      alt={`archive-${index}`}
                      style={{ 
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'grayscale(15%) contrast(1.05)', transition: 'all 0.4s ease'
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

        {/* 5. 하단 저작권 정보 */}
        <div style={{ marginTop: '100px', textAlign: 'center', paddingTop: '40px' }}>
          <Text style={{ fontSize: '0.8rem', letterSpacing: '5px', color: '#ccc', fontWeight: 'bold' }}>
            PARK JAE YOUNG 
          </Text>
        </div>

      </div>
    </div>
  );
};

export default ProfileTest;
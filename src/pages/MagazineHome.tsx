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
    work3: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",
    yellowProcess: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png", // 실제 노란 작품 이미지
    purpleProcess: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png"  // 실제 보라 작품 이미지
  };

  // 공통 레이아웃 스타일
  const sectionStyle = { padding: '80px 0', width: '100%' };
  const containerStyle = { maxWidth: '1100px', margin: '0 auto', padding: '0 25px' };
  const textContentStyle = { maxWidth: '850px' }; // 서사 텍스트 가독성을 위한 너비

  return (
    <div style={{ background: '#fff', color: '#000', fontFamily: "'Noto Serif KR', serif", overflowX: 'hidden' }}>
      
      {/* 1. HERO 섹션 */}
      <section style={{ 
        height: '85vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 15px',
        width: '100%',
      }}>
        <Text style={{ letterSpacing: '6px', fontSize: '0.85rem', marginBottom: '20px', fontWeight: 'bold', color: '#999' }}>
          JUST ART 2026
        </Text>
        <Title level={1} style={{ 
          fontFamily: "'Helvetica Neue', Arial, sans-serif", 
          fontSize: 'clamp(3.5rem, 15vw, 8rem)',
          fontWeight: 900, 
          lineHeight: 0.85, 
          margin: '0 0 30px 0',
          letterSpacing: '-6px',
          color: '#000',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          Farewell
        </Title>
       
        <div style={{ marginTop: '20px' }}>
          <Paragraph style={{ 
            fontSize: '1.1rem', 
            fontWeight: 400, 
            lineHeight: 2, 
            color: '#555',
            wordBreak: 'keep-all'
          }}>
            그리움은 물감이 되고,<br />
            그녀는 캔버스의 아름다운 꽃이 되었습니다.
          </Paragraph>
        </div>
      </section>

      {/* 2. GALLERY 섹션: 메인 작품 3점 */}
      <section style={{ padding: '0 0 150px 0' }}>
        <div style={containerStyle}>
          <Row gutter={[0, 100]} justify="center">
            
            {/* 작품 1: Yellow */}
            <Col span={24}>
              <img src={images.work1} alt="작별의 시작" style={{ width: '100%', display: 'block' }} />
              <div style={{ textAlign: 'right', marginTop: '15px', fontSize: '12px', color: '#888', fontStyle: 'italic' }}>
                Trace of Yellow. 60P. Acrylic on canvas.
              </div>
              <div style={{ marginTop: '40px', ...textContentStyle }}>
                <Title level={2} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}>
                  그리움은 물감이 되고
                </Title>
                <Paragraph style={{ fontSize: '1.1rem', color: '#444', lineHeight: '1.9', wordBreak: 'keep-all' }}>
                  쏟아진 슬픔을 주워 담는 대신 붓을 들었습니다.<br />
                  캔버스에 채워 넣은 색채들은 멈춰버린 일상을 다시 움직이게 하였습니다. 
                </Paragraph>
              </div>
            </Col>

            {/* 작품 2: Purple */}
            <Col span={24}>
              <img src={images.work2} alt="기억의 공간" style={{ width: '100%', display: 'block' }} />
              <div style={{ textAlign: 'right', marginTop: '15px', fontSize: '12px', color: '#888', fontStyle: 'italic' }}>
                Shadow of Purple. 60P. Acrylic on canvas.
              </div>
              <div style={{ marginTop: '40px', ...textContentStyle }}>
                <Title level={2} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}>
                  그녀는 캔버스의 아름다운
                </Title>
                <Paragraph style={{ fontSize: '1.1rem', color: '#444', lineHeight: '1.9', wordBreak: 'keep-all' }}>
                  익숙한 공간의 공기를 붓질로 층층이 쌓아,<br />
                  보라색 잔상 속에 스며있는 그녀의 흔적을 찾아가는 시간입니다.
                </Paragraph>
              </div>
            </Col>

            {/* 작품 3: Still Half */}
            <Col span={24}>
              <img src={images.work3} alt="극복의 꽃" style={{ width: '100%', display: 'block' }} />
              <div style={{ textAlign: 'right', marginTop: '15px', fontSize: '12px', color: '#888', fontStyle: 'italic' }}>
                Still Half. 60P. Acrylic on canvas.
              </div>
              <div style={{ marginTop: '40px', ...textContentStyle }}>
                <Title level={2} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}>
                  꽃이 되었습니다.
                </Title>
                <Paragraph style={{ fontSize: '1.1rem', color: '#444', lineHeight: '1.9', wordBreak: 'keep-all' }}>
                  시들지 않는 그리움으로 그려낸 마지막 작별 인사.<br />
                  이제 당신은 캔버스 위에서 영원히 시들지 않는 안식이 되었습니다. 잘 가요.
                </Paragraph>
              </div>
            </Col>

          </Row>
        </div>
      </section>

      {/* 3. 작품 심화 서사 섹션 */}
      <section style={{ ...sectionStyle, background: '#fafafa', borderTop: '1px solid #eee' }}>
        <div style={containerStyle}>
          
          {/* 작가 프로필 */}
          <div style={{ marginBottom: '80px', ...textContentStyle }}>
            <Text style={{ letterSpacing: '8px', fontSize: '0.8rem', color: '#999', fontWeight: 'bold', display: 'block', marginBottom: '25px' }}>
              ARTIST PROFILE
            </Text>
            <Title level={2} style={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 800, marginBottom: '40px' }}>
              박재영 <small style={{ fontSize: '1rem', color: '#888', fontWeight: 400, marginLeft: '10px' }}>Park Jae Young</small>
            </Title>
            <Paragraph style={{ fontSize: '1.2rem', lineHeight: '2.2', color: '#333', wordBreak: 'keep-all' }}>
              낮에는 금융 서비스를 개발하는 프로그래머로, 밤에는 감정을 기록하는 화가로 살아갑니다. <br /><br />
              상실의 무게를 붓질로 옮기기 시작한 지 1년, <br />
              그리움은 물감이 되었고 그녀는 캔버스의 영원한 꽃이 되었습니다.
            </Paragraph>
            <Text style={{ fontSize: '1rem', color: '#777', marginTop: '30px', display: 'block' }}>
              서울아트페어(SAF)에 소개할 세 점의 작품과 작업실의 기록을 이곳에 남깁니다.
            </Text>
          </div>

          {/* 01. Yellow 상세 */}
          <div style={{ marginBottom: '180px' }}>
            <div style={{ marginBottom: '40px' }}>
              <Text style={{ color: '#888', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>01. TRACE OF YELLOW</Text>
              <Title level={3} style={{ fontSize: '2rem', marginTop: '10px', fontWeight: 700 }}>Yellow. 따스한 온기</Title>
            </div>
            <img src={images.yellowProcess} alt="Yellow Process" style={{ width: '100%', marginBottom: '50px' }} />
            <div style={textContentStyle}>
              <Paragraph style={{ fontSize: '1.1rem', color: '#444', lineHeight: '2', wordBreak: 'keep-all' }}>
                노란색은 단순히 색채가 아닌, 멈춰버린 일상을 다시 움직이게 하는 온기이며 <br />
                가장 찬란했던 순간들을 상징하는 빛의 기억이기도 합니다. <br /><br />
                중심에 앉아있는 남자는 그 시절의 화려한 빛이자 따스한 온기 속에 머물러 있는 저의 모습입니다. <br /><br />
                그 빛은 가장 화려했던 기억을 의미하기도 하며, 동시에 듬직한 동반자들과 함께 나누었던 견고하고 따뜻한 유대의 빛이기도 합니다. <br /><br />
                그리움을 투영하여 그려낸 나의 첫 번째 자화상이자, 수만 번의 붓질을 통해 과거의 찬란함과 현재의 나를 잇는 정직한 기록입니다. <br /><br />
                그 화려했던 노란 빛은 이제 캔버스 위에서 새로운 생명으로 흐르기 시작합니다.
              </Paragraph>
            </div>
          </div>

          {/* 02. Purple 상세 */}
          <div style={{ marginBottom: '180px' }}>
            <div style={{ marginBottom: '40px' }}>
              <Text style={{ color: '#888', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>02. SHADOW OF PURPLE</Text>
              <Title level={3} style={{ fontSize: '2rem', marginTop: '10px', fontWeight: 700 }}>Purple. 고요한 흔적</Title>
            </div>
            <img src={images.purpleProcess} alt="Purple Process" style={{ width: '100%', marginBottom: '50px' }} />
            <div style={textContentStyle}>
              <Paragraph style={{ fontSize: '1.1rem', color: '#444', lineHeight: '2', wordBreak: 'keep-all' }}>
                보라색으로 물든 카페의 구석 자리는 소란스러운 하루를 마무리하는 나만의 공간이며, <br />
                함께했던 기억이 머무는 마지막 장소였습니다. <br /><br />
                창 너머 쉼 없이 흐르는 사람들의 물결은 무채색의 소음으로 흩어지고, <br />
                오직 이 공간을 가득 채운 보라색 잔상만이 나를 깊게 감싸 안았습니다. <br /><br />
                때로는 책을 읽고, 때로는 술 한 잔의 온기에 기대어 얻은 평온함을 <br />
                캔버스 위 짙은 퍼플의 층으로 겹겹이 쌓아 올렸습니다. <br /><br />
                나에게 보라색은 온 마음을 다해 머물고 싶은 고요한 흔적입니다.
              </Paragraph>
            </div>
          </div>

          {/* 03. Still Half 상세 */}
          <div style={{ marginBottom: '100px' }}>
            <div style={{ marginBottom: '40px' }}>
              <Text style={{ color: '#888', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>03. STILL HALF</Text>
              <Title level={3} style={{ fontSize: '2rem', marginTop: '10px', fontWeight: 700 }}>Half. 아름다웠던 꽃 </Title>
            </div>
            <img src={images.work3} alt="Still Half" style={{ width: '100%', marginBottom: '50px' }} />
            <div style={textContentStyle}>
              <Paragraph style={{ fontSize: '1.1rem', color: '#444', lineHeight: '2', wordBreak: 'keep-all' }}>
                남겨진 그대로를 인정하며 마주하는 과정입니다. <br />
                반쯤 비어있는 캔버스는 다시 채워나가야 할 새로운 공간이기도 합니다. <br /><br />
                시들지 않는 그리움으로 그려낸 이 마지막 작별 인사는
                이제 당신을 캔버스 위 영원한 안식으로 피워내고, 
                나는 남겨진 절반의 삶을 비로소 묵묵히 걸어가려 합니다. <br /><br />
              </Paragraph>
            </div>
          </div>

        </div>
      </section>

      {/* 4. 에필로그 버튼 섹션 */}
      <section style={{ padding: '150px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Paragraph style={{ fontSize: '1.05rem', color: '#666', marginBottom: '40px', fontWeight: 300 }}>
            슬픔을 건너온 한 남자가 전하는 <br /> 마지막 작별 인사.
          </Paragraph>

          <div 
            onClick={() => navigate('/profile')}
            style={{ 
              border: '2.5px solid #000', 
              padding: '60px 20px', 
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: '#fff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)' 
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
            <Text style={{ display: 'block', letterSpacing: '8px', fontSize: '2.2rem', fontWeight: 900, marginBottom: '15px', color: 'inherit' }}>
              EPILOGUE
            </Text>
            <Title level={4} style={{ fontSize: '1rem', fontWeight: 500, margin: 0, color: 'inherit', opacity: 0.8, fontFamily: 'serif' }}>
              낮에는 직장인으로, 밤에는 화가로.<br />
              작업실 소개 및 다른 작품 보기
            </Title>
            <div style={{ marginTop: '30px', fontSize: '1.2rem', color: 'inherit' }}>
              <ArrowRightOutlined />
            </div>
          </div>

          <Text style={{ display: 'block', marginTop: '50px', fontSize: '0.85rem', letterSpacing: '6px', color: '#ccc', fontWeight: 'bold' }}>
            PARK JAE YOUNG
          </Text>
        </div>
      </section>
      
      {/* 5. 푸터 */}
      <footer style={{ width: '100%', padding: '60px 20px', background: '#000', color: '#fff', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px' }}>
          <Title level={3} style={{ color: '#fff', fontWeight: 800, marginBottom: '15px', fontSize: '1.3rem', letterSpacing: '1px' }}>
            서울아트페어 (SAF)
          </Title>
          <Space direction="vertical" size={2} style={{ fontSize: '1.5rem', opacity: 0.7 }}>
            <Text style={{ color: '#fff' }}>양재동 세텍(SETEC)</Text>
            <Text style={{ color: '#fff' }}>2026. 05. 14 — 05. 17</Text>
          </Space>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginBottom: '20px' }}>
          <Button type="link" href={snsLinks.instagram} target="_blank" style={{ color: '#fff', height: 'auto', padding: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <InstagramOutlined style={{ fontSize: '2.2rem' }} />
              <span style={{ fontSize: '0.8rem', marginTop: '10px', fontWeight: 300 }}>Instagram</span>
            </div>
          </Button>
          <Button type="link" href={snsLinks.youtube} target="_blank" style={{ color: '#fff', height: 'auto', padding: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <YoutubeOutlined style={{ fontSize: '2.2rem' }} />
              <span style={{ fontSize: '0.8rem', marginTop: '10px', fontWeight: 300 }}>Youtube</span>
            </div>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default MagazineHome;
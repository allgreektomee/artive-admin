import React, { useEffect, useState } from "react";
import { Typography, Divider, Modal, Spin, Button } from "antd";
import { Helmet } from "react-helmet-async";
import { 
  CloseOutlined, 
  ZoomInOutlined, 
  InstagramOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;

const SewHaJungArchive: React.FC = () => {

  // 1. 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtId, setSelectedArtId] = useState<number | null>(null);
  const [isOriginalLoading, setIsOriginalLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. S3 경로 데이터
  const baseS3Url = "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/jsh/sewha/";
  const artworks = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    thumbUrl: `${baseS3Url}s${i + 1}.jpg`,
    originalUrl: `${baseS3Url}${i + 1}.jpeg`, 
    title: `Sewha Jung - Landscape of Memory #${String(i + 1).padStart(2, '0')}`,
    medium: "Acrylic on canvas.",
    size: i % 2 === 0 ? "60호" : "120호"
  }));

  const openModal = (id: number) => {
    setSelectedArtId(id);
    setIsModalOpen(true);
    setIsOriginalLoading(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtId(null);
  };

  const currentArt = artworks.find(art => art.id === selectedArtId);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Noto Serif KR', serif", overflowX: 'hidden' }}>
      <Helmet>
        {/* 모바일 핏을 위한 핵심 뷰포트 설정 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        <title>Sewha Jung | Hong Kong Affordable Art Fair 2026</title>
        <meta property="og:title" content="Sewha Jung - Artist Portfolio" />
        <meta property="og:description" content="HONG KONG - AFFORDABLE ART FAIR 2026" />
        <meta property="og:image" content={`${baseS3Url}1.jpeg`} />
        <meta property="og:url" content="https://www.artivefor.me/sewhajung" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* 좌우 패딩을 모바일 20px / 데스크탑 40px로 가변 조절 */}
      <main style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px) 100px" }}>
        <header style={{ 
          // 상하 여백을 모바일에서는 120px, 데스크탑에서는 180px로 조절
          padding: "clamp(120px, 15vh, 180px) 0 clamp(100px, 10vh, 160px)", 
          textAlign: "center",
          backgroundColor: "#fff"
        }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            
            {/* 1. 상단 미니멀 문구 */}
            <Text style={{ 
              letterSpacing: "8px", // 모바일 가독성 고려 자간 축소
              color: "#aaa", 
              fontSize: "0.75rem", 
              fontWeight: 400,
              display: "block", 
              marginBottom: "30px", 
              fontFamily: "'Noto Serif KR', serif", 
              textTransform: "uppercase" 
            }}>
              Art forest 2026
            </Text>
            
            {/* 2. 주 제목: 작가명 */}
            <Title level={1} style={{ 
              fontFamily: "'Helvetica Neue', Arial, sans-serif", 
              // 폰트 크기를 화면 폭에 맞춰 최적화 (모바일 2.8rem ~ 데스크탑 6.5rem)
              fontSize: "clamp(2.8rem, 15vw, 6.5rem)", 
              fontWeight: 900, 
              letterSpacing: "-2px", 
              margin: "0 0 30px 0",
              color: "#000",
              lineHeight: 1
            }}>
              Sewha Jung
            </Title>
            
            {/* 3. 하단 페어 문구 */}
            <div style={{ marginTop: "10px" }}>
              <Text style={{ 
                display: "block",
                fontSize: "1rem", 
                letterSpacing: "3px",
                color: "#666", 
                fontFamily: "'Noto Serif KR', serif",
                textTransform: "uppercase",
                marginBottom: "5px"
              }}>
                Hong Kong
              </Text>
              <Text style={{ 
                display: "block",
                fontSize: "1rem", 
                letterSpacing: "3px",
                color: "#666", 
                fontFamily: "'Noto Serif KR', serif",
                textTransform: "uppercase"
              }}>
                Affordable Art Fair
              </Text>
            </div>
          </div>
        </header>
        
        {/* 작품 소개 (Headline) */}
        <div style={{
          maxWidth: "700px",
          margin: "100px auto",
          textAlign: "center",
          padding: "0 20px"
        }}>
          {/* 작품 소개 (Headline) */}
          <h2 style={{
            fontSize: "14px",
            letterSpacing: "4px",
            color: "#333",
            marginBottom: "40px",
            fontWeight: 700,
            textTransform: "uppercase"
          }}>
            Landscape of Memory
          </h2>

          {/* 본문 (Statement) */}
          <div style={{
            fontSize: "16px",
            lineHeight: "2",
            color: "#444",
            wordBreak: "keep-all",
            fontFamily: "'Noto Serif KR', serif", // 세리프체 권장
            fontWeight: 300
          }}>
            <p style={{ marginBottom: "20px" }}>
              나는 자유롭고 감각적인 붓질 속에서 끊임없이 혼돈을 마주한다. <br />
              화면은 소용돌이와 같은 선과 색으로 가득하지만, 그 안에서 나는 질서를 찾으려 한다.
            </p>
            <p>
              질서가 지나치면 자유가 사라지고, 자유만 넘치면 공허한 메아리만 남는다. <br />
              나의 회화는 이 모순의 경계 위에서 이루어진다.
            </p>
            {/* 중간 구분선 */}
            <div style={{ width: "20px", height: "1px", backgroundColor: "#ccc", margin: "40px auto" }}></div>
            <p style={{ fontSize: "15px", color: "#666" }}>
              혼돈과 질서가 서로 부딪히며 잠시 균형을 이룰 때, <br />
              화면은 살아 있는 긴장을 갖는다. 나는 그 순간을 포착하려 한다. <br />
              그것은 시대가 품은 복잡성과 닮아 있는 감각적 언어다.
            </p>
          </div>
        </div>

        {/* 그리드 리스트: CSS 클래스로 모바일 1열 / 데스크탑 가변열 처리 */}
        <div className="artwork-grid">
          {artworks.map((art) => (
            <article key={art.id} style={{ cursor: "pointer" }} onClick={() => openModal(art.id)}>
              <div style={{ backgroundColor: "#f9f9f9", overflow: "hidden", position: 'relative' }}>
                <img src={art.thumbUrl} alt={art.title} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                <div className="hover-overlay" style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'rgba(0,0,0,0.15)', opacity: 0, transition: 'opacity 0.3s ease',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '2rem'
                }}>
                  <ZoomInOutlined />
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Text style={{ color: "#ddd", fontSize: "0.65rem" }}>No. {String(art.id).padStart(2, '0')}</Text>
                <Title level={4} style={{ margin: "3px 0 8px", fontSize: "1.1rem", fontWeight: 700 }}>{art.title}</Title>
                <Text style={{ fontSize: "0.8rem", color: "#888" }}>{art.medium} | {art.size}</Text>
              </div>
            </article>
          ))}
        </div>

        <Divider style={{ marginTop: "100px", opacity: 0.1 }} />

        {/* 푸터 영역 */}
        <footer style={{ textAlign: "center", paddingBottom: "40px" }}>
          <div style={{ marginBottom: "30px" }}>
            <Button 
              type="link" 
              href="https://www.instagram.com/sewhajung/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#000", height: "auto", padding: "10px" }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <InstagramOutlined style={{ fontSize: "1.8rem" }} />
                <Text style={{ fontSize: "0.7rem", letterSpacing: "1.5px", fontWeight: 600 }}>FOLLOW ON INSTAGRAM</Text>
              </div>
            </Button>
          </div>
          <Text style={{ letterSpacing: "3px", color: "#ddd", fontSize: "0.6rem", fontWeight: 'bold' }}>
            © 2026 Sewha JUNG .
          </Text>
        </footer>
      </main>

      {/* 원본 팝업 모달 */}
      <Modal
        open={isModalOpen} onCancel={closeModal} footer={null} centered width="100%" className="art-original-modal"
        closeIcon={<CloseOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />}
        styles={{
          mask: { backdropFilter: "blur(5px)", background: "rgba(0,0,0,0.8)" },
          body: { padding: 0, background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }
        }}    
      >
        {currentArt && (
          <div style={{ position: 'relative' }}>
            {isOriginalLoading && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                <Spin size="large" tip="Loading..." />
              </div>
            )}
            <img 
              src={currentArt.originalUrl} alt={currentArt.title}
              style={{ maxWidth: "95vw", maxHeight: "90vh", height: "auto", display: "block", border: '2px solid #fff', opacity: isOriginalLoading ? 0.3 : 1 }} 
              onLoad={() => setIsOriginalLoading(false)}
            />
            {!isOriginalLoading && (
              <div style={{ position: 'absolute', bottom: '-60px', left: 0, width: '100%', textAlign: 'center', color: '#fff' }}>
                <Title level={4} style={{ color: '#fff', margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{currentArt.title}</Title>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* 전역 스타일: 모바일 / 데스크탑 분기 처리 */}
      <style>{`
        /* 1. 모바일 (기본): 1열 배치 / 좁은 간격 */
        .artwork-grid {
          display: grid;
          grid-template-columns: 1fr; 
          gap: 60px 0;
        }

        /* 2. 데스크탑 (768px 이상): 가변열 배치 / 넓은 간격 */
        @media (min-width: 768px) {
          .artwork-grid {
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 80px 40px;
          }
        }

        article:hover .hover-overlay { opacity: 1 !important; }
        .art-original-modal .ant-modal-content { background: transparent !important; box-shadow: none !important; padding: 0 !important; }
        .art-original-modal .ant-modal-close { top: -40px; right: 0px; }
      `}</style>
    </div>
  );
};

export default SewHaJungArchive;
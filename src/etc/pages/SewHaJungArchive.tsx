import React, { useEffect, useState } from "react";
import { Typography, Divider, Modal, Spin, Button } from "antd";
import { Helmet } from "react-helmet-async";
import { 
  CloseOutlined, 
  ZoomInOutlined, 
  InstagramOutlined 
} from "@ant-design/icons";


const { Title, Text, Paragraph } = Typography;

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
    title: `Sew Ha Jung Archive #${String(i + 1).padStart(2, '0')}`,
    medium: "Oil on Canvas",
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
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Noto Serif KR', serif" }}>
      <Helmet>
        <title>Sew Ha Jung | Hong Kong Affordable Art Fair 2026</title>
        <meta property="og:description" content="HONG KONG - AFFORDABLE ART FAIR 2026" />
        <meta property="og:image" content={`${baseS3Url}1.jpeg`} />
      </Helmet>

    

      <main style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 40px 100px" }}>
        <header style={{ padding: "120px 0 100px", textAlign: "center" }}>
          <Text style={{ letterSpacing: "10px", color: "#ccc", display: "block", marginBottom: "20px" }}>Art forest 2026</Text>
          <Title level={1} style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", fontWeight: 900, letterSpacing: "-3px", margin: 0 }}>
            Sew Ha Jung 
          </Title>
          <Paragraph style={{ color: "#888", fontSize: "1.1rem", marginTop: "20px" }}>
            HONG KONG 
            <br />
            AFFORDABLE ART FAIR 
          </Paragraph>
        </header>

        {/* 그리드 리스트 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "80px 40px", alignItems: "start" }}>
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
              <div style={{ marginTop: "25px" }}>
                <Text style={{ color: "#ddd", fontSize: "0.7rem" }}>No. {String(art.id).padStart(2, '0')}</Text>
                <Title level={4} style={{ margin: "5px 0 10px", fontSize: "1.2rem", fontWeight: 700 }}>{art.title}</Title>
                <Text style={{ fontSize: "0.85rem", color: "#777" }}>{art.medium} | {art.size}</Text>
              </div>
            </article>
          ))}
        </div>

        <Divider style={{ marginTop: "150px", opacity: 0.1 }} />

        {/* 푸터 영역: 인스타그램 링크 추가 */}
        <footer style={{ textAlign: "center", paddingBottom: "40px" }}>
          <div style={{ marginBottom: "30px" }}>
            <Button 
              type="link" 
              href="https://www.instagram.com/sewhajung/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#000", height: "auto", padding: "10px 20px" }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <InstagramOutlined style={{ fontSize: "2rem" }} />
                <Text style={{ fontSize: "0.75rem", letterSpacing: "2px", fontWeight: 600 }}>FOLLOW ON INSTAGRAM</Text>
              </div>
            </Button>
          </div>
          <Text style={{ letterSpacing: "5px", color: "#ddd", fontSize: "0.7rem", fontWeight: 'bold' }}>
            © 2026 SEW HA JUNG AT ARTIVE.
          </Text>
        </footer>
      </main>

      {/* 원본 팝업 모달 */}
      <Modal
        open={isModalOpen} onCancel={closeModal} footer={null} centered width="auto" className="art-original-modal"
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
                <Spin size="large" tip="Loading original..." />
              </div>
            )}
            <img 
              src={currentArt.originalUrl} alt={currentArt.title}
              style={{ maxWidth: "90vw", maxHeight: "90vh", height: "auto", display: "block", border: '4px solid #fff', opacity: isOriginalLoading ? 0.3 : 1 }} 
              onLoad={() => setIsOriginalLoading(false)}
            />
            {!isOriginalLoading && (
              <div style={{ position: 'absolute', bottom: '-70px', left: 0, width: '100%', textAlign: 'center', color: '#fff' }}>
                <Title level={4} style={{ color: '#fff', margin: 0 }}>{currentArt.title}</Title>
              </div>
            )}
          </div>
        )}
      </Modal>

      <style>{`
        article:hover .hover-overlay { opacity: 1 !important; }
        .art-original-modal .ant-modal-content { background: transparent !important; box-shadow: none !important; padding: 0 !important; }
        .art-original-modal .ant-modal-close { top: -40px; right: -10px; }
      `}</style>
    </div>
  );
};

export default SewHaJungArchive;
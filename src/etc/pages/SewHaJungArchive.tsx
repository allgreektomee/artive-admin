import React, { useEffect, useState } from "react";
import { Typography, Divider, Modal, Spin } from "antd";
import { Helmet } from "react-helmet-async";
import { ArrowLeftOutlined, CloseOutlined, ZoomInOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const SewHaJungArchive: React.FC = () => {
  const navigate = useNavigate();

  // 1. 상태 관리: 모달 열림 여부, 현재 선택된 이미지 ID, 원본 로딩 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtId, setSelectedArtId] = useState<number | null>(null);
  const [isOriginalLoading, setIsOriginalLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. S3 경로 및 데이터 생성 (11개)
  const baseS3Url = "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/jsh/sewha/";
  
  const artworks = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    // 리스트용 압축 썸네일 (앞에 s 붙임)
    thumbUrl: `${baseS3Url}s${i + 1}.jpeg`,
    // 팝업용 고화질 원본
    originalUrl: `${baseS3Url}${i + 1}.jpeg`,
    title: `Sew Ha Jung Archive #${String(i + 1).padStart(2, '0')}`,
    medium: "Oil on Canvas",
    size: i % 2 === 0 ? "60호" : "120호"
  }));

  // 3. 모달 제어 함수
  const openModal = (id: number) => {
    setSelectedArtId(id);
    setIsModalOpen(true);
    setIsOriginalLoading(true); // 모달 열릴 때 로딩 시작
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtId(null);
  };

  // 현재 선택된 작품 데이터 가져오기
  const currentArt = artworks.find(art => art.id === selectedArtId);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Noto Serif KR', serif" }}>
<Helmet>
  {/* 카카오톡/페이스북 공유용 */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Sew Ha Jung - Artist Portfolio" />
  <meta property="og:description" content="HONG KONG - AFFORDABLE ART FAIR 2026" />
  <meta property="og:image" content="https://artive-uploads.s3.ap-southeast-2.amazonaws.com/jsh/sewha/1.jpeg" />
  <meta property="og:url" content="https://artivefor.me/sewhajung" />

  {/* 트위터 공유용 */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Sew Ha Jung | HONG KONG - AFFORDABLE ART FAIR 2026" />
  <meta name="twitter:image" content="https://artive-uploads.s3.ap-southeast-2.amazonaws.com/jsh/sewha/1.jpeg" />
</Helmet>

      {/* 상단 바 (Sticky) */}
      <nav style={{ 
        padding: "25px 40px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        position: "sticky", 
        top: 0, 
        background: "rgba(255,255,255,0.95)", 
        zIndex: 100, 
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #f0f0f0"
      }}>
        <div onClick={() => navigate(-1)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
          <ArrowLeftOutlined style={{ fontSize: "1rem" }} /> <Text style={{ fontSize: "0.85rem", letterSpacing: "1px", fontWeight: 500 }}>EXIT</Text>
        </div>
        <Title level={4} style={{ margin: 0, letterSpacing: "4px", fontSize: "1.1rem", fontWeight: 700 }}>SEW HA JUNG</Title>
      </nav>

      <main style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 40px 100px" }}>
        <header style={{ padding: "120px 0 100px", textAlign: "center" }}>
          <Text style={{ letterSpacing: "10px", color: "#ccc", display: "block", marginBottom: "20px" }}>ARCHIVE 2026</Text>
          <Title level={1} style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", fontWeight: 900, letterSpacing: "-3px", margin: 0 }}>
            Masterpieces
          </Title>
          <Paragraph style={{ color: "#888", fontSize: "1.1rem", marginTop: "20px" }}>
            Sew Ha Jung 작가님의 시선이 머문 11가지 기록 (Click to enlarge)
          </Paragraph>
        </header>

        {/* 11개 이미지 그리드 (썸네일 리스트) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: "80px 40px",
          alignItems: "start"
        }}>
          {artworks.map((art) => (
            <article key={art.id} style={{ cursor: "pointer" }} onClick={() => openModal(art.id)}>
              <div style={{ backgroundColor: "#f9f9f9", overflow: "hidden", position: 'relative' }}>
                <img 
                  src={art.thumbUrl} // 압축된 썸네일 사용
                  alt={`${art.title} - Sew Ha Jung`}
                  loading="lazy"      // 초기 로딩 성능 최적화
                  decoding="async"    
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    display: "block",
                    transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)" 
                  }}
                />
                {/* 호버 시 줌 아이콘 표시 */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'rgba(0,0,0,0.2)', opacity: 0, transition: 'opacity 0.3s ease',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '2rem'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = "1"}
                onMouseOut={(e) => e.currentTarget.style.opacity = "0"}
                >
                  <ZoomInOutlined />
                </div>
              </div>
              <div style={{ marginTop: "25px", textAlign: 'left' }}>
                <Text style={{ color: "#ddd", fontSize: "0.7rem", letterSpacing: '1px' }}>No. {String(art.id).padStart(2, '0')}</Text>
                <Title level={4} style={{ margin: "5px 0 10px", fontSize: "1.2rem", fontWeight: 700 }}>{art.title}</Title>
                <Text style={{ fontSize: "0.85rem", color: "#777" }}>{art.medium} | {art.size}</Text>
              </div>
            </article>
          ))}
        </div>

        <Divider style={{ marginTop: "180px", opacity: 0.1 }} />
        <footer style={{ textAlign: "center", color: "#ddd", letterSpacing: "5px", fontSize: "0.75rem", fontWeight: 'bold' }}>
          © 2026 SEW HA JUNG AT ARTIVE.
        </footer>
      </main>

      {/* 4. 원본 이미지 팝업 모달 (라이트박스) */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null} // 하단 버튼 제거
        centered // 중앙 정렬
        width="auto" // 이미지 크기에 맞춤
        className="art-original-modal"
        closeIcon={<CloseOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />} // 흰색 닫기 아이콘
        styles={{
          mask: { backdropFilter: "blur(5px)", background: "rgba(0,0,0,0.8)" }, // 배경 흐리게
          content: { background: 'transparent', padding: 0, boxShadow: 'none' }, // 모달 배경 투명
          body: { padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }
        }}
      >
        {currentArt && (
          <div style={{ position: 'relative' }}>
            {/* 원본 로딩 중 스피너 표시 */}
            {isOriginalLoading && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                <Spin size="large" tip="Loading original..." />
              </div>
            )}
            <img 
              src={currentArt.originalUrl} // 고화질 원본 사용
              alt={`${currentArt.title} Original - Sew Ha Jung`}
              style={{ 
                maxWidth: "90vw", // 화면 너비의 90% 제한
                maxHeight: "90vh", // 화면 높이의 90% 제한
                height: "auto", 
                display: "block",
                border: '4px solid #fff', // 흰색 테두리로 작품 강조
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                opacity: isOriginalLoading ? 0.3 : 1, // 로딩 중에는 반투명
                transition: 'opacity 0.3s ease'
              }} 
              onLoad={() => setIsOriginalLoading(false)} // 로딩 완료 시 스피너 제거
            />
            
            {/* 팝업 하단 작품 정보 */}
            {!isOriginalLoading && (
              <div style={{ position: 'absolute', bottom: '-70px', left: 0, width: '100%', textAlign: 'center', color: '#fff' }}>
                <Title level={4} style={{ color: '#fff', margin: 0, fontSize: '1.3rem' }}>{currentArt.title}</Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>{currentArt.medium}, {currentArt.size}</Text>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* 모달 스타일 커스텀 CSS (antd 기본 스타일 재정의) */}
      <style>{`
        .art-original-modal .ant-modal-close {
          top: -40px; /* 닫기 버튼 위치 조정 */
          right: -10px;
        }
        @media (max-width: 768px) {
          .art-original-modal .ant-modal-close {
            top: -50px;
            right: 0px;
          }
        }
      `}</style>

    </div>
  );
};

export default SewHaJungArchive;
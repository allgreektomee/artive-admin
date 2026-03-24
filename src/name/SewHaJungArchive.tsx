import React, { useEffect, useState } from "react";
import { Typography, Modal, Spin, Button } from "antd";
import { Helmet } from "react-helmet-async";
import { 
  CloseOutlined, 
  ZoomInOutlined, 
  InstagramOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;

// ✅ 외부로 분리된 아트카드 컴포넌트
const ArtCard = ({ art, isLarge = false, onOpen }: { art: any, isLarge?: boolean, onOpen: (id: number) => void }) => (
  <article 
    className={`artwork-item ${isLarge ? 'large' : ''}`} 
    onClick={() => onOpen(art.id)}
    style={{ marginBottom: isLarge ? '60px' : '40px' }}
  >
    <div className="img-box">
      <img src={art.thumbUrl} alt={art.title} loading="lazy" />
      <div className="hover-overlay"><ZoomInOutlined /></div>
    </div>
    <div className="info-box" style={{ textAlign: 'center' }}> {/* 텍스트도 중앙 정렬 */}
      <Text className="no">No. {String(art.id).padStart(2, '0')}</Text>
      <Title level={4} className="title">{art.title}</Title>
      <Text className="spec">{art.medium} | {art.size}</Text>
    </div>
  </article>
);

const SewHaJungArchive: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtId, setSelectedArtId] = useState<number | null>(null);
  const [isOriginalLoading, setIsOriginalLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const baseS3Url = "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/jsh/sewha/";
  const artworks = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    thumbUrl: `${baseS3Url}s${i + 1}.jpg`,
    originalUrl: `${baseS3Url}${i + 1}.jpeg`, 
    title: `Landscape of Memory #${String(i + 1).padStart(2, '0')}`,
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
    <div className="archive-container">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Sewha Jung | Landscape of Memory 2026</title>
      </Helmet>

      <main className="content-wrapper">
        {/* --- 1. Header (기존 중앙 정렬 버전) --- */}
        <header className="main-header">
          <Text className="sub-tag">Art Forest 2026</Text>
          <Title level={1} className="main-name">Sewha Jung</Title>
          <div className="location-tag">
            <Text>Hong Kong</Text>
            <Text>Affordable Art Fair</Text>
          </div>
        </header>

        {/* --- 2. 이미지 먼저 노출 (메인 작품) --- */}
        <section className="intro-image-section">
          <ArtCard art={artworks[0]} isLarge={true} onOpen={openModal} />
        </section>

        {/* --- 3. 중앙 배치된 작가 노트 1 --- */}
        <section className="statement-centered-section">
          <h2 className="statement-title">Landscape of Memory</h2>
          <div className="statement-body">
            <p>
              나는 자유롭고 감각적인 붓질 속에서 <br/> 
              끊임없이 <strong>혼돈</strong>을 마주한다.
            </p>
            <p>
              화면은 소용돌이와 같은 선과 색으로 가득하지만, <br/>
              그 안에서 나는 질서를 찾으려 한다.
            </p>
          </div>
          <div className="small-divider"></div>
        </section>

        {/* --- 4. 작품 그리드 전개 --- */}
        <section className="grid-section">
          <div className="standard-grid">
            {artworks.slice(1, 5).map(art => (
              <ArtCard key={art.id} art={art} onOpen={openModal} />
            ))}
          </div>
        </section>

        {/* --- 5. 중앙 배치된 작가 노트 2 --- */}
        <section className="statement-centered-section interlude">
          <div className="statement-body italic">
            <p>"질서가 지나치면 자유가 사라지고, <br/> 자유만 넘치면 공허한 메아리만 남는다."</p>
          </div>
        </section>

        {/* --- 6. 남은 작품들 (Staggered Grid) --- */}
        <section className="grid-section">
          <div className="staggered-grid">
            {artworks.slice(5).map((art, idx) => (
              <div key={art.id} className={idx % 2 === 1 ? "push-down" : ""}>
                <ArtCard art={art} onOpen={openModal} />
              </div>
            ))}
          </div>
        </section>

        {/* --- 7. 최종 마무리 문구 --- */}
        <section className="final-statement">
          <p>
            혼돈과 질서가 서로 부딪히며 잠시 균형을 이룰 때, <br/>
            화면은 살아 있는 긴장을 갖는다. <br/>
            그것은 시대가 품은 복잡성과 닮아 있는 감각적 언어다.
          </p>
          <Text className="series-name">- Landscape of Memory -</Text>
        </section>

        <footer className="main-footer">
          <Button type="link" href="https://www.instagram.com/sewhajung/" target="_blank">
            <InstagramOutlined style={{ fontSize: "2rem", color: '#000' }} />
            <Text className="insta-id">@sewhajung</Text>
          </Button>
          <Text className="copyright">© 2026 SEWHA JUNG. ALL RIGHTS RESERVED.</Text>
        </footer>
      </main>

      {/* 모달 생략 (동일) */}
      <Modal open={isModalOpen} onCancel={closeModal} footer={null} centered width="100%" className="art-original-modal" closeIcon={<CloseOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />} styles={{ mask: { backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.9)" }, body: { padding: 0 } }}>
        {currentArt && (
          <div className="modal-content">
            {isOriginalLoading && <Spin size="large" className="loader" />}
            <img src={currentArt.originalUrl} alt={currentArt.title} onLoad={() => setIsOriginalLoading(false)} style={{ opacity: isOriginalLoading ? 0 : 1 }} />
            {!isOriginalLoading && <Text className="modal-caption">{currentArt.title}</Text>}
          </div>
        )}
      </Modal>

      <style>{`
        .archive-container { background: #fff; min-height: 100vh; font-family: 'Noto Serif KR', serif; color: #000; }
        .content-wrapper { maxWidth: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Header 중앙 정렬 */
        .main-header { padding: 15vh 0 8vh; textAlign: center; }
        .sub-tag { letterSpacing: 10px; color: #bbb; fontSize: 0.7rem; textTransform: uppercase; display: block; marginBottom: 20px; }
        .main-name { fontSize: clamp(3rem, 12vw, 7rem) !important; fontWeight: 900 !important; letterSpacing: -3px !important; lineHeight: 0.9 !important; margin: 0 !important; }
        .location-tag { marginTop: 20px; }
        .location-tag span { display: block; fontSize: 0.9rem; letterSpacing: 4px; color: #888; textTransform: uppercase; }

        /* 중앙 정렬 텍스트 섹션 */
        .statement-centered-section { padding: 80px 0; textAlign: center; maxWidth: 800px; margin: 0 auto; }
        .statement-title { fontSize: 13px; letterSpacing: 5px; color: #ccc; marginBottom: 40px; fontWeight: 700; textTransform: uppercase; }
        .statement-body { fontSize: clamp(1.1rem, 2.5vw, 1.4rem); lineHeight: 2.2; wordBreak: keep-all; color: #333; fontWeight: 300; }
        .statement-body.italic { fontStyle: italic; color: #888; }
        .small-divider { width: 20px; height: 1px; background: #eee; margin: 60px auto 0; }

        /* 그리드 설정 */
        .standard-grid { display: grid; gridTemplateColumns: repeat(auto-fill, minmax(300px, 1fr)); gap: 80px 40px; }
        .staggered-grid { display: grid; gridTemplateColumns: repeat(2, 1fr); gap: 40px; }
        .push-down { marginTop: 120px; }

        /* 공통 아트워크 아이템 */
        .artwork-item { cursor: pointer; }
        .img-box { position: relative; overflow: hidden; backgroundColor: #f9f9f9; }
        .img-box img { width: 100%; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); display: block; }
        .artwork-item:hover img { transform: scale(1.03); }
        .hover-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.05); opacity: 0; display: flex; justifyContent: center; alignItems: center; color: #fff; fontSize: 2rem; transition: 0.3s; }
        .artwork-item:hover .hover-overlay { opacity: 1; }
        .info-box .no { fontSize: 0.6rem; color: #ddd; fontWeight: 900; letterSpacing: 1px; }
        .info-box .title { margin: 8px 0 4px !important; fontSize: 0.95rem !important; fontWeight: 700 !important; color: #222; }
        .info-box .spec { fontSize: 0.75rem; color: #999; }

        /* 마무리 문구 */
        .final-statement { padding: 150px 0; textAlign: center; }
        .final-statement p { fontSize: 1.2rem; color: #222; lineHeight: 2.2; marginBottom: 30px; fontWeight: 300; }
        .series-name { letterSpacing: 3px; color: #bbb; fontSize: 0.8rem; }

        .main-footer { padding: 100px 0 50px; textAlign: center; borderTop: 1px solid #f2f2f2; }
        .insta-id { display: block; marginTop: 10px; letterSpacing: 2px; fontSize: 0.7rem; color: #000; }
        .copyright { display: block; marginTop: 40px; fontSize: 0.6rem; color: #ccc; letterSpacing: 2px; }

        .modal-content { position: relative; display: flex; justifyContent: center; alignItems: center; minHeight: 80vh; }
        .modal-content img { maxWidth: 95vw; maxHeight: 85vh; border: 1px solid rgba(255,255,255,0.1); }
        .modal-caption { position: absolute; bottom: -40px; color: #fff; letterSpacing: 2px; fontSize: 0.8rem; }
        .loader { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }

        @media (max-width: 768px) {
          .staggered-grid { gridTemplateColumns: 1fr; gap: 60px; }
          .push-down { marginTop: 0; }
          .main-name { fontSize: 3.2rem !important; }
          .statement-body { fontSize: 1.1rem; padding: 0 10px; }
          .content-wrapper { padding: 0 15px; }
        }
      `}</style>
    </div>
  );
};

export default SewHaJungArchive;
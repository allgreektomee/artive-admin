import React, { useEffect, useState } from "react";
import { Typography, Modal, Spin, Button } from "antd";
import { Helmet } from "react-helmet-async";
import { 
  CloseOutlined, 
  ZoomInOutlined, 
  InstagramOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;

// ✅ 해결: 컴포넌트를 외부로 분리하여 렌더링 시 매번 새로 생성되지 않게 함
const ArtCard = ({ art, isLarge = false, onOpen }: { art: any, isLarge?: boolean, onOpen: (id: number) => void }) => (
  <article 
    className={`artwork-item ${isLarge ? 'large' : ''}`} 
    onClick={() => onOpen(art.id)}
  >
    <div className="img-box">
      <img src={art.thumbUrl} alt={art.title} loading="lazy" />
      <div className="hover-overlay"><ZoomInOutlined /></div>
    </div>
    <div className="info-box">
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
        <header className="main-header">
          <Text className="sub-tag">Art Forest 2026</Text>
          <Title level={1} className="main-name">Sewha Jung</Title>
          <div className="location-tag">
            <Text>Hong Kong</Text>
            <Text>Affordable Art Fair</Text>
          </div>
        </header>

        {/* --- Section 1: 혼돈의 마주함 --- */}
        <section className="story-section">
          <div className="statement-box top">
            <h2 className="statement-title">Landscape of Memory</h2>
            <p className="statement-text">
              나는 자유롭고 감각적인 붓질 속에서 <br/> 끊임없이 <strong>혼돈</strong>을 마주한다.
            </p>
          </div>

          <div className="artwork-split-grid">
            <ArtCard art={artworks[0]} isLarge={true} onOpen={openModal} />
            <div className="side-content">
               <p className="side-text">
                 화면은 소용돌이와 같은 선과 색으로 가득하지만, <br/>
                 그 안에서 나는 질서를 찾으려 한다.
               </p>
               <ArtCard art={artworks[1]} onOpen={openModal} />
            </div>
          </div>
        </section>

        {/* --- Section 2: 경계 위의 회화 --- */}
        <section className="middle-grid-section">
          <div className="statement-interlude">
             <p>"질서가 지나치면 자유가 사라지고, <br/> 자유만 넘치면 공허한 메아리만 남는다."</p>
          </div>
          
          <div className="standard-grid">
            {artworks.slice(2, 6).map(art => (
              <ArtCard key={art.id} art={art} onOpen={openModal} />
            ))}
          </div>
        </section>

        {/* --- Section 3: 살아있는 긴장 --- */}
        <section className="story-section">
          <div className="statement-box floating">
            <p className="statement-text">
              나의 회화는 이 모순의 경계 위에서 이루어진다. <br/>
              혼돈과 질서가 서로 부딪히며 잠시 균형을 이룰 때, <br/>
              화면은 <strong>살아 있는 긴장</strong>을 갖는다.
            </p>
          </div>

          <div className="staggered-grid">
            {artworks.slice(6).map((art, idx) => (
              <div key={art.id} className={idx % 2 === 0 ? "push-down" : ""}>
                <ArtCard art={art} onOpen={openModal} />
              </div>
            ))}
          </div>

          <div className="final-statement">
            <div className="line"></div>
            <p>
              그것은 단순한 장식이나 기술이 아니라, <br/>
              지금 이 시대가 품은 복잡성과 닮아 있는 감각적 언어다.
            </p>
            <Text className="series-name">- Landscape of Memory -</Text>
          </div>
        </section>

        <footer className="main-footer">
          <Button type="link" href="https://www.instagram.com/sewhajung/" target="_blank">
            <InstagramOutlined style={{ fontSize: "2rem", color: '#000' }} />
            <Text className="insta-id">@sewha Jung</Text>
          </Button>
          <Text className="copyright">© 2026 SEWHA JUNG. ALL RIGHTS RESERVED.</Text>
        </footer>
      </main>

      <Modal
        open={isModalOpen} onCancel={closeModal} footer={null} centered width="100%" className="art-original-modal"
        closeIcon={<CloseOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />}
        styles={{ mask: { backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.9)" }, body: { padding: 0 } }}    
      >
        {currentArt && (
          <div className="modal-content">
            {isOriginalLoading && <Spin size="large" className="loader" />}
            <img 
              src={currentArt.originalUrl} alt={currentArt.title} 
              onLoad={() => setIsOriginalLoading(false)}
              style={{ opacity: isOriginalLoading ? 0 : 1 }}
            />
            {!isOriginalLoading && <Text className="modal-caption">{currentArt.title}</Text>}
          </div>
        )}
      </Modal>

      <style>{`
        .archive-container { background: #fff; min-height: 100vh; font-family: 'Noto Serif KR', serif; color: #000; }
        .content-wrapper { maxWidth: 1400px; margin: 0 auto; padding: 0 20px; }
        .main-header { padding: 15vh 0 10vh; textAlign: center; }
        .sub-tag { letterSpacing: 10px; color: #bbb; fontSize: 0.7rem; textTransform: uppercase; display: block; marginBottom: 20px; }
        .main-name { fontSize: clamp(3rem, 12vw, 7rem) !important; fontWeight: 900 !important; letterSpacing: -3px !important; lineHeight: 0.9 !important; margin: 0 !important; }
        .location-tag { marginTop: 20px; }
        .location-tag span { display: block; fontSize: 0.9rem; letterSpacing: 4px; color: #888; textTransform: uppercase; }
        .statement-box { padding: 100px 0; textAlign: center; }
        .statement-title { fontSize: 13px; letterSpacing: 5px; color: #333; marginBottom: 30px; fontWeight: 700; textTransform: uppercase; }
        .statement-text { fontSize: clamp(1.1rem, 3vw, 1.6rem); lineHeight: 2.2; wordBreak: keep-all; color: #222; fontWeight: 300; }
        .statement-interlude { padding: 150px 0; textAlign: center; fontSize: 1.2rem; fontStyle: italic; color: #999; }
        .side-text { fontSize: 1.1rem; lineHeight: 2; color: #666; marginBottom: 40px; borderLeft: 1px solid #eee; paddingLeft: 20px; }
        .artwork-split-grid { display: grid; gridTemplateColumns: 1.5fr 1fr; gap: 60px; alignItems: flex-start; }
        .standard-grid { display: grid; gridTemplateColumns: repeat(auto-fill, minmax(300px, 1fr)); gap: 80px 40px; }
        .staggered-grid { display: grid; gridTemplateColumns: repeat(2, 1fr); gap: 40px; }
        .push-down { marginTop: 100px; }
        .artwork-item { cursor: pointer; marginBottom: 40px; }
        .img-box { position: relative; overflow: hidden; backgroundColor: #f9f9f9; }
        .img-box img { width: 100%; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .artwork-item:hover img { transform: scale(1.05); }
        .hover-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.1); opacity: 0; display: flex; justifyContent: center; alignItems: center; color: #fff; fontSize: 2rem; transition: 0.3s; }
        .artwork-item:hover .hover-overlay { opacity: 1; }
        .info-box { marginTop: 20px; }
        .info-box .no { fontSize: 0.6rem; color: #ddd; fontWeight: 900; }
        .info-box .title { margin: 5px 0 !important; fontSize: 1rem !important; fontWeight: 700 !important; }
        .info-box .spec { fontSize: 0.8rem; color: #999; }
        .final-statement { padding: 150px 0; textAlign: center; }
        .final-statement .line { width: 30px; height: 1px; background: #000; margin: 0 auto 40px; }
        .final-statement p { fontSize: 1.1rem; color: #444; lineHeight: 2.2; marginBottom: 20px; }
        .series-name { letterSpacing: 3px; color: #bbb; fontSize: 0.8rem; }
        .main-footer { padding: 100px 0 50px; textAlign: center; borderTop: 1px solid #f2f2f2; }
        .insta-id { display: block; marginTop: 10px; letterSpacing: 2px; fontSize: 0.7rem; color: #000; }
        .copyright { display: block; marginTop: 40px; fontSize: 0.6rem; color: #ccc; letterSpacing: 2px; }
        .modal-content { position: relative; display: flex; justifyContent: center; alignItems: center; minHeight: 80vh; }
        .modal-content img { maxWidth: 95vw; maxHeight: 85vh; border: 1px solid rgba(255,255,255,0.2); }
        .modal-caption { position: absolute; bottom: -40px; color: #fff; letterSpacing: 2px; fontSize: 0.8rem; }
        .loader { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }

        @media (max-width: 768px) {
          .artwork-split-grid, .staggered-grid { gridTemplateColumns: 1fr; }
          .push-down { marginTop: 0; }
          .main-name { fontSize: 3.5rem !important; }
          .statement-text { fontSize: 1.1rem; }
          .artwork-split-grid { gap: 40px; }
        }
      `}</style>
    </div>
  );
};

export default SewHaJungArchive;
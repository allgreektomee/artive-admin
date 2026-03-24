import React, { useEffect, useState } from "react";
import { Typography, Modal, Spin, Button } from "antd";
import { Helmet } from "react-helmet-async";
import { CloseOutlined, InstagramOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// --- 아트카드 컴포넌트: 돋보기 제거 및 폰트 강화 ---
const ArtCard = ({ art, isLarge = false, onOpen }: { art: any, isLarge?: boolean, onOpen: (id: number) => void }) => (
  <article className={`artwork-item ${isLarge ? 'large' : ''}`} onClick={() => onOpen(art.id)}>
    <div className="img-box">
      <img src={art.thumbUrl} alt={art.title} loading="lazy" />
      {/* ✅ 돋보기 아이콘 제거, 은은한 오버레이만 유지 */}
      <div className="hover-overlay"></div>
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

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
        <title>Sewha Jung | Landscape of Memory 2026</title>
      </Helmet>

      <main className="content-wrapper">
        
        {/* --- 1. Header --- */}
        <header className="main-header">
          <Text className="sub-tag">Art Forest 2026</Text>
          <Title level={1} className="main-name">Sewha Jung</Title>
          <div className="location-tag">
            <Text>Hong Kong | Affordable Art Fair</Text>
          </div>
        </header>

        {/* --- 2. 첫 이미지 --- */}
        <section className="intro-section">
          <ArtCard art={artworks[0]} isLarge={true} onOpen={openModal} />
        </section>

        {/* --- 3. 작가 노트 (한문 + 영문 추가) --- */}
        <section className="statement-section">
          <h2 className="statement-title">Landscape of Memory</h2>
          <div className="statement-body">
            <p className="kr-text">
              나는 자유롭고 감각적인 붓질 속에서 <br/> 
              끊임없이 <strong>혼돈</strong>을 마주한다. <br/>
              화면은 소용돌이와 같은 선과 색으로 가득하지만, <br/>
              그 안에서 나는 질서를 찾으려 한다.
            </p>
            {/* ✅ 영문 설명글 추가 */}
            <p className="en-text">
              In free and sensory brushstrokes, I constantly face chaos. <br/>
              The canvas is filled with vortex-like lines and colors, <br/>
              yet within them, I seek to find order.
            </p>
          </div>
        </section>

        {/* --- 4. 작품 리스트 --- */}
        <section className="grid-section">
          <div className="vertical-stack">
            {artworks.slice(1, 5).map(art => (
              <ArtCard key={art.id} art={art} onOpen={openModal} />
            ))}
          </div>

          <div className="statement-interlude">
            <p className="kr-text">"질서가 지나치면 자유가 사라지고, <br/> 자유만 넘치면 공허한 메아리만 남는다."</p>
            <p className="en-text">"Too much order stifles freedom; too much freedom leaves only an empty echo."</p>
          </div>

          <div className="vertical-stack">
            {artworks.slice(5).map(art => (
              <ArtCard key={art.id} art={art} onOpen={openModal} />
            ))}
          </div>
        </section>

        {/* --- 5. 마무리 --- */}
        <section className="final-statement">
          <div className="line"></div>
          <div className="statement-body">
            <p className="kr-text">
              혼돈과 질서가 서로 부딪히며 잠시 균형을 이룰 때, <br/>
              화면은 살아 있는 긴장을 갖는다.
            </p>
            <p className="en-text">
              When chaos and order collide to find a fleeting balance, <br/>
              the canvas acquires a living tension.
            </p>
          </div>
          <Text className="series-name">- Landscape of Memory -</Text>
        </section>

        <footer className="main-footer">
          <Button type="link" href="https://www.instagram.com/sewhajung/" target="_blank">
            <InstagramOutlined style={{ fontSize: "1.5rem", color: '#000' }} />
            <Text className="insta-id">@sewhajung</Text>
          </Button>
          <p className="copyright">© 2026 SEWHA JUNG. ALL RIGHTS RESERVED.</p>
        </footer>
      </main>

      <Modal open={isModalOpen} onCancel={closeModal} footer={null} centered width="100%" className="art-original-modal" closeIcon={<CloseOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />} styles={{ mask: { backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.9)" }, body: { padding: 0 } }}>
        {currentArt && (
          <div className="modal-content">
            {isOriginalLoading && <Spin size="large" className="loader" />}
            <img src={currentArt.originalUrl} alt={currentArt.title} onLoad={() => setIsOriginalLoading(false)} style={{ opacity: isOriginalLoading ? 0 : 1 }} />
          </div>
        )}
      </Modal>

      <style>{`
        .archive-container { background: #fff; min-height: 100vh; font-family: 'Noto Serif KR', serif; color: #000; }
        .content-wrapper { max-width: 800px; margin: 0 auto; padding: 0 25px; }
        
        .main-header { padding: 18vh 0 12vh; text-align: center; }
        .sub-tag { letter-spacing: 8px; color: #ccc; font-size: 0.75rem; display: block; margin-bottom: 40px; }
        .main-name { font-size: clamp(2.8rem, 8vw, 5rem) !important; font-weight: 900 !important; letter-spacing: -2px !important; margin: 0 !important; }
        .location-tag { margin-top: 40px; font-size: 0.85rem; letter-spacing: 3px; color: #888; text-transform: uppercase; }

        /* ✅ 설명글 스타일 조정: 한글은 줄이고 영문 추가 */
        .statement-section { padding: 120px 0; text-align: center; }
        .statement-title { font-size: 11px; letter-spacing: 5px; color: #eee; margin-bottom: 40px; }
        .statement-body .kr-text { font-size: 1.1rem; line-height: 2.2; color: #333; font-weight: 400; margin-bottom: 30px; word-break: keep-all; }
        .statement-body .en-text { font-size: 0.9rem; line-height: 1.8; color: #999; font-weight: 300; letter-spacing: 0.5px; }
        
        .statement-interlude { padding: 150px 0; text-align: center; }
        .statement-interlude .kr-text { font-size: 1.05rem; color: #777; font-style: italic; margin-bottom: 20px; }
        .statement-interlude .en-text { font-size: 0.85rem; color: #bbb; letter-spacing: 1px; }

        /* ✅ 카드뷰 폰트 강화 */
        .vertical-stack { display: flex; flex-direction: column; gap: 110px; }
        .artwork-item { cursor: pointer; width: 100%; }
        .img-box { overflow: hidden; background: #f9f9f9; margin-bottom: 25px; }
        .img-box img { width: 100%; transition: transform 0.6s ease; display: block; }
        .artwork-item:hover img { transform: scale(1.02); }
        .hover-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.03); opacity: 0; transition: 0.3s; }
        .artwork-item:hover .hover-overlay { opacity: 1; }
        
        .info-box { text-align: left; padding-left: 2px; }
        .info-box .no { font-size: 0.75rem; color: #ddd; font-weight: 900; letter-spacing: 1px; }
        .info-box .title { margin: 8px 0 !important; font-size: 1.2rem !important; font-weight: 800 !important; color: #111; letter-spacing: -0.5px; }
        .info-box .spec { font-size: 0.9rem; color: #666; font-weight: 400; }

        .final-statement { padding: 180px 0; text-align: center; }
        .final-statement .line { width: 20px; height: 1px; background: #000; margin: 0 auto 40px; }
        .series-name { letter-spacing: 3px; color: #ccc; font-size: 0.75rem; margin-top: 40px; display: block; }

        .main-footer { padding: 100px 0; border-top: 1px solid #f9f9f9; text-align: center; }
        .insta-id { display: block; margin-top: 8px; font-size: 0.75rem; color: #000; font-weight: 600; }
        .copyright { font-size: 0.65rem; color: #ddd; margin-top: 40px; letter-spacing: 2px; }

        .modal-content { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .modal-content img { max-width: 90vw; max-height: 90vh; }

        @media (max-width: 768px) {
          .main-header { padding: 12vh 0 8vh; }
          .info-box .title { font-size: 1.1rem !important; }
          .vertical-stack { gap: 80px; }
        }
      `}</style>
    </div>
  );
};

export default SewHaJungArchive;
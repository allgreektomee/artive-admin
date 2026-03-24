import React, { useEffect } from "react";
import { Typography } from "antd";
import { Helmet } from "react-helmet-async";
import { InstagramOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// --- 아트카드 컴포넌트: 클릭 이벤트 제거 ---
const ArtCard = ({ art, isLarge = false }: { art: any, isLarge?: boolean }) => (
  <article className={`artwork-item ${isLarge ? 'large' : ''}`}>
    <div className="img-box">
      <img src={art.thumbUrl} alt={art.title} loading="lazy" />
    </div>
    <div className="info-box">
      <Text className="no">No. {String(art.id).padStart(2, '0')}</Text>
      <Title level={4} className="title">{art.title}</Title>
      <div className="spec-group">
        <Text className="spec">{art.medium}</Text>
        <Text className="spec-size">{art.size}</Text>
      </div>
    </div>
  </article>
);

const SewHaJungArchive: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const baseS3Url = "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/jsh/sewha/";
  const artworks = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    thumbUrl: `${baseS3Url}s${i + 1}.jpg`,
    title: `Landscape of Memory #${String(i + 1).padStart(2, '0')}`,
    medium: "Acrylic on canvas",
    size: i % 2 === 0 ? "" : ""
  }));

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
          <ArtCard art={artworks[0]} isLarge={true} />
        </section>

        {/* --- 3. 작가 노트 (영문 우선 + 모바일 최적화) --- */}
        <section className="statement-section">
          <h2 className="statement-title">Landscape of Memory</h2>
          <div className="statement-body">
            <p className="en-text">
              In free and sensory brushstrokes, <br/>
              I constantly face chaos. <br/>
              The canvas is filled with vortex-like <br/>
              lines and colors, yet within them, <br/>
              I seek to find order.
            </p>
            <p className="kr-text">
              나는 자유롭고 감각적인 붓질 속에서 <br/>
              끊임없이 혼돈을 마주한다. <br/>
              화면은 소용돌이와 같은 선과 색으로 가득하지만, <br/>
              그 안에서 나는 질서를 찾으려 한다.
            </p>
          </div>
        </section>

        {/* --- 4. 작품 리스트 --- */}
        <section className="grid-section">
          <div className="vertical-stack">
            {artworks.slice(1, 5).map(art => (
              <ArtCard key={art.id} art={art} />
            ))}
          </div>

          <div className="statement-interlude">
            <p className="en-text">"Too much order stifles freedom; <br/> too much freedom leaves only an empty echo."</p>
            <p className="kr-text">"질서가 지나치면 자유가 사라지고, <br/> 자유만 넘치면 공허한 메아리만 남는다."</p>
          </div>

          <div className="vertical-stack">
            {artworks.slice(5).map(art => (
              <ArtCard key={art.id} art={art} />
            ))}
          </div>
        </section>

        {/* --- 5. 마무리 --- */}
        <section className="final-statement">
          <div className="line"></div>
          <div className="statement-body">
            <p className="en-text">
              When chaos and order collide <br/>
              to find a fleeting balance, <br/>
              the canvas acquires a living tension.
            </p>
            <p className="kr-text">
              혼돈과 질서가 서로 부딪히며 <br/>
              잠시 균형을 이룰 때, <br/>
              화면은 살아 있는 긴장을 갖는다.
            </p>
          </div>
          <Text className="series-name">- Landscape of Memory -</Text>
        </section>

        {/* --- 6. Footer: 초기 스타일 복구 --- */}
        <footer className="main-footer">
          <a href="https://www.instagram.com/sewhajung/" target="_blank" rel="noreferrer" className="insta-link">
            <InstagramOutlined className="insta-icon" />
            <span className="insta-id">@sewhajung</span>
          </a>
          <p className="copyright">© 2026 SEWHA JUNG. ALL RIGHTS RESERVED.</p>
        </footer>
      </main>

      <style>{`
        .archive-container { background: #fff; min-height: 100vh; font-family: 'Noto Serif KR', serif; color: #000; }
        .content-wrapper { max-width: 800px; margin: 0 auto; padding: 0 25px; }
        
        .main-header { padding: 18vh 0 12vh; text-align: center; }
        .sub-tag { letter-spacing: 8px; color: #ccc; font-size: 0.75rem; display: block; margin-bottom: 40px; }
        .main-name { font-size: clamp(2.8rem, 8vw, 4.8rem) !important; font-weight: 900 !important; letter-spacing: -2px !important; margin: 0 !important; }
        .location-tag { margin-top: 40px; font-size: 0.85rem; letter-spacing: 2px; color: #999; text-transform: uppercase; }

        .statement-section { padding: 100px 0; text-align: center; }
        .statement-title { 
          font-size: 11px; 
          letter-spacing: 5px; 
          color: #333; /* ✅ 연한 회색에서 짙은 블랙으로 변경 */
          margin-bottom: 50px; 
          text-transform: uppercase; /* 대문자 고정 */
          font-weight: 700; /* 조금 더 두껍게 */
        }
        
        .statement-body .en-text { font-size: 1.15rem; line-height: 2; color: #222; font-weight: 300; margin-bottom: 35px; word-break: keep-all; }
        .statement-body .kr-text { font-size: 0.9rem; line-height: 1.8; color: #aaa; font-weight: 300; word-break: keep-all; }
        
        .statement-interlude { padding: 150px 0; text-align: center; }
        .statement-interlude .en-text { font-size: 1rem; color: #555; font-style: italic; margin-bottom: 20px; line-height: 1.8; }
        .statement-interlude .kr-text { font-size: 0.85rem; color: #ccc; }

        .vertical-stack { display: flex; flex-direction: column; gap: 110px; }
        .artwork-item { width: 100%; } /* 팝업 없으므로 클릭 커서 제거 */
        .img-box { overflow: hidden; background: #f9f9f9; margin-bottom: 25px; }
        .img-box img { width: 100%; display: block; }
        
        .info-box { text-align: left; padding-left: 2px; }
        .info-box .no { font-size: 0.75rem; color: #ddd; font-weight: 900; letter-spacing: 1px; }
        .info-box .title { margin: 8px 0 !important; font-size: 1.25rem !important; font-weight: 800 !important; color: #111; letter-spacing: -0.5px; }
        .spec-group { display: flex; flex-direction: column; gap: 2px; }
        .info-box .spec { font-size: 0.9rem; color: #666; font-weight: 400; }
        .info-box .spec-size { font-size: 0.85rem; color: #999; font-weight: 300; }

        .final-statement { padding: 180px 0; text-align: center; }
        .final-statement .line { width: 20px; height: 1px; background: #000; margin: 0 auto 40px; }
        .series-name { letter-spacing: 3px; color: #ccc; font-size: 0.75rem; margin-top: 40px; display: block; }

        /* ✅ Footer: 초기 수직 정렬 스타일 */
        .main-footer { padding: 120px 0 80px; text-align: center; border-top: 1px solid #f9f9f9; }
        .insta-link { display: inline-flex; flex-direction: column; align-items: center; text-decoration: none; color: #000; }
        .insta-icon { font-size: 1.8rem; margin-bottom: 12px; }
        .insta-id { font-size: 0.75rem; letter-spacing: 2px; font-weight: 600; }
        .copyright { font-size: 0.65rem; color: #ddd; margin-top: 50px; letter-spacing: 2px; }

        @media (max-width: 768px) {
          .main-header { padding: 12vh 0 8vh; }
          .main-name { font-size: 3.2rem !important; }
          .statement-body .en-text { font-size: 1.1rem; line-height: 1.9; }
          .info-box .title { font-size: 1.15rem !important; }
          .vertical-stack { gap: 85px; }
        }
      `}</style>
    </div>
  );
};

export default SewHaJungArchive;
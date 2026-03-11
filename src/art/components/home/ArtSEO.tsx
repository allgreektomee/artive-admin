// src/art/components/ArtSEO.tsx
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const ArtSEO = ({ title, description, image, url }: SEOProps) => (
  <Helmet>
    {/* 브라우저 탭 제목 */}
    <title>{title}</title>

    {/* 카카오톡/페이스북 공유 설정 (Open Graph) */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />

    {/* 트위터/기타 플랫폼용 */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
);

export default ArtSEO;

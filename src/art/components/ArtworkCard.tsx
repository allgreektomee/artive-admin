import React from "react";

interface ArtworkCardProps {
  imageUrl: string;
  title: string;
  artist: string;
}

/**
 * 도록 스타일 작품 카드
 */
const ArtworkCard: React.FC<ArtworkCardProps> = ({
  imageUrl,
  title,
  artist,
}) => {
  return (
    <div>
      <img
        src={imageUrl}
        alt={`${title} by ${artist}`}
        style={{ maxWidth: "100%" }}
      />
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
};

export default ArtworkCard;

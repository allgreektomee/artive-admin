import React from "react";
import { Button, Image } from "antd";
import { MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;   // dnd-kit에서 식별자로 사용할 값 (여기서는 이미지 URL)
  url: string;  // 화면에 보여줄 이미지 경로
  onRemove: () => void; // 삭제 버튼 클릭 시 실행할 함수
}

const SortableItem: React.FC<SortableItemProps> = ({ id, url, onRemove }) => {
  // 1. dnd-kit의 훅을 사용하여 드래그에 필요한 속성들을 가져옵니다.
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  // 2. 드래그 애니메이션 스타일 설정
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    padding: "12px",
    background: isDragging ? "#fafafa" : "#fff", // 드래그 중일 때 배경색 변경
    border: "1px solid #d9d9d9",
    borderRadius: "8px",
    gap: "12px",
    marginBottom: "8px",
    zIndex: isDragging ? 10 : 1,
    boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* 3. 드래그 핸들 (아이콘 부분에서만 드래그가 시작되도록 listeners 적용) */}
      <div
        {...listeners}
        style={{ cursor: "grab", display: "flex", alignItems: "center", padding: "0 4px" }}
      >
        <MenuOutlined style={{ color: "#999" }} />
      </div>

      {/* 4. 이미지 미리보기 */}
      <Image
        src={url}
        width={48}
        height={48}
        style={{ objectFit: "cover", borderRadius: "4px" }}
        fallback="https://via.placeholder.com/48?text=Error"
      />

      {/* 5. URL 텍스트 (길면 생략 처리) */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: "13px",
          color: "#666"
        }}
      >
        {url}
      </div>

      {/* 6. 삭제 버튼 */}
      <Button 
        type="text" 
        danger 
        icon={<DeleteOutlined />} 
        onClick={(e) => {
          e.stopPropagation(); // 드래그 이벤트와 겹치지 않게 방지
          onRemove();
        }} 
      />
    </div>
  );
};

export default SortableItem;
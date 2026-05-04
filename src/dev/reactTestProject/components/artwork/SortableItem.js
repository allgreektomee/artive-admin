import { Button, Image } from "antd";
import { MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/**
 * @param {{ id: string, url: string, onRemove: () => void }} props
 */
export default function SortableItem({ id, url, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    padding: "12px",
    background: isDragging ? "#fafafa" : "#fff",
    border: "1px solid #d9d9d9",
    borderRadius: "8px",
    gap: "12px",
    marginBottom: "8px",
    zIndex: isDragging ? 10 : 1,
    boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        {...listeners}
        style={{ cursor: "grab", display: "flex", alignItems: "center", padding: "0 4px" }}
      >
        <MenuOutlined style={{ color: "#999" }} />
      </div>

      <Image
        src={url}
        width={48}
        height={48}
        style={{ objectFit: "cover", borderRadius: "4px" }}
        fallback="https://via.placeholder.com/48?text=Error"
      />

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: "13px",
          color: "#666",
        }}
      >
        {url}
      </div>

      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      />
    </div>
  );
}

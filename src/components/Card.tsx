// src/components/Card.tsx

interface CardProps {
  name: string;
  onClick: () => void;
}

export default function Card({ name, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "120px",
        height: "180px",
        background: "#fff",
        border: "2px solid #000",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
      }}
    >
      {name}
    </div>
  );
}

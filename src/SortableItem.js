// SortableItem.js
import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, showShimmer, showPlaceholder, showShadow, dragDirection }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative',
    margin: '0 10px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: isDragging ? '0 8px 16px rgba(0, 0, 0, 0.3)' : 'none',
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-item" {...attributes} {...listeners}>
      {showShimmer && (
        <div className="shimmer-card" />
      )}
      {showPlaceholder && (
        <div className={`placeholder-line ${dragDirection === "left" ? "left-line" : "right-line"}`} />
      )}
      {showShadow && !isDragging && (
        <div className="shadow-placeholder" />
      )}
      <img src={id} alt="sortable item" className="sortable-image" />
    </div>
  );
}

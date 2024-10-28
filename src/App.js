import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from 'react';
import { SortableItem } from './SortableItem';
import AllImages from './assets/imags';

function App() {
  const [imageUrls, setImageUrls] = useState([AllImages.First, AllImages.Second, AllImages.Third, AllImages.Fourth, AllImages.Fifth]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(null);
  const [dragDirection, setDragDirection] = useState(null);
  const [shadowIndex, setShadowIndex] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    const index = imageUrls.indexOf(active.id);
    setDraggingIndex(index);
    setShadowIndex(index); // Set shadow at original position
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeIndex = imageUrls.indexOf(active.id);
      const overIndex = imageUrls.indexOf(over.id);
      setPlaceholderIndex(overIndex);
      
      if (activeIndex < overIndex) {
        setDragDirection("right");
      } else {
        setDragDirection("left");
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setDraggingIndex(null);
    setPlaceholderIndex(null);
    setDragDirection(null);
    setShadowIndex(null); // Clear shadow on drag end

    if (over && active.id !== over.id) {
      setImageUrls((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Container className="p-3" style={{ width: "100%" }} align="center">
        <h3>Sortable Images</h3>
        <SortableContext
          items={imageUrls}
          strategy={horizontalListSortingStrategy}
        >
          <div className="image-row">
            {imageUrls.map((imageUrl, index) => (
              <SortableItem
                key={index}
                id={imageUrl}
                showShimmer={index === draggingIndex}
                showPlaceholder={index === placeholderIndex}
                showShadow={index === shadowIndex}
                dragDirection={dragDirection}
              />
            ))}
          </div>
        </SortableContext>
      </Container>
    </DndContext>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from 'react';
import { SortableItem } from './SortableItem';
import AllImages from './assets/imags';

function App() {
  const [imageUrls, setImageUrls] = useState([AllImages.First, AllImages.Second, AllImages.Third,AllImages.Fourth, AllImages.Fifth]);
  
  const handleDragEnd=(event)=> {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setImageUrls((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Container className="p-3" style={{ width: "50%" }} align="center">
        <h3>Sortable Images</h3>
        <SortableContext
          items={imageUrls}
          strategy={verticalListSortingStrategy}
        >
          {imageUrls.map((imageUrl,index) => (
            <SortableItem key={index} id={imageUrl} />
          ))}
        </SortableContext>
      </Container>
    </DndContext>
  );


}

export default App;

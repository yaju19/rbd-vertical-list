import React from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function List() {
  const [peopleList, setPeopleList] = useState(peopleArr);

  const onDragEnd = (result) => {
    console.log(result, "aaa");
    const { destination } = result;

    if (!destination) return;
    const items = Array.from(peopleList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log(reorderedItem);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);

    setPeopleList(items);
  };
  return (
    <div>
      <h2>People List</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="peopleList">
          {(provided) => (
            <ul
              className="people"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyleType: "none", padding: "0" }}
            >
              {peopleList.map((el, index) => {
                return (
                  <Draggable key={el} draggableId={el} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{el}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const peopleArr = ["Person A", "Person B", "Person C", "Person D", "Person E"];

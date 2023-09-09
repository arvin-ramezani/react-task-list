import { useEffect } from "react";
import { TASKS_LIST } from "../../../../utils/dummy-data";
import { useTasks } from "../../../context/TasksContext";
import { OnDragEndResponder } from "react-beautiful-dnd";
import { TaskStatus } from "../../../../utils/types/tasks.types";

const TaskSectionLogic = () => {
  const {
    addAllTasks,
    todoList,
    doingList,
    doneList,
    dragDropHandler,
    setIsDragging,
  } = useTasks();

  const dragStartHandler = () => setIsDragging({ isDragging: true });

  const dragEndHandler: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) return setIsDragging({ isDragging: false });

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return setIsDragging({ isDragging: false });

    const sourceStatus = source.droppableId as TaskStatus;
    const destinationStatus = destination.droppableId as TaskStatus;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    dragDropHandler({
      sourceStatus,
      destinationStatus,
      sourceIndex,
      destinationIndex,
    });

    setIsDragging({ isDragging: false });
  };

  useEffect(() => {
    addAllTasks(TASKS_LIST);
  }, []);

  return {
    dragStartHandler,
    dragEndHandler,
    todoList,
    doingList,
    doneList,
  };
};

export default TaskSectionLogic;

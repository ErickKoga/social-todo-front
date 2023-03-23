import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

import { ITodo } from "../../types/todo.types";
import styles from "./TodoCard.module.css";

interface Props {
  todo: ITodo;
  onCompletion: (todo: ITodo) => void;
}

const TodoCard: React.FC<Props> = ({ todo, onCompletion }) => {
  const date: Date = new Date(todo.createdAt);

  return (
    <div
      className={`${styles.todoCard} ${todo.completed ? styles.completed : ""}`}
      onClick={() => onCompletion(todo)}
    >
      {date.toLocaleDateString("pt-BR")}
      <h6>{todo.title}</h6>
      <p>{todo.description}</p>
      <span>
        {todo.completed ? <FaRegCheckCircle /> : <FaRegCircle />} Concluído
      </span>
    </div>
  );
};

export default TodoCard;

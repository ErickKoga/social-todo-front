import { FaRegCheckCircle, FaRegCircle, FaUser } from "react-icons/fa";

import { ITodo } from "../../types/todo.types";
import styles from "./TodoCard.module.css";

interface Props {
  todo: ITodo;
  ownerName: string;
  onCompletion: (todo: ITodo) => void;
}

const TodoCard: React.FC<Props> = ({ todo, ownerName, onCompletion }) => {
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
        <p>
          {todo.completed ? <FaRegCheckCircle /> : <FaRegCircle />} Concluído
        </p>
        <p className={styles.ownerName}>
          {`${ownerName} `}
          <FaUser />
        </p>
      </span>
    </div>
  );
};

export default TodoCard;

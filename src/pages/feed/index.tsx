import Nav from "@/components/Nav";
import styles from "./feed.module.css";
import Button from "@/components/Button/Button";
import { CreateTodoFormValues, ITodo } from "../../types/todo.types";
import { createTodo, getAllTodo, updateTodo } from "@/services/todoService";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import FormInput from "@/components/FormInput/FormInput";
import TodoCard from "@/components/TodoCard/TodoCard";
import * as yupLocale from "../../config/locale";

yup.setLocale(yupLocale);

const createTodoSchema = yup.object().shape({
  title: yup.string().required().min(1).max(250),
  description: yup.string().max(250),
});

export default function FeedPage() {
  const [userId, setUserId] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const {
    register: createTodoFormRegister,
    handleSubmit: createTodoHandleSubmit,
    formState: { errors: createTodoErrors },
  } = useForm<CreateTodoFormValues>({
    resolver: yupResolver(createTodoSchema),
    mode: "onChange",
  });

  const handleCreateTodoSubmit = useCallback(
    async (data: CreateTodoFormValues) => {
      try {
        const newTodo = {
          ownerId: userId,
          title: data.title,
          description: data.description,
        };
        const createdTodo = await createTodo(newTodo);
        setTodos((prevTodos) => [...prevTodos, createdTodo]);
      } catch (error) {
        console.error("Failed to create todo item: ", error);
      }
    },
    [userId]
  );

  const handleTodoCompletion = useCallback(async (todo: ITodo) => {
    try {
      const updatedTodo = await updateTodo(todo.id, {
        completed: !todo.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((currentTodo) =>
          currentTodo.id === todo.id ? updatedTodo : currentTodo
        )
      );
    } catch (error) {
      console.error("Failed to update todo item: ", error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const payload: { id: string } = jwt_decode(token ?? "");
    setUserId(payload.id);
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getAllTodo();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Failed to fetch todos: ", error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.content}>
        <section className={styles.feed}>
          <h5 className="title">Feed</h5>
          <div className={`${styles.list} ${styles.overflow}`}>
            {todos.map((todoItem) => (
              <TodoCard
                key={todoItem.id}
                todo={todoItem}
                onCompletion={handleTodoCompletion}
              />
            ))}
          </div>
        </section>
        <div className={styles.todo}>
          <section className={styles.createTodo}>
            <form
              noValidate
              onSubmit={createTodoHandleSubmit(handleCreateTodoSubmit)}
            >
              <h5 className="title">Novo To-Do</h5>
              <FormInput
                placeholder="Título"
                type="title"
                register={createTodoFormRegister("title", { required: true })}
              />
              {createTodoErrors.title && (
                <span>{createTodoErrors.title.message}</span>
              )}
              <FormInput
                placeholder="Descrição"
                type="description"
                register={createTodoFormRegister("description")}
              />
              {createTodoErrors.description && (
                <span>{createTodoErrors.description.message}</span>
              )}
              <Button style={"primary-dark"} onClick={createTodoHandleSubmit}>
                Criar
              </Button>
            </form>
          </section>
          <section className={styles.listTodo}>
            <h5 className="title">Meus To-Dos</h5>
            <div className={`${styles.overflow}`}>
              {todos
                .filter(
                  (todo) => todo.ownerId === userId && todo.completed === false
                )
                .map((todoItem) => (
                  <TodoCard
                    key={todoItem.id}
                    todo={todoItem}
                    onCompletion={handleTodoCompletion}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

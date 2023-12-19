import { Fragment } from "react"
import TodoItem from "./TodoItem";
import Todo from "./Todo";

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
  }
  




const TodoList: React.FC<TodoListProps> =({todos, toggleTodo, deleteTodo })=> {
    return(
        <Fragment>
            <div className="container">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <ul>
                    {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                    ))}

             </ul>
                </div>
                <div className="col-md-4"></div>
            </div>

            

        </Fragment>
    );
};

export default TodoList;
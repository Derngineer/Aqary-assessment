import { Fragment } from "react";
import Todo from './Todo';
import "./TodoItem.css";
import { Icon } from "@iconify/react";


interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> =({todo, toggleTodo, deleteTodo})=>{

    return (
        <Fragment>
            

                    <li className="container todo-item">
                        <input 
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        style={{ flex: 'none' }} 
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#888' : 'inherit'}}>
                        <div className="todo-text" style={{ wordWrap: 'break-word' }}>{todo.text}</div>
                        </span>
                        <div className="todo-actions" style={{ marginLeft: 'auto' }}>
                        <Icon icon="ph:trash" className="todo-actions" color="f95e5e" onClick={() => deleteTodo(todo.id)} />
                        </div>
                    </li>

                
          

</Fragment>


    )
}

export default TodoItem;
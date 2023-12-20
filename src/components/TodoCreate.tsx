import { useEffect, useState} from "react";
import "./TodoCreate.css"
import Todo from "./Todo";
import TodoItem from "./TodoItem";
import Filter from "./Filter";
import React from "react";




// props
interface TodoCreateProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    createTodo: (text: string) => void;
    clearTodoList:()=>void;


  }

  const TodoCreate: React.FC<TodoCreateProps> = ({
    createTodo,
    todos,
    toggleTodo,
    deleteTodo,
    clearTodoList,
  }) => {
    const [text, setText] = useState('');
    const [filter, setFilter] = useState<string>('All');
    const [count, setCount] = useState<number>(0);
    const [localtodos, setLocalTodos] = useState(todos);
  
    const itemDraggged = React.useRef<number | null>(null);
    const itemDragggedOver = React.useRef<number | null>(null);
  
    const handleSort = () => {
      const _todos = [...localtodos];
      const draggedItemContent = _todos.splice(itemDraggged.current!, 1)[0];
      _todos.splice(itemDragggedOver.current!, 0, draggedItemContent);
      setLocalTodos(_todos);
    };
  
    const handleKeyE = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleCreateTodo();
      }
    };
  
    const handleCreateTodo = () => {
      if (text.trim() !== '') {
        createTodo(text);
        setText('');
      }
    };
  
    const filterTodos = (selectedFilter: string) => {
      setFilter(selectedFilter);
    };
  
    const filteredTodos = localtodos.filter((todo) => {
      if (filter === 'All') {
        return true;
      } else if (filter === 'Completed') {
        return todo.completed;
      } else if (filter === 'Active') {
        return !todo.completed;
      } else if (filter === 'Clear') {
        clearTodoList();
      }
  
      return false; // default case, should not be reached
    });
  
    useEffect(() => {
      let count = 0;
      localtodos.forEach((todo) => {
        if (!todo.completed) {
          count++;
        }
      });
      setCount(count);
    }, [localtodos]);
  
    useEffect(() => {
      // Update localtodos when todos changes
      setLocalTodos(todos);
    }, [todos]);

    return (
        <>
  {/* Add banner images at the back of the create header */}
  <div className="container-fluid" style={{ position: 'relative', width: '100%', height: '100%' }}>
    <div className="row">
      <div className="overlay"></div>
      <div className="container">
        <img className="img-fluid image-fit" src="/Bitmap.png" alt="Your Image" style={{ width: '100%', minHeight: '300px', objectFit: 'cover' }} />
      </div>
      <div className="row inputGroup">
        <div className="col-md-3"></div>
        <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="container d-flex justify-content-center">
            <div className="row align-items-center">
              <div className="col-12">
                <h1 style={{ color: 'white', fontSize: '24px', display: 'inline-block', marginRight: 'auto', marginTop: '8px', }}>
                  T O D O📝
                </h1>
            
              </div>
            </div>
          </div>

          <input
            id="create-new"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyE}
            placeholder="Create a new to do..."
            style={{ width: '100%', maxWidth: '502px', marginBottom: '10px' }}
          />

          {/* Apply drag and drop effect below */}

      

        <ul style={{ listStyleType: 'none', padding: '0', margin: '0',  maxHeight: '300px' }} >
                    {/* ul section is a droppable section */}
                    {/* lets go back to the li, in child component and make it dragable */}
                    

                    {filteredTodos.map((todo, index) =>(

                      <div key ={index} 
                      draggable 
                      onDragStart={()=>itemDraggged.current = index}
                      onDragEnter={()=>itemDragggedOver.current= index}
                      onDragEnd={handleSort}
                       >
                         <TodoItem  todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}  />
                      </div>   
                        
                    ))}                 
                    <li className=".filter-group" style={{ width: '100%', maxWidth: '502px', marginBottom: '10px' }} >
                    <Filter count = {count}  onFilter={filterTodos} filter={filter} /> 
                    </li>
                    <div className="row justify-content-center m-lg-4" style={{color: "grey"}} >Drag and drop to reorder list</div>   
            </ul> 
                       
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  </div>
</>

    )
}

export default TodoCreate;


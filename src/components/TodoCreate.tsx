import { useEffect, useState } from "react";
import "./TodoCreate.css"
import Todo from "./Todo";
import TodoItem from "./TodoItem";
import Filter from "./Filter";





// props
interface TodoCreateProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    createTodo: (text: string) => void;
    clearTodoList:()=>void;
  }
const TodoCreate: React.FC<TodoCreateProps > =({createTodo, todos, toggleTodo, deleteTodo,clearTodoList})=>{
    const [text, setText] =useState('');
    // when E enter is pressed handle submition
    const [filter, setFilter] = useState<string>('All');
    const [count, setCount] = useState<number>(0);
    const handleKeyE =(e:React.KeyboardEvent<HTMLInputElement>) => {

        if(e.key === 'Enter'){
            handleCreateTodo();
        }
    };

    const handleCreateTodo = ()=> {
        if (text.trim() !== '') {
            createTodo(text);
            setText('')
        }
    };
    const filterTodos = (selectedFilter: string) => {
        setFilter(selectedFilter);
      };


    const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') {
        return true;
    } else if (filter === 'Completed') {
        return todo.completed;
    } else if (filter === 'Active') {
        return !todo.completed;
    } else if (filter === "Clear") {
        clearTodoList();    
    }
    
    });


    useEffect(() => {
        let count = 0;
        todos.forEach((todo)=>{
            if (!todo.completed) {
                count ++;
            }
        });
        setCount(count)
    },[todos]

    )


    
     


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


                    

                    {filteredTodos.map((todo) =>(

                        <TodoItem key ={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                        
                    ))}
                    
                    
                    <li className=".filter-group" style={{ width: '100%', maxWidth: '502px', marginBottom: '10px' }} >
                    <Filter count = {count}  onFilter={filterTodos} filter={filter} /> 
                    </li>
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


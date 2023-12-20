import TodoCreate from "./components/TodoCreate";
import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  


  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTodos = sessionStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      sessionStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, loading]);


  const createTodo =(text: string)=> {

    setTodos([...todos, { text, completed: false, id: Date.now() }]);
  }
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearTodoList = () => {
    setTodos([]);
  }


  return (
    <>
    <TodoCreate 
    createTodo={createTodo}
     todos={todos} 
     toggleTodo={toggleTodo} 
     deleteTodo={deleteTodo} 
     clearTodoList = {clearTodoList}
      />

    <div style={{backgroundColor:"white", height:"100vh"}}></div>

    </>
  )
}

export default App

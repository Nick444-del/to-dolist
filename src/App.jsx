import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo)
    let newTodos = todos.filter(items => {
      return items.id !== id
    });
    setTodos(newTodos);
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(items => {
      return items.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(items => {
      return items.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md disabled:bg-violet-600 transition-all duration-150 mx-6 text-sm font-bold'>Add item</button>
        </div>
        <input type="checkbox" checked={showFinished} id="" /> Show Finished Tasked.
        <h2 className='text-lg font-bold'>Your Todos list</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(items => {
            return <div key={items.id} className="todo flex justify-between w-1/2 my-3">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={items.isCompleted} name={items.id} id="" />
                <div className={items.isCompleted ? "line-through" : ""}>{items.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, items.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md transition-all duration-150 mx-2 text-sm font-bold'>Edit</button>
                <button onClick={(e) => { handleDelete(e, items.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md transition-all duration-150 mx-2 text-sm font-bold'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

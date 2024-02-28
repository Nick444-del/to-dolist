import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";

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

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
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
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>Task - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 rounded-full hover:bg-violet-950 p-2 py-1 text-white disabled:bg-violet-600 transition-all duration-150 text-sm font-bold'>Add item</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} id="" /> Show Finished Tasked.
        <h2 className='text-2xl font-bold'>Your Todos list</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(items => {
            return (showFinished || items.isCompleted) && <div key={items.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={items.isCompleted} name={items.id} id="" />
                <div className={items.isCompleted ? "line-through" : ""}>{items.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, items.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md transition-all duration-150 mx-2 text-sm font-bold'><FaEdit/></button>
                <button onClick={(e) => { handleDelete(e, items.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md transition-all duration-150 mx-2 text-sm font-bold'><IoMdRemoveCircle/></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

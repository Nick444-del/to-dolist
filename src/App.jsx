import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleEdit = () => { }

  const handleDelete = () => { }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;

  }
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md transition-all duration-150 mx-6 text-sm font-bold'>Add item</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos list</h2>
        <div className="todos">
          {todos.map(items => {
            return <div key={todo} className="todo flex justify-between w-1/2 my-3">
              <input onChange={handleCheckbox} type="checkbox" value={todo.isCompleted} name={todo.id} id="" />
              <div className={items.isCompleted?"line-through":""}>{items.todo}</div>
              <div className="buttons">
                <button onClick={handleEdit} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md transition-all duration-150 mx-2 text-sm font-bold'>Edit</button>
                <button onClick={handleDelete} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md transition-all duration-150 mx-2 text-sm font-bold'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

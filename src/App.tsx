import { useEffect, useState } from 'react'
import { TodoForm } from './components/TodoForm/TodoForm'
import { Tarea } from './types/Tarea'
import { TodoList } from './components/TodoList/TodoList'
import "./App.css";

function App() {
  
  const [tareas, setTarea] = useState<Tarea[]>([]);
  
  //Estado para saber si la tarea se esta editando
  const [editTarea, setEditTarea] = useState<Tarea | null>(null);

  // useEffect para saber si hay tareas en local storage  
  useEffect(() => {
    const tareasGuardadasLocal = localStorage.getItem('tareas')
    if(tareasGuardadasLocal){
      setTarea(JSON.parse(tareasGuardadasLocal));
    }
  }, []);

  // metodo para guardar las tareas en local storage despues de cada cambio
  const guardarTareasLocalStorage = (tareas : Tarea[]) => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  // Para agregar tareas
  const onAddTask = (nuevaTarea: Tarea) => {
    const tareasActualizadas = [...tareas, nuevaTarea]; 
    setTarea(tareasActualizadas);
    guardarTareasLocalStorage(tareasActualizadas);
  }

  const onToggle = (id: number) => {
    // Buscamos la tarea y cambiamos su estado completado
    setTarea(tareas.map(t => 
      t.id === id ? {...t, completada: !t.completada} : t
    ));
  }

  const onEdit = (id: number, newTitulo: string, newFecha: string) => {
    // Buscamos la tarea y cambiamos su titulo y fecha
    const tareasActualizadas = tareas.map(t => 
      t.id === id ? {...t, titulo: newTitulo, fecha: newFecha} : t
    );
    setTarea(tareasActualizadas);
    guardarTareasLocalStorage(tareasActualizadas);
    setEditTarea(null); // limpiamos la tarea que se esta guardando
  }

  const onRemove = (id : number) => {

    const tareasActualizadas = tareas.filter(t => t.id !== id);
    setTarea(tareasActualizadas);
    guardarTareasLocalStorage(tareasActualizadas);
  }

  return (
    <>
      <h1 className='title'>TO DO LIST</h1>
      <TodoForm 
        onAddTask={onAddTask}
        tareaEditando={editTarea}
        onEdit={onEdit}
        />
      <TodoList 
        tareas={tareas}
        onToggle={onToggle}
        onEdit={(id) => setEditTarea(tareas.find(t => t.id === id) || null)}
        onRemove={onRemove}
      />
    </>
  )
}

export default App

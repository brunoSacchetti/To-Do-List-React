import React, { useEffect, useState } from 'react'
import { Tarea } from '../../types/Tarea';
import "./todoform.css";

// Prop para todoform
type TodoFormProps = {
  onAddTask: (task: Tarea) => void;
  tareaEditando: Tarea | null;
  onEdit: (id: number, title: string, fecha: string) => void;
}


export const TodoForm = ({onAddTask, tareaEditando, onEdit} : TodoFormProps) => {

  // Para manejar los inputs
  const [titulo, setTitle] = useState<string>(tareaEditando?.titulo || ""); // si existiese un valor que lo coloque
  const [fecha, setFecha] = useState<string>(tareaEditando?.fecha || "");

  // useEffect para mostrar la tarea que se está editando
  useEffect(() => {
    if(tareaEditando) {
      setTitle(tareaEditando.titulo);
      setFecha(tareaEditando.fecha);
    }
  }, [tareaEditando])



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No agregamos tareas vacias
    if(!titulo.trim() || !fecha){
      return
    }

    if(tareaEditando) {
    
      onEdit(tareaEditando.id, titulo, fecha);
    
    } else {

      // Construimos el objeto de TAREA
      const newTarea: Tarea = {
      id: Date.now(),
      titulo,
      fecha,
      completada: false,
      }
      
      onAddTask(newTarea);
    
    }
    
    setTitle("");
    setFecha("");
  }

  return (
    <div>
      <h2>{tareaEditando ? "Editar Tarea" : "Agregar Tarea"}</h2>
      <form onSubmit={handleSubmit}>
        <div className='container-form'>
          <input 
            type="text" 
            placeholder='Escriba la tarea' 
            className='input-tarea'
            value={titulo}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
          <input 
            type="date" 
            name="fecha" 
            id="task" 
            className='input-fecha'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            />
          <button 
            type="submit" 
            className={`btn-tarea ${tareaEditando ? 'btn-tarea-editando' : 'btn-tarea-agregando'}`}>{tareaEditando ? "Guardar Cambios" : "Agregar Tarea"}</button> 
        </div>
        </form>
    </div>
  )
}

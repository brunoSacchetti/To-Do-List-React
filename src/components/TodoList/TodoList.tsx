import { Tarea } from '../../types/Tarea'
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';  // Importamos el locale de español
import "./todolist.css";

type TodoListProps = {
    tareas: Tarea[],
    onToggle: (id: number) => void,
    onRemove: (id: number) => void,
    onEdit: (id: number) => void,
}

export const TodoList = ({tareas, onToggle, onRemove, onEdit} : TodoListProps) => {

      const formatDate = (fecha: string) => {
        // Parseamos la fecha a un objeto Date
        const parsedDate = parseISO(fecha);
      
        // Formateamos la fecha con el locale en español
        return format(parsedDate, 'd MMMM yyyy', { locale: es });
      };

  return (
    <>
    <div className='container-tareas'>
        <h1>{tareas.length === 0 ? "No hay tareas agregadas" : "Lista de Tareas"}</h1>
            {tareas.map((tarea) => (
                <div key={tarea.id} className='container-lista-tareas'>
                    <span className='span-tarea'>{tarea.titulo} - {formatDate(tarea.fecha)}</span>
                    <div className='container-btn'>
                        <button className={`btn btn-toggle ${tarea.completada ? 'btn-toggle-completada' : 'btn-toggle-no-completada'}`} onClick={() => onToggle(tarea.id)}>
                            {tarea.completada ? "Desmarcar" : "Completar"}
                        </button>
                        <button className="btn btn-edit" onClick={() => onEdit(tarea.id)}>
                            Editar
                        </button>
                        <button className="btn btn-remove" onClick={() => onRemove(tarea.id)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
    </div>
    </>
  )
}

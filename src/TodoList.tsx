import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { useRef, useState } from "react";
import { ColDef } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Todo = {
    description: string;
    priority: string;
    duedate: string;
}
function TodoList() {
    
    const [todo, setTodo] = useState<Todo>({
        description: "",
        priority: "",
        duedate: "",
    });

    const [todos, setTodos] = useState<Todo[]>([]);
    const gridRef = useRef<AgGridReact<Todo>>(null);

    function addTodo() {
        setTodos([...todos, todo]);
        setTodo({
            description: "",
            priority: "",
            duedate: "",
        });
    }

    const [columnDefs] = useState<ColDef<Todo>[]>([
        { field: "description", sortable: true, filter: true },
        { 
          field: "priority",
          sortable: true,
          filter: true,
          cellStyle: (params) => 
            params.value === "High" ? { color: "red" } : { color: "black" },
          },
        { field: "duedate", sortable: true, filter: true },
    ]);

    const handleDelete = () => {
      if (gridRef.current?.api.getSelectedNodes().length) {
        setTodos(
          todos.filter(
            (todo, index) => index !== Number(gridRef.current?.api.getSelectedNodes()[0].id)
          )
        )
      } else {
        alert("Please select a row to delete first")
      }
    }
      return (
        <>
          <input
            placeholder="Description"
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            value={todo.description}
          />
          <input
            placeholder="Priority"
            onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
            value={todo.priority}
          />
          <input
            placeholder="Date"
            type="date"
            onChange={(e) => setTodo({ ...todo, duedate: e.target.value })}
            value={todo.duedate}
          />
          <button onClick={addTodo}>Add</button>
          <button onClick={handleDelete}>Delete</button>
          <div style={{ width: 700, height: 500 }}>
            <AgGridReact 
              rowData={todos} 
              columnDefs={columnDefs} 
              rowSelection="single"
              ref={gridRef}
            />
          </div>
          
          
        </>
      )
  }
  
  export default TodoList;

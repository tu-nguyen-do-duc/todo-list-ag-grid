import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { useRef, useState } from "react";
import { ColDef } from "ag-grid-community";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


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
            (_, index) => index !== Number(gridRef.current?.api.getSelectedNodes()[0].id)
          )
        )
      } else {
        alert("Please select a row to delete first")
      }
    }

    return (
        <>
        <Stack mt={2} direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
              placeholder="Description"
              onChange={(e) => setTodo({ ...todo, description: e.target.value })}
              value={todo.description}
            />
            <TextField
              placeholder="Priority"
              onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
              value={todo.priority}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Due Date"
                    value={todo.duedate ? dayjs(todo.duedate) : null}
                    onChange={(newValue) => {
                        setTodo({ ...todo, duedate: newValue ? newValue.format('YYYY-MM-DD') : '' })
                    }}
                />
            </LocalizationProvider>
            <Button variant="contained" onClick={addTodo}>Add</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          </Stack>
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

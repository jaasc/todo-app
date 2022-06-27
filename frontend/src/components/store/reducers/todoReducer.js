import { toast } from "react-toastify";

const todoReducer = (todos = [], action) => {
    switch (action.type){
        case "ADD_TODO":
            toast.success("Successfully added", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return [action.todo.data, ...todos];
        case "GET_TODOS":
            return action.todos.data;
        case "UPDATE_TODO":
            toast.success("Successfully updated", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return todos.map(todo => 
                todo._id === action.todo.data._id ? action.todo.data : todo
            );
        case "CHECK_TODO":
            toast.success("Status updated", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return todos.map(todo => 
                todo._id === action.todo.data._id ? action.todo.data : todo
            );
        case "DELETE_TODO":
            toast.success("Todo deleted", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return todos.filter(todo => todo._id !== action.id);
        case "DELETE_COMPLETED":
                toast.success("Completed todo deleted", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                return todos.filter(todo => todo.isComplete === false);
        default:
            return todos;
    };
};

export default todoReducer;
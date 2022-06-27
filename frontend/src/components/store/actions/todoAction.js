import axios from "axios";
import { url, setHeaders } from "../../../api";
import { toast } from "react-toastify";

export const getTodo = () => {
    return (dispatch) => {
        axios
            .get(`${url}/`, setHeaders())
            .then((todos) => {
                dispatch({
                    type: "GET_TODOS", todos
                })
            })
            .catch((e) => {
                console.log(e.response);
                toast.error(e.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    };
};

export const addTodo = (newTodo) => {
    return (dispatch, getState) => {
        const userID = getState().auth._id;

        axios
            .post(`${url}/`, {...newTodo, userID}, setHeaders())
            .then((todo) => {
                dispatch({
                    type: "ADD_TODO", todo
                })
            })
            .catch((e) => {
                console.log(e.response);
                toast.error(e.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    };
};

export const updateTodo = (updatedTodo, id) => {
    return (dispatch) => {
        axios
            .put(`${url}/${id}`, updatedTodo, setHeaders())
            .then((todo) => {
                dispatch({
                    type: "UPDATE_TODO", todo
                })
            })
            .catch((e) => {
                console.log(e.response);
                toast.error(e.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    };
};

export const checkTodo = (id) => {
    return (dispatch) => {
        axios
            .patch(`${url}/${id}`, {}, setHeaders())
            .then((todo) => {
                dispatch({
                    type: "CHECK_TODO", todo
                })
            })
            .catch((e) => {
                console.log(e.response);
                toast.error(e.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    };
};

export const deleteTodo = (id) => {
    return (dispatch) => {
        axios
            .delete(`${url}/${id}`, setHeaders())
            .then(() => {
                dispatch({
                    type: "DELETE_TODO", id
                })
            })
            .catch((e) => {
                console.log(e.response);
                toast.error(e.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    };
};

export const deleteCompleted = (id) => {
    return (dispatch) => {
        axios
            .delete(`${url}/${id}`, setHeaders())
            .then(() => {
                dispatch({
                    type: "DELETE_COMPLETED", id
                })
            })
            .catch((e) => {
                console.log(e.response);
                toast.error(e.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    };
};
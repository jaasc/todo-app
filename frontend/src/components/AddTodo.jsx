import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTodo } from "./store/actions/todoAction";
import { updateTodo } from "./store/actions/todoAction";

const Container = styled.form`
    display: flex;
    align-items: center;
`

const StatusIcon = styled.div`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    border: 2px solid var(${props => props.mode? "--LTlightGrayishBlue" : "--DTveryDarkGrayishBlue"});
    position: absolute;
    margin-left: 1rem;
`

const InputTodo = styled.input`
    width: 100%;
    border-radius: 10px;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 18px;
    padding: 1.5rem 1.5rem 1.5rem 4rem;
    border: none;
    background-color: var(${props => props.mode? "--LTveryLightGray" : "--DTveryDarkDesaturatedBlue"});
    color: ${props => props.mode? "var(--LTveryDarkGrayishBlue)" : "var(--DTlightGrayishBlue)"};

    &:focus {
        outline: none;
    }
`

const AddTodo = ({ mode, todo, setTodo }) => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (todo._id){
            const updatedTodo = {
                title: todo.title,
                isComplete: todo.isComplete,
                date: todo.date,
                userID: todo.userID
            }
            dispatch(updateTodo(updatedTodo, todo._id));
        } else {
            const newTodo = {
                ...todo,
                date: new Date()
            }
            dispatch(addTodo(newTodo));
        }

        setTodo({
            title: "",
            isComplete: false
        })
    }

    return(
        <Container onSubmit={handleSubmit}>
            <StatusIcon mode={mode}/>
            <InputTodo 
                mode={mode} 
                autoFocus 
                type="text" 
                placeholder="Create a new todo..."
                value={todo.title}
                onChange={(e) => setTodo({...todo, title: e.target.value})}
                />
        </Container>
    );
};

export default AddTodo;
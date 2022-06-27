import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import moment from "moment";
import { checkTodo } from "./store/actions/todoAction";
import { deleteTodo } from "./store/actions/todoAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";

const DeleteIcon = styled(FontAwesomeIcon)`
    height: 1.3rem;
    width: 1.3rem;
    margin-right: 1rem;
    opacity: 30%;

    &:hover {
        opacity: 100%;
    }
`

const CompletedStatus = styled(FontAwesomeIcon)`
    height: 50%;
    border-radius: 50%;
    color: #FFF;
    display: none;
`

const Container = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(${props => props.mode? "--LTlightGrayishBlue" : "--DTveryDarkGrayishBlue"});
`

const StatusIcon = styled.div`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    position: absolute;
    margin-left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.complete? "var(--CheckBackground)" : "transparent"};
    border: ${props => props.complete? "none" : `2px solid var(${props.mode? "--LTlightGrayishBlue" : "--DTveryDarkGrayishBlue"})`};
    
    &:hover {
        border: 2px solid var(--LTdarkGrayishBlue);
        cursor: pointer;
    }
`

const TodoList = styled.div`
    flex-grow: 1;
    padding: 1.5rem 1.5rem 1.5rem 4rem;
    margin: 0;
`

const TodoInfo = styled.p`
    width: 100%;
    margin: 0;
    text-decoration: ${props => props.complete && !props.isDate ? "line-through" : "none"};
    margin-top: ${props => props.isDate &&  ".5rem"};
    color: ${props => props.mode? 
        props.complete? "var(--LTlightGrayishBlue)" : "var(--DTveryDarkGrayishBlue)" :
        props.complete? "var(--DTveryDarkGrayishBlue)" : "var(--DTlightGrayishBlue)" 
    };

    + * {
        margin-top: .5rem;
    }

    &:hover {
        cursor: pointer;
    }
`

const Todo = ({ mode, todo, setTodo }) => {
    const dispatch = useDispatch();

    const handleComplete = (id) => {
        dispatch(checkTodo(id));
    }

    const handleUpdate = (id) => {
        setTodo(todo);
        window.scrollTo({
            top:0, 
            left:0,
            behavior: "smooth"
        })
    }

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    }

    return(
        <Container mode={mode}>
            <StatusIcon 
                onClick={() => handleComplete(todo._id)}
                mode={mode}
                complete={todo.isComplete}>
                <CompletedStatus icon={faCheck} style={todo.isComplete ? {display: "block"} : {}}/>
            </StatusIcon>
            <TodoList>
                <TodoInfo
                    mode={mode}
                    complete={todo.isComplete}>
                    {todo.title}</TodoInfo>
                <TodoInfo 
                    mode={mode}
                    complete={todo.isComplete}
                    isDate={+true}
                    style={{fontSize: "14px"}}>
                    {moment(todo.date).fromNow()}</TodoInfo>
            </TodoList>
            <>
            <DeleteIcon icon={faPencil} onClick={() => handleUpdate(todo._id)}/>
            <DeleteIcon icon={faX} onClick={() => handleDelete(todo._id)}/>
            </>
        </Container>
    );
};

export default Todo;
import React, { useEffect } from "react";
import Todo from "./Todo";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompleted, getTodo } from "./store/actions/todoAction";

const Container = styled.div`
    border-radius: 10px;
    overflow: hidden;
    margin-top: 1rem;
    background-color: var(${props => props.mode? "--LTveryLightGray" : "--DTveryDarkDesaturatedBlue"});
    box-shadow: ${props => props.mode ? "0 0px 10px 5px rgb(133, 133, 133, 20%)" : "none"};
`

const TodoInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
`

const TodoStatus = styled.p`
    color: var(${props => props.mode? "--LTdarkGrayishBlue" : "--DTdarkGrayishBlue"});
    font-size: 16px;
`

const ClearAll = styled(TodoStatus)`
    + * {
        margin-left: 1rem;
    }

    &:hover{
        color: var(${props => props.mode? "--LTveryDarkGrayishBlue" : "--DTlightGrayishBlue"});
        cursor: pointer;
    }
`

const SortType = styled.div`
    display: flex;

    @media (max-width: 550px) {
        display: none;
    }
`

const ListTodo = ({ mode, sort, setSort, sortArray, setTodo }) => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getTodo())
    }, [dispatch]);

    const handleClearComplete = (all) => {
        dispatch(deleteCompleted(all));
    }

    return(
        <Container mode={mode}>
            {
            (sort === "Active") ?
                (todos.filter(todo => todo.isComplete === false).map(indTodo => 
                <Todo key={indTodo._id} todo={indTodo} setTodo={setTodo} mode={mode}/>)) :
            (sort === "Completed") ?
                (todos.filter(todo => todo.isComplete === true).map(indTodo => 
                <Todo key={indTodo._id} todo={indTodo} setTodo={setTodo} mode={mode}/>)) :
            todos.map(indTodo => 
                <Todo key={indTodo._id} todo={indTodo} setTodo={setTodo} mode={mode}/>)
            }
            <TodoInfo>
                <TodoStatus mode={mode}>{todos.filter(todo => todo.isComplete === false).length} items left</TodoStatus>
                <SortType>
                {
                    sortArray.map(sortList => 
                        <ClearAll
                        onClick={() => setSort(sortList)}
                        key={sortList}
                        mode={mode}
                        style={sortList === sort ? {color: "var(--PBrightBlue)"} : {}}
                            >{sortList}</ClearAll>
                    )
                }
                </SortType>
                <ClearAll mode={mode} onClick={() => handleClearComplete(auth._id)}>Clear Completed</ClearAll>
            </TodoInfo>
        </Container>
    );
};

export default ListTodo;
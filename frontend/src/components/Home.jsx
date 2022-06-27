import React, { useState } from 'react';
import AddTodo from './AddTodo';
import ListTodo from './ListTodo';
import SortTodo from './SortTodo';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Container = styled.div`
    padding: 0 2rem;
`

const TodoList = styled.div`
    max-width: 600px;
    margin: -20vh auto 3rem auto;
    justify-self: center;
`

const Home = ({ mode }) => {
    const sortArray = ["All", "Active", "Completed"];
    const [sort, setSort] = useState(sortArray[0]);
    const [todo, setTodo] = useState({
        title: "",
        isComplete: false
    });
    const auth = useSelector(state => state.auth);

    if (!auth._id) return <Navigate to="/signin"/>

    return(
        <Container>
            <TodoList>
                <AddTodo mode={mode} todo={todo} setTodo={setTodo}/>
                <ListTodo mode={mode} sort={sort} setSort={setSort} sortArray={sortArray} setTodo={setTodo}/>
                <SortTodo mode={mode} sort={sort} setSort={setSort} sortArray={sortArray}/>
            </TodoList>
        </Container>
    );
};

export default Home;
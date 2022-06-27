import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signIn } from "./store/actions/authAction";

const Container = styled.div`
    padding: 0 2rem;
`

const Form = styled.form`
    max-width: 500px;
    margin: 0 auto;
    justify-self: center;
    margin-top: -20vh;
    background-color: var(${props => props.mode? "--LTveryLightGray" : "--DTveryDarkDesaturatedBlue"});
    padding: 2rem;
    border-radius: 10px;
`

const Title = styled.h2`
    margin: 0 0 1rem;
`

const InputTodo = styled.input`
    width: 100%;
    border-radius: 10px;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 18px;
    padding: 1.5rem;
    margin: .5rem 0;
    border: none;
    background-color: var(${props => props.mode? "--LTveryLightGrayishBlue" : "--DTveryDarkGrayishBlueHover"});
    color: ${props => props.mode? "var(--LTveryDarkGrayishBlue)" : "var(--DTlightGrayishBlue)"};

    &:focus {
        outline: none;
    }
`

const SignInBtn = styled.button`
    border-radius: 10px;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 18px;
    padding: 1rem;
    margin-top: 1rem;
    border: none;
    background-color: var(--PBrightBlue);
    color: #FFF;
    cursor: pointer;
`

const SignIn = ({ mode }) => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    if (auth._id) return <Navigate to="/"/>

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(signIn(user));
        setUser({
            email: "",
            password: ""
        });
    }

    return(
        <Container>
            <Form mode={mode} onSubmit={handleSignIn}>
                <Title>Sign In</Title>
                <InputTodo 
                    mode={mode} 
                    autoFocus 
                    type="text" 
                    placeholder="Enter email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}/>
                <InputTodo 
                    mode={mode} 
                    type="password" 
                    placeholder="Enter password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}/>
                <SignInBtn type={"submit"} mode={mode}>SIGN IN</SignInBtn>
            </Form>
        </Container>
    );
};

export default SignIn;
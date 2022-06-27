import React from "react";
import styled from "styled-components";
import bgLight from "../images/bg-desktop-light.jpg";
import bgDark from "../images/bg-desktop-dark.jpg";
import { createGlobalStyle } from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "./store/actions/authAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const GlobalStyles = createGlobalStyle`
    body{
        background-color: var(${props => props.mode? "--LTveryLightGrayishBlue" : "--DTveryDarkBlue"});
        color: var(${props => props.mode? "--LTveryDarkGrayishBlue" : "--DTlightGrayishBlue"});
    
        @media (max-width: 550px) {
            font-size: 16px;
        }

        @media (max-width: 400px) {
            font-size: 12px;
        }
    }
`

const HeaderBg = styled.div`
    width: 100%;
    height: 40vh;
    background: url(${props => props.mode? bgLight : bgDark}) center center no-repeat;
    background-size: cover;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem;
`

const Header = styled.div`   
    display: flex;  
    align-items: center;
    justify-content: space-between;
    color: #FFF;
    max-width: 600px;
    flex-grow: 1;
`

const Title = styled.h1`
    letter-spacing: .5rem;
    cursor: default;
`

const Nav = styled.div`
    display: flex;
    align-items: center;
`

const NavMenu = styled.h4`
    font-weight: 400;
    margin: 0 .5rem;
    letter-spacing: 0rem;
    word-spacing: 0rem;
    cursor: pointer;
`

const Mode = styled(FontAwesomeIcon)`
    width: 1.8rem;
    height: 1.8rem;
    margin-left: 1rem;
    color: #FFF;
`

const Navbar = ({ mode, setMode }) => {  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleSignOut = () => {
        dispatch(signOut());
        navigate("/signin");
    }
    
    return (
        <>
        <GlobalStyles mode={mode}/>
        <HeaderBg mode={mode}>
            <Header>
                <Title onClick={() => navigate("/")}>TODO</Title>
                <Nav>
                    { (auth._id) ?
                    <NavMenu onClick={handleSignOut}>SIGN OUT</NavMenu> :
                    <>
                    <NavMenu onClick={() => navigate("/signin")}>SIGN IN</NavMenu>
                    <NavMenu onClick={() => navigate("/signup")}>SIGN UP</NavMenu>
                    </>
                    }
                    <Mode icon={mode? faMoon : faSun} mode={mode} onClick={() => setMode(+!mode)}/>
                </Nav>
            </Header>
        </HeaderBg>
        </>
    )
}

export default Navbar;
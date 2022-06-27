import React from "react";
import styled from "styled-components";

const Container = styled.div`
    border-radius: 10px;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    background-color: var(${props => props.mode? "--LTveryLightGray" : "--DTveryDarkDesaturatedBlue"});
    color: var(${props => props.mode? "--LTdarkGrayishBlue" : "--DTdarkGrayishBlue"});

    @media (min-width: 550px) {
        display: none;
    }
`

const SortType = styled.p`
    font-weight: 700;
    margin: 1rem;

    &:hover {
        color: var(${props => props.mode? "--LTveryDarkGrayishBlue" : "--DTlightGrayishBlue"});
        cursor: pointer;
}
`

const SortTodo = ({ mode, sort, setSort, sortArray }) => {
    return(
        <Container mode={mode}>
            {sortArray.map(sortList => 
                <SortType 
                onClick={() => setSort(sortList)}
                key={sortList}
                mode={mode}
                style={sortList === sort ? {color: "var(--PBrightBlue)"} : {}}
                >{sortList}</SortType>
            )}
        </Container>
    );
};

export default SortTodo;
import styled from '@emotion/styled';
import React from 'react';

const StyledButton = styled.div`
    display: flex;
    place-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #f1f3f4;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: #dddfe0;
    }
`;

const Button = ({ onClick, round, icon: Icon, onHover, onMouseOut }) => {
    return (
        <StyledButton onClick={onClick} style={{ borderRadius: round ? '50%' : '8%' }} onMouseOver={onHover}>
            <Icon />
        </StyledButton>
    );
};

export default Button;

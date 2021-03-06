import React from 'react';
import Toast from 'react-bootstrap/Toast';
import styled from 'styled-components';

const PositionDiv = styled.div`
    position: fixed;
    z-index: 1;
    bottom: 200px;
    text-align: center;
    width: 100%;
`;

const DisguisedToast = styled(Toast)`
    margin: 0 auto;
`;

const HoverToast = (props) => {
    return (
        <PositionDiv>
            <DisguisedToast onClose={() => props.handleClick()} show={props.show} delay={3000} autohide>
                <Toast.Body>{props.text}</Toast.Body>
            </DisguisedToast>
        </PositionDiv>
    )
};

export default HoverToast;
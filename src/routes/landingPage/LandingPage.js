import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import HoverToast from '../../components/hovertoast';

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const LandingPage = (props) => {
    const [showToast, toggleToast] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <StyledDiv style={{ height: '100%' }}>
            <HoverToast show={showToast} handleClick={() => toggleToast(false)}
                text={"Incorrect username or password"} />
            <div style={{ backgroundColor: "#2D9CDB", width: '100%', height: '80px', position: 'absolute', top: 0 }} />
            <h1>where @</h1>
            <p style={{ textAlign: 'center' }}>Finding the right studying environment at UCSD</p>
            <p>Login below to get started!</p>
            <Form>
                <Form.Group controlId='formUsername'>
                    <Form.Control placeholder='Email' onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                    <Form.Control placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
            </Form>
            <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: 'repeat(2, 1fr)'}}>
            <Button variant='primary'
                onClick={(((username === "exampleuser@gmail.com") && (password === "testpassword")) ?
                    props.logIn : () => toggleToast(true))}>
                Login
            </Button>
            <Button variant='secondary'
                onClick={props.logIn}>
                Guest login
            </Button>
            </div>
        </StyledDiv>
    )
};

export default LandingPage;

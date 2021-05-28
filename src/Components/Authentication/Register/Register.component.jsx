import React, { useState } from 'react';
import { Grid, Form, Segment, Header, Icon, Button, Message } from 'semantic-ui-react';
import "./Register.component.css";


const Register = () => {


    let user = {
        userName: '',
        email: '',
        password: '',
        confirmpassword: ''


    }

    const [userState, setUserState] = useState(user);
    // const [errorState, setErrorState] = useState(error);


    const handleInput = (event) => {

        let target = event.target;
        setUserState((currentState) => {
            let currentUser = { ...currentState };
            currentUser[target.name] = target.value;
            return currentUser;
        })

    }

    const checkForm = () => {
        if (isFormEmpty()) {
            // setErrorState((error) => error.concat({ Message: "Please fill up all field" }));
            return false;
        }
        else if (checkPassword) {
            // setErrorState((error) => error.concat({ message: "Please fill with the correct password" }));
            return false;
        }

        return true;
    }

    const isFormEmpty = () => {
        return !userState.userName.length ||
            !userState.password.length ||
            !userState.confirmpassword ||
            !userState.email.length;
    }

    const checkPassword = () => {
        if (userState.password.length < 8) {
            return false;
        }
        else if (userState.password !== userState.confirmpassword) {
            return false;
        }
        return true;

    }

    const onSubmit = (event) => {
        // setErrorState(() => []);
        if (checkForm()) {

        } else {

        }

    }

    // const errorMessage = () => {
    //     return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    // }

    return (<Grid verticalAlign='middle' textAlign='center' >

        <Grid.Column style={{ maxWidth: '400px' }} className="form-style" >
            <Header icon as='h2'>
                <Icon name="wechat" />
                Register Now<br />
                তোমার বন্ধুরা অপেক্ষা করছে !<br />
                Don't miss your friends.


            </Header>

            <Form onSubmit={onSubmit}>
                <segment stacked>
                    <Form.Input
                        name='userName'
                        value={userState.userName}
                        icon='user'
                        iconPosition='left'
                        onChange={handleInput}
                        type='text'
                        placeholder='User Name'

                    />
                    <Form.Input
                        name='mail'
                        value={userState.email}
                        icon='mail'
                        iconPosition='left'
                        onChange={handleInput}
                        type='email'
                        placeholder='User Email'

                    />
                    <Form.Input
                        name='password'
                        value={userState.password}
                        icon='lock'
                        iconPosition='left'
                        onChange={handleInput}
                        type='password'
                        placeholder='User password'

                    />
                    <Form.Input
                        name='confirmpassword'
                        value={userState.confirmpassword}
                        icon='lock'
                        iconPosition='left'
                        onChange={handleInput}
                        type='password'
                        placeholder='Confirm password'

                    />


                </segment>
                <Button>Submit</Button>
            </Form>

            {/* {
                errorState.length > 0 && <Message error>
                    <h4>Errors:</h4>
                    {errorMessage()}

                </Message>
            } */}
        </Grid.Column>

    </Grid>)
}
export default Register;

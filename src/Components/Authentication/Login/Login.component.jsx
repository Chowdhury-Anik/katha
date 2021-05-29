import React, { useState } from 'react';
import firebase from "../../../Server/Firebase";
import "../Login/Login.css";
import { Grid, Form, Segment, Header, Icon, Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';







const Login = () => {

    let user = {
        email: '',
        password: '',

    }

    let errors = [];


    const [userState, setUserState] = useState(user);
    const [errorState, seterrorState] = useState(errors);
    const [isLoading, setIsLoading] = useState(false);


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
            seterrorState((error) => error.concat({ Message: "Please fill up all field" }));
            return false;
        }
        return true;
    }


    const isFormEmpty = () => {
        return !userState.password.length ||

            !userState.email.length;
    }

    const errorMessage = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    const onSubmit = (event) => {
        seterrorState(() => []);
        if (checkForm()) {
            setIsLoading(true);
            firebase.auth()
                .signInWithEmailAndPassword(userState.email, userState.password)
                .then(user => {
                    setIsLoading(false);
                    console.log(user);

                })

                .catch(serverError => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));


                })
        }
    }





    return (<Grid verticalAlign='middle' textAlign='center' >

        <Grid.Column style={{ maxWidth: '400px' }} className="form-style" >
            <Header icon as='h2'>
                <Icon name="wechat" />
                Welcome back...<br />
                তোমার বন্ধুরা তোমাকে খুজছে !<br />
                Login Now


            </Header>

            <Form onSubmit={onSubmit}>
                <Segment stacked>

                    <Form.Input
                        name='email'
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



                </Segment>
                <Button disabled={isLoading} loading={isLoading}>Login</Button>
            </Form>

            {
                errorState.length > 0 && <Message error>
                    <h4>Errors</h4>
                    {errorMessage()}

                </Message>
            }

            <Message>
                Not an User? <Link to="/register" >Register </Link>
            </Message>





        </Grid.Column>

    </Grid>)
}


export default Login;

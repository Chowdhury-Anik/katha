import React, { useState } from 'react';
import { Grid, Form, Segment, Header, Icon, Button, Message } from 'semantic-ui-react';
import "./Register.css";
import firebase from "../../../Server/Firebase";
import { Link } from 'react-router-dom';


const Register = () => {


    let user = {
        userName: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    let errors = [];

    let userCollectionRef = firebase.database().ref('users');

    const [userState, setUserState] = useState(user);
    const [errorState, seterrorState] = useState(errors);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


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
        else if (!checkPassword()) {
            return false;
        }

        return true;
    }

    const isFormEmpty = () => {
        return !userState.userName.length ||
            !userState.password.length ||
            !userState.confirmpassword.length ||
            !userState.email.length;
    }

    const checkPassword = () => {
        if (userState.password.length < 8) {
            seterrorState((error) => error.concat({ message: "Please fill with the correct password" }));
            return false;
        }
        else if (userState.password !== userState.confirmpassword) {
            seterrorState((error) => error.concat({ message: "Please fill with the same password" }));
            return false;
        }
        return true;

    }

    const onSubmit = (event) => {
        seterrorState(() => []);
        setIsSuccess(false);

        if (checkForm()) {
            setIsLoading(true);
            firebase.auth()
                .createUserWithEmailAndPassword(userState.email, userState.password)
                .then(createdUser => {
                    setIsLoading(false);
                    updateUserDetails(createdUser);

                })

                .catch(serverError => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));


                })
        }

        const updateUserDetails = (createdUser) => {

            if (createdUser) {
                setIsLoading(true);
                createdUser.user
                    .updateProfile({
                        displayName: userState.userName,
                        photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`

                    })
                    .then(() => {
                        setIsLoading(false);

                        saveUserInDB(createdUser);
                    })
                    .catch((serverError) => {
                        setIsLoading(false);

                        seterrorState((error) => error.concat(serverError));

                    })
            }
        }

    }

    const saveUserInDB = (createdUser) => {
        setIsLoading(true);
        userCollectionRef.child(createdUser.user.uid).set({
            displayName: createdUser.user.displayName,
            photoURL: createdUser.user.photoURL
        })
            .then(() => {
                setIsLoading(false);
                setIsSuccess(true);
            })
            .catch(serverError => {
                setIsLoading(false);
                seterrorState((error) => error.concat(serverError));
            })
    }

    const errorMessage = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    return (<Grid verticalAlign='middle' textAlign='center' >

        <Grid.Column style={{ maxWidth: '400px' }} className="form-style" >
            <Header icon as='h2'>
                <Icon name="wechat" />
                Register Now<br />
                তোমার বন্ধুরা অপেক্ষা করছে !<br />
                Don't miss your friends.


            </Header>

            <Form onSubmit={onSubmit}>
                <Segment stacked>
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
                    <Form.Input
                        name='confirmpassword'
                        value={userState.confirmpassword}
                        icon='lock'
                        iconPosition='left'
                        onChange={handleInput}
                        type='password'
                        placeholder='Confirm password'

                    />


                </Segment>
                <Button disabled={isLoading} loading={isLoading}>Submit</Button>
            </Form>

            {
                errorState.length > 0 && <Message error>
                    <h4>Errors</h4>
                    {errorMessage()}

                </Message>
            }
            {isSuccess && <Message success>
                <h3>Successfully Registered</h3>
            </Message>
            }
            <Message>
                Already an User? <Link to="/login" >Login </Link>
            </Message>





        </Grid.Column>

    </Grid>)
}
export default Register;

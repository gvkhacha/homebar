import React from 'react';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {loginUser, loginFromSession} from '../actions/userActions';
import axios from 'axios';
import {
    Container,
    Checkbox,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Link,
    Grid,
    Typography,
} from '@material-ui/core';

//eslint-disable-next-line
const EMAIL_RE = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loginFromSession())
            .then(() => {
                history.push('/');
            })
    })
  
    const login = (e) => {
        e.preventDefault();
        if(validateEmail()){
            const user = {
                email,
                password
            };

            dispatch(loginUser(user)).then((err) => {
                if(err){
                    setError(true);
                }else{
                    history.push('/');
                }
            })
        }
    }

    const validateEmail = () => {
        return true;
        return EMAIL_RE.test(email);
    }

    const test = () => {
        axios.get('/users/test').then(res => console.log(res));
    }


    return (
        <Container component="main" maxWidth="xs" className="loginComponent">
            <CssBaseline />
            <div className="header">
                <Avatar></Avatar>
                <Typography component="h1" variant="h5">Sign In</Typography>
            </div>
            <form noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={error || (email === '' ? false : !validateEmail())}
                    helperText={error ? "Invalid email or password" : "Must be a valid e-mail address"}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={error}
                    helperText={error ? "Invalid email or password" : ""}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={login}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2" onClick={test}>
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
      )
}

export default LoginComponent;
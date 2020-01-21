import React from 'react';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {loginUser} from '../actions/userActions';
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core';


//eslint-disable-next-line
const EMAIL_RE = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

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
        return EMAIL_RE.test(email);
    }

    const resetPass = () => {
        console.log("TODO: Reset password request");
    }

    return (
        <>
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
                    <Link href="#" variant="body2" onClick={() => setOpen(true)}>
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
        <Dialog
            onClose={() => setOpen(false)} open={open}
            aria-labelledby="forgot-password-dialog"
        >
            <DialogTitle onClose={() => setOpen(false)}>Reset Password</DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Please enter the email address associated with your account. We will send you an email with instructions on how to reset your password.
                </Typography>
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
                    helperText={"A form will be sent to your email"}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => setOpen(false)}>Cancel</Button>
                <Button autoFocus onClick={resetPass} color='primary'>Submit</Button>
            </DialogActions>
        </Dialog>
        </>
      )
}

export default LoginComponent;
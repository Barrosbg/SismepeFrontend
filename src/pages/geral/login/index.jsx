import './login.css'
import logo from './../../../assets/logo.png'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { login, signup, validateToken } from '../../../actions/geral/actions'
import { Redirect } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextInput from '../../../components/general/textInput';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.title = "Página de Acesso";
        if (this.props.loginState.user) {
           this.props.validateToken(this.props.loginState.user.token)
        }
    }

    onSubmit(values) {
        const { login } = this.props
        login(values)
    }

    render() {
       
        const { user, validToken } = this.props.loginState
        if (user && validToken) {
            return <Redirect to='/home'/>
        } else {
         
            const { handleSubmit } = this.props
            return (
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="sm">
                        <div className="logo">
                            <img src={logo} className="img-fluid"></img>
                        </div>
                        <form onSubmit={handleSubmit(v => this.onSubmit(v))} method='POST'>
                            <Field
                                component={TextInput}
                                type="text" 
                                name="login"
                                label="Login"
                                variant="outlined"
                                fullWidth={true}
                                />

                            <Field
                                component={TextInput}
                                type="password" 
                                name="senha"
                                label="Senha"
                                variant="outlined"
                                fullWidth={true}
                                />
                            
                            <Button variant="contained" size="large" type="submit" className="colorPrimary" fullWidth={true} >
                                ENTRAR
                            </Button>
                        </form>
                        <Grid container style={{marginTop: '30px'}} justifyContent="flex-end">
                            <Link to="/esqueci-senha">Esqueceu sua senha?</Link>
                        </Grid>
                    </Container>
                </React.Fragment>
            );
        }
    }
}


LoginPage = reduxForm({ form: 'loginForm' })(LoginPage)
const mapStateToProps = state => ({ loginState: state.login })
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup, validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

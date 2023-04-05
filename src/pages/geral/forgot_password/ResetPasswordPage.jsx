import React, { useState } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextInput from '../../../components/general/textInput';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { cpfMask } from "../../../services/general";
import { validateEmail, validateCPF, validatePassword, validateConfirmPassword } from "../../../services/validators";
import { resetPassword, validateTokenResetPassword } from "../../../actions/geral/actions";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import BackdropGeneral from "../../../components/general/backdropGeneral";

const useStyles = makeStyles({
    root: {
      minWidth: "100%",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
});

const validate = (values) => {
    const errors = {};
    const requiredFields = [
        'senha',
        'confirmacaoSenha'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Campo obrigatório';
        }
    });

    if (
        values.senha && !validatePassword(values.senha).status
    ) {
        errors.senha = validatePassword(values.senha).warnings[0];
    }

    if (
        values.confirmacaoSenha && !validateConfirmPassword(values.senha, values.confirmacaoSenha).status
    ) {
        errors.confirmacaoSenha = validateConfirmPassword(values.senha, values.confirmacaoSenha).warnings[0];
    }

    return errors;
}



function ResetPasswordPage(props) {
    const { handleSubmit, pristine, reset, submitting, valid } = props;
    const [validToken, setValidToken] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passwordChanged, setpasswordChanged] = useState(false);
    const classes = useStyles();

    const onSubmit = async (values) => {
        const { senha } = values;
        setLoading(true)
        let response = await resetPassword({ novaSenha: senha, token: token });
        setLoading(false);
        if (response) {
            setpasswordChanged(true);
            reset();
        }
        return response;
    }

    useEffect(async () => {
        if (props.match.params.token) {
            setLoading(true);
            setToken(props.match.params.token);
            let response = await validateTokenResetPassword(props.match.params.token);
            setValidToken(response);
            setLoading(false);
        }
    }, []);


    return (
        <React.Fragment>
            <CssBaseline />
            <BackdropGeneral open={loading} />
            {
                validToken || loading ?
                    <Container maxWidth="sm">
                        <Typography variant="h5" style={{ marginTop: '15vh' }}>Alteração de Senha</Typography>
                        <div style={{ marginTop: '10px' }}>Insira a sua nova senha e clique em alterar, para realizarmos a modificação no sistema. </div>
                        <form onSubmit={handleSubmit(v => onSubmit(v))} method='POST'>
                            <Field
                                component={TextInput}
                                type="password"
                                name="senha"
                                label="Senha"
                                fullWidth={true}
                                variant="outlined"
                            />
                            <Field
                                component={TextInput}
                                type="password"
                                name="confirmacaoSenha"
                                label="Confirmação de Senha"
                                fullWidth={true}
                                variant="outlined"
                            />
                            <Button variant="contained" size="large" type="submit" className="colorPrimary" fullWidth={true}>
                                ALTERAR
                            </Button>
                        </form>
                        <Grid container style={{marginTop: '30px'}} justifyContent="flex-end">
                            <Link to="/">Página de Login</Link>
                        </Grid>
                        
                    </Container>

                    :

                    <Grid
                        container
                        className={classes.root}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <SentimentVeryDissatisfiedIcon style={{fontSize: '80px'}}/>
                        <Typography variant="h6" style={{color: '#999', fontWeight: 'normal'}}>Esse link já foi utilizado ou está incorreto</Typography>
                    </Grid>

            }
        </React.Fragment>
    );
}

ResetPasswordPage = reduxForm({ form: 'resetPasswordForm', validate })(ResetPasswordPage)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(null, mapDispatchToProps)(ResetPasswordPage)
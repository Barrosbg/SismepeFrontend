import React, { useState } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextInput from '../../../components/general/textInput';
import { Grid, Typography } from '@mui/material';
import { cpfMask } from "../../../services/general";
import { validateEmail, validateCPF } from "../../../services/validators";
import { forgotPassword } from "../../../actions/geral/actions";
import BackdropGeneral from "../../../components/general/backdropGeneral";
import { Link } from "react-router-dom";


const validate = (values) => {
  let valid = false;
  let errors = {};
  const requiredFields = [
    'email',
    'cpf'
  ];
  requiredFields.forEach(field => {
    if (!values[field] && !valid) {
      errors[field] = 'Campo obrigatório';
    } else {
      valid = true;
    }
  });
  if (
    values.email &&
    !valid &&
    !validateEmail(values.email)
  ) {
    errors.email = 'E-mail inválido!';
  }
  if (
    values.cpf &&
    !valid &&
    !validateCPF(values.cpf)
  ) {
    errors.cpf = 'CPF inválido!';
  }

  if(valid){
    errors = {};
  }

  return errors;
}



function ForgotPasswordPage(props) {
  const { handleSubmit, pristine, reset, submitting, valid } = props;

  const [loading, setLoading] = useState(false);


  const onSubmit = async (values) => {
    setLoading(true)
    let response = await forgotPassword(values);
    setLoading(false);
    if (response) {
      reset();
    }
    return response;
  }



  return (
    <React.Fragment>
      <CssBaseline />
      <BackdropGeneral open={loading} />
      <Container maxWidth="sm">
        <Typography variant="h5" style={{ marginTop: '25vh' }}>Recuperação de Conta</Typography>
        <div style={{ marginTop: '10px' }}>Para recuperar a sua conta, informe o seu e-mail que foi cadastrado no SISMEPE <strong>ou</strong> o seu CPF e clique em enviar, para fazermos a validação dos seus dados. </div>
        <form onSubmit={handleSubmit(v => onSubmit(v))} method='POST'>
          <Field
            component={TextInput}
            type="email"
            name="email"
            label="E-mail"
            fullWidth={true}
            variant="outlined"
          />

          <div style={{ width: '100%', textAlign: 'center' }}>ou</div>

          <Field
            component={TextInput}
            type="text"
            name="cpf"
            label="CPF"
            fullWidth={true}
            normalize={(value) => cpfMask(value)}
            variant="outlined"
          />

          <Button variant="contained" size="large" type="submit" className="colorPrimary" fullWidth={true}>
            ENVIAR
          </Button>
        </form>
        <Grid container style={{ marginTop: '20px' }} justifyContent="center">
          <Link to="/">Página de Login</Link>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

ForgotPasswordPage = reduxForm({ form: 'forgotPasswordForm', validate })(ForgotPasswordPage)
const mapStateToProps = state => ({ loginState: state.login })
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage)
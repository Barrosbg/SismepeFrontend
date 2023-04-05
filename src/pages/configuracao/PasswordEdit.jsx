import React, { Component } from "react";
import DialogHeadFooter from "../../components/general/dialogHeaderFooter";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { validatePassword } from "../../services/validators";
import { Alert } from '@mui/material';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { alterarAcesso, usuarioDetalhes }  from "../../actions/configuracao/actions";
import { logout } from "../../actions/geral/actions";
import { toast } from "react-toastify";

const INITIAL_STATE = {
    passwordAtual: "",
    novoPassword: "",
    confirmNovoPassword: "",
    errorPasswordAtual: false,
    errorNovoPassword: false,
    errorConfirmNovoPassword: false,
    listErrorsPasswordAtual: [],
    listErrorsNovoPassword: [],
    listErrorsConfirmNovoPassword: [],
};
class PasswordEdit extends Component {

    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
    }

    closeModal = () => {
        this.setState(INITIAL_STATE);
        this.props.handleModal(false);
    }
    onChange = (e) => {
        if (e.target.name === 'password_atual') {
            this.setState({ passwordAtual: e.target.value, errorPasswordAtual: !validatePassword(e.target.value).status, listErrorsPasswordAtual: validatePassword(e.target.value).warnings });
        } else if (e.target.name === 'novo_password') {
            this.setState({ novoPassword: e.target.value, errorNovoPassword:  !validatePassword(e.target.value).status, listErrorsNovoPassword: validatePassword(e.target.value).warnings });
        } else if (e.target.name === 'confirm_novo_password') {
            this.setState({ confirmNovoPassword: e.target.value, errorConfirmNovoPassword:  !validatePassword(e.target.value).status, listErrorsConfirmNovoPassword: validatePassword(e.target.value).warnings });
        }
    }

    formIsValid = () => {
        let valid = true;
        const {errorNovoPassword, errorConfirmNovoPassword, passwordAtual, novoPassword, confirmNovoPassword} = this.state;
        if(!passwordAtual.length){
            valid = false;
            toast.warning('Insira sua senha atual!');
        }

        if((!novoPassword.length || errorNovoPassword) && valid){
            valid = false;
            toast.warning('A nova senha está vazia ou não atende aos pré-requisitos necessários!');
        }

        if((!confirmNovoPassword.length || errorConfirmNovoPassword) && valid){
            valid = false;
            toast.warning('Verifique o campo de confirmação de senha!');
        }

        return valid;
    }

    submit = async () => {
        
        if(this.formIsValid()){
            const { passwordAtual, novoPassword } = this.state;
            let data = await alterarAcesso({ senhaAtual: passwordAtual, novaSenha: novoPassword }, 'senha');
            if(data){
                toast.success('Senha alterada com sucesso!');
                this.props.usuarioDetalhes();
                this.closeModal();
            }
        }
    
    }


    render(){
        return <DialogHeadFooter title="Alterar Senha" isOpen={this.props.open} onClose={this.closeModal}
            footer={
                <div style={{padding: '20px !important'}}>
                    <Button onClick={this.closeModal}
                        style={{
                            backgroundColor: "#e04747",
                            color: "white",
                            margin: "10px"
                        }}
                        variant="contained">
                        CANCELAR
                    </Button>
                    <Button onClick={this.submit}
                        style={{
                            backgroundColor: "#3c8dbc",
                            color: "white",
                            margin: "10px"
                        }}
                        variant="contained">
                        SALVAR
                    </Button>
                </div>
            }>
            <Grid container spacing={1}>
                
                <Grid item={true} sm={12} xs={12} md={12}>
                    <TextField
                        margin="dense"
                        label="Senha Atual"
                        name="password_atual"
                        type="password"
                        variant="outlined"
                        value={this.state.passwordAtual}
                        onChange={this.onChange}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item={true} sm={12} xs={12} md={12}>
                    <TextField
                        margin="dense"
                        label="Nova Senha"
                        name="novo_password"
                        type="password"
                        variant="outlined"
                        value={this.state.novoPassword}
                        onChange={this.onChange}
                        error={this.state.errorNovoPassword }
                        fullWidth={true}
                    />
                    { this.state.novoPassword.length ? this.state.listErrorsNovoPassword.map((e) => {
                        return <Alert severity="error" style={{marginBottom: '5px'}}><strong>{e}</strong></Alert>
                    })
                    : ""}
                </Grid>
                <Grid item={true} sm={12} xs={12} md={12}>
                    <TextField
                        margin="dense"
                        label="Confirmação Nova Senha"
                        name="confirm_novo_password"
                        type="password"
                        variant="outlined"
                        value={this.state.confirmNovoPassword}
                        onChange={this.onChange}
                        error={(this.state.errorConfirmNovoPassword) || (this.state.novoPassword !== this.state.confirmNovoPassword) }
                        fullWidth={true}
                    />
                    { this.state.confirmNovoPassword.length && this.state.novoPassword.length && !this.state.errorNovoPassword ? this.state.listErrorsConfirmNovoPassword.map((e) => {
                        return <Alert severity="error" style={{marginBottom: '5px'}}><strong>{e + '\n' + e}</strong></Alert>
                    })
                    : ""                   
                    
                    }

                    {
                        (this.state.confirmNovoPassword.length) && (this.state.novoPassword !== this.state.confirmNovoPassword) 
                        ?
                        <Alert severity="error" style={{marginBottom: '5px'}}><strong>Senhas não conferem!</strong></Alert> 
                        : ""
                    }
                </Grid>
            </Grid>
        </DialogHeadFooter>;
    }
}

const mapStateToProps = state => ({ usuario: state.usuario });
const mapDispatchToProps = dispatch => bindActionCreators({ 
    usuarioDetalhes,
    logout
 }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PasswordEdit);
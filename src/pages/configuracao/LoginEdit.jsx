import React, { Component } from "react";
import DialogHeadFooter from "../../components/general/dialogHeaderFooter";
import { Button, Grid, TextField } from "@mui/material";
import  { alterarAcesso, usuarioDetalhes }  from "../../actions/configuracao/actions";
import { bindActionCreators } from "redux";
import { logout } from "../../actions/geral/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const INITIAL_STATE = {
    novoLogin: "",
    confirmNovoLogin: "",
    errorLoginAtual: false,
    errorNovoLogin: false,
    errorConfirmNovoLogin: false,
};

class LoginEdit extends Component {

    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
    }

    closeModal = () => {
        this.setState(INITIAL_STATE);
        this.props.handleModal(false);
    }
    onChange = (e) => {
        if (e.target.name === 'login_atual') {
            this.setState({ loginAtual: e.target.value, errorLoginAtual: e.target.value.length === 0 });
        } else if (e.target.name === 'novo_login') {
            this.setState({ novoLogin: e.target.value, errorNovoLogin: e.target.value.length === 0 });
        } else if (e.target.name === 'confirm_novo_login') {
            this.setState({ confirmNovoLogin: e.target.value, errorConfirmNovoLogin: e.target.value.length === 0 || e.target.value !== this.state.novoLogin });
        }
    }

    formIsValid = () => {
        let valid = true;
        const {errorNovoLogin, errorConfirmNovoLogin, novoLogin, confirmNovoLogin} = this.state;
        if(!novoLogin.length || errorNovoLogin){
            valid = false;
            toast.warning('Insira o novo login!');
        }

        if((!confirmNovoLogin.length || confirmNovoLogin !== novoLogin) && valid){
            valid = false;
            toast.warning('Verifique o campo de confirmação de login!');
        }

        return valid;
    }

    submit = async () => {
        
        if(this.formIsValid()){
            const { novoLogin } = this.state;
            let data = await alterarAcesso({ login: novoLogin }, 'login');
            if(data){
                toast.success('Login alterado com sucesso!');
                this.props.usuarioDetalhes();
                this.closeModal();
            }
        }
    
    }


    render(){
        return <DialogHeadFooter title="Alterar Login" isOpen={this.props.open} onClose={this.closeModal}
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
                        disabled
                        margin="dense"
                        label="Login Atual"
                        name="login_atual"
                        type="text"
                        variant="outlined"
                        value={this.props.usuario.login}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item={true} sm={12} xs={12} md={12}>
                    <TextField
                        margin="dense"
                        label="Novo Login"
                        name="novo_login"
                        type="text"
                        variant="outlined"
                        value={this.state.novoLogin}
                        onChange={this.onChange}
                        error={this.state.errorNovoLogin }
                        helperText={this.state.errorNovoLogin  ? "Login inválido" : "" }
                        fullWidth={true}
                    />
                </Grid>
                <Grid item={true} sm={12} xs={12} md={12}>
                    <TextField
                        margin="dense"
                        label="Confirmação Novo Login"
                        name="confirm_novo_login"
                        type="text"
                        variant="outlined"
                        value={this.state.confirmNovoLogin}
                        onChange={this.onChange}
                        error={(this.state.novoLogin !== this.state.confirmNovoLogin) && (this.state.confirmNovoLogin.length)}
                        helperText={this.state.confirmNovoLogin.length && this.state.novoLogin !== this.state.confirmNovoLogin ? "Login de confirmação diferente do novo login" : ""}
                        fullWidth={true}
                    />
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginEdit);

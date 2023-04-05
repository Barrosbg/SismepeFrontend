import React, { Component } from "react";
import DialogHeadFooter from "../../components/general/dialogHeaderFooter";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { validateEmail } from "../../services/validators";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import  { alterarAcesso, usuarioDetalhes }  from "../../actions/configuracao/actions";
import { toast } from "react-toastify";

const INITIAL_STATE = {
    emailAtual: "",
    novoEmail: "",
    confirmNovoEmail: "",
    errorEmailAtual: false,
    errorNovoEmail: false,
    errorConfirmNovoEmail: false,
};
class EmailEdit extends Component {

    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
    }

    closeModal = () => {
        this.setState(INITIAL_STATE);
        this.props.handleModal(false);
    }
    onChange = (e) => {
        if (e.target.name === 'email_atual') {
            this.setState({ emailAtual: e.target.value, errorEmailAtual: !validateEmail(e.target.value)  });
        } else if (e.target.name === 'novo_email') {
            this.setState({ novoEmail: e.target.value, errorNovoEmail: !validateEmail(e.target.value)  });
        } else if (e.target.name === 'confirm_novo_email') {
            this.setState({ confirmNovoEmail: e.target.value, errorConfirmNovoEmail: !validateEmail(e.target.value)  });
        }
    }

    formIsValid = () => {
        let valid = true;
        const {errorNovoEmail, errorConfirmNovoEmail, novoEmail, confirmNovoEmail} = this.state;
        if(!novoEmail.length || errorNovoEmail){
            valid = false;
            toast.warning('Insira o novo e-mail válido!');
        }

        if((!confirmNovoEmail.length || confirmNovoEmail !== novoEmail) && valid){
            valid = false;
            toast.warning('Verifique o campo de confirmação de e-mail!');
        }

        return valid;
    }

    submit = async () => {
        
        if(this.formIsValid()){
            const { novoEmail } = this.state;
            let data = await alterarAcesso({ email: novoEmail }, 'email');
            if(data){
                toast.success('E-mail alterado com sucesso!');
                this.props.usuarioDetalhes();
                this.closeModal();
            }
        }
    
    }


    render(){
        return <DialogHeadFooter title="Alterar E-mail" isOpen={this.props.open} onClose={this.closeModal}
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
                        disabled
                        label="E-mail Atual"
                        name="email_atual"
                        type="text"
                        variant="outlined"
                        value={this.props.usuario.email}
                        onChange={this.onChange}
                        error={this.state.errorEmailAtual && this.state.emailAtual.length }
                        helperText={this.state.errorEmailAtual && this.state.emailAtual.length  ? "E-mail inválido" : "" }
                        fullWidth={true}
                    />
                </Grid>
                <Grid item={true} sm={12} xs={12} md={12}>
                    <TextField
                        margin="dense"
                        label="Novo E-mail"
                        name="novo_email"
                        type="text"
                        variant="outlined"
                        value={this.state.novoEmail}
                        onChange={this.onChange}
                        error={this.state.errorNovoEmail && this.state.novoEmail.length }
                        helperText={this.state.errorNovoEmail && this.state.novoEmail.length  ? "E-mail inválido" : "" }
                        fullWidth={true}
                    />
                </Grid>
                <Grid item={true} sm={12} xs={12} md={12}>
                    <TextField
                        margin="dense"
                        label="Confirmação Novo E-mail"
                        name="confirm_novo_email"
                        type="text"
                        variant="outlined"
                        value={this.state.confirmNovoEmail}
                        onChange={this.onChange}
                        error={this.state.confirmNovoEmail.length && (this.state.novoEmail !== this.state.confirmNovoEmail || this.errorConfirmNovoEmail)}
                        helperText={this.state.errorConfirmNovoEmail && this.state.confirmNovoEmail.length  ? "E-mail inválido" : this.state.confirmNovoEmail.length && this.state.novoEmail !== this.state.confirmNovoEmail ? "E-mail de confirmação diferente do novo e-mail" : "" }
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
        </DialogHeadFooter>;
    }
}

const mapStateToProps = state => ({ usuario: state.usuario });
const mapDispatchToProps = dispatch => bindActionCreators({ 
    usuarioDetalhes
 }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmailEdit);
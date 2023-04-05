import { Avatar, Button, Container, Divider, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { Component } from "react";
import InputDate from "../../components/general/dateInput";
import InputSelect from "../../components/general/select/select";
import { cpfMask, cepMask, cellphoneMask, dateBrToUsWithOneMoreDay } from "../../services/general";
import { validateCPF } from "../../services/validators";
import { usuarioDetalhes } from "../../actions/configuracao/actions";
import ImageEdit from "./ImageEdit";
import EmailEdit from "./EmailEdit";
import LoginEdit from "./LoginEdit";
import PasswordEdit from "./PasswordEdit";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


const INITIAL_STATE = {
    avatar: "",
    login: "",
    email: "",
    senha: "",
    nome: "",
    matricula: "",
    digito: "",
    dataNascimento: null,
    cpf: "",
    rg: "",
    orgaoExpedidor: "",
    ufExpedidor: "",
    telefone: "",
    cep: "",
    cidade: "",
    uf: "",
    rua: "",
    bairro: "",
    numero: "",
    complemento: "",
    srcImage: "https://br.hubspot.com/hubfs/How%20to%20Edit%20%26%20Customize%20User%20Roles%20in%20WordPress.jpeg",
    modalImageIsOpen: false,
    modalEmailIsOpen: false,
    modalLoginIsOpen: false,
    modalSenhaIsOpen: false,
    errorCpf: false,
};

class ConfiguracaoPage extends Component{

    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
    }

    componentWillMount(){
        document.title = "Configurações do Usuário";
        const { usuario } = this.props;
        if(usuario){
            this.setState({
                login: usuario.login,
                email: usuario.email,
                nome: usuario.pessoa && usuario.pessoa.nome ? usuario.pessoa.nome : "",
                matricula: usuario.pessoa && usuario.pessoa.matricula ? usuario.pessoa.matricula : "",
                dataNascimento: usuario.pessoa && usuario.pessoa.dataNascimento ? new Date(dateBrToUsWithOneMoreDay(usuario.pessoa.dataNascimento)) : null,
                cpf: usuario.pessoa && usuario.pessoa.cpf ? cpfMask(usuario.pessoa.cpf) : "",
                rg: usuario.pessoa && usuario.pessoa.rg ? usuario.pessoa.rg : "",
                telefone: usuario.pessoa && usuario.pessoa.telefone ? cellphoneMask(usuario.pessoa.telefone) : "",
                cep: usuario.pessoa && usuario.pessoa.endereco && usuario.pessoa.endereco.cep ? cepMask(usuario.pessoa.endereco.cep) : "",
                cidade: usuario.pessoa && usuario.pessoa.endereco && usuario.pessoa.endereco.cidade && usuario.pessoa.endereco.cidade.nome ? usuario.pessoa.endereco.cidade.nome : "",
                uf: usuario.pessoa && usuario.pessoa.endereco && usuario.pessoa.endereco.uf ? usuario.pessoa.endereco.uf : "",
                rua: usuario.pessoa && usuario.pessoa.endereco && usuario.pessoa.endereco.logradouro ? usuario.pessoa.endereco.logradouro : "",
                bairro: usuario.pessoa && usuario.pessoa.endereco && usuario.pessoa.endereco.bairro ? usuario.pessoa.endereco.bairro : "",
                numero: usuario.pessoa && usuario.pessoa.endereco && usuario.pessoa.endereco.numero ? usuario.pessoa.endereco.numero : "",
                complemento:  usuario.pessoa && usuario.pessoa.endereco && usuario.pessoa.endereco.complemento ? usuario.pessoa.endereco.complemento : "",
            })
        }
    }

    
    changeData = (data) => {
        this.setState({dataNascimento: data});
    }

    handleModalImage = (val) => {
        this.setState({ modalImageIsOpen: val });
    }

    handleModalEmail = (val) => {
        this.setState({ modalEmailIsOpen: val });
    }

    handleModalLogin = (val) => {
        this.setState({ modalLoginIsOpen: val });
    }

    handleModalSenha = (val) => {
        this.setState({ modalSenhaIsOpen: val });
    }

    changeSrcImage = (src) => {
        this.setState({srcImage: src});
    }

    onChange = (e) => {
        if (e.target.name === 'login') {
            this.setState({ login: e.target.value });
        } else if (e.target.name === 'email') {
            this.setState({ email: e.target.value });
        } else if (e.target.name === 'senha') {
            this.setState({ senha: e.target.value });
        } else if (e.target.name === 'nome') {
            this.setState({ nome: e.target.value });
        } else if (e.target.name === 'matricula') {
            this.setState({ matricula: e.target.value });
        } else if (e.target.name === 'dataNascimento') {
            this.setState({ dataNascimento: e.target.value });
        } else if (e.target.name === 'rg') {
            this.setState({ rg: e.target.value });
        } else if (e.target.name === 'orgao') {
            this.setState({ orgaoExpedidor: e.target.value });
        } else if (e.target.name === 'ufExpedidor') {
            this.setState({ ufExpedidor: e.target.value });
        } else if (e.target.name === 'cep') {
            this.setState({ cep: cepMask(e.target.value) });
        } else if (e.target.name === 'cidade') {
            this.setState({ cidade: e.target.value });
        } else if (e.target.name === 'uf') {
            this.setState({ uf: e.target.value });
        } else if (e.target.name === 'rua') {
            this.setState({ rua: e.target.value });
        } else if (e.target.name === 'bairro') {
            this.setState({ bairro: e.target.value });
        } else if (e.target.name === 'numero') {
            this.setState({ numero: e.target.value });
        } else if (e.target.name === 'complemento') {
            this.setState({ complemento: e.target.value });
        } else if (e.target.name === 'cpf') {
            this.setState({ cpf: cpfMask(e.target.value), errorCpf: !validateCPF(e.target.value) });            
        } else if (e.target.name === 'telefone') {
            this.setState({ telefone: cellphoneMask(e.target.value) });
        }
    }

    render(){
        return (
            <Container maxWidth="xl">  
                <ImageEdit open={this.state.modalImageIsOpen} changeImage={this.changeSrcImage} handleModal={this.handleModalImage} src={this.state.srcImage}/>          
                <EmailEdit open={this.state.modalEmailIsOpen} handleModal={this.handleModalEmail}/>          
                <LoginEdit open={this.state.modalLoginIsOpen} handleModal={this.handleModalLogin}/>
                <PasswordEdit open={this.state.modalSenhaIsOpen} handleModal={this.handleModalSenha}/>
                <div className="Spacer"></div>
                <Typography color="textSecondary" variant="body1" gutterBottom>
                    <span className="TitlePage">Configurações</span>
                </Typography>
                <div className="Spacer"/>
                <div className="Spacer"/>
                <Typography variant="h6" style={{fontSize: "13px", color: "#808080", marginBottom: '5px'}}>INFORMAÇÕES DE ACESSO</Typography>
                <Divider/>

                <div className="Spacer"></div>
                <Grid container>   
                    {/* <Grid item={true} sm={12} xs={12} md={2}>
                        <Grid container>
                            <Grid item={true} sm={12} xs={12}>
                                <Grid container justify="center" alignContent="center">
                                    <Avatar alt="Usuário" src={this.state.srcImage} style={{ height: '90px', width: '90px' }}/>
                                </Grid>
                            </Grid>
                            <Grid item={true} sm={12} xs={12} md={6}>
                                <Grid container justify="center" alignContent="center">
                                    <Tooltip title="Editar foto" placement="bottom">
                                        <IconButton color="primary" onClick={() => this.handleModalImage(true)}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>                                                 
                            </Grid>
                            <Grid item={true} sm={12} xs={12} md={6}>
                                <Grid container justify="center" alignContent="center">
                                    <Tooltip title="Remover foto" placement="bottom">
                                        <IconButton color="secondary">
                                            <DeleteOutlineIcon fontSize="small"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}
                                  
                    {/* <div className="Spacer"></div> */}

                </Grid>
                <Grid container spacing={2}>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                          margin="dense"
                          label="Login"
                          name="login"
                          type="text"
                          size="small"
                          variant="outlined"
                          value={this.props.usuario.login}
                          onChange={this.onChange}
                          disabled
                          fullWidth={true}InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton onClick={() => this.handleModalLogin(true)} size="large">
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                </InputAdornment>
                            )
                          }}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                          margin="dense"
                          label="E-mail"
                          name="email"
                          type="text"
                          size="small"
                          variant="outlined"
                          value={this.props.usuario.email}
                          onChange={this.onChange}
                          disabled
                          fullWidth={true}InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton onClick={() => this.handleModalEmail(true)} size="large">
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                </InputAdornment>
                            )
                          }}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={4}>
                            <TextField
                              margin="dense"
                              label="Senha"
                              name="senha"
                              type="password"
                              size="small"
                              variant="outlined"
                              value={this.state.senha}
                              onChange={this.onChange}
                              fullWidth={true}
                              disabled
                              InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton onClick={() => this.handleModalSenha(true)} size="large">
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                              }}
                            />
                    </Grid>
                </Grid>

                <div className="Spacer"></div>
                <div className="Spacer"></div>
                <Typography variant="h6" style={{fontSize: "13px", color: "#808080", marginBottom: '5px'}}>INFORMAÇÕES PESSOAIS</Typography>
                <Divider/>

                <div className="Spacer"></div>
                <Grid container spacing={1}>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Nome"
                            name="nome"
                            type="text"
                            size="small"
                            disabled
                            variant="outlined"
                            value={this.state.nome}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={3}>
                        <TextField
                            margin="dense"
                            label="CPF"
                            name="cpf"
                            type="text"
                            size="small"
                            disabled
                            variant="outlined"
                            value={this.state.cpf}
                            onChange={this.onChange}
                            error={this.state.errorCpf && this.state.cpf.length }
                            helperText={this.state.errorCpf && this.state.cpf.length  ? "CPF inválido" : "" }
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={2}>
                        <TextField
                            margin="dense"
                            label="Matricula"
                            name="matricula"
                            type="text"
                            size="small"
                            disabled
                            variant="outlined"
                            value={this.state.matricula}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>
                    {/* <Grid item={true} sm={12} xs={12} md={4}>
                        <InputDate
                            label="Data de Nascimento"
                            disabled={true}
                            value={this.state.dataNascimento}
                            handleDateChange={this.changeData}
                        />
                    </Grid>                 
                    
                    <Grid item={true} sm={12} xs={12} md={3}>
                        <TextField
                            margin="dense"
                            label="RG"
                            name="rg"
                            disabled
                            type="text"
                            variant="outlined"
                            value={this.state.rg}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={2}>
                        <TextField
                            margin="dense"
                            label="Orgão Expedidor"
                            name="orgao"
                            type="text"
                            disabled
                            variant="outlined"
                            value={this.state.orgaoExpedidor}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={1}>
                        <InputSelect
                            label="UF"
                            disabled
                            options={[
                            {value: "AL", label: 'AL'},
                            {value: "AP", label: 'AP'},
                            {value: "AM", label: 'AM'},
                            {value: "BA", label: 'BA'},
                            {value: "CE", label: 'CE'},
                            {value: "DF", label: 'DF'},
                            {value: "ES", label: 'ES'},
                            {value: "GO", label: 'GO'},
                            {value: "MA", label: 'MA'},
                            {value: "MT", label: 'MT'},
                            {value: "MS", label: 'MS'},
                            {value: "MG", label: 'MG'},
                            {value: "PA", label: 'PA'},
                            {value: "PB", label: 'PB'},
                            {value: "PR", label: 'PR'},
                            {value: "PE", label: 'PE'},
                            {value: "PI", label: 'PI'},
                            {value: "RJ", label: 'RJ'},
                            {value: "RN", label: 'RN'},
                            {value: "RS", label: 'RS'},
                            {value: "RO", label: 'RO'},
                            {value: "RR", label: 'RR'},
                            {value: "SC", label: 'SC'},
                            {value: "SP", label: 'SP'},
                            {value: "SE", label: 'SE'},
                            {value: "TO", label: 'TO'},
                            ]}
                            optionSelected={this.state.ufExpedidor}
                            handlerOption={value => this.onChange({target: {name: 'ufExpedidor', value: value}})}
                        
                        />
                    </Grid>*/}
                    <Grid item={true} sm={12} xs={12} md={3}>
                        <TextField
                            margin="dense"
                            label="Telefone"
                            name="telefone"
                            type="text"
                            size="small"
                            disabled
                            variant="outlined"
                            value={this.state.telefone}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>
                </Grid>
                
                {/* <Grid container justify="flex-end">
                    <Grid item={true} sm={12} xs={12} md={2} >
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                        >SALVAR</Button>
                    </Grid>
                </Grid> */}

                <div className="Spacer"></div>
                <div className="Spacer"></div>
                {/* <Typography variant="h6" style={{fontSize: "13px", color: "#808080", marginBottom: '5px'}}>ENDEREÇO</Typography>
                <Divider/>

                <div className="Spacer"></div>
                <Grid container spacing={1}>
                    <Grid item={true} sm={12} xs={12} md={3}>
                        <TextField
                            margin="dense"
                            label="CEP"
                            name="cep"
                            type="text"
                            disabled
                            variant="outlined"
                            value={this.state.cep}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Cidade"
                            name="cidade"
                            type="text"
                            disabled
                            variant="outlined"
                            value={this.state.cidade}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid item={true} sm={12} xs={12} md={1}>
                        <InputSelect
                            label="UF"
                            disabled
                            options={[
                            {value: "AL", label: 'AL'},
                            {value: "AP", label: 'AP'},
                            {value: "AM", label: 'AM'},
                            {value: "BA", label: 'BA'},
                            {value: "CE", label: 'CE'},
                            {value: "DF", label: 'DF'},
                            {value: "ES", label: 'ES'},
                            {value: "GO", label: 'GO'},
                            {value: "MA", label: 'MA'},
                            {value: "MT", label: 'MT'},
                            {value: "MS", label: 'MS'},
                            {value: "MG", label: 'MG'},
                            {value: "PA", label: 'PA'},
                            {value: "PB", label: 'PB'},
                            {value: "PR", label: 'PR'},
                            {value: "PE", label: 'PE'},
                            {value: "PI", label: 'PI'},
                            {value: "RJ", label: 'RJ'},
                            {value: "RN", label: 'RN'},
                            {value: "RS", label: 'RS'},
                            {value: "RO", label: 'RO'},
                            {value: "RR", label: 'RR'},
                            {value: "SC", label: 'SC'},
                            {value: "SP", label: 'SP'},
                            {value: "SE", label: 'SE'},
                            {value: "TO", label: 'TO'},
                            ]}
                            optionSelected={this.state.uf}
                            handlerOption={value => this.onChange({target: {name: 'uf', value: value}})}
                        
                        />
                    </Grid>

                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Rua"
                            name="rua"
                            type="text"
                            disabled
                            variant="outlined"
                            value={this.state.rua}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid item={true} sm={12} xs={12} md={3}>
                        <TextField
                            margin="dense"
                            label="Bairro"
                            name="bairro"
                            type="text"
                            disabled
                            variant="outlined"
                            value={this.state.bairro}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={3}>
                        <TextField
                            margin="dense"
                            label="Número"
                            name="numero"
                            type="text"
                            disabled
                            variant="outlined"
                            value={this.state.numero}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={6}>
                        <TextField
                            margin="dense"
                            label="Complemento"
                            name="complemento"
                            type="text"
                            disabled
                            variant="outlined"
                            value={this.state.complemento}
                            onChange={this.onChange}
                            fullWidth={true}
                        />
                    </Grid>
                </Grid>

                <Grid container justify="flex-end">
                    <Grid item={true} sm={12} xs={12} md={2} >
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                        >SALVAR</Button>
                    </Grid>
                </Grid> */}
                <div className="Spacer"></div>
                <div className="Spacer"></div>
                <div className="Spacer"></div>
            </Container>
        );
    }

}

const mapStateToProps = state => ({ usuario: state.usuario });
const mapDispatchToProps = dispatch => bindActionCreators({ 
    usuarioDetalhes
 }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ConfiguracaoPage);

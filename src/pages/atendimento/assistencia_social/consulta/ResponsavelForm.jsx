import { Button, Collapse, Grid, TextField } from '@mui/material';
import React, { Component } from 'react';
import DialogHeadFooter from '../../../../components/general/dialogHeaderFooter';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import { validateCPF } from "../../../../services/validators";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cpfMask, cellphoneMask } from '../../../../services/general';
import { atualizarResponsavelPaciente, cadastrarPessoa, filtrarPaciente, filtrarPessoa, pacienteById, salvarResponsavelPaciente } from '../../../../actions/atendimento/assistencia_social/actions';
import InputSelect from '../../../../components/general/select/select';
import {toast} from "react-toastify";
import TextFieldAutocomplete from '../../../../components/general/autocomplete';

const INITIAL_STATE = {
    paciente: null,
    responsavel: null,
    pacienteResponsavel: null,
    tipo: "",
    matricula: "",
    pessoa: {
        id: null,
        nome: "",
        cpf: "",
    },
    parentesco: "",
    telefone: "",
    errorCpf: false,
    cpfCanEdit: true,
    nomeCanEdit: true,
}

class ResponsavelForm extends Component{
    constructor(props){
        super(props);
        this.state = INITIAL_STATE
    }

    componentDidMount(){

        const {pacienteResponsavel, paciente} = this.props;
        this.setState({paciente: paciente});

        if(pacienteResponsavel){
            this.setState({ 
                pacienteResponsavel: pacienteResponsavel, 
                parentesco: pacienteResponsavel.parentescoId,
                telefone: pacienteResponsavel.telefone ? cellphoneMask(pacienteResponsavel.telefone) : '',
                pessoa: {
                    ...this.state.pessoa,
                    id: pacienteResponsavel.pacienteId,
                    cpf: pacienteResponsavel.responsavelCpf,
                    nome: pacienteResponsavel.responsavelNome
                }
             });
            
        } 
    }

        
    
    /**
     * 
     * HANDLER MODAL
     * 
     */
   
    closeModal = () => {
        this.props.closeModal();
    }

    /**
     * 
     * CONTROLE DE INPUTS
     * 
     */

    changeResponsavel = async (responsavel) => {
        this.setState({responsavel : responsavel})
        if(responsavel){
            this.props.fetchBackdrop('BACKDROP_FETCHED', true);
            let data = await pacienteById(responsavel.id);
            console.log(data)
            if(data){
                this.setState({ pessoa: data.pessoa, cpfCanEdit: false, nomeCanEdit: false });
            } else {
                this.setState({ cpfCanEdit: true, nomeCanEdit: true });
            }
            this.props.fetchBackdrop('BACKDROP_FETCHED', false);
        } else {
            this.setState({ cpfCanEdit: true, nomeCanEdit: true });
        }
    }

    onChange = async (e) => {
        if (e.target.name === 'nome') {
            this.setState({
                pessoa: {
                    ...this.state.pessoa,
                    nome: e.target.value.toString().toUpperCase()
                }
            });

        } else if (e.target.name === 'parentesco') {
            this.setState({ parentesco: e.target.value });
        } else if (e.target.name === 'cpf') {
            let val = e.target.value.length > 14 ? e.target.value.toString().substring(0, 14) : e.target.value;
            this.setState({
                pessoa: {
                    ...this.state.pessoa,
                    cpf: val
                },
                errorCpf: !validateCPF(val), 
                nomeCanEdit: !validateCPF(val) 
            });  
            if(val.length === 14 && validateCPF(val)){
                this.props.fetchBackdrop('BACKDROP_FETCHED', true);
                let data = await filtrarPessoa(val.toString().replace(/\D/g,""));
                if(data && data.length){
                    this.setState({
                        pessoa: {
                            ...this.state.pessoa,
                            id: data[0].id,
                            nome: data[0].nome
                        },
                        nomeCanEdit: false
                    });
                } else {
                    this.setState({ nomeCanEdit: true });
                }
                this.props.fetchBackdrop('BACKDROP_FETCHED', false);
            } else {
                if(this.state.pessoa.nome !== ''){
                    this.setState({
                        pessoa: {
                            ...this.state.pessoa,
                            id: 0,
                            nome: ''
                        }
                    });
                }
            }

        } else if (e.target.name === 'telefone') {
            this.setState({ telefone: cellphoneMask(e.target.value) });
        } 
    }

    changeTipo = (tipo) => {
        if(tipo !== this.state.tipo){
            this.setState({tipo: tipo, pessoa: INITIAL_STATE.pessoa, responsavel: null, cpfCanEdit: true, nomeCanEdit: true })
        }
    }
    
    /**
     * 
     * VALIDAÇÕES
     * 
     */

     formIsValid = () => {
        let valid = true;
        
        if(!this.state.pessoa.nome){
            valid = false;
            toast.warning("O campo nome deve ser preenchido!");
        }
        if(!this.state.pessoa.cpf && valid && !this.state.pacienteResponsavel && !this.state.pessoa.id){
            valid = false;
            toast.warning("Você precisa inserir um CPF válido!");
        }
        if(!this.state.parentesco && valid){
            valid = false;
            toast.warning("O campo parentesco deve ser preenchido!");
        }
        if(!this.state.telefone && valid){
            valid = false;
            toast.warning("O campo telefone deve ser preenchido!");
        }
               
        return valid;
    }

    /**
     * 
     * CADASTRO E ATUALIZAÇÃO
     * 
     */
   
   
    submit = async () => {
        if(this.formIsValid()){
            this.props.fetchBackdrop('BACKDROP_FETCHED', true);
            
            if(this.state.pacienteResponsavel){
                let response = await atualizarResponsavelPaciente({
                    pacienteId: this.state.paciente.id, 
                    responsavelId: this.state.pacienteResponsavel.responsavelId, 
                    parentescoId: this.state.parentesco, 
                    telefone: this.state.telefone.replace(/\D/g,"")
                })
    
                if(response){
                    toast.success('Responsável atualizado com sucesso!');
                    this.props.reload(this.state.paciente.id);
                    this.closeModal();
                }
            } else {
                // VERIFICAR SE A PESSOA RESPONSÁVEL AINDA NÃO EXISTE NO BANCO DE DADOS
                if(!this.state.pessoa.id){
                    // FAZER CADASTRO DA PESSOA ANTES DE SALVAR O RESPONSÁVEL
                    let pessoa = await cadastrarPessoa({ cpf: this.state.pessoa.cpf.toString().replace(/\D/g,""), nome: this.state.pessoa.nome })
                    
                    if(pessoa){
                        this.setState({
                            pessoa: {
                                ...this.state.pessoa,
                                id: pessoa.id,
                            }
                        });
                    } else {
                        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                        toast.error('Ocorreu um erro ao tentar cadastrar a pessoa responsável, tente novamente por favor!');
                        return;
                    }

                }

                let response = await salvarResponsavelPaciente({
                    pacienteId: this.state.paciente.id, 
                    responsavelId: this.state.pessoa.id, 
                    parentescoId: this.state.parentesco, 
                    telefone: this.state.telefone.replace(/\D/g,"")
                })
    
                if(response){
                    toast.success('Responsável cadastrado com sucesso!');
                    this.props.reload(this.state.paciente.id);
                    this.closeModal();
                }
            }


            this.props.fetchBackdrop('BACKDROP_FETCHED', false);
        }
    }     

    render(){
        const { open } = this.props;

        return (
            <DialogHeadFooter title="Responsável" isOpen={open} onClose={this.closeModal}
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
                    <Grid item={true} sm={12} xs={12} md={4} style={{display: this.state.pacienteResponsavel ? 'none' : 'block'}}>
                        <InputSelect
                            label="Tipo"
                            placeholder="Tipo"
                            handlerOption={(val) => this.changeTipo(val)}
                            optionSelected={this.state.tipo}
                            options={[
                                {value: 1,	label: "TITULAR/DEPENDENTE"},  
                                {value: 2,	label: "OUTRO"},
                            ]}

                        />                       
                    </Grid>  
                    
                    <Grid item={true} sm={12} xs={12} md={8} style={{display: this.state.tipo === 1 ? 'block' : 'none'}}>
                        <TextFieldAutocomplete label="Matrícula" actionFilter={filtrarPaciente} value={this.state.responsavel} actionChangeOption={this.changeResponsavel} getOptionLabel={(option) => option.nome ? option.matricula + ' - ' + option.nome : ""} filterOptions={(options, object) => options.filter((item) => item.matricula.toString().includes(object.inputValue))}/>
                    </Grid>
                                       
                    <Grid item={true} sm={12} xs={12}>
                        <Collapse in={this.state.tipo === 2 || this.state.responsavel || this.state.pacienteResponsavel}> 
                            <Grid container spacing={1}>
                                <Grid item={true} sm={12} xs={12} md={4}>
                                    <TextField
                                        margin="dense"                                        
                                        disabled={this.state.pacienteResponsavel !== null || !this.state.cpfCanEdit}
                                        label="CPF"
                                        name="cpf"
                                        type="text"
                                        variant="outlined"
                                        value={this.state.pessoa && this.state.pessoa.cpf ? cpfMask(this.state.pessoa.cpf) : ''}
                                        onChange={this.onChange}
                                        error={this.state.errorCpf && this.state.pessoa.cpf && this.state.pessoa.cpf.length }
                                        helperText={this.state.errorCpf && this.state.pessoa.cpf && this.state.pessoa.cpf.length  ? "CPF inválido" : "" }
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item={true} sm={12} xs={12} md={8}>
                                    <TextField
                                        margin="dense"
                                        disabled={this.state.pacienteResponsavel !== null || !this.state.nomeCanEdit}
                                        name="nome"
                                        label="Nome"
                                        value={this.state.pessoa && this.state.pessoa.nome ? this.state.pessoa.nome : ''}
                                        onChange={this.onChange}
                                        placeholder="Nome"
                                        type="text"
                                        variant="outlined"
                                        fullWidth={true}
                                    />
                                </Grid>                                
                                <Grid item={true} sm={12} xs={12} md={6}>
                                    <InputSelect
                                        label="Parentesco"
                                        placeholder="Parentesco"
                                        handlerOption={(val) => this.setState({parentesco: val})}
                                        optionSelected={this.state.parentesco}
                                        options={[
                                            {value: 1,	label: "FILHO(A)"},    
                                            {value: 2,	label: "TUTELADO"},   
                                            {value: 3,	label: "CONJUGE"},     
                                            {value: 4,	label: "MAE"},         
                                            {value: 5,	label: "COMPANHEIRO(A)"},
                                            {value: 6,	label: "PAI"},         
                                            {value: 7,	label: "SOGRA"},   
                                            {value: 8,	label: "IRMÃO"},
                                            {value: 9,	label: "AVÔ(Ó)"},
                                            {value: 10,	label: "ENTEADO"},
                                            {value: 22,	label: "ESPOSA"}
                                        ]}

                                    />                       
                                </Grid>  
                                <Grid item={true} sm={12} xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        name="telefone"
                                        label="Telefone"
                                        value={this.state.telefone}
                                        onChange={this.onChange}
                                        placeholder="Telefone"
                                        type="text"
                                        variant="outlined"
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Grid>
                </Grid>
            </DialogHeadFooter>
        )

    }
}


const mapStateToProps = state => ({ prestador: state.prestador });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ResponsavelForm);

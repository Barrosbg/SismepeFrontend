import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import React, { Component } from 'react';
import DialogHeadFooter from '../../../../components/general/dialogHeaderFooter';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formatDateToBr, moneyWithDecimalDigits, moneyWithMask, moneyWithoutMask } from '../../../../services/general';
import { atualizarReferenciaFamiliarPaciente, salvarReferenciaFamiliarPaciente } from '../../../../actions/atendimento/assistencia_social/actions';
import InputSelect from '../../../../components/general/select/select';
import DateInput from '../../../../components/general/dateInput';
import {toast} from "react-toastify";

const INITIAL_STATE = {
    id: null,
    paciente: null,
    nome: "",
    parentesco: "",
    dataNascimento: null,
    grauInstrucao: "",
    ocupacao: "",
    valorRenda: ""
}

class ReferenciaFamiliarForm extends Component{
    constructor(props){
        super(props);
        this.state = INITIAL_STATE
    }

    componentDidMount(){
        const {referenciaFamiliar, paciente} = this.props;
        this.setState({paciente: paciente});

        if(referenciaFamiliar){
            this.setState({
                id: referenciaFamiliar.id,
                nome: referenciaFamiliar.nome,
                parentesco: referenciaFamiliar.parentesco.id,
                dataNascimento: referenciaFamiliar.dataNascimento,
                grauInstrucao: referenciaFamiliar.grauInstrucao,
                ocupacao: referenciaFamiliar.ocupacao,
                valorRenda: moneyWithMask(moneyWithDecimalDigits(referenciaFamiliar.renda))
            });
        }
    }

    
    closeModal = () => {
        this.setState(INITIAL_STATE);
        this.props.closeModal();
    }

    handleDataNascimento = (date) => {
        this.setState({ dataNascimento: date });
    }

    onChange = (e) => {
        if (e.target.name === 'nome') {
            this.setState({ nome: e.target.value.toString().toUpperCase() });
        } else if (e.target.name === 'parentesco') {
            this.setState({ parentesco: e.target.value });
        } else if (e.target.name === 'dataNascimento') {
            this.setState({ dataNascimento: e.target.value });
        } else if (e.target.name === 'grauInstrucao') {
            this.setState({ grauInstrucao: e.target.value.toString().toUpperCase() });
        } else if (e.target.name === 'ocupacao') {
            this.setState({ ocupacao: e.target.value.toString().toUpperCase() });
        } else if (e.target.name === 'valorRenda') {
            this.setState({ valorRenda: moneyWithMask(e.target.value) });
        }
    }

    /**
     * 
     * VALIDAÇÕES
     * 
     */

     formIsValid = () => {
        let valid = true;
        
        if(!this.state.nome){
            valid = false;
            toast.warning("O campo nome deve ser preenchido!");
        }
        if(!this.state.parentesco && valid){
            valid = false;
            toast.warning("O campo parentesco deve ser preenchido!");
        }
        if(!this.state.dataNascimento && valid){
            valid = false;
            toast.warning("O campo data da nascimento deve ser preenchido!");
        }
        if(!this.state.ocupacao && valid){
            valid = false;
            toast.warning("O campo ocupação deve ser preenchido!");
        }
        if(!this.state.grauInstrucao && valid){
            valid = false;
            toast.warning("O campo grau de instrução deve ser preenchido!");
        }        
        
        return valid;
    }
   
    submit = async () => {
        if(this.formIsValid()){
            this.props.fetchBackdrop('BACKDROP_FETCHED', true);
  
            if(this.state.id){
                let response = await atualizarReferenciaFamiliarPaciente({
                    id: this.state.id,
                    pacienteId: this.state.paciente.id, 
                    parentescoId: this.state.parentesco,
                    nome: this.state.nome,
                    dataNascimento: formatDateToBr(this.state.dataNascimento),
                    grauInstrucao: this.state.grauInstrucao,
                    ocupacao: this.state.ocupacao,
                    renda: moneyWithoutMask(this.state.valorRenda)
                })
        
                if(response){
                    await this.props.reload(this.state.paciente.id);
                    toast.success('Referência familiar atualizada com sucesso!');
                    this.closeModal();
                }
            } else {
                let response = await salvarReferenciaFamiliarPaciente({
                    pacienteId: this.state.paciente.id, 
                    parentescoId: this.state.parentesco,
                    nome: this.state.nome,
                    dataNascimento: formatDateToBr(this.state.dataNascimento),
                    grauInstrucao: this.state.grauInstrucao,
                    ocupacao: this.state.ocupacao,
                    renda: moneyWithoutMask(this.state.valorRenda)
                })
        
                if(response){
                    await this.props.reload(this.state.paciente.id);
                    toast.success('Referência familiar cadastrada com sucesso!');
                    this.closeModal();
                }
            }

            this.props.fetchBackdrop('BACKDROP_FETCHED', false);
        }
    }     

    render(){
        const { open } = this.props;

        return (
            <DialogHeadFooter title="Referência Familiar" isOpen={open} onClose={this.closeModal}
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
                    <Grid item={true} sm={12} xs={12} md={6}>
                        <TextField
                            margin="dense"
                            name="nome"
                            label="Nome"
                            value={this.state.nome}
                            onChange={this.onChange}
                            placeholder="Nome"
                            type="text"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={3}>
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
                    <Grid item={true} sm={12} xs={12} md={3}>
                        <DateInput label="Data de Nascimento" value={this.state.dataNascimento} handleDateChange={this.handleDataNascimento}/> 
                    </Grid>  
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            name="ocupacao"
                            label="Ocupação"
                            value={this.state.ocupacao}
                            onChange={this.onChange}
                            placeholder="Ocupação"
                            type="text"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            name="grauInstrucao"
                            label="Grau de Instrução"
                            value={this.state.grauInstrucao}
                            onChange={this.onChange}
                            placeholder="Grau de Instrução"
                            type="text"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            name="valorRenda"
                            label="Valor Renda"
                            value={this.state.valorRenda}
                            onChange={this.onChange}
                            placeholder="Valor Renda"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                              }}
                            fullWidth={true}
                        />
                    </Grid>
                </Grid>
            </DialogHeadFooter>
        )

    }
}


const mapStateToProps = state => ({ prestador: state.prestador });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ReferenciaFamiliarForm);

import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import React, { Component } from 'react';
import DialogHeadFooter from '../../../../components/general/dialogHeaderFooter';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { moneyWithDecimalDigits, moneyWithMask, moneyWithoutMask } from '../../../../services/general';
import { salvarHabitacaoPaciente, atualizarHabitacaoPaciente } from '../../../../actions/atendimento/assistencia_social/actions';
import {toast} from "react-toastify";

const INITIAL_STATE = {
    id: null,
    pacienteId: null,
    prestador: null,
    numeroCozinhas: '',
    numeroSalas: '',
    numeroQuartos: '',
    numeroBanheiros: '',
    valorTotal: '',
}

class HabitacaoForm extends Component{
    constructor(props){
        super(props);
        this.state = INITIAL_STATE
    }

    componentDidMount(){

        const {habitacao, pacienteId} = this.props;

        if(habitacao){
            this.setState({
                id: habitacao.id,
                numeroCozinhas: habitacao.numeroCozinhas,
                numeroSalas: habitacao.numeroSalas,
                numeroQuartos: habitacao.numeroQuartos,
                numeroBanheiros: habitacao.numeroBanheiros,
                valorTotal: moneyWithMask(moneyWithDecimalDigits(habitacao.valor)),
                pacienteId: habitacao.paciente.id
            })
        } else {
            this.setState({
                pacienteId: pacienteId
            });
        }
    }

    closeModal = () => {
        this.props.closeModal();
    }

    onChange = (e) => {
        if (e.target.name === 'nrCozinhas') {
            this.setState({ numeroCozinhas: e.target.value });
        } else if (e.target.name === 'nrSalas') {
            this.setState({ numeroSalas: e.target.value });
        } else if (e.target.name === 'nrQuartos') {
            this.setState({ numeroQuartos: e.target.value });
        } else if (e.target.name === 'nrBanheiros') {
            this.setState({ numeroBanheiros: e.target.value });
        } else if (e.target.name === 'valorTotal') {
            this.setState({ valorTotal: moneyWithMask(e.target.value) });
        }
    }

    /**
     * 
     * VALIDAÇÕES
     * 
     */

     formIsValid = () => {
        let valid = true;
        
        if(this.state.numeroCozinhas === '' || this.state.numeroCozinhas === null){
            valid = false;
            toast.warning("O campo com a quantidade de cozinhas deve ser preenchido!");
        }
        if((this.state.numeroSalas === '' || this.state.numeroSalas === null) && valid){
            valid = false;
            toast.warning("O campo com a quantidade de salas deve ser preenchido!");
        }
        if((this.state.numeroQuartos === '' || this.state.numeroQuartos === null) && valid){
            valid = false;
            toast.warning("O campo com a quantidade de quartos deve ser preenchido!");
        }
        if((this.state.numeroBanheiros === '' || this.state.numeroBanheiros === null) && valid){
            valid = false;
            toast.warning("O campo com a quantidade de banheiros deve ser preenchido!");
        }
        if((moneyWithoutMask(this.state.valorTotal) == 0) && valid){
            valid = false;
            toast.warning("O campo com o valor total deve ser preenchido!");
        }

        return valid;
    }

   

    submit = async () => {
        if(this.formIsValid()){
            this.props.fetchBackdrop('BACKDROP_FETCHED', true);
            if(this.state.id){
                let response = await atualizarHabitacaoPaciente({
                    id: this.state.id,
                    pacienteId: this.state.pacienteId,
                    numeroSalas: this.state.numeroSalas,
                    numeroCozinhas: this.state.numeroCozinhas,
                    numeroQuartos: this.state.numeroQuartos,
                    numeroBanheiros: this.state.numeroBanheiros,
                    valor: moneyWithoutMask(this.state.valorTotal),
                    situacao: 'S'
                })
        
                this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                if(response){
                    toast.success('Habitação atualizada com sucesso!');
                    this.props.reload(this.state.pacienteId);
                    this.props.closeModal();
                }
            } else {
                let response = await salvarHabitacaoPaciente({
                    pacienteId: this.state.pacienteId,
                    numeroSalas: this.state.numeroSalas,
                    numeroCozinhas: this.state.numeroCozinhas,
                    numeroQuartos: this.state.numeroQuartos,
                    numeroBanheiros: this.state.numeroBanheiros,
                    valor: moneyWithoutMask(this.state.valorTotal)
                })
        
                if(response){
                    this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                    toast.success('Habitação criada com sucesso!');
                    this.props.reload(this.state.pacienteId);
                    this.props.closeModal();
                }
            }
        }
    }     

    render(){
        const { open } = this.props;

        return (
            <DialogHeadFooter title="Habitação" isOpen={open} onClose={this.closeModal}
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
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            name="nrCozinhas"
                            label="Cozinhas"
                            value={this.state.numeroCozinhas}
                            onChange={this.onChange}
                            placeholder="Quantidade de cozinhas"
                            type="number"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            name="nrSalas"
                            label="Salas"
                            value={this.state.numeroSalas}
                            onChange={this.onChange}
                            placeholder="Quantidade de salas"
                            type="number"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </Grid>      
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            name="nrQuartos"
                            label="Quartos"
                            value={this.state.numeroQuartos}
                            onChange={this.onChange}
                            placeholder="Quantidade de quartos"
                            type="number"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            name="nrBanheiros"
                            label="Banheiros"
                            value={this.state.numeroBanheiros}
                            onChange={this.onChange}
                            placeholder="Quantidade de banheiros"
                            type="number"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <TextField
                            margin="dense"
                            name="valorTotal"
                            label="Valor Total"
                            value={this.state.valorTotal}
                            onChange={this.onChange}
                            placeholder="Valor Total"
                            type="text"
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


const mapStateToProps = state => ({ prestador: state.prestador, paciente: state.paciente });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HabitacaoForm);

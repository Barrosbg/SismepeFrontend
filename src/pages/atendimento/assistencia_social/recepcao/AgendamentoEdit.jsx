import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import DialogHeadFooter from "../../../../components/general/dialogHeaderFooter";
import {Button, Grid} from "@mui/material";
import InputSelect from '../../../../components/general/select/select';
import {
    atualizarAgendamento,
    listarAgendamentos
} from "../../../../actions/atendimento/assistencia_social/actions";
import { fetchBackdrop } from "../../../../actions/geral/actions";
import {toast} from "react-toastify";


const INITIAL_STATE = {
    agendamento:{
        id: 0,
        dataAgendamento: "",
        especialidade: "",
        horaInicial: "",
        situacaoAgendamento: "",
        idPaciente: "",
        paciente: "",
        prestador: ""
    }
}

class AgendamentoEdit extends Component{

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    handlerSituacao = (situacao) => {
        this.setState({
            agendamento: {
                ...this.state.agendamento,
                situacaoAgendamento: situacao
            }
        });
    }

    situacaoFromEnum = (situacao) => {
        switch (situacao) {
            case 'R':
                return "Realizado";
            case 'A':
                return "Agendado";
            case 'C':
                return "Cancelado";
            default:
                return '';
        }
    }

    situacaoToEnum = (situacao) => {
        switch (situacao) {
            case 'REALIZADO':
                return "R";
            case 'AGENDADO':
                return "A";
            case 'CANCELADO':
                return "C";
            default:
                return '';
        }
    }

    submit = async () => {
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);
        let response = await atualizarAgendamento(this.state.agendamento.id, this.state.agendamento.idPaciente, this.state.agendamento.situacaoAgendamento.toUpperCase());
        if(response.status === 204){
            toast.success('Agendamento atualizado com sucesso!')
            this.props.closeModal();
            this.setState(INITIAL_STATE)
            this.props.actionUpdate(0);
        } else {
            this.props.fetchBackdrop('BACKDROP_FETCHED', false);
            toast.error(response.message)
        }
    }

    buscarAgendamento = async () => {
        if(this.state.agendamento.id !== this.props.idAgendamento){
            let data = await listarAgendamentos(null, this.props.idAgendamento, null, null, null, null, null, null);
            if(data.content && data.content.length){
                let ag = data.content[0];
                let agendamento = this.state.agendamento;
                agendamento.id = ag.id;
                agendamento.especialidade = ag.especialidade;
                agendamento.dataAgendamento = ag.dataAgendamento;
                agendamento.horaInicial = ag.horaInicial;
                agendamento.situacaoAgendamento = this.situacaoToEnum(ag.situacaoAgendamento);
                agendamento.paciente = ag.nomePaciente;
                agendamento.idPaciente = ag.idPaciente;
                agendamento.prestador = ag.nomePrestador;
                this.setState({agendamento:agendamento});

            } else {
                this.props.closeModal();
            }
        }
    }

    render() {
        const { open, closeModal } = this.props;
        open ? this.buscarAgendamento() : null;
        return (
            <DialogHeadFooter title="Editar Agendamento" isOpen={open} onClose={closeModal}
                footer={
                    <div style={{padding: '20px !important'}}>
                        <Button
                            style={{
                                backgroundColor: "#e04747",
                                color: "white",
                                margin: "10px"
                            }}
                            onClick={closeModal}
                            variant="contained">
                            CANCELAR
                        </Button>
                        <Button
                            onClick={this.submit}
                            style={{
                                backgroundColor: "#3c8dbc",
                                color: "white",
                                margin: "10px"
                            }}
                            variant="contained">
                            ATUALIZAR
                        </Button>
                    </div>
                }
            >
                <Grid container spacing={1}>
                    <Grid item={true} sm={12} xs={12} md={6}>
                        <InputSelect
                            label="Situação"
                            placeholder="Situação"
                            handlerOption={this.handlerSituacao}
                            optionSelected={this.state.agendamento.situacaoAgendamento}
                            options={[
                                {label: "Agendado", value: "A"},
                                {label: "Cancelado", value: "C"},
                            ]}

                        />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={6}>
                        <strong>PACIENTE: </strong> <br/> {this.state.agendamento.paciente}
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <strong>PRESTADOR: </strong> <br/> {this.state.agendamento.prestador}
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={4}>
                        <strong>ESPECIALIDADE: </strong> <br/> {this.state.agendamento.especialidade}
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={2}>
                        <strong>DATA: </strong> <br/> {this.state.agendamento.dataAgendamento}
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={2}>
                        <strong>HORA: </strong> <br/> {this.state.agendamento.horaInicial}
                    </Grid>
                </Grid>
            </DialogHeadFooter>
        );
    }
}


const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AgendamentoEdit);
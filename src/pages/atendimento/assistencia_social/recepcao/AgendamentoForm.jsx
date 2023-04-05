import { Button, Collapse, Grid, Typography } from '@mui/material';
import React, { Component } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DialogHeadFooter from '../../../../components/general/dialogHeaderFooter';
import TextFieldAutocomplete from '../../../../components/general/autocomplete';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import { filtrarPaciente, filtrarPrestador, atualizarAgendamento, agendasLivres } from '../../../../actions/atendimento/assistencia_social/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';

const INITIAL_STATE = {
    paciente: null,
    prestador: null,
    especialidade: 125,
    itemCheck: 0,
    showAgendas: false,
    exibirMensagemSemAgendasLivres: false,
    agendas: []
}

class AgendamentoForm extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    }

    componentWillUnmount() {
        this.setState(INITIAL_STATE);
    }

    componentDidMount() {
        this.setState(INITIAL_STATE);
    }

    closeModal = () => {
        this.props.closeModal();
    }

    changePrestador = (prestador) => {
        this.setState({ prestador: prestador, agendas: [], itemCheck: 0 });
        setTimeout(this.filtrarAgendamento, 50);
    }

    changePaciente = (paciente) => {
        this.setState({ paciente: paciente, agendas: [], itemCheck: 0 });
        setTimeout(this.filtrarAgendamento, 50);
    }

    submit = async () => {
        const { itemCheck, paciente, prestador } = this.state;
        if (itemCheck && paciente && prestador) {
            this.props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await atualizarAgendamento(this.state.itemCheck, this.state.paciente.id, "A", null);

            if (response.status === 204) {
                toast.success('Agendamento criado com sucesso!')
                this.props.closeModal();
                this.setState(INITIAL_STATE)
                this.props.actionSave(0);
            } else {
                this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                toast.error(response.message)
            }
        } else {
            if (!paciente) {
                toast.warn('Nenhum paciente selecionado!')
            }

            if (!prestador) {
                toast.warn('Nenhum prestador selecionado!')
            }

            if (!itemCheck) {
                toast.warn('Nenhuma agenda selecionada!')
            }
        }
    }

    checkHorario = (id) => {
        if (id === this.state.itemCheck) {
            this.setState({ itemCheck: 0 });
        } else {
            this.setState({ itemCheck: id });
        }
    }

    filtrarAgendamento = async () => {
        if (this.state.prestador && this.state.paciente) {
            this.props.fetchBackdrop('BACKDROP_FETCHED', true);
            let data = await agendasLivres(this.state.especialidade, this.state.prestador, null, 20);
            if (data && data.content.length) {
                this.setState({ agendas: data.content, exibirMensagemSemAgendasLivres: false });
            } else {
                this.setState({ agendas: [], exibirMensagemSemAgendasLivres: true });
            }
            this.props.fetchBackdrop('BACKDROP_FETCHED', false);
        } else {
            this.setState({ exibirMensagemSemAgendasLivres: false });
        }
    }

    renderHorarios = () => {
        return this.state.agendas.map((item) => {

            return (
                <Grid item={true} sm={12} xs={12} md={6}>
                    <ListItem style={
                        {
                            border: item.id === this.state.itemCheck ? '2px solid #36b558' : '1px solid #cecece',
                            color: item.id === this.state.itemCheck ? '#36b558' : '#808080',
                            borderRadius: '5px',
                            marginBottom: '5px',
                            paddingTop: '20px',
                            paddingBottom: '20px'
                        }
                    } key={item.id} dense button onClick={() => this.checkHorario(item.id)}>

                        <ListItemText id={item.id} primary={`Data: ${item.dataAgendamento}`} />
                        <ListItemText id={item.id} primary={`Horário: ${item.horaInicial}`} />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                onClick={() => this.checkHorario(item.id)}
                                size="large">
                                {item.id === this.state.itemCheck ?
                                    <CheckIcon fontSize="small" style={{ color: "#36b558" }} /> : ''}
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Grid>
            );
        });
    }


    render() {
        const { open } = this.props;

        return (
            <DialogHeadFooter title="Novo Agendamento" isOpen={open} onClose={this.closeModal}
                footer={
                    <div style={{ padding: '20px !important' }}>
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
                        <TextFieldAutocomplete label="Paciente" actionFilter={filtrarPaciente} actionChangeOption={this.changePaciente} getOptionLabel={(option) => option.matricula + ' - ' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toString().toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={6}>
                        <TextFieldAutocomplete label="Prestador" minSizeFilter={0} actionFilter={filtrarPrestador} actionChangeOption={this.changePrestador} getOptionLabel={(option) => option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toString().toUpperCase().includes(object.inputValue.toString().toUpperCase()))} />
                    </Grid>
                    <Grid item={true} sm={12} xs={12} style={{ marginTop: '20px' }}>
                        {this.state.prestador && this.state.paciente && this.state.agendas.length
                            ?
                            <div>
                                <Typography variant="button" style={{ width: "100%", marginTop: "20px" }}>Agendas Disponíveis</Typography>
                                <List>
                                    <Grid container spacing={1}>
                                        {this.renderHorarios()}
                                    </Grid>
                                </List>
                            </div>
                            :
                            ""
                        }
                    </Grid>

                    {
                        this.state.exibirMensagemSemAgendasLivres

                            ?

                            <Grid container alignItems="center" justifyContent="center">
                                <Typography style={{ marginTop: '30px', marginBottom: '30px', color: "#808080" }}>Nenhuma agenda livre para o prestador selecionado!</Typography>
                            </Grid>

                            :

                            null
                    }
                </Grid>
            </DialogHeadFooter>
        );

    }
}


const mapStateToProps = state => ({ prestador: state.prestador, paciente: state.paciente });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AgendamentoForm);

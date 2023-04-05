import React, { Component } from 'react';
import Container from '@mui/material/Container';
import { Button, Card, CardActions, CardContent, Collapse, Divider, Fab, Grid, List, ListItem, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import './../index.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listarAgendamentos, 
    assistenciaSocialListarPorPaciente, 
    referenciaFamiliarPaciente, 
    habitacaoPaciente, 
    listarEvolucaoPorAssistenciaSocial, 
    salvarAssistenciaSocial, 
    atualizarAssistenciaSocial,
    listarResponsaveisPaciente,
    atendimentoById,
    atualizarAtendimento,
    atualizarResponsavelPaciente,
    atualizarReferenciaFamiliarPaciente,
    atualizarHabitacaoPaciente,
    atualizarEvolucaoAssistenciaSocial,
} from '../../../../actions/atendimento/assistencia_social/actions';
import { 
    formatarListaAssistenciaSocial, 
    formatarListaEvolucoes, 
    formatarListaReferenciaFamiliar,
    formatarListaResponsaveis
} from '../../../../services/listFormat';
import { fetchBackdrop } from "../../../../actions/geral/actions";
import { openModal, changeModal, resetConfirmModal } from '../../../../actions/geral/actions';
import { moneyWithDecimalDigits, moneyWithMask } from '../../../../services/general';
import CustomList from "../../../../components/general/customList";
import HabitacaoForm from "./HabitacaoForm";
import ReferenciaFamiliarForm from './ReferenciaFamiliarForm';
import ResponsavelForm from './ResponsavelForm';
import InputSelect from '../../../../components/general/select/select';
import EvolucaoForm from './EvolucaoForm';
import { toast } from 'react-toastify';
import { usuarioLogado } from '../../../../actions/configuracao/actions';
import { TextField } from '@mui/material';

const INITIAL_STATE = {
    agendamento: null,
    evolucoes: [],
    referenciaFamiliar: [],
    responsaveis: [],
    itAssistenciaSocial: {
        id: null,
        atendimentoId: null,
        statusSituacao: "A",
        situacaoClinica: "",
        providenciaTomada: "",
        outrasInformacoes: "",
        situacao: "S",
    },
    itReferenciaFamiliar: null,
    itEvolucao: null,
    itResponsavel: null,
    habitacao: null,
    formAssistenciaSocialIsOpen: false,
    modalHabitacaoIsOpen: false,
    modalReferenciaFamiliarIsOpen: false,
    modalResponsavelIsOpen: false,
    modalEvolucaoIsOpen: false,
    paciente: {
        id: 0,
        nome: "",
        matricula: ""
    },
    assistenciasSociais: {
        content:[],
        totalPages: 0
    },
    event: "",
};
class ConsultaForm extends Component {

    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
    }

    async componentDidMount() {     
        document.title = "Assistência Social - Atendimento";
        let usuario = await usuarioLogado();
        
        if(usuario && usuario.prestador){
            if(this.props.match.params.id){            
                let agendamento = await listarAgendamentos(null, this.props.match.params.id, null, null, null, null, null, null)
                
                if(agendamento && agendamento.content && agendamento.content.length){
                    let data = agendamento.content[0];
                    if(data.atendimentoId){
                        await atualizarAtendimento({id: data.atendimentoId, situacao: 2});
                        this.setState({agendamento: data});
                        this.setState({
                            paciente: {
                                ...this.state.paciente,
                                id: data.idPaciente,
                                nome: data.nomePaciente,
                                matricula: data.matriculaPaciente
                            }
                        });
                        await this.buscarAssistenciasSociais(data.idPaciente, 0, 5);
                        await this.buscarReferenciaFamiliar(data.idPaciente);
                        await this.buscarHabitacao(data.idPaciente);
                        await this.buscarResponsaveis(data.idPaciente);
                    } else {
                        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                        toast.error("O atendimento foi cancelado e não pode ser iniciado!");
                        this.props.history.goBack();
                    }
                } else {
                    this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                    this.props.history.goBack();
                }

                this.props.fetchBackdrop('BACKDROP_FETCHED', false);
            }
        } else {
            this.props.history.goBack();
            toast.error('Essa funcionalidade só está disponível para prestadores!');
        }

    }
    /**
     * 
     * BUSCAS
     * 
     */

    buscarAssistenciasSociais = async (pacienteId, page, linesPerPage) => {
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);
        let assistencias = await assistenciaSocialListarPorPaciente(pacienteId, page, linesPerPage);
        if(assistencias){
            this.setState({assistenciasSociais: assistencias});
        } else {
            this.setState({assistenciasSociais: INITIAL_STATE.assistenciasSociais});
        }
        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    buscarReferenciaFamiliar = async (pacienteId) => {
        let referencias = await referenciaFamiliarPaciente(pacienteId);
        if(referencias){
            this.setState({referenciaFamiliar: referencias.content});
        } else {
            this.setState({referenciaFamiliar: INITIAL_STATE.referenciaFamiliar});
        }
    }

    buscarResponsaveis = async (pacienteId) => {
        let responsaveis = await listarResponsaveisPaciente(pacienteId);
        this.setState({responsaveis: responsaveis});
    }

    buscarHabitacao = async (pacienteId) => {
        let habitacao = await habitacaoPaciente(pacienteId);
        if(habitacao){
            this.setState({habitacao: habitacao});
        } else {
            this.setState({habitacao: INITIAL_STATE.habitacao});
        }
    }

    buscarEvolucaoPorAssistenciaSocial = async (assistenciaSocialId) => {
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);
        let data = await listarEvolucaoPorAssistenciaSocial(assistenciaSocialId, 0, 5);
        if(data){
            this.setState({evolucoes: data});
        } else {
            this.setState({evolucoes: INITIAL_STATE.evolucoes});
        }
        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    /**
     * 
     * CADASTROS
     * 
     */


    cadastrarHabitacao = () => {
        this.setState({ paciente: {
            ...this.state.paciente,
                id: this.state.agendamento.idPaciente,
                nome: this.state.agendamento.nomePaciente,
                matricula: this.state.agendamento.matriculaPaciente
            }
        });
        this.openModalHabitacao();
    }

    cadastrarResponsavel = () => {
        this.setState({itResponsavel: null});
        this.openModalResponsavel();
    }



    /**
     * 
     * EDIÇÕES
     * 
     */

    editarAssistenciaSocial = async (item) => {
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);
        this.setState({itAssistenciaSocial: item, formAssistenciaSocialIsOpen: true});
        let data = await listarEvolucaoPorAssistenciaSocial(item.id, 0, 5);
        if(data && data.content){
            this.setState({evolucoes: data});
        }
        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    editarHabitacao = () => {
        this.openModalHabitacao();
    }
   
    editarEvolucao = (evolucao) => {
        this.setState({itEvolucao: evolucao});
        this.openModalEvolucao();
    }

    editarReferenciaFamiliar = (referenciaFamiliar) => {
        this.setState({itReferenciaFamiliar: referenciaFamiliar});
        this.openModalReferenciaFamiliar();
    }

    editarResponsavel = (responsavel) => {
        this.setState({itResponsavel: responsavel});
        this.openModalResponsavel();
    }


    /**
     * 
     * EXCLUSÕES
     * 
     */

    deletarReferenciaFamiliar = (referenciaFamiliar) => {        
        this.setState({ event: `deletarReferenciaFamiliar`, itReferenciaFamiliar: referenciaFamiliar });
        this.props.changeModal(
            'Excluir Referência Familiar', 
            `Deseja realmente excluir as informações da referência familiar?`,                
            'sm', 
            'SIM', 
            'NÃO'
        );
        this.props.openModal();
    }


    deletarResponsavel = (responsavel) => {        
        this.setState({ event: `deletarResponsavel`, itResponsavel: responsavel });
        this.props.changeModal(
            'Excluir Responsável', 
            `Deseja realmente excluir as informações do responsável?`,                
            'sm', 
            'SIM', 
            'NÃO'
        );
        this.props.openModal();
    }

    deletarHabitacao = () => {      
        this.setState({ event: `deletarHabitacao` })  
        this.props.changeModal(
            'Excluir Habitação', 
            `Deseja realmente excluir as informações da habitação?`,                
            'sm', 
            'SIM', 
            'NÃO'
        );
        this.props.openModal();
    }

    deletarAssistenciaSocial = async (assistenciaSocial) => {   
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);     
        let data = await listarEvolucaoPorAssistenciaSocial(assistenciaSocial.id, 0, 5);
        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
        if(data && data.content && data.content.length && data.content.some(item => item.situacao === 'S')){
            toast.warning('Só é permitido remover uma assistência social quando não existirem evoluções vinculadas a ela!');
        } else {
            this.setState({ event: `deletarAssistenciaSocial`, itAssistenciaSocial: assistenciaSocial });
            this.props.changeModal(
                'Excluir Assistência Social', 
                `Deseja realmente excluir as informações da assistência social?`,                
                'sm', 
                'SIM', 
                'NÃO'
            );
            this.props.openModal();
        }
        
    }

    deletarEvolucao = (evolucao) => {
        this.setState({ event: `deletarEvolucao`, itEvolucao: evolucao });
        this.props.changeModal(
            'Excluir Evolução', 
            `Deseja realmente excluir as informações da evolução?`,                
            'sm', 
            'SIM', 
            'NÃO'
        );
        this.props.openModal();
    }

    /**
     * 
     * HANDLER MODAL
     * 
     */


    closeModalHabitacao = () => {
        this.setState({modalHabitacaoIsOpen: false});
    }

    openModalHabitacao = () => {
        this.setState({modalHabitacaoIsOpen: true});
    }

    closeModalReferenciaFamiliar = () => {
        this.setState({modalReferenciaFamiliarIsOpen: false, itReferenciaFamiliar: null});
    }

    openModalReferenciaFamiliar = () => {
        this.setState({modalReferenciaFamiliarIsOpen: true});
    }

    closeModalResponsavel = () => {
        this.setState({modalResponsavelIsOpen: false});
    }

    openModalResponsavel = () => {
        this.setState({modalResponsavelIsOpen: true});
    }

    closeModalEvolucao = () => {
        this.setState({modalEvolucaoIsOpen: false});
    }

    openModalEvolucao = () => {
        this.setState({modalEvolucaoIsOpen: true});
    }

    handleFormEditAssistencia = (val) => {
        this.setState({formAssistenciaSocialIsOpen: val});        
        if(!val){
            this.setState({itAssistenciaSocial: INITIAL_STATE.itAssistenciaSocial, evolucoes: []});
        }
    }

    handlePageAssistencias = (event, value) => {
        this.buscarAssistenciasSociais(this.state.paciente.id, value - 1, 5);
    }

    handlePageEvolucoesAssistenciaSocial = async (event, value) => {
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);        
        let data = await listarEvolucaoPorAssistenciaSocial(this.state.itAssistenciaSocial.id, value - 1, 5);
        if(data && data.content){
            this.setState({evolucoes: data});
        }
        this.props.fetchBackdrop('BACKDROP_FETCHED', false);  

    }

    handleActionModal = async () => {
        switch(this.state.event){
            case 'deletarResponsavel':
                this.props.resetConfirmModal();
                let responsavel = this.state.itResponsavel;
                responsavel.ativo = 'N';
                let responseDelResp = await atualizarResponsavelPaciente(responsavel);
                
                await this.buscarResponsaveis(this.state.paciente.id);
                
                if(responseDelResp){
                    toast.success('Registro excluido com sucesso!');
                }
                
                this.setState({ itResponsavel: null });
                break;   
            case 'deletarReferenciaFamiliar':
                this.props.resetConfirmModal();
                let referencia = this.state.itReferenciaFamiliar;
                referencia.situacao = 'N';
                let responseDelRef = await atualizarReferenciaFamiliarPaciente(referencia);
                
                await this.buscarReferenciaFamiliar(this.state.paciente.id);
                
                if(responseDelRef){
                    toast.success('Registro excluido com sucesso!');
                }
                this.setState({ itReferenciaFamiliar: null });
                break;
            case 'deletarHabitacao':
                this.props.resetConfirmModal();
                let habitacao = this.state.habitacao;
                habitacao.situacao = 'N';
                let responseDelH = await atualizarHabitacaoPaciente(habitacao);
                
                await this.buscarHabitacao(this.state.paciente.id);
        
                if(responseDelH){
                    toast.success('Registro excluido com sucesso!');
                }
                this.setState({ habitacao: null });
                break;
            case 'deletarAssistenciaSocial':
                this.props.resetConfirmModal();
                let assistencia = this.state.itAssistenciaSocial;
                assistencia.ativo = 'N';
                assistencia.statusSituacao = assistencia.statusSituacao[0];
                let responseDelA = await atualizarAssistenciaSocial(assistencia);
                
                await this.buscarAssistenciasSociais(this.state.paciente.id, 0, 5);
            
                if(responseDelA){
                    toast.success('Registro excluido com sucesso!');
                }
                this.setState({
                    itAssistenciaSocial: INITIAL_STATE.itAssistenciaSocial
                });
                break;
            case 'deletarEvolucao':
                this.props.resetConfirmModal();
                let evolucao = this.state.itEvolucao;
                evolucao.situacao = 'N';
                let responseDelE = await atualizarEvolucaoAssistenciaSocial(evolucao);
                
                await this.buscarEvolucaoPorAssistenciaSocial(this.state.itAssistenciaSocial.id);
                
                if(responseDelE){
                    toast.success('Registro excluido com sucesso!');
                }
                this.setState({ itEvolucao: null });
                break;
            case 'finalizarAtendimento':
                this.props.resetConfirmModal();
                this.props.fetchBackdrop('BACKDROP_FETCHED', true);
                let responseFin = await atualizarAtendimento({id: this.state.agendamento.atendimentoId, situacao: 4});
                 
                if(responseFin){
                    this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                    toast.success('Atendimento finalizado!');
                    this.props.history.goBack();
                } else {
                    this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                    toast.error(response.message);
                }
                break;
        }         
    }


    /**
     * 
     * CONTROLE DE INPUTS
     * 
     */

    onChange = (e) => {
        if (e.target.name === 'situacao') {
            this.setState({itAssistenciaSocial: {...this.state.itAssistenciaSocial, situacaoClinica: e.target.value }});
        } else if (e.target.name === 'providencia') {
            this.setState({itAssistenciaSocial: {...this.state.itAssistenciaSocial, providenciaTomada: e.target.value }});
        } else if (e.target.name === 'outrasInfo') {
            this.setState({itAssistenciaSocial: {...this.state.itAssistenciaSocial, outrasInformacoes: e.target.value }});
        }  
    }


    situacaoToEnum = (val) => {
        return val.length > 0 ? val[0] : 'F';
    }

    /**
     * 
     * VALIDAÇÕES
     * 
     */

    formIsValid = () => {
        let valid = true;
        const {itAssistenciaSocial} = this.state;
        
        if(!itAssistenciaSocial.statusSituacao){
            valid = false;
            toast.warning("Preencha o campo Status!");
        }
        if(!itAssistenciaSocial.situacaoClinica && valid){
            valid = false;
            toast.warning("Preencha o campo situação clinica!");
        }
        if(!itAssistenciaSocial.providenciaTomada && valid){
            valid = false;
            toast.warning("Preencha o campo providência tomada!");
        }

        return valid;
    }


    /**
     * 
     * CADASTRO DE ASSISTÊNCIA SOCIAL
     * 
     */


     salvarAssistenciaSocial = async () => {
        if(this.formIsValid()){
            if(this.state.itAssistenciaSocial.id){
                let response = await atualizarAssistenciaSocial(
                    {
                        id: this.state.itAssistenciaSocial.id,
                        atendimentoId: this.state.agendamento.atendimentoId,
                        statusSituacao: this.situacaoToEnum(this.state.itAssistenciaSocial.statusSituacao),
                        situacaoClinica: this.state.itAssistenciaSocial.situacaoClinica,
                        providenciaTomada: this.state.itAssistenciaSocial.providenciaTomada,
                        outrasInformacoes: this.state.itAssistenciaSocial.outrasInformacoes,
                        ativo: 'S'
                    }
                );
        
                if(response){
                    toast.success("Assistência Social atualizada com sucesso!");
                    this.buscarAssistenciasSociais(this.state.paciente.id, 0, 5);
                    this.handleFormEditAssistencia(false);
                }
            } else {
                let response = await salvarAssistenciaSocial(
                    {
                        atendimentoId: this.state.agendamento.atendimentoId,
                        statusSituacao: this.state.itAssistenciaSocial.statusSituacao,
                        situacaoClinica: this.state.itAssistenciaSocial.situacaoClinica,
                        providenciaTomada: this.state.itAssistenciaSocial.providenciaTomada,
                        outrasInformacoes: this.state.itAssistenciaSocial.outrasInformacoes
                    }
                );
        
                if(response){
                    toast.success("Assistência Social criada com sucesso!");
                    this.buscarAssistenciasSociais(this.state.paciente.id, 0, 5);
                    this.handleFormEditAssistencia(false);
                }
            }
        } 
    }

    /**
     * 
     * FINALIZAR ATENDIMENTO
     * 
     */

    finalizarAtendimento = async () => {
        this.setState({ event: `finalizarAtendimento` });
        this.props.changeModal(
            'Finalizar Atendimento', 
            `Deseja realmente finalizar o atendimento?`,                
            'sm', 
            'SIM', 
            'NÃO'
        );
        this.props.openModal();
    }


    render() {
        this.props.modal.confirm ? this.handleActionModal() : null;
        return (
            <Container maxWidth="xl">
                {
                    this.state.modalHabitacaoIsOpen 
                    ?
                    <HabitacaoForm 
                        open={this.state.modalHabitacaoIsOpen} 
                        closeModal={this.closeModalHabitacao} 
                        habitacao={this.state.habitacao} 
                        pacienteId={this.state.paciente.id} 
                        reload={this.buscarHabitacao}
                    />
                    :
                    null
                }

                {
                    this.state.modalReferenciaFamiliarIsOpen 
                    ?
                    <ReferenciaFamiliarForm 
                        open={this.state.modalReferenciaFamiliarIsOpen} 
                        closeModal={this.closeModalReferenciaFamiliar} 
                        referenciaFamiliar={this.state.itReferenciaFamiliar}
                        paciente={this.state.paciente}
                        reload={this.buscarReferenciaFamiliar}
                    />
                    :
                    null
                }

                {
                    this.state.modalResponsavelIsOpen 
                    ?
                    <ResponsavelForm 
                        open={this.state.modalResponsavelIsOpen} 
                        closeModal={this.closeModalResponsavel}                         
                        paciente={this.state.paciente}
                        pacienteResponsavel={this.state.itResponsavel}
                        reload={this.buscarResponsaveis}
                    />
                    :
                    null
                }

                {
                    this.state.modalEvolucaoIsOpen 
                    ?
                    <EvolucaoForm 
                        open={this.state.modalEvolucaoIsOpen} 
                        closeModal={this.closeModalEvolucao}                         
                        paciente={this.state.paciente}
                        assistenciaSocialId={this.state.itAssistenciaSocial.id}
                        atendimentoId={this.state.agendamento.atendimentoId}
                        evolucao={this.state.itEvolucao}
                        reload={this.buscarEvolucaoPorAssistenciaSocial}
                    />
                    :
                    null
                }
                
                <div className="Spacer"></div>
                <Typography color="textSecondary" variant="body1" gutterBottom>
                    <span className="TitlePage">Assistência Social - Atendimento</span>
                </Typography>
                <div className="Spacer"></div>
                <Grid container spacing={2}>

                    <Grid item={true} sm={12} xs={12} md={7}>
                        <Grid container spacing={1}>
                            <Grid item={true} sm={12} xs={12} md={9}>
                                <TextField
                                    disabled
                                    margin="dense"
                                    label="Nome do Paciente"
                                    placeholder="Nome do Paciente"
                                    type="text"
                                    variant="outlined"
                                    value={this.state.paciente.nome}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item={true} sm={12} xs={12} md={3}>
                                <TextField
                                    disabled
                                    margin="dense"
                                    label="Matrícula"
                                    placeholder="Matrícula"
                                    type="text"
                                    variant="outlined"
                                    value={this.state.paciente.matricula}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>

                        <div className="Spacer"></div>
                        <Grid container spacing={1}>
                            <Grid item={true} sm={12} xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" variant="body1" gutterBottom>
                                            <span className="TitleCard">Últimas Asistências Sociais</span>
                                        </Typography>
                                        {
                                            this.state.assistenciasSociais && this.state.assistenciasSociais.content.length 
                                            ?
                                            <CustomList
                                                columns={[
                                                    {value: 'Nº ATEND.', size: 2},
                                                    {value: 'DATA', size: 2},
                                                    {value: 'SITUAÇÃO', size: 2},
                                                    {value: 'PROVIDÊNCIA', size: 2},
                                                    {value: 'STATUS', size: 2},
                                                    {value: 'AÇÕES', size: 2},
                                                ]}
                                                rows={formatarListaAssistenciaSocial(this.state.assistenciasSociais ? this.state.assistenciasSociais.content : [], this.editarAssistenciaSocial, this.deletarAssistenciaSocial, this.props.usuario.prestador)}
                                                showPagination={true}
                                                pageCount={this.state.assistenciasSociais.totalPages}
                                                handlePage={this.handlePageAssistencias}
                                            />
                                            :
                                            <Grid     
                                                container                                           
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Typography style={{marginTop: '30px', color: "#808080"}}>O paciente ainda não possui cadastros de assistências sociais!</Typography>
                                            </Grid>
                                        }
                                    </CardContent>
                                    <CardActions>
                                        {
                                            this.state.formAssistenciaSocialIsOpen
                                            ?
                                            <Tooltip title="Cancelar assistência social" placement="bottom-end">
                                                <Fab size="small" color="secondary" aria-label="add" style={{width: '36px', height: '36px', margin:'10px', backgroundColor: '#e04747', color: '#fff'}} onClick={() => this.handleFormEditAssistencia(false)}>
                                                    <CloseIcon style={{fontSize: '16px'}} />
                                                </Fab>
                                            </Tooltip>

                                            :
                                            <Tooltip title="Adicionar nova assistência social" placement="bottom-end">
                                                <Fab size="small" color="primary" aria-label="add" style={{width: '36px', height: '36px', margin:'10px', backgroundColor: '#145DA0', color: '#fff'}} onClick={() => this.handleFormEditAssistencia(true)}>
                                                    <AddIcon style={{fontSize: '16px'}} />
                                                </Fab>
                                            </Tooltip>
                                        }
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>

                        <Collapse in={this.state.formAssistenciaSocialIsOpen}>
                            <Grid container  spacing={1}>
                                <div className="Spacer"/>
                                <Grid item={true} sm={12} xs={12}>
                                    <InputSelect
                                        label="Status"
                                        placeholder="Status"
                                        disabled={this.state.itAssistenciaSocial.id !== null && this.state.itAssistenciaSocial.prestadorId !== this.props.usuario.prestador.id}
                                        handlerOption={(val) => this.setState({itAssistenciaSocial: {...this.state.itAssistenciaSocial, statusSituacao: val}})}
                                        optionSelected={this.state.itAssistenciaSocial.statusSituacao[0]}
                                        options={[
                                            {value: "A",	label: "EM ANDAMENTO"},    
                                            {value: "F",	label: "FINALIZADO"},                                          
                                        ]}
                                    />   
                                </Grid>
                                <Grid item={true} sm={12} xs={12}>
                                    <TextField
                                        margin="dense"
                                        name="situacao"
                                        label="Situação Clínica"
                                        value={this.state.itAssistenciaSocial.situacaoClinica}
                                        placeholder="Situação clínica apresentada"
                                        type="text"
                                        onChange={this.onChange}
                                        disabled={this.state.itAssistenciaSocial.id !== null && this.state.itAssistenciaSocial.prestadorId !== this.props.usuario.prestador.id}
                                        variant="outlined"
                                        fullWidth={true}
                                        multiline
                                        rows={6}
                                        maxRows={8}
                                    />
                                </Grid>
                                <Grid item={true} sm={12} xs={12}>
                                    <TextField
                                        margin="dense"
                                        name="providencia"
                                        label="Providência"
                                        value={this.state.itAssistenciaSocial.providenciaTomada}
                                        placeholder="Providência tomada"
                                        type="text"
                                        onChange={this.onChange}
                                        disabled={this.state.itAssistenciaSocial.id !== null && this.state.itAssistenciaSocial.prestadorId !== this.props.usuario.prestador.id}
                                        variant="outlined"
                                        fullWidth={true}
                                        multiline
                                        rows={6}
                                        maxRows={8}
                                    />
                                </Grid>
                                <Grid item={true} sm={12} xs={12}>
                                    <TextField
                                        margin="dense"
                                        name="outrasInfo"
                                        label="Outras Informações"
                                        value={this.state.itAssistenciaSocial.outrasInformacoes}
                                        placeholder="Outras Informações"
                                        type="text"
                                        onChange={this.onChange}
                                        disabled={this.state.itAssistenciaSocial.id !== null && this.state.itAssistenciaSocial.prestadorId !== this.props.usuario.prestador.id}
                                        variant="outlined"
                                        fullWidth={true}
                                        multiline
                                        rows={6}
                                        maxRows={8}
                                    />
                                </Grid>
                        
                                <Grid item={true} sm={12} xs={12} md={10}></Grid>
                                <Grid item={true} sm={12} xs={12} md={2}>
                                    <span className="floatRight">
                                        
                                    {
                                        this.state.itAssistenciaSocial.id !== null 
                                        && this.state.itAssistenciaSocial.prestadorId !== this.props.usuario.prestador.id
                                        
                                        ?
                                            null
                                        : 
                                        <Button variant="contained" color="primary" fullWidth="true" onClick={this.salvarAssistenciaSocial}>
                                            SALVAR
                                        </Button>

                                    }                                       

                                    </span>
                                </Grid>
                                <div className="Spacer"></div>
                
                            </Grid>

                            {
                                this.state.itAssistenciaSocial.id

                                ?

                                <Grid container >
                                    <div className="Spacer"></div>
                                    <Grid item={true} sm={12} xs={12}>
                                        <Card>
                                            <CardContent>
                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                    <span className="TitleCard">Evoluções</span>
                                                </Typography>
                                                {
                                                    this.state.evolucoes.content && formatarListaEvolucoes(this.state.evolucoes.content).length

                                                    ?
                            
                                                    <CustomList
                                                        columns={[
                                                            {value: 'DATA', size: 3},
                                                            {value: 'DESCRIÇÃO', size: 7},
                                                            {value: 'AÇÕES', size: 2, align: 'right'},
                                                        ]}
                                                        rows={formatarListaEvolucoes(this.state.evolucoes.content, this.editarEvolucao, this.deletarEvolucao)}                                                    
                                                        showPagination={true}
                                                        pageCount={this.state.evolucoes.totalPages}
                                                        handlePage={this.handlePageEvolucoesAssistenciaSocial}
                                                    />

                                                    :

                                                    <Grid     
                                                container                                           
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Typography style={{marginTop: '30px', color: "#808080"}}>Nenhuma evolução cadastrada!</Typography>
                                            </Grid>
                                                }
                                            </CardContent>
                                            <CardActions>
                                                <Tooltip title="Adicionar Evolução" placement="bottom-end">
                                                    <Fab size="small" color="primary" aria-label="add" style={{width: '36px', height: '36px', margin:'10px', backgroundColor: '#145DA0', color: '#fff'}} onClick={this.openModalEvolucao}>
                                                        <AddIcon style={{fontSize: '16px'}} />
                                                    </Fab>
                                                </Tooltip>                                        
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>

                                :

                                ""
                            }
                            
                        </Collapse>
                    </Grid>


                    <Grid item={true} sm={12} xs={12} md={5}>
                        <Grid item={true} sm={12} xs={12}>
                            <Grid item={true} spacing={3} sm={12} xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" variant="body1" gutterBottom>
                                            <span className="TitleCard">Dados do Responsável</span>
                                        </Typography>

                                        <div>
                                            {
                                                formatarListaResponsaveis(this.state.responsaveis).length
                                                ?
                                                <CustomList
                                                    columns={[
                                                        {value: 'NOME', size: 6},
                                                        {value: 'PARENTESCO', size: 3},
                                                    ]}
                                                    rows={formatarListaResponsaveis(this.state.responsaveis, this.editarResponsavel, this.deletarResponsavel)}
                                                    noAlternateStyle={true}
                                                    fontSizeHeader={10}
                                                    fontSizeBody={4}
                                                />
                                                :
                                                <Grid     
                                                container                                           
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Typography style={{marginTop: '30px', color: "#808080"}}>Nenhum registro!</Typography>
                                            </Grid>
                                            }
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <Tooltip title="Editar responsável" placement="bottom-end">
                                            <Fab size="small" color="primary" aria-label="add" style={{width: '36px', height: '36px', margin:'10px', backgroundColor: '#145DA0', color: '#fff'}} onClick={this.cadastrarResponsavel}>
                                                <AddIcon style={{fontSize: '16px'}} />
                                            </Fab>
                                        </Tooltip>                                       
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                        <div className="Spacer"/>
                        <Grid item={true} sm={12} xs={12}>
                            <Grid item={true} spacing={3} sm={12} xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" variant="body1" gutterBottom>
                                            <span className="TitleCard">Referência Familiar</span>
                                        </Typography>


                                        <div>
                                            {
                                                formatarListaReferenciaFamiliar(this.state.referenciaFamiliar).length
                                                ?
                                                <CustomList
                                                    columns={[
                                                        {value: 'NOME', size: 4},
                                                        {value: 'PARENTESCO', size: 3},
                                                        {value: 'RENDA', size: 3},
                                                    ]}
                                                    rows={formatarListaReferenciaFamiliar(this.state.referenciaFamiliar, this.editarReferenciaFamiliar, this.deletarReferenciaFamiliar)}
                                                    noAlternateStyle={true}
                                                    fontSizeHeader={10}
                                                    fontSizeBody={4}
                                                />
                                                :
                                                <Grid     
                                                    container                                           
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Typography style={{marginTop: '30px', color: "#808080"}}>Nenhum registro!</Typography>
                                                </Grid>
                                            }
                                        </div>

                                    </CardContent>
                                    <CardActions>
                                        <Tooltip title="Adicionar Referência Familiar" placement="bottom-end">
                                            <Fab size="small" color="primary" aria-label="add" style={{width: '36px', height: '36px', margin:'10px', backgroundColor: '#145DA0', color: '#fff'}} onClick={this.openModalReferenciaFamiliar}>
                                                <AddIcon style={{fontSize: '16px'}} />
                                            </Fab>
                                        </Tooltip>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                        <div className="Spacer"/>
                        <Grid item={true} sm={12} xs={12}>
                            <Grid item={true} spacing={3} sm={12} xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" variant="body1" gutterBottom>
                                            <span className="TitleCard">Dados da Habitação</span>
                                        </Typography>
                                        { 
                                            
                                            this.state.habitacao

                                            ?

                                            <div>
                                                <List dense="true">
                                                <span className="liWithoutPadding slim">
                                                    <ListItem>
                                                        <Grid container >
                                                            <Grid item={true} sm={9} xs={9}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard">Quantidade de cozinhas</span>
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item={true} sm={3} xs={3}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard alignRight">{this.state.habitacao.numeroCozinhas}</span>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </span>

                                                    <span className="liWithoutPadding slim">
                                                    <ListItem>
                                                        <Grid container >
                                                            <Grid item={true} sm={9} xs={9}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard">Quantidade de salas</span>
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item={true} sm={3} xs={3}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard alignRight">{this.state.habitacao.numeroSalas}</span>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </span>

                                                    <span className="liWithoutPadding slim">
                                                    <ListItem>
                                                        <Grid container >
                                                            <Grid item={true} sm={9} xs={9}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard">Quantidade de quartos</span>
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item={true} sm={3} xs={3}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard alignRight">{this.state.habitacao.numeroQuartos}</span>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </span>

                                                    <span className="liWithoutPadding slim">
                                                    <ListItem>
                                                        <Grid container >
                                                            <Grid item={true} sm={9} xs={9}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard">Quantidade de banheiros</span>
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item={true} sm={3} xs={3}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard alignRight">{this.state.habitacao.numeroBanheiros}</span>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </span>

                                                    <span className="liWithoutPadding slim">
                                                    <ListItem>
                                                        <Grid container >
                                                            <Grid item={true} sm={9} xs={9}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard">Quantidade de cômodos</span>
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item={true} sm={3} xs={3}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard alignRight">{
                                                                    this.state.habitacao.numeroCozinhas 
                                                                    + this.state.habitacao.numeroSalas 
                                                                    + this.state.habitacao.numeroQuartos
                                                                    + this.state.habitacao.numeroBanheiros
                                                                    }</span>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </span>

                                                    <span className="liWithoutPadding slim">
                                                    <ListItem>
                                                        <Grid container >
                                                            <Grid item={true} sm={9} xs={9}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard">Valor Total</span>
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item={true} sm={3} xs={3}>
                                                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                                                    <span className="TitleHeaderTableCard alignRight">{`R$ ${moneyWithMask(moneyWithDecimalDigits(this.state.habitacao.valor))}`}</span>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </span>
                                                </List>
                                            </div>
                                            :
                                            <Grid     
                                                container                                           
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Typography style={{marginTop: '30px', color: "#808080"}}>Nenhum registro!</Typography>
                                            </Grid>
                                        }
                                    </CardContent>
                                    <CardActions>
                                        {
                                            this.state.habitacao

                                            ?
                                            <div>
                                                <Tooltip title="Editar dados da habitação" placement="bottom-end">
                                                    <Fab size="small" color="primary" aria-label="add" style={{width: '36px', height: '36px', margin:'10px', backgroundColor: '#145DA0', color: '#fff'}} onClick={this.editarHabitacao}>
                                                        <EditIcon style={{fontSize: '16px'}} />
                                                    </Fab>
                                                </Tooltip>
                                                <Tooltip title="Remover dados da habitação" placement="bottom-end">
                                                    <Fab size="small" color="primary" aria-label="add" style={{width: '36px', height: '36px', margin:'10px', backgroundColor: '#df5050', color: '#fff'}} onClick={this.deletarHabitacao}>
                                                        <DeleteIcon style={{fontSize: '16px'}} />
                                                    </Fab>
                                                </Tooltip>
                                            </div>
                                            :
                                            <Tooltip title="Adicionar dados da habitação" placement="bottom-end">
                                                <Fab size="small" color="primary" aria-label="add" style={{width: '36px', height: '36px', margin:'10px', backgroundColor: '#145DA0', color: '#fff'}} onClick={this.cadastrarHabitacao}>
                                                    <AddIcon style={{fontSize: '16px'}} />
                                                </Fab>
                                            </Tooltip>
                                        }
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className="Spacer"></div>
                    <Grid container >
                        <Grid item={true} sm={12} xs={12}>
                            <Divider/>
                        </Grid>
                        <div className="Spacer"></div>
                        <Grid item={true} sm={12} xs={12} md={9}>
                        </Grid>
                        <Grid item={true} sm={12} xs={12} md={3}>
                        <span className="floatRight">
                            <Button variant="contained" color="primary" fullWidth="true" onClick={this.finalizarAtendimento}>
                                FINALIZAR ATENDIMENTO
                            </Button>

                        </span>
                        </Grid>
                        <div className="Spacer"></div>
                    </Grid>
                </Grid>


            </Container>
        );
    }
}


const mapStateToProps = state => ({ usuario: state.usuario, modal: state.modal })
const mapDispatchToProps = dispatch => bindActionCreators({ 
    openModal,
    changeModal, 
    fetchBackdrop,    
    resetConfirmModal
 }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ConsultaForm)


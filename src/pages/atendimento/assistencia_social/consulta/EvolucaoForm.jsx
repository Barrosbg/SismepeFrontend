import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import DialogHeadFooter from '../../../../components/general/dialogHeaderFooter';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { atualizarEvolucaoAssistenciaSocial, salvarEvolucaoAssistenciaSocial } from '../../../../actions/atendimento/assistencia_social/actions';
import {toast} from "react-toastify";

const INITIAL_STATE = {
    id: null,
    atendimentoId: null,
    assistenciaSocialId: null,
    prestador: null,
    descricao: "",
    situacao: "S",
}

class EvolucaoForm extends Component{
    constructor(props){
        super(props);
        this.state = INITIAL_STATE
    }

    componentDidMount(){

        const {atendimentoId, assistenciaSocialId, evolucao} = this.props;

        if(atendimentoId && assistenciaSocialId){
            this.setState({                
                atendimentoId: atendimentoId,
                assistenciaSocialId: assistenciaSocialId
            })

            if(evolucao){
                this.setState({
                    id: evolucao.id,
                    atendimentoId: evolucao.atendimentoId,
                    assistenciaSocialId: evolucao.assistenciaSocialId,
                    descricao: evolucao.descricao,
                    situacao: evolucao.situacao,
                })
            }
        } else {
            toast.error("Só é permitido adicionar uma evolução após o cadastro da assistência social!");
            this.props.closeModal();
        }
    }



    closeModal = () => {
        this.props.closeModal();
    }

    onChange = (e) => {
        if (e.target.name === 'descricao') {
            this.setState({ descricao: e.target.value });
        }
    }

    /**
     * 
     * VALIDAÇÕES
     * 
     */

     formIsValid = () => {
        let valid = true;
        
        if(!this.state.descricao){
            valid = false;
            toast.warning("O campo descrição deve ser preenchido!");
        }

        return valid;
    }
   
    submit = async () => {
        if(this.formIsValid()){
            this.props.fetchBackdrop('BACKDROP_FETCHED', true);

            if(this.state.id){
                let response = await atualizarEvolucaoAssistenciaSocial({
                    id: this.state.id,
                    assistenciaSocialId: this.state.assistenciaSocialId,
                    atendimentoId: this.state.atendimentoId,
                    descricao: this.state.descricao,
                    situacao: this.state.situacao
                });

                if(response){
                    toast.success('Evolução atualizada com sucesso!');
                    this.props.reload(this.state.assistenciaSocialId);
                    this.props.closeModal();
                }
            } else {
                let response = await salvarEvolucaoAssistenciaSocial({
                    assistenciaSocialId: this.state.assistenciaSocialId,
                    atendimentoId: this.state.atendimentoId,
                    descricao: this.state.descricao,
                    situacao: this.state.situacao
                });

                if(response){
                    toast.success('Evolução criada com sucesso!');
                    this.props.reload(this.state.assistenciaSocialId);
                    this.props.closeModal();
                }
            }
            
            this.props.fetchBackdrop('BACKDROP_FETCHED', false);
        }
    }     

    render(){
        const { open } = this.props;

        return (
            <DialogHeadFooter title="Evolução - Assistência Social" isOpen={open} onClose={this.closeModal}
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
                    
                    <Grid item={true} sm={12} xs={12}>
                        <TextField
                            margin="dense"
                            name="descricao"
                            label="Descrição"
                            value={this.state.descricao}
                            onChange={this.onChange}
                            placeholder="Descrição"
                            type="text"
                            variant="outlined"
                            fullWidth={true}
                            multiline
                            rows={6}
                            maxRows={8}
                        />
                    </Grid>                       
                </Grid>
            </DialogHeadFooter>
        );

    }
}


const mapStateToProps = state => ({ prestador: state.prestador });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EvolucaoForm);

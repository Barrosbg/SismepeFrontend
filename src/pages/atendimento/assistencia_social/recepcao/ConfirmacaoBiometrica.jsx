import { Button, Collapse, Grid, Typography } from '@mui/material';
import React, { Component } from 'react';
import DialogHeadFooter from '../../../../components/general/dialogHeaderFooter';
import ValidadorBiometria from '../../../../components/general/validadorBiometria';
import { fetchBackdrop, confirmModal } from '../../../../actions/geral/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alert from '@mui/material/Alert';
import { pacienteById } from '../../../../actions/atendimento/assistencia_social/actions';

const INITIAL_STATE = {
    pacienteId: null,
    biometriaValid: false,
    loading: false,
    pessoa: null
}

class ConfirmacaoBiometrica extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    }

    componentWillUnmount() {
        this.setState(INITIAL_STATE);
    }

    async componentDidMount() {
        this.setState(INITIAL_STATE);
        if (this.props.pacienteId) {
            let paciente = await pacienteById(this.props.pacienteId);
            this.setState({ pessoa: paciente.pessoa });
        }
    }

    closeModal = () => {
        this.props.closeModal();
    }

    handleValidacaoBiometrica = () => {
        return <Collapse in={this.state.pessoa && !this.state.biometriaValid} style={{ width: '100%' }}>
            {(this.state.pessoa && !this.state.biometriaValid) && <ValidadorBiometria cdPessoa={this.state.pessoa.id} afterValidate={() => this.setState({ biometriaValid: true })} handleLoading={this.handleLoading} />}
        </Collapse>
    }

    submit = () => {
        this.props.confirmModal();
        this.props.closeModal();
    }

    handleLoading = (val) => {
        this.setState({loading: val});
    }

    render() {
        const { open } = this.props;

        return (
            <DialogHeadFooter title="Confirmação de Chegada de Paciente" isOpen={open} onClose={this.closeModal}
            closeButton={!this.state.loading}   
            handleClickClose={this.state.loading ? null : this.closeModal} 
            footer={
                    <div style={{ padding: '20px !important' }}>
                        <Button onClick={this.closeModal}
                            style={{
                                backgroundColor: "#e04747",
                                color: "white",
                                margin: "10px"
                            }}
                            disabled={this.state.loading}
                            variant="contained">
                            CANCELAR
                        </Button>
                        
                        {   
                            this.state.biometriaValid
                            &&
                            <Button onClick={this.submit}
                                style={{
                                    backgroundColor: "#3c8dbc",
                                    color: "white",
                                    margin: "10px"
                                }}
                                variant="contained">
                                CONFIRMAR
                            </Button>
                        }
                    </div>
                }>
                <Grid container spacing={1}>
                    <Collapse in={!this.state.biometriaValid}>
                        <Grid container alignItems="start" justifyContent="left">
                            <span style={{ marginTop: '10px', marginBottom: '30px', color: "#808080" }}>Por favor, clique em validar e solicite a biometria do paciente para confirmarmos a sua presença!</span>
                        </Grid>
                    </Collapse>
                    {this.handleValidacaoBiometrica()}
                    <Collapse in={this.state.biometriaValid} style={{width:'100%'}}>
                        <Alert severity="success" style={{ width: '100%' }}>Paciente <strong>verificado</strong> por leitor biométrico</Alert>  
                    </Collapse>

                </Grid>
            </DialogHeadFooter>
        );

    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop, confirmModal }, dispatch);
export default connect(null, mapDispatchToProps)(ConfirmacaoBiometrica);

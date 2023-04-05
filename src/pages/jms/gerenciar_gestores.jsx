import React, { Component } from 'react'
import Container from '@mui/material/Container';
import TextFieldAutocomplete from '../../components/general/autocomplete'
import { Box, Button, Divider,Fab, Grid, IconButton, TextField, Typography } from '@mui/material';
import { filtrarGestoresTitulares } from '../../actions/jms/actions'
import { toast } from 'react-toastify';
import { listaOme } from '../../actions/jms/actions'
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { salvarDados } from "../../actions/jms/gerenciar_gestores"
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import { filtrargestor } from "../../actions/jms/actions"
import { AdicionarLicenca } from "../../actions/jms/actions"
import { RemoverLicenca } from "../../actions/jms/actions"
import { AtualizarOme } from "../../actions/jms/actions"
import { ExibirGestores } from "../../actions/jms/actions"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CustomizedTables from '../../components/general/CustomizedTables'
const INITIAL_STATE = {
  pessoa: null,
  ome: null,
  gestor: null,
  excluirUsuario:null,
  isOpenModalCadastro: false,
  isOpenModalRemoverLicenca: false,
  hidden: true,
  gerenciarGestores: []

}
class genrenciarGestores extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  
  componentDidMount = () =>{
    this.exibirGestores()
  }

  componentDidUpdate(newProps, newState) {
    console.log(newState)
   
  }


  handleZeraCampos = () =>{
      this.setState({pessoa:null})
      this.setState({ome:null})
      this.setState({gestor:null})
      this.setState({excluirUsuario:null})
      console.log("Zerei")
  }

  exibirGestores = async () =>{
    this.props.fetchBackdrop('BACKDROP_FETCHED', true);
    let exibirGestores = await ExibirGestores();
    console.log(exibirGestores)
    this.setState({gerenciarGestores:exibirGestores})
    this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    console.log("Chamado depois de remover")
  }

  // componentDidMount = () =>{
  //   this.handleCarregarDados()
  // }

  handleClickCloseCadastro = () => {
    console.log("Entrei")
    this.setState({ isOpenModalCadastro: false })
  }


  handleClickOpenCadastro = () => {
    this.setState({ isOpenModalCadastro: true })
  }
  handleClickCloseRemoverLicenca = () => {
    this.setState({ isOpenModalRemoverLicenca: false })
  }
  handleClickOpenRemoverLicenca = (e) => {
    this.setState({excluirUsuario:e.usuarioId})
    this.setState({ isOpenModalRemoverLicenca: true })
  }
  ChangePessoa = (pessoa) => {

    if(pessoa!=null){
      this.setState({ pessoa: pessoa })
    }else{
      this.handleZeraCampos();
      this.exibirGestores();
    }
  }
  ChangeOme = (ome) => {
    this.setState({ ome: ome })
    console.log(ome)
  }

  ChangeRemoverLicenca = async (licenca) => {
    const { excluirUsuario} = this.state
    let licencaRemovida = RemoverLicenca(excluirUsuario)
    if(licencaRemovida){
      // this.setState({gerenciarGestores:[]})
      toast.success("Licença removida com sucesso")
      this.setState({ isOpenModalRemoverLicenca: false })
      this.handleZeraCampos()
      this.exibirGestores
      window.location.reload()
    }else{
      toast.success("Erro ao remover licença")
    }
  }
  handleChangebuscar = async () => {
    const { pessoa, ome } = this.state;
    console.log(pessoa,ome)
    if(pessoa === null || ome === null){
      toast.warning("informe uma Matricula e Ome para prosseguir")
    }else{
      console.log("teste")
      let gestores = await filtrargestor(pessoa, ome)
      if(gestores.length === 0){
        toast.error("Nenhum gestor encontrado.")
      }else{
       this.setState({ gerenciarGestores: gestores, hidden: false })
      }
    }
  }

  handleChangeSalvarLicenca = async (gestor) => {
    const { pessoa,ome} = this.state
    if(pessoa === null ){
      toast.warn("Favor informar um titular")
    }else if(ome === null){
      toast.warn("Favor informar uma Ome")
    }else if(pessoa && ome){
      let adicionarLicenca =  await  AdicionarLicenca(pessoa)
      let atualizarOme = await AtualizarOme(ome,pessoa)
      if(adicionarLicenca){
        toast.success("Gestor cadastrado com sucesso")
        this.handleZeraCampos()
        this.exibirGestores()
        this.setState({isOpenModalCadastro:false})
      }
    }
  }
  handleLimparTela = () => {

  }
  render() {
    return (
      <Container>

        <div className="Spacer"></div>

        <Card container spacing={2} display="flex" alignItems="center"  >
          <CardHeader
            title="Gerenciar Gestores"
          />
          <CardContent   >
            <Grid container spacing={1} display="flex"  >
              <Grid item xs={12} md={6} >
                <TextFieldAutocomplete id="Matricula" value={this.state.matricula} label="Matricula" actionFilter={filtrarGestoresTitulares} actionChangeOption={this.ChangePessoa} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
              </Grid>

              <Grid item xs={12} md={6} >
                <TextFieldAutocomplete id="Ome" value={this.state.ome} label="Ome" actionFilter={listaOme} actionChangeOption={this.ChangeOme} getOptionLabel={(option) => option.descricao} />
              </Grid>
              <Grid container spacing={2} display="flex" justifyContent="flex-end">

                <Grid item xs={12} md={6} className="ButtonPrimary" >
                  <Button variant="contained" fullWidth color="primary" onClick={this.handleChangebuscar}>Buscar</Button>
                </Grid>
                {/* <Grid item xs={12} md={3} className="ButtonPrimary">
                  <Button variant="contained" fullWidth color="primary" onClick={this.handleClickOpenCadastro}>
                    Adicionar
                  </Button>
                </Grid> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>


        <Grid container xs={12}>

          <div className="Spacer"></div>
          <div className={this.state.hidden ? 'hidden' : ''}>
            <Typography color="textSecondary" variant="body1" gutterBottom>
              <span className="TitlePage">Usuários da OME</span>
            </Typography>
          </div>

          <Grid item xs={12}>
            <div >
              <List dense="true">
                {/* <span className="liWithoutPadding"> */}
                <CustomizedTables
                  columns={
                    [
                      { value: 'Matrícula', size: 3 },
                      { value: 'Nome', size: 5 },
                      { value: 'OME', size: 2 },
                      { value: 'Ações', size: 2 },

                    ]}

                    // handleRowsPerPage={this.handleRowsPerPage}
                    // handleChangePaginacao={this.handleChangePaginacao}
                    pageDados={this.state.gerenciarGestores}
                  rows={
                    this.state.gerenciarGestores && this.state.gerenciarGestores.length ?
                      this.state.gerenciarGestores.map((item) => {
                        return [
                          { size: 2, value: item.matricula ? item.matricula : 0 },
                          { size: 6, value: item.nome },
                          { size: 4, value: item.ome },
                          { size: 1, isAction: true, actions: [{ colorButton: 'BgGreen', icon: 'remover', event: () => { this.handleClickOpenRemoverLicenca(item) } }] },
                        ]
                      }) : []
                  }
                />
                {/* </span>   { colorButton: 'BgGreen', icon: 'detalhes', event: () => { this.handleClickOpenDetalhes(item) } }*/}
              </List>
            </div>
          </Grid>
        </Grid>
        <div className="Spacer"></div>
        <div className="Spacer"></div>
        <div className="Spacer"></div>
        <Grid className="gridButton" mt={3}>

          <Grid container spacing={1}>

            <span className="fabButton ">
              <Tooltip title="Adicionar uma Nova Licença" placement="bottom-end">
                <Fab size="small" style={{ position: "fixed", bottom: 25, right: 25, zIndex: 100 }} aria-label="add" onClick={()=>this.handleClickOpenCadastro()}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </span>
          </Grid>
          {/* 
          <Grid item xs={12} md={3} className={this.state.hidden  ? 'hidden' : ''} >

            <div>
              <Button variant="contained" color="secondary" onClick={this.handleLimparTela}  >Limpar</Button>
            </div>

          </Grid> */}

        </Grid>

        <Box>
          <DialogHeaderFooter
            title="Cadastrar Gestor"
            idComponent="referencia-familiar"
            handleClickClose={this.handleClickCloseCadastro}
            isOpen={this.state.isOpenModalCadastro}
            direction="row"
            alignItems="center"
            maxWidth="sm"
            
            children={

              <Grid display="flex" container alignItems="center" spacing={2} >

                <Grid item xs={12} md={12}  >
                  <TextFieldAutocomplete id="Matricula" value={this.state.pessoa} label="Matricula/Nome" actionFilter={filtrarGestoresTitulares} actionChangeOption={this.ChangePessoa} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextFieldAutocomplete id="Ome" value={this.state.ome} label="Ome" actionFilter={listaOme} actionChangeOption={this.ChangeOme} getOptionLabel={(option) => option.descricao} />
                </Grid>
{/* 
                <Grid item xs={12} md={6}>

                  <FormControl component="fieldset">
                    <FormLabel component="legend">Usuário Gestor?</FormLabel>
                    <RadioGroup defaultValue="não" aria-label="gender" name="gender1" onLoad={this.handleChangeGestor} onChange={this.handleChangeGestor}>
                      <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  </FormControl>

                </Grid> */}

              </Grid>
            }
            footer={

              <Box display="flex">
                <Box m={1} className="ButtonPrimary" >
                  <Button variant="contained" color="success" onClick={this.handleChangeSalvarLicenca} >Salvar</Button>
                </Box>
              </Box>
            }
          />
        </Box>

        <Box>
          <DialogHeaderFooter
            title="Remover licença"
            idComponent="referencia-familiar"
            handleClickClose={this.handleClickCloseRemoverLicenca}
            isOpen={this.state.isOpenModalRemoverLicenca}
            direction="row"
            closeButton
            alignItems="center"
            maxWidth="sm"
            children={

              <Grid display="flex" container alignItems="center" spacing={2} >
                <h2>Tem certeza que deseja remover a licença do usuário?</h2>
              </Grid>
            }
            footer={

              <Box display="flex">

                <Box m={1} className="ButtonPrimary" >
                  <Button variant="contained" color="success" onClick={this.ChangeRemoverLicenca}>Remover</Button>
                </Box>
              </Box>
            }
          />
        </Box>

      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBackdrop
}, dispatch);
export default connect(null, mapDispatchToProps)(genrenciarGestores);
// export default genrenciarGestores
import { Button, Collapse, Container, Card, CardContent, Box, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import List from '@mui/material/List';
import CustomizedTables from '../../components/general/CustomizedTables'
import makeStyles from '@mui/styles/makeStyles';
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import { fetchBackdrop } from '../../actions/geral/actions';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import DateInput from '../../components/general/dateInput';
import { buscaBeneficiarioCpf } from './action.js';
import { insertPesquisaSatisfacao } from './action.js';
import { or } from "rambda";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
    },
  },
  heading: {
    fontSize: '30px'
  }
}));

const CadastraPesquisaSatisfacaoPage = (props) => {

  const classes = useStyles();

  const [cpf, setCpf] = useState(null);
  const [id, setId] = useState(null);
  const [idPessoa, setIdPessoa] = useState(null);
  const [dataCadastro, setDataCadastro] = useState(null)
  const [dataExpiracao, setDataExpiracao] = useState(null)
  const [pesquisaExpirada, setPesquisaExpirada] = useState(null);
  const [idPesquisaProjeto, setIdPesquisaProjeto] = useState(null);
  const [codigoAtendimento, setCodigoAtendimento] = useState(null);
  const [resposta1, setReposta1] = useState(null);
  const [resposta2, setReposta2] = useState(null);
  const [resposta3, setReposta3] = useState(null);
  const [resposta4, setReposta4] = useState(null);
  const [resposta5, setReposta5] = useState(null);
  const [resposta6, setReposta6] = useState(null);
  const [resposta7, setReposta7] = useState(null);
  const [resposta8, setReposta8] = useState(null);
  const [resposta9, setReposta9] = useState(null);
  const [resposta10, setReposta10] = useState(null);
  const [resposta11, setReposta11] = useState(null);

  const [busca, setBusca] = useState(null);
  const [buscaCad, setBuscaCad] = useState([]);
  const [cadId, setCadId] = useState(null);
  const [cadIdCancelamento, setCadIdCancelamento] = useState(null);

  const [hiddenbuscaCad, sethiddenbuscaCad] = useState(false);
  const [defaultClose, setDefaultClose] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(()=>{
    handleLimparcampos()
},[])

  const handleLimparcampos = () =>{
    setId('')
    setCpf('')  
    setIdPessoa('')    
    setIdPesquisaProjeto('')    
    setCodigoAtendimento('')
    setReposta1('-1')    
    setReposta2('-1')    
    setReposta3('-1')    
    setReposta4('-1')    
    setReposta5('-1')    
    setReposta6('-1')    
    setReposta7('-1')    
    setReposta8('-1')    
    setReposta9('-1')    
    setReposta10('-1')  
    setReposta11('-1')  

    setBuscaCad(null)
    sethiddenbuscaCad(false)
  }

  const pesquisaBeneficiario = async () => {
    if (busca != null) {
      handleLimparcampos()
      
      props.fetchBackdrop('BACKDROP_FETCHED', true); 
      let response = await buscaBeneficiarioCpf(busca)
      props.fetchBackdrop('BACKDROP_FETCHED', false);
      console.log(response)
      if (response.status == 200) {
        setBuscaCad(response.data.content)
        sethiddenbuscaCad(true)
        setIdPessoa(response.data.content[0].id)
        setIdPesquisaProjeto(1)
        setCodigoAtendimento(100) //pendente: pegar o código de atendimento pela URL
        // let codigo = response.data.content[0].id
        // Salvar(codigo)
      }else{
        setCpf(null)
        toast.warn("Não encontrado.")
      }
    } else {
      toast.warning("Informe o CPF antes da busca.")
    }

  }

  const Salvar = async () => {
    
  //  console.log(resposta1)
  //   console.log(resposta2)
  //   console.log("resposta2")

    if (resposta1 === "-1" || resposta2 === "-1" || resposta3 === "-1" || 
      resposta4 === "-1" || resposta5 === "-1" || resposta6 === "-1" || 
      resposta7 === "-1" || resposta8 === "-1" || resposta9 === "-1" || 
      resposta10 === "-1" || resposta11 === "-1") {
      toast.warning("Todos os campos precisam ser preenchidos.")
    } else {

      const payload = {
        pessoa: {
          id: idPessoa
        },
        dataCadastro: new Date(), 
        dataExpiracao: "2022-12-31",
        pesquisaExpirada: "N",
        pesquisaProjeto: {
          id: idPesquisaProjeto
        },
        codigoAtendimento: codigoAtendimento,
        pesquisaPRDTO: [
          {pergunta: 1, resposta: resposta1}, 
          {pergunta: 2, resposta: resposta2}, 
          {pergunta: 3, resposta: resposta3}, 
          {pergunta: 4, resposta: resposta4}, 
          {pergunta: 5, resposta: resposta5}, 
          {pergunta: 6, resposta: resposta6}, 
          {pergunta: 7, resposta: resposta7}, 
          {pergunta: 8, resposta: resposta8}, 
          {pergunta: 9, resposta: resposta9}, 
          {pergunta: 10, resposta: resposta10}, 
          {pergunta: 11, resposta: resposta11}
        ]
      }

      props.fetchBackdrop('BACKDROP_FETCHED', true);
      let response = await insertPesquisaSatisfacao(payload)
      props.fetchBackdrop('BACKDROP_FETCHED', false);
      if (response.status === 201) {
        toast.success("Pesquisa de Satisfação salva com sucesso!")
        handleLimparcampos()    
      }else{
        toast.Erro("Preencha a pesquisa antes de salvar")
      }

    }
  }

  return (

    <Container>
      <Card>
        <CardHeader
          title="Cadastra Pesquisa de Satisfação"
        />
      </Card >          

      {/* Identificação da pessoa pelo CPF */}
      <div className="Spacer"></div>
      <Card>
        <CardContent>
          <Grid xs={12} md={12} fullWidth justifyContent="center">
            <Typography variant="h6" gutterBottom component="div">
              <IconButton aria-label="expand row" label="Pesquisa" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              Pesquisa
            </Typography>


            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>

                <Grid container spacing={2} display="flex">

                  <Grid item xs={12} md={6} >
                    <TextField
                      label="CPF"
                      id="outlined-start-adornment"
                      value={busca}
                      onChange={e => setBusca(e.target.value)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} md={3} className="ButtonPrimary">
                    <Button variant="contained" color="primary" fullWidth onClick={pesquisaBeneficiario}>
                      Pesquisar
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button variant="contained" color="secondary" fullWidth onClick={handleLimparcampos}>
                      Limpar
                    </Button>
                  </Grid>
                </Grid>

              </Box>                            
            </Collapse>

          </Grid>
        </CardContent>
      </Card>            

      <div className="Spacer"></div>

      {/* Perguntas e Respostas */}
      <Card>
          <CardContent>
              <Grid xs={12} md={12} fullWidth justifyContent="center">
                  
                  <Grid container spacing={2} display="flex">
                      <Grid item xs={12} md={6} >

                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          1. Em uma escala de 0 a 10, qual a probabilidade de você recomendar o Hospital da Polícia de 
                          Pernambuco para um colega, parente ou amigo?
                          </InputLabel>
                          <div className="Spacer"></div>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta1}
                            onChange={e => setReposta1(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          2. Você fez a marcação para o atendimento pelo Portal Meu Sismepe?
                          </InputLabel>
                          <div className="Spacer"></div>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta2}
                            onChange={e => setReposta2(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={"S"}>Sim</option>
                            <option value={"N"}>Não</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          3. Qual foi o tipo de atendimento?
                          </InputLabel>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta3}
                            onChange={e => setReposta3(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={0}>Consulta Médica</option>
                            <option value={1}>Atendimento Odontológico</option>
                            <option value={2}>Urgência SPA</option>
                            <option value={3}>Realização de Exames</option>
                            <option value={4}>Internamento</option>
                            <option value={5}>Outros</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          4. Houve pontualidade no seu atendimento?
                          </InputLabel>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta4}
                            onChange={e => setReposta4(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={"S"}>Sim</option>
                            <option value={"N"}>Não</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          5. O atendimento do médico/dentista foi cordial?
                          </InputLabel>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta5}
                            onChange={e => setReposta5(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={0}>Muito Insatisfeito</option>
                            <option value={1}>Insatisfeito</option>
                            <option value={2}>Neutro</option>
                            <option value={3}>Satisfeito</option>
                            <option value={4}>Muito Satisfeito</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          6. As explicações fornecidas pelo médico/dentista foram suficientes e claras?
                          </InputLabel>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta6}
                            onChange={e => setReposta6(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={0}>Muito Insatisfeito</option>
                            <option value={1}>Insatisfeito</option>
                            <option value={2}>Neutro</option>
                            <option value={3}>Satisfeito</option>
                            <option value={4}>Muito Satisfeito</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          7. O atendimento da equipe de enfermagem durante sua hospitalização foi cordial?
                          </InputLabel>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta7}
                            onChange={e => setReposta7(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={0}>Muito Insatisfeito</option>
                            <option value={1}>Insatisfeito</option>
                            <option value={2}>Neutro</option>
                            <option value={3}>Satisfeito</option>
                            <option value={4}>Muito Satisfeito</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          8. As explicações fornecidas pela equipe de enfermagem foram suficientes e claras?
                          </InputLabel>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta8}
                            onChange={e => setReposta8(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={0}>Muito Insatisfeito</option>
                            <option value={1}>Insatisfeito</option>
                            <option value={2}>Neutro</option>
                            <option value={3}>Satisfeito</option>
                            <option value={4}>Muito Satisfeito</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          9. Suas dúvidas foram atendidas com boa vontade pela equipe administrativa?
                          </InputLabel>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta9}
                            onChange={e => setReposta9(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={0}>Muito Insatisfeito</option>
                            <option value={1}>Insatisfeito</option>
                            <option value={2}>Neutro</option>
                            <option value={3}>Satisfeito</option>
                            <option value={4}>Muito Satisfeito</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          10. O que você acha das instalações físicas do Hospital da Polícia de Pernambuco?
                          </InputLabel>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta10}
                            onChange={e => setReposta10(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={0}>Muito Insatisfeito</option>
                            <option value={1}>Insatisfeito</option>
                            <option value={2}>Neutro</option>
                            <option value={3}>Satisfeito</option>
                            <option value={4}>Muito Satisfeito</option>
                          </NativeSelect>
                        </FormControl>

                        <div className="Spacer"></div>
                        <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          11. O atendimento no Hospital da Polícia de Pernambuco atendeu suas expectativas?
                          </InputLabel>
                          <NativeSelect
                            defaultValue={-1}
                            value={resposta11}
                            onChange={e => setReposta11(e.target.value)}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                          >
                            <option value={-1}>Selecione...</option>
                            <option value={0}>Muito Insatisfeito</option>
                            <option value={1}>Insatisfeito</option>
                            <option value={2}>Neutro</option>
                            <option value={3}>Satisfeito</option>
                            <option value={4}>Muito Satisfeito</option>
                          </NativeSelect>
                        </FormControl>

                    </Grid>
                  </Grid>
                  
                  <div className="Spacer"></div>
                  <Grid item xs={12} md={4}>
                      <Button variant="contained" color="secondary" fullWidth onClick={Salvar}>
                          Salvar
                      </Button>
                  </Grid>

              </Grid>
          </CardContent>
      </Card>

    </Container>

  )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CadastraPesquisaSatisfacaoPage)

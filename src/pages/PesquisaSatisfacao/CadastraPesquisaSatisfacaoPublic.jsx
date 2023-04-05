import { Button, Collapse, Container, Card, CardContent, Box, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
    StyledEngineProvider,
    adaptV4Theme,
} from '@mui/material/styles';
import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DateInput from '../../components/general/dateInput';
import { buscaBeneficiarioCpf } from './action.js';
import { buscaPesquisaExpirada } from './action.js';
import { buscaPesquisaRespondida } from './action.js';
import { insertPesquisaSatisfacao } from './action.js';
import { or } from "rambda";
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import { border, textAlign } from "@mui/system";
import { green, orange, red } from "@mui/material/colors";
import CustomRating from "./CustomRating";
import ModalPesquisaExpirada from "./ModalPesquisaExpirada";
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

    const [pesquisaLiberada, setPesquisaLiberada] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);
    const [Situacaopesquisa, setSituacaoPesquisa] = useState('');
    const [busca, setBusca] = useState(null);
    const [buscaCad, setBuscaCad] = useState([]);
    const [cadId, setCadId] = useState(null);
    const [cadIdCancelamento, setCadIdCancelamento] = useState(null);

    const [hiddenbuscaCad, sethiddenbuscaCad] = useState(false);
    const [defaultClose, setDefaultClose] = useState(false);
    const [open, setOpen] = React.useState(false);


    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(0);

    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
            color: theme.palette.action.disabled,
        },
    }));


    useEffect(async () => {
        var query = window.location.href.slice(1);
        var partes = query.split('/&');

        handleLimparcampos()
        setCodigoAtendimento(partes[1]);
        console.log(partes[1])

        props.fetchBackdrop('BACKDROP_FETCHED', true);
        
        let pesquisa = await buscaPesquisaExpirada(partes[1]);
     

        if (!pesquisa?.data) {
            let pesquisaResp = await buscaPesquisaRespondida(partes[1]);
            if (!pesquisaResp.data) {
                setPesquisaLiberada(true)
                setCodigoAtendimento(partes[1])
                setExibirModal(false)
            } else {
                setPesquisaLiberada(false)
                setSituacaoPesquisa('Pesquisa Respondida')
                setExibirModal(true)

            }
        } else {
            setPesquisaLiberada(false)
            setSituacaoPesquisa('Pesquisa Expirada')
            setExibirModal(true)
            setExibirModal(true)

        }
        props.fetchBackdrop('BACKDROP_FETCHED', false);



    }, [])





    const theme = createTheme(adaptV4Theme({
        typography: {
            // Tell Material-UI what's the font-size on the html element is.
            subtitle1: {
                fontSize: 13,
                // width: 40,
            },
            subtitle2: {
                fontSize: 14,
                // width: 30,
                border: '1px solid red',
                textAlign: 'center'
            },
            border: '1px solid red',
        },
    }));
    const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
        ({ theme, checked }) => ({
            '.MuiButtonBase-button': checked && {
                color: theme.palette.primary.main,
            },
        }),

    );

    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();

        let checked = false;

        if (radioGroup) {
            checked = radioGroup.value === props.value;
        }

        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    MyFormControlLabel.propTypes = {
        /**
         * The value of the component.
         */
        value: PropTypes.any,
    };





    const handleLimparcampos = () => {
        setId('')
        setCpf('')
        setIdPessoa('')
        setIdPesquisaProjeto('')
        // setCodigoAtendimento('')
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
            } else {
                setCpf(null)
                toast.warn("Não encontrado.")
            }
        } else {
            toast.warning("Informe o CPF antes da busca.")
        }

    }
    const handleChangeResposta1 = (e) => {
        setReposta1(e.target.value)
    }

    const handleChange = (e) => {
        switch (e.pergunta) {

            case 5:
                setReposta5(e.resposta)
                break;
            case 6:
                setReposta6(e.resposta)
                break;
            case 7:
                setReposta7(e.resposta)
                break;
            case 8:
                setReposta8(e.resposta)
                break;
            case 9:
                setReposta9(e.resposta)
                break;
            case 10:
                setReposta10(e.resposta)
                break;
            case 11:
                setReposta11(e.resposta)
                break;
        }
    }

    const Salvar = async () => {

        //   console.log(resposta2)
        console.log(codigoAtendimento)

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
                    id: 1
                },
                codigoAtendimento: codigoAtendimento,
                pesquisaPRDTO: [
                    { pergunta: 1, resposta: resposta1 },
                    { pergunta: 2, resposta: resposta2 },
                    { pergunta: 3, resposta: resposta3 },
                    { pergunta: 4, resposta: resposta4 },
                    { pergunta: 5, resposta: resposta5 },
                    { pergunta: 6, resposta: resposta6 },
                    { pergunta: 7, resposta: resposta7 },
                    { pergunta: 8, resposta: resposta8 },
                    { pergunta: 9, resposta: resposta9 },
                    { pergunta: 10, resposta: resposta10 },
                    { pergunta: 11, resposta: resposta11 }
                ]
            }

            console.log(payload)
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await insertPesquisaSatisfacao(payload)
            console.log(response)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            if (response.status === 201) {
                toast.success("Pesquisa de Satisfação salva com sucesso!")
                setPesquisaLiberada(false)
                setExibirModal(true)
                setSituacaoPesquisa("Obrigado por responder nossa pesquisa!")
                handleLimparcampos()
            } else {
                toast.Erro("Preencha a pesquisa antes de salvar")
            }

        }
    }

    return (

        <Container>
            <Collapse in={pesquisaLiberada}>
                <Card>
                    <CardHeader
                        title="Responder Pesquisa de Satisfação"
                    />
                </Card >

                {/* Identificação da pessoa pelo CPF */}
                <div className="Spacer"></div>
           
                <div className="Spacer"></div>

                {/* Perguntas e Respostas */}
                <Card>
                    <CardContent>
                        <Grid xs={12} md={12} fullWidth justifyContent="center">

                            <Grid container spacing={2} display="flex">
                                <Grid item xs={12} md={12} >

                                    <Typography variant="h5">
                                        1. Em uma escala de 0 a 10, qual a probabilidade de você recomendar o Hospital da Polícia de
                                        Pernambuco para um colega, parente ou amigo?
                                    </Typography>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">

                                        </InputLabel>
                                        <div className="Spacer"></div>
                                        <RadioGroup
                                            // defaultValue={0}
                                            // value={resposta1}
                                            sx={{ fontSize: 20 }}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="use-radio-group" defaultValue="first"
                                            onChange={handleChangeResposta1}
                                        >
                                            {/* <FormControlLabel value="-1" control={<Radio />} label="-1" /> */}
                                            {/* <Box sx={{ border: '1px solid red', height: 45, width:300, position: 'absolute', zIndex: 1, background: 'red' }} > </Box> */}
                                            {/* <ThemeProvider theme={theme}> */}

                                            <MyFormControlLabel value="0" sx={{ color: red[900] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">0 (Não, nunca)</Typography>} />
                                            <MyFormControlLabel value="1" sx={{ color: red[800] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">1</Typography>} />
                                            <MyFormControlLabel value="2" sx={{ color: red[700] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">2</Typography>} />
                                            <MyFormControlLabel value="3" sx={{ color: red[600] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">3</Typography>} />
                                            <MyFormControlLabel value="4" sx={{ color: red[500] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">4</Typography>} />
                                            <MyFormControlLabel value="5" sx={{ color: red[500] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">5</Typography>} />
                                            <MyFormControlLabel value="6" sx={{ color: red[400] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">6</Typography>} />
                                            <MyFormControlLabel value="7" sx={{ color: orange[500] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">7</Typography>} />
                                            <MyFormControlLabel value="8" sx={{ color: orange[700] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">8</Typography>} />
                                            <MyFormControlLabel value="9" sx={{ color: green[500] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">9</Typography>} />
                                            <MyFormControlLabel value="10" sx={{ color: green[400] }} labelPlacement="top" control={<Radio />} label={<Typography variant="h6">10 (Certamente)</Typography>} />
                                            {/* </ThemeProvider> */}

                                        </RadioGroup>
                                        {/* <NativeSelect
                                        defaultValue={-1}
                                        value={resposta1}
                                        onChange={e => setReposta1(e.target.value)}
                                        inputProps={{
                                            name: 'age',
                                            id: 'uncontrolled-native',
                                        }}
                                    > */}

                                    </FormControl>

                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        2. Você fez a marcação para o atendimento pelo Portal Meu Sismepe?
                                    </Typography>
                                    <FormControl fullWidth>
                                        {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        2. Você fez a marcação para o atendimento pelo Portal Meu Sismepe?
                                    </InputLabel> */}
                                        <div className="Spacer"></div>
                                        <Select
                                            defaultValue={-1}
                                            value={resposta2}
                                            onChange={e => setReposta2(e.target.value)}

                                        >
                                            <MenuItem value={-1}>Selecione...</MenuItem >
                                            <MenuItem value={"S"}>Sim</MenuItem >
                                            <MenuItem value={"N"}>Não</MenuItem >
                                        </Select>
                                    </FormControl>

                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        3. Qual foi o tipo de atendimento?
                                    </Typography>
                                    <div className="Spacer"></div>
                                    <FormControl fullWidth>
                                        {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        3. Qual foi o tipo de atendimento?
                                    </InputLabel> */}
                                        <Select
                                            defaultValue={-1}
                                            value={resposta3}
                                            onChange={e => setReposta3(e.target.value)}

                                        >
                                            <MenuItem value={-1}>Selecione...</MenuItem>
                                            <MenuItem value={0}>Consulta Médica</MenuItem>
                                            <MenuItem value={1}>Atendimento Odontológico</MenuItem>
                                            <MenuItem value={2}>Urgência SPA</MenuItem>
                                            <MenuItem value={3}>Realização de Exames</MenuItem>
                                            <MenuItem value={4}>Internamento</MenuItem>
                                            <MenuItem value={5}>Outros</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        4. Houve pontualidade no seu atendimento?
                                    </Typography>
                                    <div className="Spacer"></div>
                                    <FormControl fullWidth>
                                        {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        4. Houve pontualidade no seu atendimento?
                                    </InputLabel> */}
                                        <Select
                                            defaultValue={-1}
                                            value={resposta4}
                                            onChange={e => setReposta4(e.target.value)}

                                        >
                                            <MenuItem value={-1}>Selecione...</MenuItem>
                                            <MenuItem value={"S"}>Sim</MenuItem>
                                            <MenuItem value={"N"}>Não</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        5. Qual seu nível de satisfação com a cordialidade do atendimento do médico/dentista ?
                                    </Typography>
                                    <div className="Spacer"></div>


                                    <CustomRating handleChange={(e) => handleChange(e)} changePergunta={5} />


                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        6. As explicações fornecidas pelo médico/dentista foram suficientes e claras?
                                    </Typography>
                                    <div className="Spacer"></div>

                                    <CustomRating handleChange={(e) => handleChange(e)} changePergunta={6} />

                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        7. O atendimento da equipe de enfermagem durante sua hospitalização foi cordial?
                                    </Typography>
                                    <div className="Spacer"></div>
                                    <CustomRating handleChange={(e) => handleChange(e)} changePergunta={7} />
                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        8. As explicações fornecidas pela equipe de enfermagem foram suficientes e claras?
                                    </Typography>
                                    <div className="Spacer"></div>
                                    <CustomRating handleChange={(e) => handleChange(e)} changePergunta={8} />
                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        9. Suas dúvidas foram atendidas com boa vontade pela equipe administrativa?
                                    </Typography>
                                    <div className="Spacer"></div>
                                    <CustomRating handleChange={(e) => handleChange(e)} changePergunta={9} />

                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        10. O que você acha das instalações físicas do Hospital da Polícia de Pernambuco?
                                    </Typography>
                                    <div className="Spacer"></div>
                                    <CustomRating handleChange={(e) => handleChange(e)} changePergunta={10} />
                                    <div className="Spacer"></div>
                                    <Typography variant="h5">
                                        11. O atendimento no Hospital da Polícia de Pernambuco atendeu suas expectativas?
                                    </Typography>
                                    <div className="Spacer"></div>
                                    <CustomRating handleChange={(e) => handleChange(e)} changePergunta={11} />

                                </Grid>
                            </Grid>

                            <div className="Spacer"></div>
                            <div className="Spacer"></div>
                            <div className="Spacer"></div>
                            <Grid item xs={12} md={6}>
                                <Button variant="contained" color="secondary" onClick={Salvar}>
                                    Salvar Pesquisa
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </Collapse>
            {exibirModal && <ModalPesquisaExpirada situacao={Situacaopesquisa} />}
        </Container >

    )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CadastraPesquisaSatisfacaoPage)

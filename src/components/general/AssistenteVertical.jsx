import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Card, CardContent, CardHeader, Container, TextField, Grid, InputAdornment } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Collapse } from '@mui/material';
import '../../pages/jms/fichaDeQuadroJms/ficha.css'
import { id } from 'date-fns/locale';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));


const getCause = () => {
    return [{ id: 2, valor: "Qual Medicação?" }, { id: 6, valor: "Há quanto tempo?" }, { id: 7, valor: "Qual problema?" }]
}

function getSteps() {
    return [{ id: 1, valor: "fezExameDeSangueNosUltimos6meses", descricao: 'FEZ EXAMES DE SANGUE NOS ÚLTIMOS 6 MESES?' }, { id: 2, valor: "fazUsoDeMedicacaoContinua", descricao: 'FAZ USO DE ALGUMA MEDICAÇÃO CONÍNUA? ' }, { id: 3, valor: "fezAlgumaCirurgiaNosUltimos12meses", descricao: 'FEZ ALGUMA CIRURGIA NOS ÚLTIMOS 12 MESES?' }, { id: 4, valor: "esteveInternadoNosUltimos12meses", descricao: 'ESTEVE INTERNADO NOS ÚLTIMOS 12 MESES?' }, { id: 5, valor: "fezExameDoCoracaoNosUltimos12meses", descricao: 'FEZ ALGUM EXAME DO CORAÇÃO NOS ÚLTIMOS 12 MESES?' }, { id: 6, valor: "possuiLicencaOudispensaAtualmente", descricao: 'ESTÁ NO MOMENTO DE LICENÇA OU DISPENSA?' }, { id: 7, valor: "possuiOutroProblemaDeSaude", descricao: 'TEM ALGUM OUTRO PROBLEMA DE SAÚDE?' }, { id: 8, valor: "praticaAtividadeFisica", descricao: 'PRATICA ALGUMA ATIVIDADE FÍSICA REGULAR?' }];
}

export default function VerticalLinearStepper(props) {


    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [checked, setChecked] = useState(null);
    const [checkedRadio, setCheckedRadio] = useState([])
    const [labelPergunta, setLabelPergunta] = useState([])
    const [respostas, setRespostas] = useState([])
    const [radioValue, setRadioValue] = useState(null)
    const [checkedNao, setCheckedNao] = useState(false)
    const [checkedAptoInapto, setCheckedAptoInapto] = useState('')
    const [hiddenAptoInapto, setHiddenAptoInapto] = useState(false)
    const [btnActive, setBtnActive] = useState(true)
    const [respPerguntas, setRespPerguntas] = useState(null)
    const [perguntas, setPerguntas] = useState(null)
    const steps = getSteps();
    const cause = getCause();
    const [state, SetState] = useState({
        medicacaoContinua: false,
        exibeImc: false,

    });
    useEffect(() => {
        if (props.zeraComponente) {
            handleReset()
        } else {
            return
        }
    }, [props.zeraComponente])

   useEffect(()=>{
       props.aptoInapto(checkedAptoInapto)
    
    console.log(checkedAptoInapto)
   },[checkedAptoInapto])
   useEffect(()=>{
      if(activeStep === steps.length){
        props.perguntas(checkedRadio)
      }
   },[activeStep])

    const verificaSeEstaChecked = (proximoEl) => {
        let proxId = proximoEl
        let itemArray = checkedRadio.find((item) => item.id === proxId)
        if (itemArray !== undefined) {
            if (itemArray.id == proxId && itemArray.valor === 'S' && (itemArray.id == 2 || itemArray.id == 6 || itemArray.id == 7)) {
                changePerguntas(proxId)
                setChecked(itemArray.valor)
                setRespPerguntas(itemArray.resppergunta)
                console.log("if")
            }
            else {
                console.log("else")
                setChecked(itemArray.valor)
                setPerguntas(false)
                sethidden(false)
                setRespPerguntas('')
            }
        } else {
            console.log("Depois")
            setRespPerguntas('')
            sethidden(false)
            setChecked('')
        }
    }
    const [hidden, sethidden] = useState(false); 
    const handleNext = (atual, proximoEl, id) => {
        const { arrayChecked } = checkedRadio
        let radio = checked
        let descricao = atual.valor
        let proxId = proximoEl ? proximoEl.id : ''
      
        if (activeStep === steps.length - 1) {
            if (checked === '') {
                toast.warning("Favor escolher uma das opções antes de continuar")
                return
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                verificaEAdicionaCamposPerguntas(radio, descricao, id)
                verificaSeEstaChecked(proxId)   
            }
        }
        else {
            if (perguntas && respPerguntas == null) {
                toast.warning("Favor preencher o campo abaixo")
            } else {

                if (checked === '') {
                    toast.warning("favor escolher uma das opções antes de continuar")
                } else {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    verificaEAdicionaCamposPerguntas(radio, descricao, id, respPerguntas)
                    verificaSeEstaChecked(proxId)
                }
            }
        }
    };

    const handleBack = (e, proxId, id) => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        let itemArray = checkedRadio.find((item) => item.id === id)
        verificaSeEstaChecked(id)
    };

    const handleReset = () => {
        setActiveStep(0);
        setCheckedRadio([])
        setChecked('')
        setRespostas(null)
        setPerguntas(false)
        setRespPerguntas('')
        setHiddenAptoInapto(false)
        setCheckedAptoInapto(null)

    };

    const changeResposta = (e) => {
        setRespPerguntas(e.target.value)
    }

    const handleChangeApptoInapto = (e) => {
        console.log(checkedRadio)
        setCheckedAptoInapto(e.target.value)
        setHiddenAptoInapto(true)
    }

    const changePerguntas = (id) => {
        let itemArray = cause.find((item) => item.id === id)
        if (itemArray !== undefined) {
            setPerguntas(true)
            setLabelPergunta(itemArray.valor)
            sethidden(true)
            setRespPerguntas(null)
        } else {
            sethidden(false)
            setPerguntas(false)
            setRespPerguntas(false)
        }

    }

    const verificaEAdicionaCamposPerguntas = (radio, descricao, id) => {
        let elArray = checkedRadio.find((el) => {
            if ((el.descricao === descricao && el.valor === radio) || (el.descricao === descricao && el.valor !== radio)) {
                return el
            } else {
                return false
            }
        })
        if (elArray) {
            let ContemResp = checkedRadio.indexOf(elArray)
            ContemResp !== -1 ? checkedRadio.splice(ContemResp, 1) : null
            perguntas ? setCheckedRadio([...checkedRadio, { id: id, descricao: descricao, valor: radio, resppergunta: respPerguntas }]) : setCheckedRadio([...checkedRadio, { id: id, descricao: descricao, valor: radio }])
        } else {
            perguntas ? setCheckedRadio([...checkedRadio, { id: id, descricao: descricao, valor: radio, resppergunta: respPerguntas }]) : setCheckedRadio([...checkedRadio, { id: id, descricao: descricao, valor: radio }])
        }
    }
    const setaCampoPerguntaFalse = () => {
        setPerguntas(false)
        sethidden(false)
        setRespPerguntas('')
    }

    const handleChange = (e, id) => {
        console.log(e.target.value)
        setChecked(e.target.value)
        let radio = e.target.value
        let descricao = e.target.name
        if (e.target.checked && e.target.value === 'S') {
            changePerguntas(id)
            if (perguntas) {
                // sethidden(true)
                // setPerguntas(true)
                // setRespPerguntas(null)
                verificaEAdicionaCamposPerguntas(radio, descricao, id, perguntas)
            }
            verificaEAdicionaCamposPerguntas(radio, descricao, id)
        } else {
            // changePerguntas(id)
            setaCampoPerguntaFalse()
            verificaEAdicionaCamposPerguntas(radio, descricao, id)
        }

    }

    return (

        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (

                    <Step key={label.id}>
                        <StepLabel>{label.descricao}</StepLabel>
                        <StepContent key={label.id}>

                            <div className={classes.actionsContainer}>
                                <div>
                                    <RadioGroup value={checked} onChange={e => handleChange(e, label.id)}>
                                        <FormControlLabel value="S" name={label.valor} control={<Radio />} label="Sim" />
                                        <FormControlLabel value="N" name={label.valor} control={<Radio />} label="Não" />
                                    </RadioGroup>
                                    <Collapse in={hidden}>
                                        <Grid container xs={12} md={12} >
                                            <TextField id="outlined-basic" label={''} value={respPerguntas} name={label.id} onChange={changeResposta} tooltip={''} variant="outlined" placeholder={labelPergunta} fullWidth={true} margin="dense" />
                                        </Grid>
                                    </Collapse>

                                    <Grid>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={() => handleBack(label, steps[index + 1], index)}
                                            className={classes.button}
                                        >
                                            Voltar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleNext(label, steps[index + 1], label.id)}
                                            className={classes.button}

                                        >
                                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Próxima'}
                                        </Button>
                                    </Grid>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                
                <Grid item xs={12} md={5} className={classes.resetContainer} >
                    <h3>APTO PARA INGRESSO NO QUADRO DE ACESSO?</h3>
                    <RadioGroup value={checkedAptoInapto} onChange={e => handleChangeApptoInapto(e)}>
                        <div>
                            <FormControlLabel value="S" name={''} control={<Radio />} label="Sim" />
                            <FormControlLabel value="N" name={''} control={<Radio />} label="Não" />
                        </div>
                    </RadioGroup>
                </Grid>
        
            )}
            <Collapse in={hiddenAptoInapto}>
            <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>Se todas as perguntas foram preenchidas corretamente, clique em válidar formulário para finalizar</Typography>
                <Grid item>
                    <Button onClick={handleReset} className={classes.button} variant="contained" margin="dense" >
                        Refazer
                    </Button>
                    <Button onClick={() => props.abrirModal()} className={classes.button} variant="contained" color="secondary" margin="dense" >
                        Validar Ficha com Digital
                    </Button>
                </Grid>
            </Paper> 
            </Collapse>
            <div className="Spacer"></div>

        </div>

    );
}

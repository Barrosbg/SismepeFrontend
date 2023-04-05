import { Card, CardContent, Box, CardHeader, Button, Container, TextField, Grid, InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import './ficha.css'
// import { Autocomplete } from '@mui/lab';
import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { connect } from 'react-redux';
import TextInput from '../../../components/general/textInput';
import DialogHeaderFooter from '../../../components/general/dialogHeaderFooter';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../../actions/geral/actions';
import TextFieldAutocomplete from '../../../components/general/autocomplete';
import { Field, reduxForm } from 'redux-form'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import api from '../../../constants/api'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { BuscarPessoa } from '../../../actions/jms/actions'
import { filtrarPessoaTitular } from '../../../actions/jms/actions'
import { ListarUf } from '../../../actions/jms/actions'
import { FichaJmsPdf } from '../../../actions/jms/actions'
import { AtualizarFichaJms } from '../../../actions/jms/actions'
import { download } from '../../../actions/jms/actions'
import { SalvarFichaJms } from '../../../actions/jms/actions'
import { buscarFichaPorIdTitular } from '../../../actions/jms/actions'
import { ListarComorbidades } from '../../../actions/jms/actions'
import { listaOme } from '../../../actions/jms/actions'
import { Collapse } from '@mui/material';
import VerticalLinearStepper from '../../../components/general/AssistenteVertical';
import ValidadorBiometria from '../../../components/general/validadorBiometria';
import ModalValidadorBiometria from './ModalValidadorBiometria';
import { toast } from 'react-toastify';
import id from 'date-fns/esm/locale/id/index.js';
import { of } from 'rambda';
import { Redirect } from 'react-router-dom'


function FicaParaQuadroDeAcessoJms(props) {



    const [pessoa, setPessoa] = useState(null);
    const [graduacao, setGraduacao] = useState(null);
    const [ome, setOme] = useState(null);
    const [fone, setFone] = useState(null);
    const [estCivil, setEstCivil] = useState(null);
    const [naturalidade, setNaturalidade] = useState(null);
    const [uf, setUf] = useState(null);
    const [selectUf, setSelectUf] = useState(null);
    const [erro, setErro] = useState(false);
    const [erroText, setErroText] = useState(null);
    const [nomePai, setNomePai] = useState(null);
    const [nomeMae, setNomeMae] = useState(null);
    const [hidden, sethidden] = useState(false);
    const [hiddenBtn, setHiddenBtn] = useState(true);
    const [CamposHidden, setCamposHidden] = useState(false);
    const [peso, setPeso] = useState(null);
    const [checkedAptoInapto, setCheckedAptoInapto] = useState(null)
    const [biometriaValid, setBiometriaValid] = useState(null);
    const [altura, setAltura] = useState(null);
    const [imc, setImc] = useState(null);
    const [imcClassificacao, setImcClassificacao] = useState(null);
    const [perguntas, setPerguntas] = useState([]);
    const [componenteFilho, setComponenteFilho] = useState(false);
    const [openValidador, setOpenValidador] = useState(false);
    const [cdPessoa, setCdPessoa] = useState(false);
    const [comorbidades, setComorbidades] = useState([]);
    const [listaDeComorbidades, setListaDeComorbidades] = useState([])
    const [checked, setChecked] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [isOpenModalExistente, setIsOpenModalExistente] = useState(false)
    const [temComorbidade, setTemComorbidade] = useState(false)
    const [checkedState, setCheckedState] = useState(new Array(10).fill(false));
    let arrayComorbidades = []



    useEffect(() => {
        if (pessoa !== null) {
            CarregaComorbidades()
            listaUf()
        }
    }, [pessoa])

    useEffect(() => {
        if (pessoa === null) {
            setIsOpenModalExistente(false)
            setPessoa(null)
            setCamposHidden(false)
            setPerguntas([])
            setAltura(null)
            setComorbidades([])
            // CarregaComorbidades()

        }
    }, [pessoa]);

    const CarregaComorbidades = () => {
        api.get("/comorbidades").then(response => {
            if (response.status === 200) {
                setComorbidades(response.data);
                
            } else {
                setComorbidades([]);
            }
        })
    }
    const listaUf = async () => {
        let uf = await ListarUf()
        setUf(uf)
    }

    const ChangePessoa = async (pessoa) => {

        if (pessoa !== null) {
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let pessoaTitular = await filtrarPessoaTitular(pessoa.id)
            if (pessoaTitular !== null) {
                let fichaTitular = await buscarFichaPorIdTitular(pessoaTitular.id)
                let comorb = []
                   pessoaTitular.comorbidades.map((pessoaComorb, comorbIndex)=>{
                   comorb.push({ id: pessoaComorb.id, descricao: pessoaComorb.descricao })
                })
                setListaDeComorbidades(comorb)
               
                if (fichaTitular === null) {
                    console.log("usuario")
                }
                if (fichaTitular.length === 0) {
                    setPessoa(pessoaTitular)
                    setCdPessoa(pessoaTitular.id)
                    setCamposHidden(true)
                    setAltura(null)
                    setPeso(null)
                    preencherCheck()
                
                } else {
                    setIsOpenModalExistente(true)
                    setPessoa(pessoaTitular)
                    setCdPessoa(pessoaTitular.id)
                    

                }
            }

            props.fetchBackdrop('BACKDROP_FETCHED', false);
        } else {
            setPessoa(null)
            setPeso(null)
        }
    }

    const preencherCheck = () =>{
        const updatedCheckedState = [...checkedState]

        listaDeComorbidades.map((itemComorb,index)=>{
           
         checkedState?.map((item, index) =>{
                
                if(index+1 == itemComorb.id && !item){
                   updatedCheckedState.splice(index, 0, true);
               } 
            }
            
           );
           setCheckedState(updatedCheckedState);
        })
        
    }

    const handleLimparCampos = () => {
        setIsOpenModalExistente(false)
        setPessoa(null)
        setCamposHidden(false)
        setPerguntas([])
        setImc(null)
        setComorbidades([])
        setAltura(null)
        setPeso(null)
        // CarregaComorbidades()
    }

    const Graduacao = (graduacao) => {
        setGraduacao(graduacao.target.value)

    }
    const Ome = async (ome) => {
        console.log(ome)
    }
    const Fone = (fone) => {
        setFone(fone.target.value)

    }
    const EstCivil = (estCivil) => {
        setEstCivil(estCivil.target.value)
    }
    const Naturalidade = (naturalidade) => {
        setEstCivil(naturalidade.target.value)
    }
    const Uf = (uf) => {
        setEstCivil(uf.target.value)
    }
    const NomePai = (nomePai) => {
        setEstCivil(nomePai.target.value)
    }
    const NomeMae = (nomeMae) => {
        setEstCivil(nomeMae.target.value)
    }
    const handleLoading = (e) => {

    }

    const ChangePeso = (p) => {
        let peso = parseInt(p.target.value.replace(",", "."))
        if (peso < 0) {
            toast.warning("Peso Não pode ser menor que Zero")
            setPeso('')
        } else if (peso == null) {
            let peso = parseFloat(p.target.value.replace(",", "."))
            setPeso(peso)
            setAltura(null)
        } else {

            if (p.target.value == '') {
                setPeso(null)
                setAltura(null)
                setImc(null)
                setImcClassificacao("")
            } else {
                setPeso(parseFloat(p.target.value.replace(",", ".")))
                setAltura(null)
                setImc(null)
                setImcClassificacao("")
            }


        }

    }
    const ChangeAltura = (Altura) => {
        let alt = Altura.target.value.replace(",", ".")
        console.log(alt)
        if (peso == null) {
            toast.warning("Peso precisa ser definido primeiro")
            setAltura(null)
        } else if (alt < 0) {
            toast.warning("Altura Não pode ser negativa")
            setAltura(null)
        } else if (Altura.target.value.length >= 3 && peso !== null) {
            setAltura(alt)
            ChangeCalculaImc(alt, peso)
        } else {
            setAltura(Altura.target.value.replace(",", "."))
        }
    }

    const ChangeValidaFicha = (e) => {
        setOpenValidador(true)


    }

    const ChangeValidaCampos = () => {

        if (peso == null) {
            toast.warning("Peso precisa ser Definido")
            return
        } else if (altura == 0) {
            toast.warning("Altura precisa ser Definido")
            return
        } else if (perguntas.length === 0) {
            toast.warning("Favor responder as perguntas Antes de salvar")
            return
        } else if (checkedAptoInapto === null) {
            toast.warning("Favor informar se o usuário está Apto ou Inapto")
            return
        } else {
            ChangeSalvarEImprimir()
        }
    }

    const handleClickCloseModalExistente = (e) => {
        setIsOpenModalExistente(false)
        //    zeraComponente()
    }

    const DadosDoUsuario = () => {
        let lista = {
            pessoaTitular: {
                id: pessoa.id,

            },
            comorbidades: listaDeComorbidades,
            peso: peso,
            altura: altura,
            imc: imc,

            fezExameDeSangueNosUltimos6meses: perguntas.fezExameDeSangueNosUltimos6meses,
            esteveInternadoNosUltimos12meses: perguntas.esteveInternadoNosUltimos12meses,
            fezAlgumaCirurgiaNosUltimos12meses: perguntas.fezAlgumaCirurgiaNosUltimos12meses,
            fezExameDoCoracaoNosUltimos12meses: perguntas.fezExameDoCoracaoNosUltimos12meses,
            fazUsoDeMedicacaoContinua: perguntas.fazUsoDeMedicacaoContinua,
            descricaoMedicacaoContinua: perguntas.descricaoMedicacaoContinua,
            possuiLicencaOudispensaAtualmente: perguntas.possuiLicencaOudispensaAtualmente,
            descricaoTempoLicencaDispensa: perguntas.descricaoTempoLicencaDispensa,
            possuiOutroProblemaDeSaude: perguntas.possuiOutroProblemaDeSaude,
            descricaoOutroProblemaSaude: perguntas.descricaoOutroProblemaSaude,
            praticaAtividadeFisica: perguntas.praticaAtividadeFisica,
            aptoParaIngresso: checkedAptoInapto
        }

        return lista
    }

    const ChangeSalvarEImprimir = async () => {
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let lista = DadosDoUsuario()
        let respCadastroFicha = await SalvarFichaJms(lista)
        if (respCadastroFicha === 201) {
            toast.success("Ficha salva com sucesso!")
            props.history.push({
                pathname: '/administrativo/jms/fichaDeQuadroJms/visualizarFichasCadastradas',
                state: { detail: cdPessoa }
            })
            // let buscarFichaPorId = await buscarFichaPorIdTitular(pessoa.id)
            // console.log(buscarFichaPorId)
            // if (buscarFichaPorId) {
            //     handleClickImpirmir(buscarFichaPorId.id)
            // }
        } else if (respCadastroFicha === null) {
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let id = pessoa ? pessoa.id : ''
            let lista = DadosDoUsuario()
            let idFicha = await buscarFichaPorIdTitular(id);
            let atualizarFicha = await AtualizarFichaJms(idFicha.id, lista);
            if (atualizarFicha === 204) {
                toast.success("Ficha Atualizada.")
                handleClickImpirmir(idFicha.id)
            } else {
                toast.warning("Problemas ao atualizar a Ficha")
            }
            props.fetchBackdrop('BACKDROP_FETCHED', false);
        } else {
            toast.error("Problem ao cadastrar Ficha")
        }
        props.fetchBackdrop('BACKDROP_FETCHED', false);

    }

    const handleSalvarAtualizar = async (e) => {
        navigation.navigate('visualizarFichasCadastradas')
        // props.fetchBackdrop('BACKDROP_FETCHED', true);
        // let fichaTitular = await buscarFichaPorIdTitular(e)
        // setPessoa(fichaTitular.pessoaTitular)
        // setPeso(fichaTitular.peso)
        // setAltura(fichaTitular.altura)
        // setImc(fichaTitular.imc)
        // setCdPessoa(fichaTitular.pessoaTitular.id)
        // setCamposHidden(true)
        // setIsOpenModalExistente(false)
        // props.fetchBackdrop('BACKDROP_FETCHED', false);
        // setCdPessoa(fichaTitular.pessoaTitular.id)
        // setCamposHidden(true)
        // setAltura(null)
        // setPeso(null)
        // props.fetchBackdrop('BACKDROP_FETCHED', true);
        // let id = pessoa ? pessoa.id : ''
        // let lista = DadosDoUsuario()
        // let idFicha = await buscarFichaPorIdTitular(id);
        // props.fetchBackdrop('BACKDROP_FETCHED', false);
        // let atualizarFicha = await AtualizarFichaJms(idFicha.id, lista);
        // if (atualizarFicha === 204) {
        //     toast.success("Ficha Atualizada.")
        //     handleClickImpirmir(idFicha.id)
        // } else {
        //     toast.warning("Problemas ao atualizar a Ficha")
        // }

    }

    const handleZeraComponente = () => {
        return componenteFilho
    }

    const handleDownloadPdf = async () => {

        if (pessoa !== null) {
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let pessoaTitular = await filtrarPessoaTitular(pessoa.id)
            if (pessoaTitular !== null) {
                setIsOpenModalExistente(false)
                setPessoa(pessoaTitular)
                setCdPessoa(pessoaTitular.id)
                setCamposHidden(true)
                setAltura(null)
                setPeso(null)
                preencherCheck()
            }
            props.fetchBackdrop('BACKDROP_FETCHED', false);
        } else {
            setPessoa(null)
        }

    }

    const handleClickImpirmir = async (id) => {
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let result = await FichaJmsPdf(id);
        props.fetchBackdrop('BACKDROP_FETCHED', false);
        if (result === 200) {
            handleLimparCampos()
        } else {
            return
        }
    }

    const ChangeCalculaImc = (alt, peso) => {
        let Imc = (peso / (alt ** 2)).toFixed(2)
        if (Imc < 18.5) {
            setImc(Imc);
            setImcClassificacao(`${Imc} = Abaixo do peso`);
        } else if (Imc >= 18.6 && Imc <= 24.9) {
            setImc(Imc);
            setImcClassificacao(`${Imc} = Peso ideal`);
        }
        else if (Imc >= 25.0 && Imc <= 29.9) {
            setImc(Imc);
            setImcClassificacao(`${Imc} = Levemente acima do peso`);
        }
        else if (Imc >= 30.0 && Imc <= 34.9) {
            setImc(Imc);
            setImcClassificacao(`${Imc} = Obesidade I`);
        }
        else if (Imc >= 35.0 && Imc <= 39.9) {
            setImc(Imc);
            setImcClassificacao(`${Imc} = Obesidade II`);;

        } else if (Imc > 40) {
            setImc(Imc);
            setImcClassificacao(`${Imc} = Obesidade III (Mórbida)`);
        }
    }
    const afterValidate = (e) => {
        if (e) {
            setHiddenBtn(true)
            setBiometriaValid(e)
        }
    }

    const handleValidacaoBiometrica = (e) => {
        // return <Collapse in={pessoa && !biometriaValid} style={{ width: '100%' }}>
        //     {(pessoa && !biometriaValid) && <ValidadorBiometria cdPessoa={cdPessoa} afterValidate={()=>setBiometriaValid()}  />}
        // </Collapse>
    }


    const closeFunction = (e) => {
        setOpenValidador(e)
    }
    const handleChangeComorbidades1 = (e) => {
    
    }

    const handleRemoveComorbidades = (id) =>{
        let elArray = listaDeComorbidades.find((el) => el.id == id)

            if (elArray) {
                let ind = listaDeComorbidades.indexOf(elArray)
                ind !== -1 ? listaDeComorbidades.splice(ind, 1) : ''
                preencherCheck()
                return true
            }else{
                return false
            }
    }


    const handleChangeComorbidades = (e, id) => {
         let checked = e.target.checked

        console.log(checked)
        const updatedCheckedState = checkedState.map((item, index) =>
        index+1 === id ? !item : item
        );
        
    
    //    setCheckedState(updatedCheckedState);
        if (checked) {
                let id =  parseInt(e.target?.value) 
                let descricao =  e.target?.name 
                setListaDeComorbidades([...listaDeComorbidades, { id: id, descricao: descricao }])
                preencherCheck()
                setCheckedState(updatedCheckedState);
        }
        else {
            handleRemoveComorbidades(id) 
            setCheckedState(updatedCheckedState);
        }
    }

    const handleAptoInapto = (aptoInapto) => {
        setCheckedAptoInapto(aptoInapto)
    }
    const handleRecebePerguntas = (perguntas) => {
 

        setComponenteFilho(perguntas)
        let lista = {}
        perguntas.map((item) => {
            let valor = item.valor
            if (item.descricao == 'fazUsoDeMedicacaoContinua') {
                lista[item.descricao] = item.valor
                lista['descricaoMedicacaoContinua'] = item.resppergunta
            } else if (item.descricao == 'possuiLicencaOudispensaAtualmente') {
                lista[item.descricao] = valor
                lista['descricaoTempoLicencaDispensa'] = item.resppergunta
            } else if (item.descricao == 'possuiOutroProblemaDeSaude') {
                lista[item.descricao] = valor
                lista['descricaoOutroProblemaSaude'] = item.resppergunta
            } else {
                lista[item.descricao] = valor
            }
        })
        setPerguntas(lista)
    }
    const handlehabilitarCamposCadastro = () => {
        setDisabled(false)
    }
    return (
        <Container>
            <Card>
                <CardHeader
                    title=" Ficha de Inspeção de Saúde - JMS"
                />
                <CardContent>
                    <Grid container spacing={1} display="flex"  >
                        <Grid item xs={12} md={4} >
                            <TextFieldAutocomplete id="Matricula" value={pessoa} label="Matricula" actionFilter={BuscarPessoa} actionChangeOption={ChangePessoa} getOptionLabel={(option) => console.log(option)} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                        </Grid>
                        {CamposHidden ? <>
                            <Grid item xs={12} md={3} >
                                <TextField id="outlined-basic" size="small" label="N° Registro" value={''} disabled={disabled} tooltip={''} variant="outlined" onChange={''} placeholder="Titular" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} md={5} >
                                <TextField id="outlined-basic" size="small" label="Nome" value={pessoa === null ? '' : pessoa.nome} tooltip={''} disabled variant="outlined" placeholder="Titular" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <TextField
                                    type="text"
                                    value={pessoa === null ? '' : pessoa.posto.nome}
                                    disabled={disabled}
                                    name="graduacao"
                                    label="Graduacao"
                                    fullWidth={true}
                                    variant="outlined"
                                    size="small"
                                />
                                {/* <TextField id="outlined-basic" type="graduacao"  margin="dense" name="graduacao" label="Post/Graduação" value={graduacao} tooltip={''} disabled={disabled} onChange={Graduacao} placeholder="Titular" fullWidth={true} margin="dense" /> */}
                            </Grid>
                            <Grid item xs={12} md={4} >
                                <TextField type="text" size="small" variant="outlined" value={pessoa === null ? '' : pessoa.ome === null ? '' : pessoa.ome.descricao} name="ome" label="Ome" disabled={disabled} fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} md={2} >
                                <TextField type="text" size="small" id="outlined-basic" label="Fone" value={pessoa === null ? '' : pessoa.telefone} tooltip={''} disabled={disabled} onChange={Fone} variant="outlined" placeholder="Titular" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <TextField type="text" size="small" id="outlined-basic" label="Est.Civil" value={pessoa === null ? '' : pessoa.estadoCivil} tooltip={''} disabled={disabled} onChange={EstCivil} variant="outlined" placeholder="Titular" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <TextField type="text" size="small" id="outlined-basic" label="Naturalidade" value={pessoa === null ? '' : pessoa.naturalidade} tooltip={''} disabled={disabled} onChange={Naturalidade} variant="outlined" placeholder="Titular" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} md={1} >
                                <Autocomplete
                                    size="small"
                                    id="combo-box-demo"
                                    options={uf}
                                    disabled={disabled}
                                    getOptionLabel={(option) => option.sigla}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="UF" variant="outlined" />}
                                />
                                {/* <TextField id="outlined-basic" label="UF" value={''} tooltip={''} disabled={disabled} onChange={Uf} variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" /> */}
                            </Grid>
                            <Grid item xs={12} md={4} >
                                <TextField id="outlined-basic" size="small" type="text" label="Pai" value={pessoa === null ? '' : pessoa.pai} tooltip={''} disabled={disabled} onChange={NomePai} variant="outlined" placeholder="Titular" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} md={4} >
                                <TextField id="outlined-basic" size="small" type="text" label="Mãe" value={pessoa === null ? '' : pessoa.mae} tooltip={''} disabled={disabled} onChange={NomeMae} variant="outlined" placeholder="Titular" fullWidth={true} />
                            </Grid>

                        </>

                            : ''}

                    </Grid>

                </CardContent>
            </Card>
            <div className="Spacer"></div>
            <Collapse in={CamposHidden}>
                <Card>
                    <CardHeader
                        title="Dados de Peso - IMC"
                    />
                    <CardContent>
                        <Grid container display="flex" spacing={1}>
                            <Grid item xs={12} md={4} >
                                <TextField
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                                    }}
                                    id="outlined-basic"
                                    label="Peso"
                                    value={peso === null ? null : peso}
                                    tooltip={''}
                                    name='peso'
                                    type="number"
                                    onChange={ChangePeso}
                                    variant="outlined"
                                    placeholder="Peso"
                                    fullWidth={true}
                                    size="small" />

                            </Grid>
                            <Grid item xs={12} md={4} >
                                <TextField
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">Metros</InputAdornment>,
                                    }}
                                    id="outlined-basic"
                                    label="Altura"
                                    value={altura === null ? '' : altura}
                                    tooltip={''}
                                    type="number"
                                    onChange={ChangeAltura}
                                    variant="outlined"
                                    placeholder="Altura"
                                    fullWidth={true}
                                    size="small" />

                            </Grid>
                            <Grid item xs={12} md={4} >
                                <TextField id="outlined-basic"
                                    label="IMC"
                                    value={(imc === null ? '' : imcClassificacao)}
                                    disabled
                                    variant="outlined"
                                    placeholder="IMC"
                                    fullWidth={true}
                                    size="small" />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <div className="Spacer"></div>

                <Card>
                    <CardHeader
                        title="Comorbidades"
                    />
                    <CardContent >
                        <Grid container  >
                            <FormControl required display="flex" flexDire error={''} component="fieldset" className={''}>
                                <FormGroup>
                                    {comorbidades && comorbidades.length ?
                                        comorbidades.map((item, index) => {
                                            return <FormControlLabel
                                                key={item.id}
                                                control={<Checkbox checked={ checkedState[index]} onClick={(e) => handleChangeComorbidades(e,index+1)} name={item.descricao} />}
                                                label={item.descricao}
                                                value={item.id}
                                            />
                                        }) : ''}
                                </FormGroup>
                            </FormControl>

                        </Grid>
                    </CardContent>
                </Card>
                <div className="Spacer"></div>
                <Card>
                    <CardHeader
                        title="Responda as perguntas abaixo:"
                    />
                    <CardContent>
                        <VerticalLinearStepper zeraComponente={pessoa === null ? false : true} aptoInapto={e => handleAptoInapto(e)} abrirModal={e => ChangeValidaFicha(e)} perguntas={(perguntas, aptoInapto) => handleRecebePerguntas(perguntas, aptoInapto)} setEsconderBotaoValidar={e => handleValidacaoBiometrica(e)} setHiddenBtn={e => setHiddenBtn(e)} handleIndex={e => handleIndex(e)} >

                        </VerticalLinearStepper>
                        {hiddenBtn ? <Grid className="ButtonPrimary" constainer display="flex" justifyContent='flex-end' >
                            <Grid item>
                                <Button variant="contained" color="success" onClick={ChangeValidaCampos}>Salvar Ficha</Button>
                            </Grid>
                        </Grid> : ""}
                    </CardContent>
                </Card>
                <ModalValidadorBiometria closeFunction={e => closeFunction(e)} isOpen={openValidador} cdPessoa={cdPessoa} afterValidate={(e) => afterValidate(e)} handleLoading={() => handleLoading()}></ModalValidadorBiometria>
                <div className="Spacer"></div>
            </Collapse>
            <Box >
                <DialogHeaderFooter
                    title="Atenção!"
                    idComponent="referencia-familiar"
                    handleClickClose={handleClickCloseModalExistente}
                    isOpen={isOpenModalExistente}
                    direction="row"
                    closeButton
                    alignItems="center"
                    maxWidth="md"
                    children={
                        <Grid display="flex" container alignItems="center" className="ModalExiste" >
                            <p>Encontramos Inspeções de saúde para <span style={{ fontWeight: "bold" }}>{pessoa == null ? '' : pessoa.nome}</span></p>
                            <p>Deseja visualizar a Inspeção de saúde  existente? </p>
                            <p>Se preferir pode efetuar uma nova Inspeção de saúde.</p>
                        </Grid>
                    }
                    footer={
                        <Box display="flex">
                            <Box m={1} className="ButtonPrimary" >

                                <Button onClick={() => props.history.push({
                                    pathname: '/administrativo/jms/fichaDeQuadroJms/visualizarFichasCadastradas',
                                    state: { detail: cdPessoa }
                                })} variant="outlined" color="success">Ver Inspeções Realizadas</Button>
                            </Box>
                            <Box m={1} className="fabButton " >
                                <Button onClick={handleDownloadPdf} variant="outlined" color="primary">Fazer Nova Inspeção</Button>
                            </Box>
                        </Box>
                    }
                />
            </Box>

        </Container>
    )
}
const mapStateToProps = state => ({ open: state.modal.open, usuario: state.usuario, modal: state.modal })
FicaParaQuadroDeAcessoJms = reduxForm({ form: 'forgotPasswordForm' })(FicaParaQuadroDeAcessoJms)
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBackdrop
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FicaParaQuadroDeAcessoJms);
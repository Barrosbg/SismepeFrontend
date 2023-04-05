import { Box, Grid,  Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { filtrarPaciente, pessoaById } from "../../actions/atendimento/assistencia_social/actions";
import TextFieldAutocomplete from '../../components/general/autocomplete';
import TextInput from '../../components/general/textInput';
import DialogHeaderFooter from "../../components/general/dialogHeaderFooter";
import InputSelect from "../../components/general/select/select";
import withOkAndCancel from "../../components/hocs/withOkAndCancel";
import { formatOptionBeneficiario, formatOptionCid, formatOptionMedico } from "../../services/filterFormatters";
import { cadastrarProcedimentosEAutorizacoes, filtrarCid, filtrarPrestador, listaProcedimentos } from "./actions";
import { ListEditProcedimentosEmpresas } from "./listEditProcedimentosEmpresas";
import  TextFieldEdit  from "./textField";

const Modal = withOkAndCancel(DialogHeaderFooter);

const ModalNovaSolicitacao = (props) => {
  const { setModalOpen, handleChange, linhaSelecionada, setLinhaSelecionada } = props;

  const [paciente, setPaciente] = useState({});
  const [pessoa, setPessoa] = useState({});
  const [prestador, setPrestador] = useState({});
  const [tipoExame, setTipoExame] = useState('');
  const [procedimentosEmpresas, setProcedimentosEmpresas] = useState([]);

  const [cid, setCid] = useState({});
  const [justificativa, setJustificativa] = useState('');
  const [ome, setOme] = useState(0);
  const [observacoes, setObservacoes] = useState('');
  const [observacoesRestritas, setObservacoesRestritas] = useState('');
  const [naturezaGuia, setNaturezaGuia] = useState('');
  const [campoOme, setCampoOme] = useState({});
  const [classificacao, setClassificacao] = useState('');
  const [acomodacao, setAcomodacao] = useState(null);
  const [regime, setRegime] = useState(null);

  const isNovaSolicitacaoFilha = linhaSelecionada?.id;

  const addProcedimento = (proc) => {
    const existe = procedimentosEmpresas.filter(pe => pe.itSolicitacao?.procedimento.id === proc.id).length > 0;

    if (!existe) {
      const autorizaAutomaticamente = proc?.valor <= 100;

      setProcedimentosEmpresas([
        ...procedimentosEmpresas,
        {
          itSolicitacao: {
            procedimento: proc,
            situacao: autorizaAutomaticamente ? 'A' : 'E',
            quantidade: 1
          },
          quantidade: 0,
          empresa: {}
        }
      ]);
      toast.success('Procedimento adicionado com sucesso.');
    } else {
      toast.error('Procedimento já adicionado.');
    }
  }

  const handleSave = async () => {
    if (paciente.id && prestador.id && tipoExame && procedimentosEmpresas.length > 0
      && cid.id && ome !== 0 && classificacao.length > 0 && naturezaGuia.length > 0) {
      let json = {
        prestadorSolicitante: {
          id: prestador.id
        },
        paciente: {
          id: paciente.id
        },
        carater: tipoExame,
        itRealizados: [],
        cid: {
          id: cid.id
        },
        ome: {
          id: ome
        },
        justificativa: justificativa,
        observacao: observacoes,
        observacaoRestrita: observacoesRestritas,
        natureza: naturezaGuia,
        classificacao: classificacao,
        acomodacao: acomodacao,
        regimeInterno: regime,
      }

      if (isNovaSolicitacaoFilha) {
        json.solicitacaoPai = {
          id: linhaSelecionada?.id
        }
      }

      procedimentosEmpresas.forEach(async (pe) => {
        if (pe.itSolicitacao.procedimento.id) {
          const tmp = {
            itSolicitacao: {
              procedimento: {
                id: pe.itSolicitacao.procedimento.id
              },
              situacao: pe.itSolicitacao.situacao,
              quantidade: pe.itSolicitacao.quantidade,
            },
            quantidadeAutorizada: pe.quantidade,
            empresa: pe.empresa?.id ? {
              id: pe.empresa.id
            } : null
          };

          json.itRealizados.push(tmp);
        }
      });

      if (json.itRealizados.length > 0) {
        if (json.itRealizados.some((it => it.empresa?.id && (!it.quantidadeAutorizada || it.quantidadeAutorizada < 1)))) {
          toast.error('Para autorizar o exame, é necessário informar a quantidade de procedimentos autorizados.');
        } else if (json.itRealizados.some((it => it.empresa?.id && it.quantidadeAutorizada < 1))) {
          toast.error('A quantidade de procedimentos autorizados deve ser maior que zero.');
        } else if (json.itRealizados.some((it => (!it.empresa?.id || it.quantidadeAutorizada < 1) && it?.itSolicitacao?.situacao === "A"))) {
          toast.error('Empresa ou quantidade autorizada não informada.');
        } else {
          const res = await cadastrarProcedimentosEAutorizacoes(json);
          if (res?.status === 201) {
            setModalOpen(false);
            handleChange();
          }
        }
      } else {
        toast.error('Nenhum procedimento selecionado!');
      }

    } else {
      toast.error('Todos os campos devem estar preenchidos!');
    }
  }

  const buscaPessoa = async (id) => {
    const p = await pessoaById(id);
    setPessoa(p);
  }

  useEffect(() => {
    if (linhaSelecionada?.id) {
      setPaciente(linhaSelecionada?.paciente);
      setPessoa(linhaSelecionada?.paciente?.pessoa);
      setPrestador(linhaSelecionada?.prestadorSolicitante);
      setTipoExame(linhaSelecionada?.carater);
      setCid(linhaSelecionada?.cid);
      setOme(linhaSelecionada?.ome);
      setNaturezaGuia(linhaSelecionada?.natureza);
      setCampoOme(linhaSelecionada?.ome);
      setClassificacao(linhaSelecionada?.classificacao);
      setAcomodacao(linhaSelecionada?.acomodacao);
      setRegime(linhaSelecionada?.regimeInternacao);

      setJustificativa(linhaSelecionada?.justificativa);
      setObservacoes(linhaSelecionada?.observacao);
      setObservacoesRestritas(linhaSelecionada?.observacaoRestrita);
    }
  }, [])

  useEffect(() => {
    const renderOme = () => {
      if (props.usuario.perfis.some((p) => p.siglaPermissao === 'GESTOR_EXAME_INTERN')) {
        setOme(293);
        return (
          <Grid item xs={12} sm={12} md={3}>
            <InputSelect
              label="OME"
              placeholder="OME"
              disabled
              handlerOption={() => { }}
              optionSelected={293}
              sx={{height:45}} 
              options={[
                { value: 293, label: "CMH" },
              ]}
            />
          </Grid>
        )
      } else {
        if (props.usuario.ome) {
          const omes = [293,
            29,
            64,
            181,
            93,
            95,
            97,
            328,
            55,
            159,
            65,
            44,
            30,
            67,
            384,
            190,
          ]
          if (omes.some((o) => o === props.usuario.ome.id)) {
            setOme(props.usuario.ome.id);
            return (
              <Grid item xs={12} sm={12} md={3}>
                <InputSelect
                  label="OME"
                  placeholder="OME"
                  disabled
                  handlerOption={(val) => { }}
                  optionSelected={props.usuario.ome.id}
                  options={[
                    { value: 293, label: "CMH" },
                    { value: 29, label: "2º Nazaré da Mata" },
                    { value: 64, label: "3º Arcoverde" },
                    { value: 181, label: "4º Caruaru" },
                    { value: 93, label: "5º DS" },
                    { value: 95, label: "7º Ouricuri" },
                    { value: 97, label: "8º Salgueiro" },
                    { value: 328, label: "8º CIPM Pesqueira" },
                    { value: 55, label: "9º Garanhuns" },
                    { value: 159, label: "10º Palmares" },
                    { value: 65, label: "14º Serra Talhada" },
                    { value: 44, label: "15º Pesqueira/B. Jardim" },
                    { value: 30, label: "22º Carpina/Surubim" },
                    { value: 67, label: "23º Afogados da Ingazeira" },
                    { value: 384, label: "CEMATA" },
                    { value: 190, label: "4º CIPM Petrolandia" },
                  ]}
                />
              </Grid>
            )
          } else {
            toast.error('Unidade inválida para solicitação de exame!');
            return (
              <Grid item xs={12} sm={12} md={3}>
                <InputSelect
                  label="OME"
                  placeholder="OME"
                  disabled
                  handlerOption={(val) => { }}
                  optionSelected={0}
                  options={[
                    { value: 0, label: "Selecione OME" },
                  ]}
                />
              </Grid>
            )
          }
        } else {
          toast.error('Você precisa estar vinculado a um OME para solicitar exames!');

          return (
            <Grid item xs={12} sm={12} md={3}>
              <InputSelect
                label="OME"
                placeholder="OME"
                disabled
                sx={{height:45}} 
                handlerOption={(val) => { }}
                optionSelected={0}
                options={[
                  { value: 0, label: "Selecione OME" },
                ]}
              />
            </Grid>
          )
        }
      }
    }

    setCampoOme(renderOme());
  }, []);

  useEffect(() => {
    return () => {
      setLinhaSelecionada({});
    }
  }, []);

  return (
    <Modal
      isOpen
      handleClose={() => setModalOpen(false)}
      title="Solicitação de exame"
      cancelAction={() => setModalOpen(false)}
      okLabel="Solicitar"
      okAction={() => handleSave()}
    >
      <Grid container spacing={1} alignItems="center" display="flex" >
        <Grid item xs={12} sm={12} md={6} >
          <TextFieldAutocomplete  size='small'  label="Beneficiário" disabled={isNovaSolicitacaoFilha} actionFilter={filtrarPaciente} value={pessoa} actionChangeOption={(novoPaciente) => { if (novoPaciente) { setPaciente(novoPaciente); buscaPessoa(novoPaciente?.pessoaId) } }} getOptionLabel={formatOptionBeneficiario} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
        </Grid>

         <Grid item xs={12} sm={12} md={3}> 
          <TextField size='small'  label="Data de Nascimento" type="text" value={pessoa?.dataNascimento || 'Sem data de Nascimento'} disabled fullWidth  />
         </Grid> 
        <Grid item xs={12} sm={12} md={3} >
          <TextField size='small'   label="Parentesco" value={pessoa?.parentesco?.descricao || 'Sem parentesco'} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={3}  >
          <TextField size='small'   label="Data concessão" value={pessoa?.dataConcessao || 'Sem data de concessão'} disabled fullWidth />
         </Grid> 

        <Grid item xs={12} sm={12} md={9} >
          <TextFieldAutocomplete    label="Médico" disabled={isNovaSolicitacaoFilha} actionFilter={filtrarPrestador} value={prestador} minSizeFilter={0} actionChangeOption={(novoPrestador) => setPrestador(novoPrestador)} getOptionLabel={formatOptionMedico} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <InputSelect
            label="Eletivo/Urgência"
            placeholder="Eletivo/Urgência"
            disabled={isNovaSolicitacaoFilha}
            handlerOption={(val) => setTipoExame(val)}
            optionSelected={tipoExame}
           
            options={[
              { value: "ELETIVO", label: "Eletivo" },
              { value: "URGENCIA", label: "Urgência" },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <TextFieldAutocomplete label="CID"  disabled={isNovaSolicitacaoFilha} value={cid} actionFilter={filtrarCid} minSizeFilter={0} actionChangeOption={(val) => { setCid(val) }} getOptionLabel={formatOptionCid} />
        </Grid>
        {campoOme}
        <Grid item xs={12} sm={12} md={4}>
          <InputSelect
            label="Classificação da guia"
            placeholder="Classificação da guia"
            disabled={isNovaSolicitacaoFilha}
            handlerOption={(val) => setClassificacao(val)}
            optionSelected={classificacao}
            
            options={[
              { value: "AMBULATORIO", label: "Ambulatório" },
              { value: "INTERNACAO", label: "Internação" },
              { value: "ONCOLOGIA", label: "Oncologia" },
              { value: "URGENCIA", label: "Urgência" },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <InputSelect
            label="Natureza da guia"
            placeholder="Natureza da guia"
            disabled={isNovaSolicitacaoFilha}
            handlerOption={(val) => setNaturezaGuia(val)}
            optionSelected={naturezaGuia}
        
            options={[
              { value: "EXAME", label: "Exame" },
              { value: "INTERNACAO_CLINICA", label: "Internação clínica" },
              { value: "INTERNACAO_CIRURGICA", label: "Internação cirúrgica" },
              { value: "INTERNACAO_OBSTETRICA", label: "Internação obstétrica" },
              { value: "INTERNACAO_PEDIATRICA", label: "Internação pediátrica" },
              { value: "INTERNACAO_PSIQUIATRICA", label: "Internação psiquiátrica" },
            ]}
          />
        </Grid>
        {naturezaGuia !== 'EXAME' &&
          <>
            <Grid item xs={12} sm={12} md={4}>
              <InputSelect
                label="Acomodação"
                placeholder="Acomodação"
                disabled={isNovaSolicitacaoFilha}
                handlerOption={(val) => setAcomodacao(val)}
                optionSelected={acomodacao}
             
                options={[
                  { value: 'AMBULATORIAL', label: 'Ambulatorial' },
                  { value: 'APARTAMENTO', label: 'Apartamento' },
                  { value: 'ENFERMARIA', label: 'Enfermaria' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <InputSelect
                label="Regime internação"
                placeholder="Regime internação"
                disabled={isNovaSolicitacaoFilha}
                handlerOption={(val) => setRegime(val)}
                optionSelected={regime}
              
                size='small'
                options={[
                  { value: "HOSPITALAR", label: "Hospitalar" },
                  { value: "HOSPITALAR_DIA", label: "Hospitalar-dia" },
                  { value: "DOMICILIAR", label: "Domiciliar" },
                ]}
              />
            </Grid>
          </>
        }
        <Grid item xs={12} sm={12} md={12}>
          <TextField 
            size="small" 
            multiline minRows={3} 
            variant="outlined" 
            label="Justificativa" 
            value={justificativa} 
            onChange={(e) => setJustificativa(e.target.value)} 
            fullWidth 
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextFieldAutocomplete key={Math.random()} label="Procedimento" actionFilter={listaProcedimentos} minSizeFilter={0} actionChangeOption={(val) => { if (val !== null) { addProcedimento(val) } }} getOptionLabel={(option) => option.especificacao && option.descricao ? option.especificacao + ' - ' + option.descricao : ''} />
        </Grid>

        {procedimentosEmpresas.length > 0 &&
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h6">
              Procedimentos
            </Typography>
          </Grid>}

        <Grid item xs={12} sm={12} md={12}>
          <ListEditProcedimentosEmpresas procedimentoEmpresa={procedimentosEmpresas} setProcedimentoEmpresa={setProcedimentosEmpresas} modo='inclusaoAutorizacao' ome={ome} />
        </Grid>

        <div className="Spacer"></div>

        <Grid item xs={12} sm={12} md={6}>
          <TextField size="small" multiline minRows={3} variant="outlined" label="Observações" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField size="small" multiline minRows={3} variant="outlined" label="Observações restritas" value={observacoesRestritas} onChange={(e) => setObservacoesRestritas(e.target.value)} fullWidth />
        </Grid>
      </Grid>
    </Modal>
  );
}

const mapStateToProps = state => ({ usuario: state.usuario })
export default connect(mapStateToProps, null)(ModalNovaSolicitacao)
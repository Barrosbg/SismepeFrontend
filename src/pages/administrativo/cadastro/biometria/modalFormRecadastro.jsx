import { Box, Button, ThemeProvider, StyledEngineProvider, adaptV4Theme } from "@mui/material";
import { green } from "@mui/material/colors";
import { createTheme } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { fetchBackdrop } from "../../../../actions/geral/actions";
import DialogHeaderFooter from "../../../../components/general/dialogHeaderFooter";
import api from "../../../../constants/api";
import { cellphoneWithoutMask, cepWithoutMask, cpfWithoutMask } from "../../../../services/general";
import Form from "./formRecadastramento";
import FormTitular from "./formRecadastramentoTitular";

function ModalFormRecadastro(props) {
  const defaultValues = {
    nomeMae: '',
    cpf: '',
    dataNascimento: '',
    dataValidadePlano: '',
    genero: '',
    logradouro: '',
    numero: '',
    complemento: '',
    cep: '',
    uf: '',
    cidade: '',
    numeroTelefone: '',
    numeroWhatsapp: '',
    email: '',
  };

  const { watch, handleSubmit, control, formState: { errors }, reset, getValues } = useForm({ mode: 'all' });

  const { id, matricula, sequencial, nome } = props?.dependenteSelecionado || {};

  const theme = createTheme(adaptV4Theme({
    palette: {
      primary: {
        main: green[600]
      },
    },
  }));

  const onSubmit = async (data) => {
    const { cep, complemento, cpf, dataNascimento, dataValidadePlano, email, genero, grauParentesco, logradouro,
      numero, numeroProcesso, numeroSEI, numeroTelefone, numeroWhatsapp, tipoDemanda, beneficiarioDireto, uf, cidade,
      universitario, invalido, nomeMae } = data;

    let camposDependente = {};

    if (!props.isTitular) {
      // if (!props.isTitular && props.perfis.some(p => p.siglaPermissao === "RECADASTRAMENTO_BIOMETRIA")) {
        camposDependente = {
          cdPessoa: id,
          matricula: matricula,
          sequencial: sequencial,
          beneficiarioDireto: beneficiarioDireto,
          grauParentesco: grauParentesco,
          dataValidadePlano: dataValidadePlano,
        };
      // } else {
      //   camposDependente = {
      //     cdPessoa: id,
      //     matricula: matricula,
      //     sequencial: sequencial,
      //     dataValidadePlano: dataValidadePlano,
      //     beneficiarioDireto: beneficiarioDireto,
      //   };
      // }
    }

    let pdDados = {
      ...camposDependente,
      cep: cepWithoutMask(cep),
      complemento: complemento,
      cpf: cpfWithoutMask(cpf),
      dataNascimento: dataNascimento,
      email: email,
      genero: genero,
      logradouro: logradouro,
      numero: numero,
      numeroTelefone: cellphoneWithoutMask(numeroTelefone),
      numeroWhatsapp: cellphoneWithoutMask(numeroWhatsapp),
      uf: uf,
      cidade: cidade,
      nomeMae: nomeMae,
    };

    if (!props.isTitular) {
      if (grauParentesco === 2) {
        pdDados = { ...pdDados, ...{ numeroProcesso: numeroProcesso }, ...{ numeroSEI: numeroSEI }, ...{ tipoDemanda: tipoDemanda } };
      } else {
        pdDados = { ...pdDados, ...{ grauParentesco: grauParentesco }, ...{ universitario: universitario }, ...{ invalido: invalido } };
      }
    } else {
      pdDados = { cdPessoa: props.cdPessoa, matricula: props.matricula, ...pdDados };
    }

    const basicos = props.perfis?.some(p => p.siglaPermissao === "RECADASTRAMENTO_BIOMETRIA") ? '?basico=false' : '?basico=true';
    const url = props.isTitular ? '/pessoa/titular' : `/pessoa${basicos}`;

    console.log(pdDados);

    const response = await api.put(url, pdDados);

    console.log(response);

    if (response.status === 200) {
      toast.success("Dados atualizados com sucesso!");
      props.closeFunction(false);
      reset(defaultValues);
    }
  };

  function handleClose() {
    reset(defaultValues);
    props.closeFunction(false);
  }

  function handleSave() {
    handleSubmit(onSubmit)();
  }

  const form = props.isTitular ?
    <FormTitular errors={errors} control={control} watch={watch} reset={reset} getValues={getValues}
      cdPessoa={props.cdPessoa} nome={props.nome} fetchBackdrop={props.fetchBackdrop} />
    :
    <Form errors={errors} control={control} watch={watch} reset={reset} getValues={getValues}
      cdPessoa={id} matricula={matricula} sequencial={sequencial} nome={nome} fetchBackdrop={props.fetchBackdrop} perfis={props.perfis} />

  return (
    <DialogHeaderFooter
      title="Dados pessoais"
      idComponent="edit-dependente"
      handleClickClose={() => props.closeFunction(false)}
      isOpen={props.isOpen}
      children={form}
      height={800}
      footer={
        <Box display="flex">
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Box m={0.5}>
                <Button
                  onClick={() => handleClose()}
                  variant="outlined"
                  color="secondary"
                >Fechar</Button>
              </Box>
              <Box m={0.5}>
                <Button
                  onClick={() => handleSave()}
                  variant="contained"
                  color="primary"
                >Salvar</Button>
              </Box>
            </ThemeProvider>
          </StyledEngineProvider>
        </ Box>
      }
    />
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchBackdrop }, dispatch);
export default connect(null, mapDispatchToProps)(ModalFormRecadastro);
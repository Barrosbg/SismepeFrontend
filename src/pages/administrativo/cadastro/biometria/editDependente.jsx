import { Box, Button, ThemeProvider, StyledEngineProvider, adaptV4Theme } from "@mui/material";
import { green } from "@mui/material/colors";
import { createTheme } from '@mui/material/styles';
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { isDigitalDirty, salvarBiometria, addFoto } from "../../../../actions/administrativo/cadastro/biometria/actions";
import { fetchBackdrop } from "../../../../actions/geral/actions";
import Camera from "../../../../components/general/camera";
import DialogHeaderFooter from "../../../../components/general/dialogHeaderFooter";
import ImpressaoDigital from "../../../../components/general/impressaoDigital";
import TabsTop from "../../../../components/general/TabsTop";
import ValidadorBiometria from "../../../../components/general/validadorBiometria";
import api from "../../../../constants/api";
import { cellphoneWithoutMask, cepWithoutMask, cpfWithoutMask } from "../../../../services/general";
import Form from "./formRecadastramento";

function EditDependente(props) {
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

  const { watch, handleSubmit, control, formState: { errors, isDirty }, reset, getValues } = useForm({ mode: 'all' });
  const [currentTab, setCurrentTab] = useState(0);
  const confirm = useConfirm();
  const [blockTab, setBlockTab] = useState(false);

  const { id, matricula, sequencial, nome } = props.dependenteSelecionado;

  const [hashes, setHashes] = useState([
    { index: 1, hash: '' },
    { index: 2, hash: '' },
    { index: 3, hash: '' },
    { index: 4, hash: '' },
  ]);

  const [base64Foto, setBase64Foto] = useState("");

  const theme = createTheme(adaptV4Theme({
    palette: {
      primary: {
        main: green[600]
      },
    },
  }));

  const onSubmit = async (data) => {
    if (currentTab === 0) {
      const { cep, complemento, cpf, dataNascimento, dataValidadePlano, email, genero, grauParentesco, logradouro,
        numero, numeroProcesso, numeroSEI, numeroTelefone, numeroWhatsapp, tipoDemanda, beneficiarioDireto, uf, cidade, 
        universitario, invalido, nomeMae } = data;

      let pdDados = {
        cdPessoa: id,
        matricula: matricula,
        sequencial: sequencial,
        beneficiarioDireto: beneficiarioDireto,
        cep: cepWithoutMask(cep),
        complemento: complemento,
        cpf: cpfWithoutMask(cpf),
        dataNascimento: dataNascimento,
        dataValidadePlano: dataValidadePlano,
        email: email,
        genero: genero,
        grauParentesco: grauParentesco,
        logradouro: logradouro,
        numero: numero,
        numeroTelefone: cellphoneWithoutMask(numeroTelefone),
        numeroWhatsapp: cellphoneWithoutMask(numeroWhatsapp),
        uf: uf,
        cidade: cidade,
        nomeMae: nomeMae,
      };

      if (grauParentesco === 2) {
        pdDados = { ...pdDados, ...{ numeroProcesso: numeroProcesso }, ...{ numeroSEI: numeroSEI }, ...{ tipoDemanda: tipoDemanda } };
      } else {
        pdDados = { ...pdDados, ...{ grauParentesco: grauParentesco }, ...{ universitario: universitario }, ...{ invalido: invalido } };
      }

      const response = await api.put('/pessoa', pdDados);

      if (response.status === 200) {
        toast.success("Dados atualizados com sucesso!");
        props.closeFunction(false);
        reset(defaultValues);
      }
    }
  };

  function handleClose() {
    reset(defaultValues);
    props.closeFunction(false);
  }

  async function handleSaveImage() {
    const data = {
      base64: base64Foto,
      extensao: "jpg"
    };

    const res = await api.post('/pessoa/' + id + '/foto/upload', data);
    return res;
  }

  async function salvarFoto() {
    const res = await handleSaveImage();
    if (res.status === 200) {
      toast.success("Foto salva com sucesso!");

      const index = props.deps.findIndex(dep => dep.id === id);
      props.deps[index].fotoBase64 = base64Foto;
      props.setDependentes([...props.deps]);
    }
    // props.addFoto(base64Foto);
    // props.closeFunction(false);
  }

  async function confirmClose() {
    switch (currentTab) {
      case 0:
        if (isDirty) {
          confirm({ description: 'Existem dados não salvos. Deseja realmente fechar?', title: 'Dados preenchidos não salvos', cancellationText: 'Não', confirmationText: 'Sim' })
            .then(() => { handleClose() })
            .catch(() => { });
        } else {
          handleClose();
        }
        break;
      case 1:
        const alterado = await isDigitalDirty(hashes, id);

        if (alterado) {
          confirm({ description: 'Existem digitais não salvas. Deseja realmente fechar?', title: 'Dados preenchidos não salvos', cancellationText: 'Não', confirmationText: 'Sim' })
            .then(() => { handleClose() })
            .catch(() => { });
        } else {
          handleClose();
        }
        break;
      default:
        handleClose(); break;
    }
  }

  const ttr = [
    {
      index: 0, label: "Dados pessoais", disabled: blockTab,
      component: <Form errors={errors} control={control} watch={watch} reset={reset} getValues={getValues}
        cdPessoa={id} matricula={matricula} sequencial={sequencial} nome={nome} fetchBackdrop={props.fetchBackdrop} />
    },
    {
      index: 1, label: "Biometria Digital", disabled: blockTab,
      component: <ImpressaoDigital cdPessoa={id} hashes={hashes} setHashes={setHashes} setBlockUI={setBlockTab} />
    },
    { index: 2, label: "Validação de biometria", disabled: blockTab, component: <ValidadorBiometria cdPessoa={id} /> },
    { index: 3, label: "Fotografia", disabled: blockTab, component: <Camera setBotaoSalvarVisible={() => {}} setBase64Foto={setBase64Foto} /> },
  ];

  function handleSave() {
    if (currentTab === 0) { 
      handleSubmit(onSubmit)
    } 
    else if (currentTab === 3) { 
      salvarFoto();
    } 
    else { salvarBiometria(hashes, id) }

    handleClose();
  }

  return (
    <DialogHeaderFooter
      idComponent="edit-dependente"
      handleClickClose={() => confirmClose()}
      isOpen
      children={<TabsTop currentTab={currentTab} setCurrentTab={setCurrentTab} tabsToRender={ttr} />}
      height={800}
      footer={
        <Box display="flex">
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Box m={0.5}>
                <Button
                  onClick={() => confirmClose()}
                  variant="outlined"
                  color="secondary"
                  disabled={blockTab}>Fechar</Button>
              </Box>
              <Box m={0.5}>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                  disabled={blockTab}>Salvar</Button>
              </Box>
            </ThemeProvider>
          </StyledEngineProvider>
        </ Box>
      }
    />
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop, addFoto }, dispatch);
export default connect(null, mapDispatchToProps)(EditDependente);
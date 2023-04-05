import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isDigitalDirty, salvarBiometria } from "../../../../actions/administrativo/cadastro/biometria/actions";
import DialogHeaderFooter from "../../../../components/general/dialogHeaderFooter";
import ImpressaoDigital from "../../../../components/general/impressaoDigital";

export default function ModalNovaBiometria(props) {
  const [hashes, setHashes] = useState([
    { index: 1, hash: '' },
    { index: 2, hash: '' },
    { index: 3, hash: '' },
    { index: 4, hash: '' },
  ]);
  const [blockButtons, setBlockButtons] = useState(false);

  const confirm = useConfirm();

  const theme = createTheme(adaptV4Theme({
    palette: {
      primary: {
        main: green[600]
      },
    },
  }));

  useEffect(() => {
    return () => {
      hashes.map((hash) => hash.hash = '');
      setHashes(...hashes);
    }
  }, []);

  async function handleClose() {
    const alterado = await isDigitalDirty(hashes, props.cdPessoa);

    if (alterado) {
      confirm({ description: 'Existem digitais não salvas. Deseja realmente fechar?', title: 'Dados preenchidos não salvos', cancellationText: 'Não', confirmationText: 'Sim' })
        .then(() => { props.closeFunction(false) })
        .catch(() => { });
    } else {
      props.closeFunction(false);
    }
  }

  async function handleSave() {
    try {
      await salvarBiometria(hashes, props.cdPessoa)
      props.closeFunction(false);
    } catch (e) {
      toast.error("Erro ao salvar biometria");
    }
  }

  return (
    <DialogHeaderFooter
      title="Cadastro de impressão digital"
      idComponent="impressao-digital"
      handleClickClose={() => { handleClose(); }}
      isOpen={props.isOpen}
      children={<ImpressaoDigital cdPessoa={props.cdPessoa} hashes={hashes} setHashes={setHashes} setBlockUI={setBlockButtons} />}
      footer={
        <Box display="flex">
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Box m={0.5}>
                <Button
                  onClick={() => { handleClose(); }}
                  variant="outlined"
                  color="secondary"
                  disabled={blockButtons}
                >Fechar</Button>
              </Box>
              <Box m={0.5}>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                  disabled={blockButtons}
                >Salvar</Button>
              </Box>
            </ThemeProvider>
          </StyledEngineProvider>
        </Box>
      }
    />
  );
}
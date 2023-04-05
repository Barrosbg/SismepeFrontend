import {
  Box,
  Button,
  createTheme,
  TextField,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { setTelefone } from "../../../../actions/administrativo/cadastro/biometria/actions";
import DialogHeaderFooter from "../../../../components/general/dialogHeaderFooter";
import api from "../../../../constants/api";
import { cellphoneMask, cellphoneWithoutMask } from "../../../../services/general";

function ModalEditPhone({ isOpen, cdPessoa, storedPhone = '', blockButtons = false, setTelefone }) {
  const [phone, setPhone] = useState(storedPhone);

  const theme = createTheme(adaptV4Theme({
    palette: {
      primary: {
        main: green[600]
      },
    },
  }));

  function save() {
    api.put('/pessoa/telefone', { cdPessoa: cdPessoa, telefone: cellphoneWithoutMask(phone) })
      .then((res) => {
        toast.success('Telefone atualizado com sucesso');
        isOpen(false);
        setTelefone(cellphoneWithoutMask(phone));
      })
      .catch((err) => {
        toast.error('Erro ao atualizar telefone');
      });
  }

  return (
    <DialogHeaderFooter
      title="Edição de telefone"
      idComponent="edicao-telefone"
      handleClickClose={e => isOpen(false)}
      isOpen={true}
      maxWidth="sm"
      children={<TextField value={phone} onChange={(e) => setPhone(cellphoneMask(e.target.value))} label="Telefone" type="text" size="small" variant="outlined" fullWidth />}
      footer={
        <Box display="flex">
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Box m={0.5}>
                <Button
                  onClick={() => { isOpen(false) }}
                  variant="outlined"
                  color="secondary"
                  disabled={blockButtons}
                >Fechar</Button>
              </Box>
              <Box m={0.5}>
                <Button
                  onClick={() => save()}
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ setTelefone }, dispatch);
export default connect(null, mapDispatchToProps)(ModalEditPhone);
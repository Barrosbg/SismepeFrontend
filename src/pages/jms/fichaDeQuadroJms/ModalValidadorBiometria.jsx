import { Box, Button } from "@mui/material";
import DialogHeaderFooter from "../../../components/general/dialogHeaderFooter";
import ValidadorBiometria from "../../../components/general/validadorBiometria";

export default function ModalValidadorBiometria(props) {
 
  return (
    <DialogHeaderFooter
        title="Validação de impressão digital"
        idComponent="validacao-impressao-digital"
        handleClickClose={e => props.closeFunction(false)}
        isOpen={props.isOpen}
        children={<ValidadorBiometria cdPessoa={props.cdPessoa} afterValidate={props.afterValidate} handleLoading={props.handleLoading}/>}
        footer={
          <Box display="flex">
            <Box>
              <Button 
                onClick={e => props.closeFunction(false)} 
                variant="contained" 
                style={{
                  backgroundColor: "#e04747",
                  color: "white",
                  margin: "10px"
                }}
                color="primary"
              >Fechar</Button>
            </Box>
          </Box>
        }
      />
  );
}
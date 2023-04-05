import { Box, Button } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addFoto, adicionaMatricula, changeFieldEndereco, getInfo, selecionaPessoa } from '../../../../actions/administrativo/cadastro/biometria/actions';
import Camera from '../../../../components/general/camera';
import DialogHeaderFooter from "../../../../components/general/dialogHeaderFooter";
import api from "../../../../constants/api";

function ModalCamera(props) {
  async function handleSaveImage(base64Foto) {
    const data = {
      base64: base64Foto,
      extensao: "png"
    };

    const res = await api.post('/pessoa/' + props.cdPessoa + '/foto/upload', data);

    console.log(res);

    props.addFoto(base64Foto);
    props.closeFunction(false);
  }

  return (
    <DialogHeaderFooter
      title="Imagem biométrica"
      idComponent="imagem-biometrica"
      handleClickClose={e => props.closeFunction(false)}
      isOpen={props.isOpen}
      children={<Camera handleSaveImage={handleSaveImage}></Camera>}
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
            >Fechar</Button>
          </Box>
        </Box>
      }
    />
  )
}

const mapStateToProps = (state) => {
  return {
    pessoas: state.inputMatricula.pessoas,
    pessoaSelecionada: state.inputMatricula.pessoaSelecionada,
    matricula: state.inputMatricula.matricula,
    digitais: state.biometria.digitais,
    info: state.inputMatricula.info,
    foto: state.biometria.foto,
    cdPessoa: state.inputMatricula.pessoaSelecionada,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selecionaPessoa,
  adicionaMatricula,
  getInfo,
  changeFieldEndereco, addFoto
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ModalCamera);
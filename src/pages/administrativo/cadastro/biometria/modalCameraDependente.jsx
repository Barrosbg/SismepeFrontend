import { Box, Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Camera from '../../../../components/general/camera';
import DialogHeaderFooter from "../../../../components/general/dialogHeaderFooter";
import api from "../../../../constants/api";

export default function ModalCameraDependente(props) {
  async function handleSaveImage(base64Foto) {
    const data = {
      base64: base64Foto,
      extensao: "png"
    };

    const res = await api.post('/pessoa/' + props.cdPessoa + '/foto/upload', data);
    console.log(res);

    if (res.status === 200) {
      toast.success("Foto salva com sucesso!");
    } else {
      toast.error("Erro ao salvar foto!");
    }
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
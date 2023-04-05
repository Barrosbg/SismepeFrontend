import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getBase64FromUrl, getPessoa } from "../../../../actions/administrativo/cadastro/biometria/actions";
import DialogHeaderFooter from "../../../../components/general/dialogHeaderFooter";
import UserCard from "../../../../components/general/userCard";
import ValidadorBiometria from "../../../../components/general/validadorBiometria";
import { cpfMask } from "../../../../services/general";

const initialInfoState = { nome: "", cpf: "", foto: "", matricula: "" };

export default function ModalCheckBiometria(props) {
  const [isValid, setValid] = useState(false);
  const [info, setInfo] = useState(initialInfoState);

  useEffect(async () => {
    if (isValid) {
      let base64Foto = "";
      const pessoa = await getPessoa(props.cdPessoa);

      if (pessoa?.id) {
        const matricula = pessoa?.tipoBeneficiario === "PessoaTitular" ? `${pessoa?.matricula}-${pessoa?.digito}` : `${pessoa?.matricula}/${pessoa?.sequencial}`;

        if (pessoa?.urlFotoRecadastramento) {
          base64Foto = await getBase64FromUrl(pessoa?.urlFotoRecadastramento);
        }

        const i = {
          nome: pessoa?.nome,
          cpf: cpfMask(pessoa?.cpf) ?? "Sem CPF cadastrado",
          foto: base64Foto,
          matricula: matricula
        };

        setInfo(i);
      }
    }
  }, [isValid]);

  useEffect(() => {
    return () => {
      setInfo(initialInfoState);
      setValid(false);
    }
  }, []);

  const validador = <ValidadorBiometria cdPessoa={props.cdPessoa} afterValidate={setValid} />;
  const infoUI = (
    info?.nome !== "" && (
      <UserCard
        mainInfo={info?.nome}
        avatar={info?.foto}
        infos={[
          { icon: 'credit_card', text: info?.cpf, label: 'CPF' },
          { icon: 'assignment_ind', text: info?.matricula, label: 'Matrícula' },
        ]}
      />
    )
  );

  const content = (
    <>
      <Box display="flex" flexDirection="row">
        {validador}

        {isValid &&
          <Box style={{float:'left' }}>
            {infoUI}
          </Box>}
      </Box>
    </>
  );

  return (
    <DialogHeaderFooter
      title="Validação de impressão digital"
      idComponent="validacao-impressao-digital"
      handleClickClose={e => { e.stopPropagation(); props.closeFunction(false) }}
      isOpen={props.isOpen}
      children={content}
      footer={
        <Box display="flex">
          <Box>
            <Button
              onClick={e => { e.stopPropagation(); props.closeFunction(false) }}
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

import { Chip, Divider, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import DialogHeaderFooter from "../../components/general/dialogHeaderFooter";
import withOkAndCancel from "../../components/hocs/withOkAndCancel";
import { cadastrarAutorizacao, exameRepr, getProcedimentosEmpresas, toDateString, updateProcedimentosEmpresas } from "./actions";
import { ListEditProcedimentosEmpresas } from "./listEditProcedimentosEmpresas";

const Modal = withOkAndCancel(DialogHeaderFooter);

const ModalAutorizacao = (props) => {
  const { setModalOpen, selecionado, handleChange } = props;

  const [procedimentoEmpresa, setProcedimentoEmpresa] = useState([]);

  const [observacao, setObservacao] = useState('');
  const [observacaoRestrita, setObservacaoRestrita] = useState('');

  useEffect(async () => {
    const registrosBanco = await getProcedimentosEmpresas(selecionado.id);
    const procsEmps = selecionado.itSolicitacoes.map(s => {
      return { itSolicitacao: s, empresa: null }
    });

    registrosBanco.map((r) => {
      const index = procsEmps.findIndex(p => p.itSolicitacao.id === r.itSolicitacao.id);

      procsEmps[index] = r;
    });

    setProcedimentoEmpresa(procsEmps);
    setObservacao(selecionado.observacao);
    setObservacaoRestrita(selecionado.observacaoRestrita);
  }, []);

  const handleSave = async () => {
    if (selecionado.itSolicitacoes.length > 0 && procedimentoEmpresa.length > 0) {
      procedimentoEmpresa.forEach(async (s) => {
        if (s.itSolicitacao.id && s.empresa?.id) {
          if (!s.usuarioAutorizacao) {
            // insert
            const aut = {
              "empresa": {
                "id": s.empresa?.id
              },
              "itSolicitacao": {
                "id": s.itSolicitacao?.id
              },
              "situacao": "A",
              "observacao": observacao,
              "observacaoRestrita": observacaoRestrita,
              "quantidadeAutorizada": s.quantidade,
            }

            if (!s.quantidade || s.quantidade < 1) {
              toast.error('Para autorizar o exame, é necessário informar a quantidade de procedimentos autorizados.');
            } else {
              cadastrarAutorizacao(aut)
                .then(() => toast.success('Autorização cadastrada com sucesso!'))
                .catch(() => toast.error('Erro ao cadastrar autorização!'));
            }
          }
          else {
            // update
            const update = {
              "empresa": s.empresa?.id ? {
                "id": s.empresa?.id
              } : null,
              "itSolicitacao": {
                "id": s.itSolicitacao?.id,
                "situacao": s.itSolicitacao?.situacao,
              },
              "situacao": s.situacao,
              // XXX
              "observacao": observacao,
              "observacaoRestrita": observacaoRestrita,
              "quantidadeAutorizada": s.quantidade,
            }

            if (!s.quantidade || s.quantidade < 1) {
              toast.error('Para autorizar o exame, é necessário informar a quantidade de procedimentos autorizados.');
            } else {
              updateProcedimentosEmpresas(s.id, update)
                .then((res) => { if (res) toast.success('Autorização atualizada com sucesso!') })
                .catch(() => toast.error('Erro ao atualizar autorização!'));
            }
          }
          // downloadFile(`${consts.API_URL}/solicitacao-exame-interno/${selecionado.id}/pdf`, 'GET');
          setModalOpen(false);
          handleChange();
        } else {
          toast.error('Empresa deve estar selecionada!');
        }
      })

    } else {
      toast.error("Selecione uma empresa para os procedimentos");
    }
  }

  return (
    <Modal
      isOpen
      handleClose={() => setModalOpen(false)}
      title="Autorizar exame"
      cancelAction={() => setModalOpen(false)}
      okLabel="Autorizar"
      okAction={() => handleSave()}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Informações do exame <Chip label={selecionado.formatedId} variant="outlined" />
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <TextField size="small" variant="outlined" label="Médico" value={selecionado.prestadorSolicitante.pessoa.nome} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={3} >
          <TextField size="small" variant="outlined" label="Data de solicitação" value={toDateString(selecionado.dataCadastro)} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <TextField size="small" variant="outlined" label="Data de validade da senha" value={toDateString(selecionado.dataValidade)} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <TextField size="small" variant="outlined" label="CID" value={selecionado.cid.abreviacao} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <TextField size="small" variant="outlined" label="Tipo de exame" value={exameRepr(selecionado.tipoExame)} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField size="small" multiline minRows={3} variant="outlined" label="Justificativa" value={selecionado.justificativa} disabled fullWidth />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Informações do paciente
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField size="small" variant="outlined" label="Paciente" value={selecionado.paciente.pessoa.nome} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <TextField size="small" variant="outlined" label="Data de Nascimento" value={selecionado.paciente.pessoa.dataNascimento} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <TextField size="small" variant="outlined" label="Parentesco" value={selecionado.paciente.pessoa.parentesco?.descricao || 'Titular'} disabled fullWidth />
        </Grid>

        {/* <Grid item xs={12} sm={12} md={2}>
          <TextField size="small" variant="outlined" label="Carência" value={"TESTE"} disabled fullWidth />
        </Grid> */}

        <Grid item xs={12} sm={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6">
            Procedimentos
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <ListEditProcedimentosEmpresas procedimentoEmpresa={procedimentoEmpresa} setProcedimentoEmpresa={setProcedimentoEmpresa} ome={props.usuario.ome?.id} />
        </Grid>

        <div className="Spacer"></div>

        <Grid item xs={12} sm={12} md={6}>
          <TextField size="small" multiline minRows={3} variant="outlined" label="Observações" value={observacao} onChange={(e) => setObservacao(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField size="small" multiline minRows={3} variant="outlined" label="Observações restritas" value={observacaoRestrita} onChange={(e) => setObservacaoRestrita(e.target.value)} fullWidth />
        </Grid>
      </Grid>
    </Modal>
  )
}

// export default ModalAutorizacao;
const mapStateToProps = state => ({ usuario: state.usuario })
export default connect(mapStateToProps, null)(ModalAutorizacao)
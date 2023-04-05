import { Grid, Typography, Divider, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from "@mui/material";
import { connect } from "react-redux";
import DialogHeaderFooter from "../../components/general/dialogHeaderFooter";
import withOkAndCancel from "../../components/hocs/withOkAndCancel";
import DateInput from '../../components/general/dateInput';
import { useEffect, useState } from "react";
import { getAutorizacaoFromSolicitacao, revalidaAutorizacao } from "./actions";
import { toast } from "react-toastify";
import { formatDateToBr, formatDateToBrWithHHMMSS } from "../../services/general";

const Modal = withOkAndCancel(DialogHeaderFooter);

const ModalRevalidar = (props) => {
  const { setModalOpen, selecionado, setLinhaSelecionada } = props;

  const [date, setDate] = useState(null);
  const [autorizacoes, setAutorizacoes] = useState([]);
  const [revalidacoes, setRevalidacoes] = useState([]);

  useEffect(async () => {
    const auts = await getAutorizacaoFromSolicitacao(selecionado?.id);
    setAutorizacoes(auts);

    let revs = [];

    for (let aut of auts) {
      for (let val of aut.validades) {
        revs.push({ idAut: aut.id, dataValidade: val.dataValidade, dataCadastro: val.dataCadastro });
      }
    }

    setRevalidacoes(revs);

    return () => {
      setLinhaSelecionada({});
    }
  }, []);

  async function handleSave() {
    if (autorizacoes.length > 0) {
      if (date === null) {
        toast.error("Informe a data de revalidação");
      } else {
        let status = [];
        for (let aut of autorizacoes) {
          const res = await revalidaAutorizacao(aut.id, date);
          status.push(res.status);
        }

        if (status.every(s => s === 201)) {
          toast.success("Revalidado com sucesso");
          setModalOpen(false);
        } else {
          toast.error("Erro ao revalidar");
        }
      }
    } else {
      toast.error("Não existe autorização para esta solicitação");
    }
  }

  return (
    <Modal
      isOpen
      handleClose={() => setModalOpen(false)}
      title="Revalidar exame"
      cancelAction={() => setModalOpen(false)}
      okLabel="Confirmar"
      okAction={() => handleSave()}
    >
      <Grid container spacing={4} alignItems="baseline">
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Histórico de revalidações
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Validade</TableCell>
                  <TableCell>Data de digitação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {revalidacoes.length > 0 ?
                  revalidacoes.map((rev) => {
                    return <TableRow>
                      <TableCell>{formatDateToBr(rev.dataValidade)}</TableCell>
                      <TableCell>{formatDateToBrWithHHMMSS(rev.dataCadastro)}</TableCell>
                    </TableRow>
                  })
                  : <TableRow><TableCell>Sem revalidações</TableCell></TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Nova validade:
          </Typography>
          <DateInput label="Nova validade" value={date} handleDateChange={(newDate) => setDate(newDate)} />
        </Grid>
      </Grid>
    </Modal>
  )
}

// export default ModalAutorizacao;
const mapStateToProps = state => ({ usuario: state.usuario })
export default connect(mapStateToProps, null)(ModalRevalidar)

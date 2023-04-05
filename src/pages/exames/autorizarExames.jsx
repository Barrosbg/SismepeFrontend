import * as React from 'react';
import { Button, Collapse, Container, Divider, Fab, Grid, IconButton, Tooltip, Typography, Chip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { filtrarPaciente } from '../../actions/atendimento/assistencia_social/actions';
import { usuarioLogado } from "../../actions/configuracao/actions";
import TextFieldAutocomplete from '../../components/general/autocomplete';
import DateInput from '../../components/general/dateInput';
import Table from '../../components/table/table';
import consts from "../../constants";
import { downloadFile, filtrarPrestador, getSolicitacoesPendentes, toDateString, toYYYYMMDD } from "./actions";
import ModalAutorizacao from "./modalAutorizacao";
import ModalNovaSolicitacao from "./modalNovaSolicitacao";
import ModalRevalidar from "./modalRevalidar";
import { fetchBackdrop } from "../../actions/geral/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import { formatOptionBeneficiario, formatOptionMedico } from "../../services/filterFormatters";

const AutorizarExamesPage = (props) => {
  const [filterExpanded, setFilterExpanded] = useState(true);
  const [paciente, setPaciente] = useState({});
  const [prestador, setPrestador] = useState({});
  const [date, setDate] = useState(null);
  const [linhaSelecionada, setLinhaSelecionada] = useState({});
  const [tablePagination, setTablePagination] = useState({
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 0,
    first: false,
    last: false
  });
  const [exames, setExames] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSolicitacaoOpen, setModalSolicitacaoOpen] = useState(false);
	const [modalRevalidaOpen, setModalRevalidaOpen] = useState(false);

  const handleChangePage = async (page) => {
    props.fetchBackdrop('BACKDROP_FETCHED', true);
    let data = [];
    const usuario = await usuarioLogado();

    const solicitacoes = await getSolicitacoesPendentes(page, prestador?.id, paciente?.id, toYYYYMMDD(date));
    solicitacoes?.content?.forEach(s => {
      let acoes = [
        {
          title: 'imprimir', description: 'Emissão da Guia', color: 'BgGray', action: async () => {
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            const ret = await downloadFile(`${consts.API_URL}/solicitacao-procedimento-externo/${s.id}/pdf`, 'GET')
            if (ret === -1) {
              toast.error('Erro ao gerar PDF');
            }
            props.fetchBackdrop('BACKDROP_FETCHED', false);
          }
        }
      ];

      if (usuario.perfis.some((p) => p.siglaPermissao === "GESTOR_EXAME_INTERN")) {
        acoes.push({
          title: 'autorizar',
          description: 'Autorizar',
          color: 'BgPrimary',
          action: () => { setModalOpen(true); setLinhaSelecionada(s) }
        });
        if (!s.solicitacaoPai) {
          acoes.push({
            title: 'adicionar',
            description: 'Complemento de autorização',
            color: 'BgGreen',
            action: () => {
              setModalSolicitacaoOpen(true);
              setLinhaSelecionada(s)
            }
          });
        }
				acoes.push({
					title: 'revalidar',
					description: 'Revalidar',
					color: 'BgPrimary',
					action: () => { setModalRevalidaOpen(true); setLinhaSelecionada(s) }
				});
      }

      const tmp = [
        <Chip label={s.formatedId} variant="outlined" />,
        s.solicitacaoPai ? <Chip label={s.solicitacaoPai?.formatedId} variant="outlined" /> : '',
        s.paciente.pessoa.nome,
        s.prestadorSolicitante.pessoa.nome,
        s.itSolicitacoes.length,
        s.situacao === "A" ? "AUTORIZADO" : s.situacao === "P" ? "PARC. AUTORIZADO" : s.situacao === "R" ? "RECUSADO" : "SOLICITADO",
        // exameRepr(s.carater),
        toDateString(s.dataCadastro),
        acoes,
      ];
      data.push(tmp);
    });


    const ntp = {
      totalElements: solicitacoes.totalElements,
      totalPages: solicitacoes.totalPages,
      pageNumber: solicitacoes.pageable?.pageNumber,
      pageSize: solicitacoes.pageable?.pageSize,
      first: solicitacoes.first,
      last: solicitacoes.last
    }
    setTablePagination(ntp);
    setExames(data);

    props.fetchBackdrop('BACKDROP_FETCHED', false);
  }

  useEffect(async () => {
    handleChangePage();
  }, []);

  useEffect(async () => {
    handleChangePage();
  }, [props.usuario]);

  return (
    <Container maxWidth="xl">
      <div className="Spacer"></div>
      <Typography color="textSecondary" variant="body1" gutterBottom>
        <span className="TitlePage">Autorização de exames</span>
      </Typography>
      <div className="Spacer"></div>

      <Grid container>
        <Grid item={true} sm={12} xs={12}>
          <Divider />
        </Grid>

        <Grid item={true} sm={12} xs={12}>
          <Grid container alignContent="center" alignItems="center">
            <Grid item={true} sm={11} xs={11}>
              <Typography color="textSecondary" variant="body1" gutterBottom>
                <span className="TitleCard">Filtros</span>
              </Typography>
            </Grid>
            <Grid item={true} sm={1} xs={1}>
              <IconButton
                onClick={() => setFilterExpanded(!filterExpanded)}
                style={{ textAlign: 'end', float: 'right' }}
                size="large">
                {filterExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Grid>
          </Grid>

          <Collapse in={filterExpanded} style={{ width: '100%' }} timeout="auto">
            <Grid container spacing={1} alignItems="center" margin="dense">
              <Grid item={true} sm={12} xs={12} md={4}>
                <TextFieldAutocomplete label="Beneficiário" actionFilter={filtrarPaciente} value={paciente} actionChangeOption={(novoPaciente) => setPaciente(novoPaciente)} getOptionLabel={formatOptionBeneficiario} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
              </Grid>
              <Grid item={true} sm={12} xs={12} md={4}>
                <TextFieldAutocomplete label="Médico"actionFilter={filtrarPrestador} minSizeFilter={0} actionChangeOption={(novoPrestador) => setPrestador(novoPrestador)} getOptionLabel={formatOptionMedico} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()))} />
              </Grid>
              <Grid item={true} sm={12} xs={12} md={2}>
                    <DateInput label="Data"  value={date} handleDateChange={(newDate) => setDate(newDate)} />
              </Grid>
              <Grid item={true} sm={12} xs={12} md={2} mt={-1}>
                    <Button variant="contained" color="primary" endIcon={<SearchIcon />} fullWidth={true} onClick={() => { handleChangePage() }}>
                      PESQUISAR
                    </Button>
              </Grid>
            </Grid>

            <div className="Spacer"></div>
          </Collapse>
        </Grid>

        <Grid container >
            <Table
              rowsPerPage={tablePagination.pageSize}
              pageNumber={tablePagination.pageNumber}
              totalElements={tablePagination.totalElements}
              totalPages={tablePagination.totalPages}
              changePage={handleChangePage}
              order="desc"
              orderBy="data"
              headers={[
                { id: 'guia', numeric: false, disablePadding: false, sortable: true, label: 'Guia' },
                { id: 'principal', numeric: false, disablePadding: false, sortable: true, label: 'Principal' },
                { id: 'nomeBeneficiario', numeric: false, disablePadding: false, sortable: true, label: 'Beneficiário' },
                { id: 'medicoSolicitante', numeric: false, disablePadding: false, sortable: true, label: 'Médico solicitante' },
                { id: 'procedimentos', numeric: false, disablePadding: false, sortable: true, label: 'NºProc.' },
                { id: 'statusExame', numeric: false, disablePadding: false, sortable: true, label: 'Status' },
                // { id: 'tipoExame', numeric: false, disablePadding: false, sortable: true, label: 'Tipo' },
                { id: 'data', numeric: false, disablePadding: false, sortable: true, label: 'Data' },
                { id: 'acoes', numeric: false, disablePadding: false, sortable: false, label: 'Ações' },
              ]}

              rows={exames}
            />
        </Grid>
      </Grid>

      <span className="fabButton ">
        <Tooltip title="Adicionar um Exame" placement="bottom-end">
          <Fab size="small" style={{ position: "fixed", bottom: 25, right: 25, zIndex: 100 }} aria-label="add" onClick={() => setModalSolicitacaoOpen(true)}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </span>

      {modalOpen &&
        <ModalAutorizacao
          setModalOpen={setModalOpen}
          selecionado={linhaSelecionada}
          handleChange={handleChangePage}
        />}
      {modalSolicitacaoOpen &&
        <ModalNovaSolicitacao
          setModalOpen={setModalSolicitacaoOpen}
          handleChange={handleChangePage}
          linhaSelecionada={linhaSelecionada}
          setLinhaSelecionada={setLinhaSelecionada}
        />}

      {modalRevalidaOpen &&
        <ModalRevalidar
          setModalOpen={setModalRevalidaOpen}
          selecionado={linhaSelecionada}
          setLinhaSelecionada={setLinhaSelecionada}
        />}
    </Container>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)
export default connect(null, mapDispatchToProps)(AutorizarExamesPage)

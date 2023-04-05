import { Box, Card, CardContent, Grid, IconButton, TextField, Typography, Chip, Tooltip } from "@mui/material";
import TextFieldAutocomplete from '../../components/general/autocomplete';
import InputSelect from "../../components/general/select/select";
import { filtrarEmpresa } from "./actions";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';

const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const ListEditProcedimentosEmpresas = (props) => {
  const { procedimentoEmpresa, setProcedimentoEmpresa, modo, ome } = props;

  return <>
    {
      procedimentoEmpresa.map((s, i) => {
        const autorizadoBanco = s.id && s.situacao === 'A';

        const tamanhoCampoEmpresa = !s.empresa?.id && !autorizadoBanco ? 8 : !s.empresa?.id ? 6 : 8

        return <>
          <Box mt={2} key={i}>
            <Card elevation={3} >
              <Box sx={{ bgcolor: "background.light" }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6} sm={12} md={11} alignItems="center">
                      <Typography variant="button">{s.itSolicitacao?.procedimento?.descricao}</Typography>
                      {s.itSolicitacao?.procedimento?.valor &&
                        <Tooltip title="Valor">
                          <Chip style={{ marginLeft: 4 }} size="small" color="primary" label={fmt.format(s.itSolicitacao?.procedimento?.valor)} icon={<AttachMoneyIcon />} />
                        </Tooltip>
                      }
                      {s.itSolicitacao?.procedimento?.grupo?.descricao &&
                        <Tooltip title="Categoria">
                          <Chip style={{ marginLeft: 4 }} size="small" color="secondary" label={s.itSolicitacao?.procedimento?.grupo?.descricao} icon={<CategoryIcon />} />
                        </Tooltip>
                      }
                    </Grid>
                    {modo === 'inclusaoAutorizacao' &&
                      <Grid item xs={6} sm={12} md={1}>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            setProcedimentoEmpresa(procedimentoEmpresa.filter((_, index) => index !== i))
                          }}
                          size="large">
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    }
                    {/* <Grid item xs={6} sm={12} md={!s.situacao && !s.empresa?.id ? 6 : 8}> */}
                    {(ome === 293 || s?.itSolicitacao?.situacao === 'A') &&
                      <Grid item xs={6} sm={12} md={tamanhoCampoEmpresa}>
                        <TextFieldAutocomplete
                          label="Empresa"
                          actionFilter={filtrarEmpresa}
                          disabled={autorizadoBanco}
                          value={s?.empresa}
                          actionChangeOption={
                            (novaEmpresa) => {
                              setProcedimentoEmpresa([
                                ...procedimentoEmpresa.slice(0, i),
                                { itSolicitacao: { ...s.itSolicitacao }, empresa: novaEmpresa },
                                ...procedimentoEmpresa.slice(i + 1)
                              ]);
                            }
                          }
                          getOptionLabel={(option) => option.cnpj ? option.cnpj + '-' + option.razaoSocial : ''}
                        />
                      </Grid>
                    }
                    {!s.situacao && !s.empresa?.id && s.itSolicitacao.situacao !== 'A' && ome === 293 &&
                      <Grid item xs={0} sm={0} md={2}>
                        <InputSelect
                          label="Autorização"
                          placeholder="Autorização"
                          disabled={false}
                          handlerOption={(val) => {
                            s.itSolicitacao.situacao = val
                            setProcedimentoEmpresa([
                              ...procedimentoEmpresa.slice(0, i),
                              { ...s },
                              ...procedimentoEmpresa.slice(i + 1)
                            ]);
                          }
                          }
                          optionSelected={s?.itSolicitacao?.situacao || 'E'}
                          options={[
                            { value: 'R', label: 'Não autorizado' },
                            { value: 'E', label: 'Em espera' },
                          ]}
                        />
                      </Grid>}

                    <Grid item xs={0} sm={0} md={2}>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        placeholder="Qtd Solicitada"
                        label="Qtd Solicitada"
                        disabled={autorizadoBanco}
                        inputProps={{ min: 1 }}
                        value={s.itSolicitacao?.quantidade}
                        onChange={(e) => {
                          setProcedimentoEmpresa([
                            ...procedimentoEmpresa.slice(0, i),
                            { ...s, itSolicitacao: { ...s.itSolicitacao, quantidade: e.target.value } },
                            ...procedimentoEmpresa.slice(i + 1)
                          ])
                        }}
                      />
                    </Grid>

                    {s.empresa?.id &&
                      <Grid item xs={0} sm={0} md={2}>
                        <TextField
                          type="number"
                          variant="outlined"
                          size="small"
                          placeholder="Qtd Autorizada"
                          label="Qtd Autorizada"
                          disabled={autorizadoBanco}
                          inputProps={{ min: 1 }}
                          value={s.quantidade}
                          onChange={(e) => {
                            const qtd = e.target.value
                            if (qtd > s.itSolicitacao.quantidade) {
                              toast.error('A quantidade autorizada não pode ser maior que a solicitada');
                              setProcedimentoEmpresa([
                                ...procedimentoEmpresa.slice(0, i),
                                { ...s, quantidade: 0 },
                                ...procedimentoEmpresa.slice(i + 1)
                              ]);
                            } else {
                              setProcedimentoEmpresa([
                                ...procedimentoEmpresa.slice(0, i),
                                { ...s, quantidade: qtd },
                                ...procedimentoEmpresa.slice(i + 1)
                              ]);
                            }
                          }}
                        />
                      </Grid>}
                  </Grid>
                </CardContent>
              </Box>
            </Card>
          </Box>
        </>;
      })
    }
  </>;
}
import { Checkbox, Box, Divider, FormControl, FormGroup, FormHelperText, FormLabel, Grid, InputAdornment, MenuItem, Radio, Typography, Paper } from "@mui/material";
import { green } from "@mui/material/colors";
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { WhatsApp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import InputDate from "../../../../components/general/dateInput";
import api from "../../../../constants/api";
import { cellphoneMask, cepMask, cpfMask } from "../../../../services/general";

export default function Form(props) {
  const grauParentesco = useWatch({ control: props.control, name: 'grauParentesco' });
  const beneficiarioDireto = useWatch({ control: props.control, name: 'beneficiarioDireto' });
  const [ufs, setUfs] = useState([]);
  const [cidades, setCidades] = useState([{ id: "", cidade: "Selecione o estado" }]);

  const sx = props.perfis.some(p => p.siglaPermissao === "RECADASTRAMENTO_BIOMETRIA") ? undefined : { display: { xs: 'none', sm: 'none', md: 'none', lg: 'none' } };
  const none = props.perfis.some(p => p.siglaPermissao === "RECADASTRAMENTO_BIOMETRIA") ? undefined : { display: 'none' };
  const temPerfil = props.perfis.some(p => p.siglaPermissao === "RECADASTRAMENTO_BIOMETRIA");

  // Carrega lista de estados
  useEffect(async () => {
    const ufs1 = await api.get('/uf');
    if (ufs1.status === 200) setUfs(ufs1.data);
  }, []);

  function renderFormBeneficiarioDireto() {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={12} md={4} style={none} >
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="beneficiario-direto">Beneficiário direto</InputLabel>
            <Controller
              rules={{
                required: "Obrigatório"
              }}
              name="beneficiarioDireto"
              control={props.control}
              defaultValue={1}
              render={({ field }) => (<Select {...field} autoWidth labelId="beneficiario-direto" id="beneficiario-direto-field" error={props.errors.beneficiarioDireto} helperText={props.errors.beneficiarioDireto && props.errors.beneficiarioDireto.message} label="Beneficiário Direto" fullWidth>
                <MenuItem value={1}>Filho(a)</MenuItem>
                <MenuItem value={10}>Enteado(a)</MenuItem>
                <MenuItem value={2}>Tutelado(a)</MenuItem>
                <MenuItem value={3}>Cônjuge</MenuItem>
                <MenuItem value={5}>Companheiro(a)</MenuItem>
                <MenuItem value={6}>Pai</MenuItem>
                <MenuItem value={4}>Mãe</MenuItem>
                <MenuItem value={7}>Sogro/Sogra</MenuItem>
              </Select>)}
            />
          </FormControl>
        </Grid>
        {(beneficiarioDireto === 1 || beneficiarioDireto === 10 || beneficiarioDireto === 2) && (
          <Grid item xs={12} sm={12} md={5} style={none} >
            <FormGroup row>
              <Controller
                name="universitario"
                control={props.control}
                defaultValue={false}
                render={({ field }) => (<>
                  <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Universitário(a)" />
                </>)} />
              {beneficiarioDireto === 1 && (
                <Controller
                  name="invalido"
                  control={props.control}
                  defaultValue={false}
                  render={({ field }) => (<>
                    <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Inválido(a)" />
                  </>)} />
              )}
            </FormGroup>
          </Grid>
        )}
      </>
    );
  }

  function renderFormBeneficiarioDemanda() {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12} md={3} style={none} >
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="numeroProcesso"
            control={props.control}
            defaultValue=""
            render={({ field }) => <TextField {...field} size="small" error={props.errors.numeroProcesso} helperText={props.errors.numeroProcesso && props.errors.numeroProcesso.message} variant="outlined" label="Número do processo" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} style={none}>
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="numeroSEI"
            control={props.control}
            defaultValue=""
            render={({ field }) => <TextField {...field} size="small" error={props.errors.numeroSEI} helperText={props.errors.numeroSEI && props.errors.numeroSEI.message} variant="outlined" label="Número do SEI" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} style={none} >
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="tipo-demanda">Tipo de demanda judicial</InputLabel>
            <Controller
              rules={{
                required: "Obrigatório"
              }}
              name="tipoDemanda"
              control={props.control}
              defaultValue={1}
              render={({ field: { onChange, value } }) => (<Select autoWidth={true} onChange={onChange} value={value} labelId="tipo-demanda" id="tipo-demanda-field" error={props.errors.tipoDemanda} helperText={props.errors.tipoDemanda && props.errors.tipoDemanda.message} label="Tipo de demanda judicial" fullWidth>
                <MenuItem value={1}>Ex-companheiro (a)</MenuItem>
                <MenuItem value={2}>Filho maior não universitário</MenuItem>
                <MenuItem value={3}>Filho menor</MenuItem>
                <MenuItem value={4}>Alimentando</MenuItem>
              </Select>)}
            />
          </FormControl>
        </Grid>
      </>
    )
  }

  function renderCamposExtras() {
    return (
      <>
        <Grid item xs={12} sm={12} md={8}>
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="nomeMae"
            control={props.control}
            defaultValue=""
            render={({ field }) => <TextField {...field} size="small" error={props.errors.nomeMae} helperText={props.errors.nomeMae && props.errors.nomeMae.message} variant="outlined" label="Nome da mãe" fullWidth />}
          />
        </Grid>
        {temPerfil && <Grid item xs={12} sm={12} md={4}>
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="dataValidadePlano"
            control={props.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => <InputDate id="validade" disablePast required margin="none" size="small" error={props.errors.dataValidadePlano} helperText={props.errors.dataValidadePlano && props.errors.dataValidadePlano.message} label="Validade do plano" handleDateChange={onChange} value={value} />}
          />
        </Grid>}
        <Grid item xs={12} sm={12} md={3}>
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="cpf"
            control={props.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (<TextField onChange={(e) => {
              onChange(cpfMask(e.target.value));
            }}
              value={value}
              size="small" error={props.errors.cpf} helperText={props.errors.cpf && props.errors.cpf.message} variant="outlined" label="CPF" fullWidth />)} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="dataNascimento"
            control={props.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => <InputDate id="nascimento" required margin="none" size="small" error={props.errors.dataNascimento} helperText={props.errors.dataNascimento && props.errors.dataNascimento.message} label="Data de nascimento" handleDateChange={onChange} value={value} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} >
          <FormControl component="fieldset">
            <FormLabel component="legend">Gênero</FormLabel>
            <Controller
              rules={{
                required: "Obrigatório"
              }}
              name="genero"
              control={props.control}
              defaultValue=""
              render={({ field }) => (<RadioGroup {...field} row aria-label="gender" name="gender1">
                <FormControlLabel value="F" control={<Radio size="small" />} label="Feminino" />
                <FormControlLabel value="M" control={<Radio size="small" />} label="Masculino" />
                <FormControlLabel value="O" control={<Radio size="small" />} label="Outro" />
              </RadioGroup>)}
            />
            <FormHelperText error={props.errors.genero}>{props.errors.genero && props.errors.genero.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} >
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="logradouro"
            control={props.control}
            defaultValue=""
            render={({ field }) => <TextField {...field} size="small" error={props.errors.logradouro} helperText={props.errors.logradouro && props.errors.logradouro.message} variant="outlined" label="Logradouro" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2} >
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="numero"
            control={props.control}
            defaultValue=""
            render={({ field }) => <TextField {...field} size="small" error={props.errors.numero} helperText={props.errors.numero && props.errors.numero.message} variant="outlined" label="Número" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} >
          <Controller
            name="complemento"
            control={props.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => <TextField onChange={onChange} value={value || ''} size="small" variant="outlined" label="Complemento" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} >
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="cep"
            control={props.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => <TextField onChange={(e) => {
              onChange(cepMask(e.target.value));
            }} value={value} size="small" error={props.errors.cep} helperText={props.errors.cep && props.errors.cep.message} variant="outlined" label="CEP" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} >
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="uf">UF</InputLabel>
            <Controller
              rules={{
                required: "Obrigatório"
              }}
              name="uf"
              control={props.control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (<Select onChange={(e) => {
                onChange(e.target.value);
                handleChangeUf(e.target.value);
              }} value={value} labelId="uf" id="uf-field" error={props.errors.uf} helperText={props.errors.uf && props.errors.uf.message} label="UF" fullWidth>
                {ufs.map((uf) => <MenuItem value={uf.id}>{uf.sigla}</MenuItem>)}
              </Select>)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={5} >
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="cidade">Cidade</InputLabel>
            <Controller
              rules={{
                required: "Obrigatório"
              }}
              name="cidade"
              control={props.control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (<Select onChange={onChange} value={value} labelId="cidade" id="cidade-field" error={props.errors.uf} helperText={props.errors.uf && props.errors.uf.message} label="UF" fullWidth>
                {cidades.map((cidade) => <MenuItem value={cidade.id}>{cidade.cidade}</MenuItem>)}
              </Select>)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={5} >
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="email"
            control={props.control}
            defaultValue=""
            render={({ field }) => <TextField {...field} size="small" error={props.errors.email} helperText={props.errors.email && props.errors.email.message} type="email" variant="outlined" label="E-mail principal" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} >
          <Controller
            rules={{
              required: "Obrigatório"
            }}
            name="numeroTelefone"
            control={props.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => <TextField onChange={(e) => {
              onChange(cellphoneMask(e.target.value));
            }} value={value} size="small" error={props.errors.numeroTelefone} helperText={props.errors.numeroTelefone && props.errors.numeroTelefone.message} variant="outlined" label="Número do telefone" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} >
          <Controller
            name="numeroWhatsapp"
            control={props.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => <TextField onChange={(e) => {
              onChange(cellphoneMask(e.target.value));
            }} value={value}
              InputProps={{
                startAdornment: (<InputAdornment position="start"><WhatsApp style={{ color: green[500] }} /></InputAdornment>)
              }} size="small" variant="outlined" label="Número do WhatsApp" fullWidth />}
          />
        </Grid>
      </>
    );
  }

  // Carrega dados já preenchidos
  useEffect(async () => {
    props.fetchBackdrop('BACKDROP_FETCHED', true);
    const pd = await api.get(`/pessoa/dependente?matricula=${props.matricula}&sequencial=${props.sequencial}`);

    let dnArr = pd.data?.dataNascimento?.split('/');
    let dn = `${dnArr[2]}-${dnArr[1]}-${dnArr[0]}T00:00:00`;

    let uf;

    if (pd.data.endereco) {
      uf = await api.get('/uf/' + pd.data.endereco.uf);

      const cs = await api.get(`/cidade/filtro?uf=${pd.data.endereco.uf}`);
      if (cs.status === 200) setCidades(cs.data.content);
    }

    const resetFields = {
      cpf: cpfMask(pd.data.cpf),
      dataNascimento: new Date(dn),
      dataValidadePlano: pd.data.dataValidadePlano && new Date(pd.data.dataValidadePlano),
      genero: pd.data.sexo,
      logradouro: pd.data.endereco && pd.data.endereco.logradouro,
      numero: pd.data.endereco && pd.data.endereco.numero,
      complemento: pd.data.endereco && pd.data.endereco.complemento,
      cep: pd.data.endereco && cepMask(pd.data.endereco.cep),
      uf: pd.data.endereco && uf.data.id,
      cidade: pd.data.endereco && pd.data.endereco.cidade,
      numeroTelefone: cellphoneMask(pd.data.telefone),
      numeroWhatsapp: cellphoneMask(pd.data.telefone2),
      email: pd.data.email,
      nomeMae: pd.data.nomeMae,
    };

    if (pd.data.temDireitoOrdemJudicial === "N") {
      props.reset({
        ...resetFields,
        grauParentesco: 1,
        beneficiarioDireto: pd.data.parentesco.id,
        universitario: pd.data.universitario === "S" ? true : false,
        invalido: pd.data.invalido === "S" ? true : false,
      });
    } else if (pd.data.temDireitoOrdemJudicial === "S") {
      const mapTipoDemanda = {
        "EXCOMPANHEIRO": 1,
        "FILHO_MAIOR_NAO_UNIVERSITARIO": 2,
        "FILHO_MENOR": 3,
        "ALIMENTADO": 4
      }

      props.reset({
        ...resetFields,
        grauParentesco: 2,
        numeroProcesso: pd.data.descricaoDireitoOrdemJudicial,
        numeroSEI: pd.data.observacao,
        tipoDemanda: mapTipoDemanda[pd.data.tipoDemanda],
      });
    }
    props.fetchBackdrop('BACKDROP_FETCHED', false);
  }, [props.reset]);

  async function handleChangeUf(value) {
    const cs = await api.get(`/cidade/filtro?ufId=${value}`);
    if (cs.status === 200) setCidades(cs.data.content);
    props.reset({ ...props.getValues(), cidade: '' });
  }


  return (
    <form>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="subtitle1"><strong>{props.nome}</strong></Typography>
        </Grid>
        <Box sx={sx}>
          <Grid item xs={12} sm={12} md={3} sx={sx}>
            <FormControl variant="outlined" size="small">
              <InputLabel id="grau-parentesco">Grau de parentesco</InputLabel>
              <Controller
                rules={{
                  required: "Obrigatório"
                }}
                name="grauParentesco"
                control={props.control}
                defaultValue={1}
                render={({ field: { onChange, value } }) =>
                  <Select onChange={e => { onChange(e.target.value); }} value={value} labelId="grau-parentesco" id="grau-parentesco-field" error={props.errors.grauParentesco} helperText={props.errors.grauParentesco && props.errors.grauParentesco.message} label="Grau de parentesco" fullWidth>
                    <MenuItem value={1}>Beneficiário direto</MenuItem>
                    <MenuItem value={2}>Beneficiário por demanda judicial</MenuItem>
                  </Select>}
              />
            </FormControl>
          </Grid>
        </Box>
        {grauParentesco === 1 && renderFormBeneficiarioDireto()}
        {grauParentesco === 2 && renderFormBeneficiarioDemanda()}
        {renderCamposExtras()}
      </Grid>
    </form>
  );
}
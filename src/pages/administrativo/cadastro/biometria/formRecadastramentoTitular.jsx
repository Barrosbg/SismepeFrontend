import { Checkbox, Chip, Divider, FormControl, FormGroup, FormHelperText, FormLabel, Grid, InputAdornment, MenuItem, Radio, Typography } from "@mui/material";
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

export default function FormTitular(props) {
  const [ufs, setUfs] = useState([]);
  const [cidades, setCidades] = useState([{ id: "", cidade: "Selecione o estado" }]);

  // Carrega lista de estados
  useEffect(async () => {
    const ufs1 = await api.get('/uf');
    if (ufs1.status === 200) setUfs(ufs1.data);
  }, []);

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
    const pd = await api.get(`/pessoa/${props.cdPessoa}`);

    let dnArr = pd.data.dataNascimento.split('/');
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

    props.reset(resetFields);

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
        {renderCamposExtras()}
      </Grid>
    </form>
  );
}
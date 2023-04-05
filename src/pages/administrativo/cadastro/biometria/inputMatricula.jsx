import { Grid } from '@mui/material';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selecionaPessoa, getInfo, addFoto, adicionaMatricula } from '../../../../actions/administrativo/cadastro/biometria/actions';

import TextFieldAutocomplete from '../../../../components/general/autocomplete';
import api from '../../../../constants/api';

import { filtrarPessoasDependentesPorMatricula, filtrarPessoasTitulares } from '../../../../services/listFormat';

async function addFotosDependentes(deps) {
  let depsData = JSON.parse(JSON.stringify(deps));

  depsData.forEach(async (dep) => {
    if (dep.urlFotoRecadastramento) {
      const res = await api.post('/minio/download-by-url', {url: dep.urlFotoRecadastramento, bucket: "minio"})
      dep.fotoBase64 = res.data
    }
  });

  return depsData;
}

function InputMatricula(props) {
  async function handleSelection(obj) {
    if (obj !== null) {
      console.log(obj);
      props.selecionaPessoa(obj.id);

      props.getInfo(obj.id);

      props.adicionaMatricula(obj.matricula);

      let depsData = await filtrarPessoasDependentesPorMatricula(obj.matricula.toString())

      const depsComFotos = await addFotosDependentes(depsData);

      props.setDependentes(depsComFotos);

      if (obj.urlFotoRecadastramento) {
        api.post('/minio/download-by-url', {url: obj.urlFotoRecadastramento, bucket: "minio"})
          .then((res) => { props.addFoto(res.data) })
          .catch((err) => console.log(err))
      } else if (props.foto) {
        props.addFoto("");
      }
    }
  }

  function formatOption(option) {
    if (option.digito) {
      return `${option.matricula}-${option.digito} — ${option.nome}`;
    } else if (option.sequencial) {
      return `${option.matricula}/${option.sequencial} — ${option.nome}`;
    } else {
      return `${option.matricula} — ${option.nome}`;
    }
  }

  return (
    <div>
      <Grid container
        spacing={2}>
        <Grid item={true} sm={12} xs={12} md={6}>
          <TextFieldAutocomplete
            label="Militar"
            actionFilter={filtrarPessoasTitulares}
            actionChangeOption={handleSelection}
            getOptionLabel={(option) => formatOption(option)}
            filterOptions={(options, object) => options.filter((item) => item.nome.toString().toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pessoas: state.inputMatricula.pessoas,
    pessoaSelecionada: state.inputMatricula.pessoaSelecionada,
    matricula: state.inputMatricula.matricula,
    info: state.inputMatricula.info,
    foto: state.biometria.foto,
    cdPessoa: state.inputMatricula.pessoaSelecionada,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ selecionaPessoa, getInfo, addFoto, adicionaMatricula }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(InputMatricula);
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import { connect } from 'react-redux';

import InputMatricula from './inputMatricula';

import { addFoto } from '../../../../actions/administrativo/cadastro/biometria/actions';
import { bindActionCreators } from 'redux';

import { React, useState } from 'react';

import InformacoesPessoais from './informacoesPessoais';

function Biometria(props) {
  const [deps, setDependentes] = useState([]);

  return (
    <Container maxWidth="xl">
      <div className="Spacer"></div>
      <Typography color="textSecondary" variant="body1" gutterBottom>
        <span className="TitlePage">Cadastro Biométrico</span>
      </Typography>
      <div className="Spacer"></div>        
    
      {/* Campos de input de matrícula, seleção de pessoa */}
      <InputMatricula setDependentes={setDependentes} />

      {/* Informações pessoais */}
      {props.info.nome && <InformacoesPessoais deps={deps} setDependentes={setDependentes} />}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    digitais: state.biometria.digitais,
    foto: state.biometria.foto,
    cdPessoa: state.inputMatricula.pessoaSelecionada,
    info: state.inputMatricula.info,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ addFoto }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Biometria);

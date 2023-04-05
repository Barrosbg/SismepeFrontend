import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import loginReducer from './geral/loginReducer';
import biometriaReducer from './administrativo/cadastro/biometria/biometriaReducer';
import inputMatriculaReducer from './administrativo/cadastro/biometria/inputMatriculaReducer';
import grupoMenuReducer from './geral/grupoMenuReducer';
import menuReducer from './geral/menuReducer';
import modalReducer from './geral/modalReducer';
import backdropReducer from './geral/backdropReducer';
import usuarioReducer from './configuracao/usuarioReducer';

const rootReducer = combineReducers({
  form: formReducer,
  login: loginReducer,
  biometria: biometriaReducer,
  inputMatricula: inputMatriculaReducer,
  grupoMenu: grupoMenuReducer,
  menu: menuReducer,
  modal: modalReducer,
  backdrop: backdropReducer,
  usuario: usuarioReducer,
});

export default rootReducer;

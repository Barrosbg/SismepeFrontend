import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { ErrorOutline, FingerprintOutlined, VerifiedUserOutlined, PhotoCameraOutlined, AssignmentOutlined, Assignment } from '@mui/icons-material';
import Fingerprint from '@mui/icons-material/Fingerprint';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import { ConfirmProvider } from 'material-ui-confirm';
import { React, useEffect, useState } from 'react';
import { GrUserPolice } from "react-icons/gr";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPessoa, selecionaPessoa } from '../../../../actions/administrativo/cadastro/biometria/actions';
import man from '../../../../assets/man.svg';
import woman from '../../../../assets/woman.svg';
import UserCard from '../../../../components/general/userCard';
import UserCardMini from '../../../../components/general/userCardMini';
import { cellphoneMask, cpfMask } from '../../../../services/general';
import ModalCameraDependente from './modalCameraDependente';
import EditDependente from './editDependente';
import ModalCamera from './modalCamera';
import ModalCheckBiometria from './modalCheckBiometria';
import ModalEditPhone from './modalEditPhone';
import ModalNovaBiometria from './modalNovaBiometria';
import ModalFormRecadastro from './modalFormRecadastro';
import { toast } from 'react-toastify';

const msgCadastroDesatualizado = 'Usuário com cadastro desatualizado. Por favor, realize o recadastramento.'

function InformacoesPessoais(props) {
  const [isOpenDigital, setOpenDigital] = useState(false);
  const [isOpenValidDigital, setOpenValidDigital] = useState(false);
  const [isOpenFoto, setOpenFoto] = useState(false);
  const [isOpenDependente, setOpenDependente] = useState(false);
  const [isOpenEditPhone, setOpenEditPhone] = useState(false);
  const [isOpenFormTitular, setOpenFormTitular] = useState(false);
  const [dependenteSelecionado, setDependenteSelecionado] = useState({ id: null, matricula: null, sequencial: null, nome: null });

  const [isOpenValidDigitalDependente, setOpenValidDigitalDependente] = useState(false);
  const [isOpenDigitalDependente, setOpenDigitalDependente] = useState(false);
  const [isOpenCameraDependente, setOpenCameraDependente] = useState(false);
  const [isOpenFormDependente, setOpenFormDependente] = useState(false);

  useEffect(() => {
    return () => {
      props.resetPessoa();
      setOpenDependente(false);
      setOpenDigital(false);
      setOpenValidDigital(false);
      setOpenValidDigitalDependente(false);
      setOpenFoto(false);
      setOpenEditPhone(false);
      setDependenteSelecionado({ id: null, matricula: null, sequencial: null, nome: null });
      props.setDependentes([]);
    }
  }, []);

  function setModalValidDigitalDependente(open) {
    setOpenValidDigitalDependente(open);
    setDependenteSelecionado({ id: null, matricula: null, sequencial: null, nome: null });
  }

  function setModalCadastroDigitalDependenteOpen(open) {
    setOpenDigitalDependente(open);
    setDependenteSelecionado({ id: null, matricula: null, sequencial: null, nome: null });
  }

  function setModalFotoDependenteOpen(open) {
    setOpenCameraDependente(open);
    setDependenteSelecionado({ id: null, matricula: null, sequencial: null, nome: null });
  }

  function setModalFormDependenteOpen(open) {
    setOpenFormDependente(open);
    setDependenteSelecionado({ id: null, matricula: null, sequencial: null, nome: null });
  }

  function setOpenDependenteModal(tf) {
    setOpenDependente(tf);
    // props.checarDigitaisCadastradas(props.cdPessoa);
    props.selecionaPessoa(props.cdPessoa);
    setDependenteSelecionado({ id: 0, matricula: 0, sequencial: 0, nome: '' });
  }

  function renderBotoesAcao() {
    if (props.cdPessoa !== "") {
      return (
        <div style={{ textAlign: 'center' }}>
          <Tooltip title="Editar dados pessoais">
            <IconButton onClick={(e) => {
              setOpenFormTitular(true);
            }} color="primary" size="medium">
              <Assignment fontSize="medium" />
            </IconButton>
          </Tooltip>
          {props.perfis.some((p) => p.siglaPermissao === 'CADASTRO_BIOMETRIA') &&
            (<>
              <Tooltip title="Cadastrar biometria">
                <IconButton
                  fullWidth={true}
                  onClick={() => {
                    if (props.info.cadastroAtualizado === "S") {
                      setOpenDigital(true);
                    } else {
                      toast.error(msgCadastroDesatualizado);
                    }
                  }}
                  variant="contained"
                  color="primary"
                  size="large"><Fingerprint /></IconButton>
              </Tooltip>
              <Tooltip title="Validar biometria">
                <IconButton
                  fullWidth={true}
                  onClick={() => setOpenValidDigital(true)}
                  variant="contained"
                  color="primary"
                  size="large"><VerifiedUser /></IconButton>
              </Tooltip>
            </>)
          }
          {props.perfis.some((p) => p.siglaPermissao === 'CADASTRO_FOTO') &&
            <Tooltip title="Tirar foto">
              <IconButton
                fullWidth={true}
                onClick={() => {
                  if (props.info.cadastroAtualizado === "S") {
                    setOpenFoto(true);
                  } else {
                    toast.error(msgCadastroDesatualizado);
                  }
                }}
                variant="contained"
                color="primary"
                size="large"><PhotoCamera /></IconButton>
            </Tooltip>
          }
        </div>
      );
    }
  }

  function renderizarVerificarBiometriaDependente(dep) {
    return dep.idade >= 6 && dep.idade <= 79 && (dep.fezRecadastramento === 'N' || dep.fezRecadastramento == null)
      ?
      <Tooltip title="Recadastramento não realizado">
        <IconButton size="large">
          <ErrorOutline color="secondary" fontSize="medium" />
        </IconButton>
      </Tooltip>
      :
      <>
        {props.perfis.some((p) => p.siglaPermissao === 'CADASTRO_FOTO') &&
          <Tooltip title="Validar biometria">
            <IconButton onClick={(e) => {
              e.stopPropagation();
              setOpenValidDigitalDependente(true);

              setDependenteSelecionado({
                id: dep.id, matricula: dep.matricula, sequencial: dep.sequencial, nome: dep.nome
              });
            }} color="primary" size="medium">
              <VerifiedUserOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>}
      </>;
  }

  function renderizarBotaoCadastrarBiometriaDependente(dep) {
    if (props.perfis.some((p) => p.siglaPermissao === 'CADASTRO_BIOMETRIA')) {
      return (
        <Tooltip title="Cadastrar biometria">
          <IconButton onClick={(e) => {
            e.stopPropagation();
            if (dep.cadastroAtualizado === 'S') {
              setOpenDigitalDependente(true);

              setDependenteSelecionado({
                id: dep.id, matricula: dep.matricula, sequencial: dep.sequencial, nome: dep.nome
              });
            } else {
              toast.error(msgCadastroDesatualizado);
            }
          }} color="primary" size="medium">
            <FingerprintOutlined fontSize="medium" />
          </IconButton>
        </Tooltip>
      )
    }
  }

  function renderizarBotaoCadastrarFoto(dep) {
    if (props.perfis.some((p) => p.siglaPermissao === 'CADASTRO_FOTO')) {
      return (
        <Tooltip title="Cadastrar foto">
          <IconButton onClick={(e) => {
            e.stopPropagation();

            if (dep.cadastroAtualizado === 'S') {
              setOpenCameraDependente(true);
              setDependenteSelecionado({
                id: dep.id, matricula: dep.matricula, sequencial: dep.sequencial, nome: dep.nome
              });
            } else {
              toast.error(msgCadastroDesatualizado);
            }
          }} color="primary" size="medium">
            <PhotoCameraOutlined fontSize="medium" />
          </IconButton>
        </Tooltip>
      )
    }
  }

  function renderizarBotaoRecadastramentoBiometria(dep) {
    return (
      <Tooltip title="Editar dados pessoais">
        <IconButton onClick={(e) => {
          e.stopPropagation();
          setOpenFormDependente(true);

          setDependenteSelecionado({
            id: dep.id, matricula: dep.matricula, sequencial: dep.sequencial, nome: dep.nome
          });
        }} color="primary" size="medium">
          <AssignmentOutlined fontSize="medium" />
        </IconButton>
      </Tooltip>
    )
  }

  function renderizarDependentes() {
    return (
      <Grid
        container
        spacing={2}>
        {props.deps.map((dep) => {
          return (
            <Grid item={true} md={12} sm={12} xs={12} style={{ cursor: 'pointer' }}>
              <UserCardMini
                image={dep?.fotoBase64}
                mainInfo={`${dep.nome}`}
                secondaryInfo={'CPF: ' + ((cpfMask(dep.cpf)) || "não informado")}
                color={dep.sexo === "F" ? "#DB324D" : "#7D84B2"}
                rightInfo={
                  <>
                    {renderizarVerificarBiometriaDependente(dep)}
                    {renderizarBotaoCadastrarBiometriaDependente(dep)}
                    {renderizarBotaoCadastrarFoto(dep)}
                    {renderizarBotaoRecadastramentoBiometria(dep)}
                  </>
                } />
            </Grid>
          )
        }
        )}
      </Grid>
    )
  }

  return (
    <div>
      <div className="Spacer" />
      <Divider />
      <div className="Spacer"></div>
      <Typography color="textSecondary" variant="body1" gutterBottom>
        <span className="TitlePage">Informações pessoais</span>
      </Typography>
      <div className="Spacer" />
      <Grid container spacing={2}>
        <Grid item={true} md={4} sm={12} xs={12}>
          <UserCard
            mainInfo={props.info.nome}
            avatar={props.foto !== "" ? props.foto : props.info.sexo === 'F' ? woman : man}
            infos={[
              { icon: 'credit_card', text: (props.info.cpf && cpfMask(props.info.cpf)) || 'CPF não informado', label: 'CPF' },
              {
                icon: props.info.sexo === 'F' ? 'female' : props.info.sexo === 'M' ? 'male' : '',
                text: props.info.sexo === 'F' ? 'Feminino' : props.info.sexo === 'M' ? 'Masculino' : 'Sexo não informado',
                label: 'Sexo'
              },
              { icon: 'child_friendly', text: props.info.dataNascimento || "Data de nascimento não informada", label: 'Data de nascimento' },
              { icon: <GrUserPolice size={22} />, text: props.info.posto || "Graduação não informada", label: 'Graduação' },
              { icon: 'phone', text: cellphoneMask(props.info.telefone) || "Telefone não informado", label: 'Telefone', funcEdit: () => setOpenEditPhone(true) },
            ]}
            actions={renderBotoesAcao()}
          />
        </Grid>

        <Grid item={true} md={8} sm={12} xs={12}>
          <Typography color="textSecondary" variant="body1" gutterBottom>
            <span className="TitlePage">Dependentes</span>
          </Typography>
          <div className="Spacer" />
          {renderizarDependentes()}
        </Grid>
      </Grid>

      <div>
        {/* Componente camera */}
        <ModalCamera isOpen={isOpenFoto} closeFunction={setOpenFoto} />

        {/* Componente digital */}
        <ConfirmProvider>
          <ModalNovaBiometria isOpen={isOpenDigital} closeFunction={setOpenDigital} cdPessoa={props.cdPessoa} />
        </ConfirmProvider>

        {/* Componente checar digital */}
        {isOpenValidDigital && <ModalCheckBiometria isOpen={isOpenValidDigital} closeFunction={setOpenValidDigital} cdPessoa={props.cdPessoa} />}

        {/* Modal para editar dependente */}
        <ConfirmProvider>
          {isOpenDependente && <EditDependente dependenteSelecionado={dependenteSelecionado} closeFunction={setOpenDependenteModal} setDependentes={props.setDependentes} deps={props.deps} />}
        </ConfirmProvider>

        {isOpenEditPhone &&
          <ModalEditPhone isOpen={setOpenEditPhone} cdPessoa={props.cdPessoa} storedPhone={cellphoneMask(props.info.telefone)} />
        }

        {isOpenFormTitular && <ModalFormRecadastro isOpen={isOpenFormTitular} closeFunction={setOpenFormTitular} cdPessoa={props.pessoaSelecionada} nome={props.info.nome} matricula={props.matricula} isTitular />}

        {/* Dependentes */}
        {isOpenValidDigitalDependente && <ModalCheckBiometria isOpen={isOpenValidDigitalDependente} cdPessoa={dependenteSelecionado.id} closeFunction={setModalValidDigitalDependente} />}

        <ConfirmProvider>
          <ModalNovaBiometria isOpen={isOpenDigitalDependente} closeFunction={setModalCadastroDigitalDependenteOpen} cdPessoa={dependenteSelecionado.id} />
        </ConfirmProvider>

        <ModalCameraDependente isOpen={isOpenCameraDependente} closeFunction={setModalFotoDependenteOpen} cdPessoa={dependenteSelecionado.id} />

        {isOpenFormDependente && <ModalFormRecadastro isOpen={isOpenFormDependente} closeFunction={setModalFormDependenteOpen} dependenteSelecionado={dependenteSelecionado} perfis={props.perfis} />}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pessoas: state.inputMatricula.pessoas,
    pessoaSelecionada: state.inputMatricula.pessoaSelecionada,
    matricula: state.inputMatricula.matricula,
    digitais: state.biometria.digitais,
    info: state.inputMatricula.info,
    foto: state.biometria.foto,
    cdPessoa: state.inputMatricula.pessoaSelecionada,
    perfis: state.usuario.perfis,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ selecionaPessoa, resetPessoa }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(InformacoesPessoais);
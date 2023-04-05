import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../components/auth/privateRoute';
import HomePage from '../pages/geral/home/HomePage';
import LoginPage from '../pages/geral/login/index';
import ForgotPasswordPage from '../pages/geral/forgot_password/ForgotPasswordPage';
import MainLayout from './../components/layout/mainLayout'
import BiometriaPage from '../pages/administrativo/cadastro/biometria/index';
import ConsultaPage from '../pages/atendimento/assistencia_social/consulta/ConsultaPage';
import RecepcaoPage from '../pages/atendimento/assistencia_social/recepcao/RecepcaoPage';
import ConsultaForm from '../pages/atendimento/assistencia_social/consulta/ConsultaForm';
import ConfiguracaoPage from '../pages/configuracao/ConfiguracaoPage';
import ResetPasswordPage from '../pages/geral/forgot_password/ResetPasswordPage';
import ManterEGerenciarPage from '../pages/jms/manter_gerenciar'
import GerenciarGestoresPage from "../pages/jms/gerenciar_gestores";
import RelatorioLicencaDispensaOme from "../pages/jms/relatorios/licencaDispensaOme/licenca_dispensa_ome"
import RelatoriodisponibilidadeMinima from "../pages/jms/relatorios/disponibilidadeMinima/relatorio_disponibilidade_minima"
import MilitaresAtendidosPrestador from "../pages/jms/relatorios/militaresAtendidosPrestador/militares_atendidos_prestador"
import MilitaresAfastados from "../pages/jms/relatorios/militaresAfastados/militares_afastados"
import Ficha from "../pages/jms/fichaDeQuadroJms/Ficha"
import solicitarExames from "../pages/exames/solicitarExames"
import visualizarFichasCadastradas from "../pages/jms/fichaDeQuadroJms/visualizarFichasCadastradas"
import ValidarFichaExames from "../pages/validarFichaExame/ValidarFichaExames"
import AutorizarExamesPage from '../pages/exames/autorizarExames';
import CadastrarVeiculos from '../pages/ControleEstacionamento/CadastrarVeiculos';
import CadastraPesquisaSatisfacao from '../pages/PesquisaSatisfacao/CadastraPesquisaSatisfacao';
import CadastraPesquisaSatisfacaoPublic from '../pages/PesquisaSatisfacao/CadastraPesquisaSatisfacaoPublic';
import GerarIdentificacao from '../pages/ControleEstacionamento/GerarIdentificacao';
import AutorizarVeiculos from '../pages/ControleEstacionamento/AutorizarVeiculos';
import PesquisaDeSatisfacao from '../pages/pesquisaDeSatisfacao/Pesquisa';
import AgendaCentralAuditoria from '../pages/auditoriaAgendaCentral/agendaCentralAuditoria';
import ResultadoExames from '../pages/agenciaTransfusional/ResultadoExames';
import VisualizarExames from '../pages/agenciaTransfusional/VisualizarExames';
import ControleDePerfis from '../pages/gerenciamentoDoSistema/ControleDePerfis/ControledePerfis';
import CadastroDeEquipamentos from '../pages/CadastroDeEquipamentos/CadastroDeEquipamento';
import CadastroSolicitacaoTransfusional from '../pages/CadastroTransfusional/CadastroSolicitacaoTransfusional';
import CadastroTransfusional from '../pages/CadastroTransfusional/CadastroTransfusional';

export default (props) => (
  <HashRouter>
    <Switch>

      <Route exact path="/" component={LoginPage} />
      <Route exact path="/esqueci-senha" component={ForgotPasswordPage} />
      <Route exact path="/alterar-senha/:token" component={ResetPasswordPage} />
      <Route exact path="/ValidarFichaExames" component={ValidarFichaExames} />
      <Route exact path="/PesquisaSatisfacao/:atendimento" component={CadastraPesquisaSatisfacaoPublic} />

      {/* <Route exact path="/CadastroTransfusional/TelaCadastro01Transfusional" component={TelaCadastro01Transfusional} /> */}
    
      <MainLayout>
       
        <PrivateRoute exact path="/home" component={HomePage} />

        <PrivateRoute exact path="/CadastroTransfusional/CadastroTransfusional" component={CadastroTransfusional} />
        <PrivateRoute exact path="/CadastroTransfusional/CadastroTransfusional/:id" component={CadastroTransfusional} />
        <PrivateRoute exact path="/CadastroTransfusional/CadastroSolicitacaoTransfusional" component={CadastroSolicitacaoTransfusional} />

        <PrivateRoute exact path="/CadastroDeEquipamentos/CadastroDeEquipamento" component={CadastroDeEquipamentos} />
        <PrivateRoute exact path="/gerenciamentoDoSistema/CotroleDePerfis/ControledePerfis" component={ControleDePerfis} />
        <PrivateRoute exact path="/administrativo/jms/cadastro/licenca" component={ManterEGerenciarPage} />
        <PrivateRoute exact path="/agenciaTransfusional/ResultadoExames" component={ResultadoExames} />
        <PrivateRoute exact path="/agenciaTransfusional/VisualizarExames" component={VisualizarExames} />
        <PrivateRoute exact path="/auditoriaAgendaCentral/agendaCentralAuditoria" component={AgendaCentralAuditoria} />
        <PrivateRoute exact path="/administrativo/ControleEstacionamento/AutorizarVeiculos" component={AutorizarVeiculos} />
        <PrivateRoute exact path="/administrativo/ControleEstacionamento/CadastrarVeiculos" component={CadastrarVeiculos} />
        <PrivateRoute exact path="/administrativo/ControleEstacionamento/GerarIdentificacao" component={GerarIdentificacao} />
        <PrivateRoute exact path="/administrativo/PesquisaSatisfacao/CadastraPesquisaSatisfacao" component={CadastraPesquisaSatisfacao} />
        <PrivateRoute exact path="/exames/solicitarExames" component={solicitarExames} />
        <PrivateRoute exact path="/administrativo/jms/cadastro/gerenciar_gestores" component={GerenciarGestoresPage} />
        <PrivateRoute exact path="/administrativo/jms/cadastro/manter_gerenciar" component={ManterEGerenciarPage} />
        <PrivateRoute exact path="/administrativo/jms/fichaDeQuadroJms/Ficha" component={Ficha} />
        <PrivateRoute exact path="/administrativo/jms/fichaDeQuadroJms/visualizarFichasCadastradas" component={visualizarFichasCadastradas} />
        <PrivateRoute exact path="/administrativo/jms/relatorio/licencaDispensaOme/licenca_dispensa_ome" component={RelatorioLicencaDispensaOme} />
        <PrivateRoute exact path="/administrativo/jms/relatorio/disponibilidadeMinima/relatorio_disponibilidade_minima" component={RelatoriodisponibilidadeMinima} />
        <PrivateRoute exact path="/administrativo/jms/relatorio/militaresAtendidosPrestador/militares_atendidos_prestador" component={MilitaresAtendidosPrestador} />
        <PrivateRoute exact path="/administrativo/jms/relatorio/militaresAfastados/militares_afastados" component={MilitaresAfastados} />
        <PrivateRoute exact path="/configuracoes" component={'ConfiguracaoPage'} />
        <PrivateRoute exact path="/atendimento/biometria/cadastro" component={BiometriaPage} />
        <PrivateRoute exact path="/configuracoes" component={ConfiguracaoPage} />
        <PrivateRoute exact path="/atendimento/recadastramento" component={BiometriaPage} />
        <PrivateRoute exact path="/atendimento/assistencia-social/consulta" component={ConsultaPage} />
        <PrivateRoute exact path="/atendimento/assistencia-social/consulta/:id" component={ConsultaForm} />
        <PrivateRoute exact path="/atendimento/assistencia-social/recepcao" component={RecepcaoPage} />
        <PrivateRoute exact path="/exames/autorizarExames" component={AutorizarExamesPage} />
      </MainLayout>
      <Redirect from="*" to="/" />
    </Switch>
  </HashRouter>
);

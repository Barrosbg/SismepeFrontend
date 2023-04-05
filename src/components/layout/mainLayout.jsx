import React, { Component } from 'react';
import clsx from 'clsx';
import './menu.css';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import withStyles from '@mui/styles/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/geral/actions';
import { getGrupoMenusUsuario, fetchMenu, validateToken } from '../../actions/geral/actions';
import { usuarioDetalhes } from '../../actions/configuracao/actions';
import styles from '../../theme/styleMainLayout';
import Avatar from '@mui/material/Avatar';
import user from '../../assets/user.svg';
import MenuItem from './itemMenu';
import BackdropCustom from './../general/backdrop';
import ModalGlobal from '../../components/general/modalGlobal';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;


class MainLayout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleDrawer = () => {
    this.props.fetchMenu('MENU_FETCHED', !this.props.menu.open);
  }

  async componentDidMount() {
    if (this.props.user) {
      await this.props.getGrupoMenusUsuario();
      await this.props.usuarioDetalhes();
    } else {
      this.props.history.push('/');
    }

  }

  loadMenus() {
    return this.props.grupoMenu ? this.props.grupoMenu.data.map((grupo) => {
      return (
        <MenuItem
          key={grupo.id}
          title={grupo.title}
          path="#"
          icon=""
          level={1}
          children={[...grupo.menus]}
        />
      )
    }) : ""
  }

  formatName(name) {
    if (name.length > 15) {
      if (name.split(' ').length > 1) {
        if ((name.split(' ')[0].length + name.split(' ')[1].length) > 15) {
          name = name.split(' ')[0];
        } else {
          name = name.split(' ')[0] + ' ' + name.split(' ')[1];
        }
      } else {
        name = `${name.substring(0, 10)}...`;
      }
    }
    return name;

  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <BackdropCustom />
        <ModalGlobal
          title={this.props.modal.title}
          body={this.props.modal.body}
          width={this.props.modal.width}
          confirmText={this.props.modal.labelConfirm}
          cancelText={this.props.modal.labelCancel}
          actionConfirm={this.props.actionConfirm}
        />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.props.menu.open,
          })}
        >
          <Toolbar
            variant="dense"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawer}
              edge="start"
              style={{ fontSize: '1rem' }}
              className={clsx(classes.menuButton, {
                [classes.hide]: this.props.menu.open,
              })}
              size="large">
              {this.props.menu.open ? <CloseIcon style={{ fontSize: '1rem' }} /> : <MenuIcon style={{ fontSize: '1rem' }} />}
            </IconButton>

            {
              this.props.width === 'md' || !this.props.menu.open
                ?
                <Typography variant="h6" className={classes.title}>
                  <Button color="inherit" to="/home" component={Link} style={{ fontSize: '12px' }} >INÍCIO</Button>
                </Typography>
                : null
            }
            {
              this.props.width === 'md' || !this.props.menu.open
                ?
                <Button color="inherit" onClick={this.props.logout} style={{ fontSize: '12px' }} >SAIR</Button>
                : null
            }
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.props.menu.open,
            [classes.drawerClose]: !this.props.menu.open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.props.menu.open,
              [classes.drawerClose]: !this.props.menu.open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <Avatar alt="Cindy Baker"
              className={clsx(classes.avatarClose, {
                [classes.avatarOpen]: this.props.menu.open,
                [classes.avatarClose]: !this.props.menu.open,
              })}

              src={user} />
            {this.props.usuario && this.props.usuario.pessoa ? this.formatName(this.props.usuario.pessoa.nome) : ""}
          </div>
          <List>
            {this.loadMenus()}
            <MenuItem
              key={0}
              title="Configurações da Conta"
              path="/configuracoes"
              icon=""
              level={1}
              children={[]}
            />

          </List>
        </Drawer>
        <main className={classes.content} onClick={() => this.props.menu.open ? this.props.fetchMenu('MENU_FETCHED', false) : null}>
          <div className={classes.toolbarHidden} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.login.user, grupoMenu: state.grupoMenu, menu: state.menu, modal: state.modal, usuario: state.usuario })
const mapDispatchToProps = dispatch => bindActionCreators({ logout, getGrupoMenusUsuario, fetchMenu, usuarioDetalhes, validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(withWidth()(MainLayout))))

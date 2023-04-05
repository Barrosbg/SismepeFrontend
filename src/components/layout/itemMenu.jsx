import React, { Component } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import IconExpandLess from '@mui/icons-material/ExpandLess';
import IconExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import OpacityIcon from '@mui/icons-material/Opacity';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DomainIcon from '@mui/icons-material/Domain';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BallotIcon from '@mui/icons-material/Ballot';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Tooltip } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import styles from './../../theme/styleMainLayout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMenu } from './../../actions/geral/actions';

class ItemMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subMenuIsOpen: false,
            key: props.key,
            title: props.title,
            path: props.path,
            icon: this.getIcon(props.title),
            level: props.level,
            children: props.children
        }
    }

    handleSubMenu = () => {
        this.props.fetchMenu('MENU_FETCHED', true);
        this.setState({ subMenuIsOpen: !this.state.subMenuIsOpen })
    }

    closeMenu = () => {
        this.props.fetchMenu('MENU_FETCHED', false);
    }

    getIcon(name) {
        switch (name) {
            case 'Atendimento':
                return <AssignmentIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Clínica e Assistencial':
                return <DomainIcon style={{ fontSize: '1rem', color: 'white' }} />
            case 'Materiais e Logística':
                return <ListAltIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Diagnóstico e Terapia':
                return <PlaylistAddCheckIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Administrativo':
                return <SupervisorAccountIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Indicadores Gerenciais':
                return <BarChartIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Configurações do Sistema':
                return <SettingsIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Configurações da Conta':
                return <PermContactCalendarIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Agência Transfusional':
                return <LocalHospitalIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Controle de Estacionamento':
                return <TimeToLeaveIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Jms':
                return <BallotIcon style={{ fontSize: '1rem', color: 'white' }} />;
            case 'Gerencial':
                return <AssessmentIcon style={{ fontSize: '1rem', color: 'white' }} />;
            default:
                return <ListIcon style={{ fontSize: '1rem', color: 'white' }} />;
        }
    }

    loadChildrens() {
        return this.state.children.map((item) => {
            return (
                item.children.length ?
                    <MenuItem
                        key={item.id}
                        title={item.title}
                        path={item.path}
                        icon=""
                        level={this.state.level + 1}
                        children={item.children}
                    />

                    :
                    <div className={"Level" + (this.state.level + 1)}>
                        <ListItem button component={Link} to={item.path} key={item.id} onClick={this.closeMenu}>
                            <ListItemText inset primary={<span className={"TitleLevel" + (this.state.level + 1)}>{item.title}</span>} />
                        </ListItem>
                    </div>
            )

        })
    }

    render() {
        const { classes } = this.props
        return (
            this.state.children.length

                ?

                <div className={"Level" + this.state.level}>
                    <ListItem key={this.state.key} onClick={this.handleSubMenu} style={{ cursor: 'pointer' }}>
                        {this.state.level > 1
                            ? ''
                            :

                            this.props.menu.open

                                ?

                                <ListItemIcon>
                                    {this.state.icon}
                                </ListItemIcon>
                                :
                                <Tooltip title={this.state.title} placement="right">
                                    <ListItemIcon>
                                        {this.state.icon}
                                    </ListItemIcon>
                                </Tooltip>
                        }

                        <ListItemText primary={<span className={"TitleLevel" + this.state.level}>{this.state.title}</span>} />
                        {this.state.subMenuIsOpen ? <IconExpandLess /> : <IconExpandMore />}
                    </ListItem>

                    <Collapse in={this.state.subMenuIsOpen && this.props.menu.open} style={{ fontSize: '1rem', color: 'white' }} timeout="auto">
                        <List component="div" disablePadding>
                            {this.loadChildrens()}
                        </List>
                    </Collapse>
                </div>

                :

                <div className={"Level" + this.state.level}>
                    {
                        this.props.menu.open

                            ?

                            <ListItem key={this.state.key} button component={Link} to={this.state.path} onClick={this.closeMenu} >
                                <ListItemIcon>{this.state.icon}</ListItemIcon>
                                <ListItemText primary={this.state.title} />
                            </ListItem>

                            :

                            <Tooltip title={this.state.title} placement="right">
                                <ListItem key={this.state.key} button component={Link} to={this.state.path} onClick={this.closeMenu} >
                                    <ListItemIcon>{this.state.icon}</ListItemIcon>
                                    <ListItemText primary={this.state.title} />
                                </ListItem>
                            </Tooltip>
                    }

                </div>

        )
    }
}


const mapStateToProps = state => ({ menu: state.menu })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchMenu }, dispatch)
const MenuItem = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemMenu))
export default MenuItem

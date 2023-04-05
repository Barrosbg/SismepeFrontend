import React, { Component } from 'react';
import Container from '@mui/material/Container';
import { connect } from 'react-redux';
import { Card, CardHeader, Grid, IconButton, MenuItem, Menu, CircularProgress, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import CardContent from '@mui/material/CardContent';
import CustomLineChart from '../../../components/charts/LineChart';
import CustomAreaChart from '../../../components/charts/AreaChart';
import CustomBarChart from '../../../components/charts/BarChart';
import CustomComposedChart from '../../../components/charts/ComposedChart';
import CustomPieChart from '../../../components/charts/PieChart';
import { prestadorHistoricoAtendimentos } from '../../../actions/geral/actions';
import sistemaDeAbas from '../../homeControl/sistemaDeAbas'
// let date = new Date();
// const formatNumberDate = (number) => {return number > 9 ? number : `0${number}`}
// let listDates = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((item) => { return `${formatNumberDate(date.getDate()-item)}/${formatNumberDate(date.getMonth()+1)}`});


// const data = [
//     {name: listDates[0], a: 400, c: 350, r: 300},
//     {name: listDates[1], a: 300, c: 320, r: 250}, 
//     {name: listDates[2], a: 200, c: 270, r: 300}, 
//     {name: listDates[3], a: 250, c: 290, r: 350}, 
//     {name: listDates[4], a: 150, c: 255, r: 400}, 
//     {name: listDates[5], a: 100, c: 260, r: 330}, 
//     {name: listDates[6], a: 250, c: 220, r: 400}, 
//     {name: listDates[7], a: 270, c: 410, r: 370}, 
//     {name: listDates[8], a: 330, c: 180, r: 320}, 
//     {name: listDates[9], a: 380, c: 160, r: 250}, 
//     {name: listDates[10], a: 450, c: 100, r: 140}, 
// ]


// let a = 0;
// let c = 0;
// let r = 0;


// data.map((it) =>{
//   a += it.a;
//   c += it.c;
//   r += it.r;
// })

// const dataPie = [
//   { name: 'Agendado', value: a },
//   { name: 'Realizado', value: c },
//   { name: 'Cancelado', value: r },
// ];

// const headers = [
//   {title: 'Agendados', color: '#586994', id: 'colorUv', key: 'a'}, 
//   {title: 'Realizados', color: '#466365', id: 'colorPv', key: 'r'}, 
//   {title: 'Cancelados', color: '#AF3E4D', id: 'colorAmt', key: 'c'},
// ]

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      anchorElAtendimentos: null,
      filtroAtendimentos: 'semanal',
      loadingAtendimentos: false,
      anchorElAtendimentosArea: null,
      filtroAtendimentosArea: 'mensal',
      loadingAtendimentosArea: false,
      anchorElAtendimentosBar: null,
      filtroAtendimentosBar: 'mensal',
      loadingAtendimentosBar: false,
      anchorElAtendimentosComposed: null,
      filtroAtendimentosComposed: 'semanal',
      loadingAtendimentosComposed: false,
      anchorElAtendimentosPie: null,
      filtroAtendimentosPie: 'semanal',
      loadingAtendimentosPie: false,
      dataArea:[],
      dataBar: [],
      headers: [
        {title: 'Agendados', color: '#2E4057', id: 'ag', key: 'agendados'}, 
        {title: 'Realizados', color: '#307351', id: 're', key: 'realizados'}, 
      ]
    }
  }

  async componentDidMount(){
    document.title = "Página Inicial";
    // const { usuario } = this.props;
    // let prestadorId = usuario && usuario.prestador ? usuario.prestador.id : null;
    // if(prestadorId){
    //   let data = await prestadorHistoricoAtendimentos(prestadorId, this.state.filtroAtendimentosArea);
    //   let list = data.map((it) => {return {name: it.data, agendados: it.agendados, realizados: it.realizados }})
    //   this.setState({ dataBar: list, dataArea: list });
    // }

  }


  statusUsuarioSistema = () => {
    const { usuario } = this.props;
    const isCancelado = usuario && usuario.pessoa && usuario.pessoa.matricula ? 
              usuario.pessoa.dataCancelamento ? true : false
          : false;
    return <Grid item={true} xs={12} sm={12} md={4}>
      <Card >
        <CardContent>
          <Grid style={{color: '#606060', paddingBottom: '20px', fontSize: 16}}>
            SEU STATUS NO SISTEMA
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{color: isCancelado ? '#e54d4d' : '#54a052', fontSize:'15px'}}
          > 
            <Grid item xs={10} sm={10} md={10}>
              { isCancelado ? 'Cancelado' : 'Ativo'}
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              {
                isCancelado
                ?
                <CancelIcon style={{ fontSize: 25, marginLeft: 20 }}/>
                :
                <CheckIcon style={{ fontSize: 25, marginLeft: 20 }}/>
              }
            </Grid>
          </Grid>
        </CardContent>            
      </Card>
    </Grid>
  }

  handleClickAtendimentos = (event) => {
    this.setState({ anchorElAtendimentos: event.currentTarget });
  }
  
  handleCloseAtendimentos = (event) => {
    this.setState({ anchorElAtendimentos: null });
    if(event.target.id){
      this.setState({ filtroAtendimentos: event.target.id, loadingAtendimentos: true });

      setTimeout(() => this.setState({loadingAtendimentos: false}), 3000)
    }
  }

  handleClickAtendimentosArea = (event) => {
    this.setState({ anchorElAtendimentosArea: event.currentTarget });
  }
  
  handleCloseAtendimentosArea = async (event) => {
    this.setState({ anchorElAtendimentosArea: null });
    if(event.target.id){
      this.setState({ filtroAtendimentosArea: event.target.id, loadingAtendimentosArea: true });
      const { usuario } = this.props;
      let prestadorId = usuario && usuario.prestador ? usuario.prestador.id : null;
      if(prestadorId){
        let data = await prestadorHistoricoAtendimentos(prestadorId, event.target.id);
        let list = data.map((it) => {return {name: it.data, agendados: it.agendados, realizados: it.realizados }})
        this.setState({ dataArea: list });
      }
      this.setState({loadingAtendimentosArea: false});
    }
  }

  handleClickAtendimentosBar = (event) => {
    this.setState({ anchorElAtendimentosBar: event.currentTarget });
  }
  
  handleCloseAtendimentosBar = async (event) => {
    this.setState({ anchorElAtendimentosBar: null });
    if(event.target.id){
      this.setState({ filtroAtendimentosBar: event.target.id, loadingAtendimentosBar: true });
      const { usuario } = this.props;
      let prestadorId = usuario && usuario.prestador ? usuario.prestador.id : null;
      if(prestadorId){
        let data = await prestadorHistoricoAtendimentos(prestadorId, event.target.id);
        let list = data.map((it) => {return {name: it.data, agendados: it.agendados, realizados: it.realizados }})
        this.setState({ dataBar: list });
      }
      this.setState({loadingAtendimentosBar: false});
    }
  }

  handleClickAtendimentosComposed = (event) => {
    this.setState({ anchorElAtendimentosComposed: event.currentTarget });
  }
  
  handleCloseAtendimentosComposed = (event) => {
    this.setState({ anchorElAtendimentosComposed: null });
    if(event.target.id){
      this.setState({ filtroAtendimentosComposed: event.target.id, loadingAtendimentosComposed: true });

      setTimeout(() => this.setState({loadingAtendimentosComposed: false}), 3000)
    }
  }

  handleClickAtendimentosPie = (event) => {
    this.setState({ anchorElAtendimentosPie: event.currentTarget });
  }
  
  handleCloseAtendimentosPie = (event) => {
    this.setState({ anchorElAtendimentosPie: null });
    if(event.target.id){
      this.setState({ filtroAtendimentosPie: event.target.id, loadingAtendimentosPie: true });

      setTimeout(() => this.setState({loadingAtendimentosPie: false}), 3000)
    }
  }


  showLineChart = () => {   

    return (
      <Grid item={true} xs={12} sm={12} md={6}>
          <Card>
            <CardHeader        
              action={
                <IconButton aria-label="settings" onClick={this.handleClickAtendimentos} size="large">
                  <FilterListIcon />
                </IconButton>
              }
              title="HISTÓRICO DE ATENDIMENTOS"
              disableTypography={true}
              style={{color: '#606060', fontSize: 16}}
            />
            <CardContent> 
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorElAtendimentos}
                keepMounted
                open={Boolean(this.state.anchorElAtendimentos)}
                onClose={this.handleCloseAtendimentos}
              >
                <MenuItem style={{fontSize: 15}} id="semanal" disabled={this.state.filtroAtendimentos === 'semanal'} onClick={this.handleCloseAtendimentos}>Semanal</MenuItem>
                <MenuItem style={{fontSize: 15}} id="mensal" disabled={this.state.filtroAtendimentos === 'mensal'} onClick={this.handleCloseAtendimentos}>Mensal</MenuItem>
                <MenuItem style={{fontSize: 15}} id="anual" disabled={this.state.filtroAtendimentos === 'anual'} onClick={this.handleCloseAtendimentos}>Anual</MenuItem>
              </Menu>       
              {
                this.state.loadingAtendimentos ?
                <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{height: '300px'}}
                >
                  <CircularProgress color="primary" />
                </Grid>
                :
                <CustomLineChart data={data} headers={headers}/>
              }
              </CardContent>
          </Card>
        </Grid>
    );
    }

  showAreaChart = () => {
    return (
      <Grid item={true} xs={12} sm={12} md={6}>
        <Card >
          <CardHeader        
              action={
                <IconButton
                  aria-label="settings"
                  onClick={this.handleClickAtendimentosArea}
                  size="large">
                  <FilterListIcon />
                </IconButton>
              }
              title="HISTÓRICO DE ATENDIMENTOS"
              disableTypography={true}
              style={{color: '#606060', fontSize: 16}}
          />
          <CardContent>
          <Menu
                id="simple-menu"
                anchorEl={this.state.anchorElAtendimentosArea}
                keepMounted
                open={Boolean(this.state.anchorElAtendimentosArea)}
                onClose={this.handleCloseAtendimentosArea}
                
              >
                <MenuItem style={{fontSize: 15}} id="semanal" disabled={this.state.filtroAtendimentosArea === 'semanal'} onClick={this.handleCloseAtendimentosArea}>Semanal</MenuItem>
                <MenuItem style={{fontSize: 15}} id="mensal" disabled={this.state.filtroAtendimentosArea === 'mensal'} onClick={this.handleCloseAtendimentosArea}>Mensal</MenuItem>
                <MenuItem style={{fontSize: 15}} id="anual" disabled={this.state.filtroAtendimentosArea === 'anual'} onClick={this.handleCloseAtendimentosArea}>Anual</MenuItem>
              </Menu>       
              {
                this.state.loadingAtendimentosArea ?
                <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{height: '300px'}}
                >
                  <CircularProgress color="primary" />
                </Grid>
                :              
                this.state.dataArea && this.state.dataArea.length > 1
                    ?
                    <CustomAreaChart data={this.state.dataArea} headers={this.state.headers}/>
                    :
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      style={{height: '300px'}}
                      >
                        <Typography>Não existem dados suficientes para renderizar o gráfico!</Typography>
                      </Grid>
              }
          </CardContent>
        </Card>
      </Grid>
    );
  }

  showBarChart = () => {
    return (
      <Grid item={true} xs={12} sm={12} md={6}>
        <Card >
          <CardHeader        
            action={
              <IconButton
                aria-label="settings"
                onClick={this.handleClickAtendimentosBar}
                size="large">
                <FilterListIcon />
              </IconButton>
            }
            title="HISTÓRICO DE ATENDIMENTOS"
            disableTypography={true}
            style={{color: '#606060', fontSize: 16}}
          />
          <CardContent>
            <Menu
                id="simple-menu"
                anchorEl={this.state.anchorElAtendimentosBar}
                keepMounted
                open={Boolean(this.state.anchorElAtendimentosBar)}
                onClose={this.handleCloseAtendimentosBar}
                
              >
                <MenuItem style={{fontSize: 15}} id="semanal" disabled={this.state.filtroAtendimentosBar === 'semanal'} onClick={this.handleCloseAtendimentosBar}>Semanal</MenuItem>
                <MenuItem style={{fontSize: 15}} id="mensal" disabled={this.state.filtroAtendimentosBar === 'mensal'} onClick={this.handleCloseAtendimentosBar}>Mensal</MenuItem>
                <MenuItem style={{fontSize: 15}} id="anual" disabled={this.state.filtroAtendimentosBar === 'anual'} onClick={this.handleCloseAtendimentosBar}>Anual</MenuItem>
              </Menu>  
              {
                this.state.loadingAtendimentosBar ?
                <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{height: '300px'}}
                >
                  <CircularProgress color="primary" />
                </Grid>
                :              
                this.state.dataBar && this.state.dataBar.length
                  ?
                  <CustomBarChart data={this.state.dataBar} headers={this.state.headers}/>
                  :
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    style={{height: '300px'}}
                  >
                    <Typography>Não existem dados suficientes para renderizar o gráfico!</Typography>
                  </Grid>
              }
          </CardContent>
        </Card>
      </Grid>
    );
  }

  showComposedChart = () => {
    return (
      <Grid item={true} xs={12} sm={12} md={6}>
        <Card >
          <CardHeader        
            action={
              <IconButton
                aria-label="settings"
                onClick={this.handleClickAtendimentosComposed}
                size="large">
                <FilterListIcon />
              </IconButton>
            }
            title="HISTÓRICO DE ATENDIMENTOS"
            disableTypography={true}
            style={{color: '#606060', fontSize: 16}}
          />
          <CardContent>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorElAtendimentosComposed}
              keepMounted
              open={Boolean(this.state.anchorElAtendimentosComposed)}
              onClose={this.handleCloseAtendimentosComposed}              
            >
              <MenuItem style={{fontSize: 15}} id="semanal" disabled={this.state.filtroAtendimentosComposed === 'semanal'} onClick={this.handleCloseAtendimentosComposed}>Semanal</MenuItem>
              <MenuItem style={{fontSize: 15}} id="mensal" disabled={this.state.filtroAtendimentosComposed === 'mensal'} onClick={this.handleCloseAtendimentosComposed}>Mensal</MenuItem>
              <MenuItem style={{fontSize: 15}} id="anual" disabled={this.state.filtroAtendimentosComposed === 'anual'} onClick={this.handleCloseAtendimentosComposed}>Anual</MenuItem>
            </Menu> 
            {
              this.state.loadingAtendimentosComposed ?
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{height: '300px'}}
              >
                <CircularProgress color="primary" />
              </Grid>
              :
              <CustomComposedChart data={data} headers={headers}/>
            }
          </CardContent>
        </Card>
      </Grid>
    );
  }

  showPieChart = () => {
    return (
      <Grid item={true} xs={12} sm={12} md={6}>
        <Card >
          <CardHeader        
            action={
              <IconButton
                aria-label="settings"
                onClick={this.handleClickAtendimentosPie}
                size="large">
                <FilterListIcon />
              </IconButton>
            }
            title="HISTÓRICO DE ATENDIMENTOS"
            disableTypography={true}
            style={{color: '#606060', fontSize: 16}}
          />
          <CardContent> 
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorElAtendimentosPie}
              keepMounted
              open={Boolean(this.state.anchorElAtendimentosPie)}
              onClose={this.handleCloseAtendimentosPie}              
            >
              <MenuItem style={{fontSize: 15}} id="semanal" disabled={this.state.filtroAtendimentosPie === 'semanal'} onClick={this.handleCloseAtendimentosPie}>Semanal</MenuItem>
              <MenuItem style={{fontSize: 15}} id="mensal" disabled={this.state.filtroAtendimentosPie === 'mensal'} onClick={this.handleCloseAtendimentosPie}>Mensal</MenuItem>
              <MenuItem style={{fontSize: 15}} id="anual" disabled={this.state.filtroAtendimentosPie === 'anual'} onClick={this.handleCloseAtendimentosPie}>Anual</MenuItem>
            </Menu>
            {
              this.state.loadingAtendimentosPie ?
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{height: '300px'}}
              >
                <CircularProgress color="primary" />
              </Grid>
              :          
              <CustomPieChart data={dataPie} headers={headers}/>
            }
          </CardContent>
        </Card>
      </Grid>
    );
  }

  render() {    
    return (
      // <sistemaDeAbas/>
        <Container maxWidth="xl">
          
          <div className="Spacer"/>
          <Grid container spacing={1}>
            { this.statusUsuarioSistema() }
          </Grid>
          <Grid container spacing={1}>
            {/* { this.showLineChart() }  */}
            {/* { this.showAreaChart() } */}
            {/* { this.showBarChart() } */}
            {/* { this.showComposedChart() } */}
            {/* { this.showPieChart() } */}
          </Grid>

       
        </Container>
    );
  }
}

const mapStateToProps = state => ({ usuario: state.usuario });
export default connect(mapStateToProps, null)(HomePage);
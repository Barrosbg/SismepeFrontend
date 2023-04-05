import { Button, Collapse, Container, Card, CardContent, Box, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },

    },
    heading: {
        fontSize: '30px'
    }
}));

const PesquisaDeSatisfacao = (props) => {

    const classes = useStyles();
    const [listaVeiculos, setListaVeiculos] = useState([]);
    const [nome, setNome] = useState(null);
    const [setor, setSetor] = useState(null);
    const [marca, setMarca] = useState(null);
    const [modelo, setModelo] = useState(null);
    const [cor, setCor] = useState(null);
    const [buscaCad, setBuscaCad] = useState([]);
    const [cadId, setCadId] = useState(null);
    const [cadIdCancelamento, setCadIdCancelamento] = useState(null);
    const [hiddenbuscaCad, sethiddenbuscaCad] = useState(false);
    const [defaultClose, setDefaultClose] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [placa, setPlaca] = useState(null);
    const [busca, setBusca] = useState(null);
    const [openModalAtualizarDeletar, setOpenModalAtualizarDeletar] = useState(false);
    const [modalCancelaCad, setModalCancelaCad] = useState(false);
    const [telefone, setTelefone] = useState(null);
    const [cadVeiculo, setCadVeiculo] = useState(null);

    const customIcons = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon  color="error"/>,
            label: 'Very Dissatisfied',
        },
        2: {
            icon: <SentimentDissatisfiedIcon htmlColor="#F39C12" />,
            label: 'Dissatisfied',
        },
        3: {
            icon: <SentimentSatisfiedIcon htmlColor="#F7DC6F" />,
            label: 'Neutral',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon htmlColor="#82E0AA" />,
            label: 'Satisfied',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon  htmlColor="#1D8348"/>,
            label: 'Very Satisfied',
        },
    };

    function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
      }
      
      IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
      };
      

    return (

        <Container>
            <Card>
                <CardHeader
                    title="Pesquisa de Satisfação"
                />
                <CardContent>

                    <Grid container spacing={1} margin="dense" >
                        <Grid item xs={12} md={5} >
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">Qual seu nível de satisfação com nosso atendimento?</Typography>
                                <Rating
                                    name="customized-icons"
                                    label={(value) => customIcons[value].label}
                                    defaultValue={1}
                                    size='large'
                                    getLabelText={(value) => customIcons[value].label}
                                    IconContainerComponent={IconContainer}
                                />
                            </Box>
                        </Grid>

                        {/* <Grid item xs={12} md={4}>
                            <Button variant="contained" color="secondary" fullWidth onClick={SalvarVeiculo}>
                                Salvar
                            </Button>
                        </Grid> */}


                    </Grid>
                </CardContent>
            </Card >





            <div className="Spacer"></div>


        </Container>


    )

}



export default PesquisaDeSatisfacao

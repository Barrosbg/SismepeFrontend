import { Grid, Typography } from '@mui/material';

import { useState } from 'react';
import { Alert } from '@mui/material';
import imageGif from '../../assets/out.gif';
import image from '../../assets/biometria.png';

import ButtonImage from '../../components/general/buttonImage';
import Timer from '../../components/general/timer';
import { validarDigital } from '../../actions/administrativo/cadastro/biometria/actions';
import api from '../../constants/apiLocalBio';

export default function ValidadorBiometria(props) {
    const [textInfo, setTextInfo] = useState({ text: "", type: "" });
    const [load, setLoad] = useState(false);

    async function valida_digital() {
        const isup = await api.get('/isup');

        if (isup.status === 200) {
            let response = await validarDigital(props.cdPessoa);

            setTextInfo({
                text: response.message,
                type: response.status ? "success" : "error",
            });

            props.handleLoading && props.handleLoading(false);
            setLoad(false);
            (props.afterValidate && response.status) && props.afterValidate(response.status);
        }

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
                <ButtonImage
                    disabled={load}
                    onClick={
                        e => {
                            e.stopPropagation();
                            valida_digital();
                            setTextInfo({ text: "Posicione o dedo no leitor", type: "info" });
                            setLoad(true);
                            props.handleLoading && props.handleLoading(true);
                        }
                    }
                    imageWidth="80%"
                    title={load ? "Verificando..." : "Validar"}
                    url={load ? imageGif : image}
                />
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
                {load && <Timer time={30} description="Tempo de espera do leitor" />}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                {textInfo.text != "" && textInfo.type != "" ? <Alert severity={textInfo.type}>{textInfo.text}</Alert> : ""}
            </Grid>
        </Grid>
    );
}
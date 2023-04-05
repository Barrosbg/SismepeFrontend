import { Button, Grid } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import 'react-image-crop/dist/ReactCrop.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import { connect } from 'react-redux';

import { addFoto, resetFoto } from '../../actions/administrativo/cadastro/biometria/actions';
import { bindActionCreators } from 'redux';

import '../../pages/administrativo/cadastro/biometria/stepAnimation.css';
import InputSelect from './select/select';

function Camera(props) {
    const webcamRef = useRef(null);
    const [devices, setDevices] = useState([]);
    const [currentDeviceId, setCurrentDeviceId] = useState(null);

    const handleDevices = useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    });

    useEffect(() => {
        if (devices.length === 1) {
            setCurrentDeviceId(devices[0].deviceId);
        }
    });

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        props.resetFoto();

        props.handleSaveImage(imageSrc);
    }, [webcamRef]);

    return (
        <div>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
                {devices.length > 1 && <InputSelect options={
                    devices.map((device, key) => (
                        { value: device.deviceId, key: key, label: (device.label || `Device ${key + 1}`) }
                    ))
                }
                    handlerOption={setCurrentDeviceId}
                    placeholder="Dispositivos"
                    label="Dispositivos"
                />}
                {(devices.length === 1 || currentDeviceId) &&
                    <>
                        <Grid item xs={12} sm={12}>
                            <Webcam audio={false} videoConstraints={{ deviceId: currentDeviceId, width: 480, height: 480 }} width={320} height={320} ref={webcamRef} screenshotFormat="image/png" />
                        </Grid>
                        <Button startIcon={<PhotoCameraIcon />} onClick={() => { capture(); }} variant="contained" fullWidth={true} color="primary">Tirar foto</Button>
                    </>
                }
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        foto: state.biometria.foto,
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ addFoto, resetFoto }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Camera);

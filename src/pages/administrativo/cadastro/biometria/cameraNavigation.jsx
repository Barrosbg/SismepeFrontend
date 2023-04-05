import { Button } from '@mui/material';
import React from 'react';
import { WithWizard } from 'react-albus';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

function CameraNavigation(props) {

    return (
        <WithWizard
            render={({ next, previous, step, steps }) => (
                <div>
                    {steps.indexOf(step) < steps.length - 1 && (
                        <Button startIcon={<PhotoCameraIcon />} onClick={() => {props.capture(); next()}} variant="contained" fullWidth={true} color="primary">Tirar foto</Button>
                    )}

                    {steps.indexOf(step) > 0 && (
                        <Button onClick={previous} size="small" style={{marginLeft: 8}} variant="outlined" color="primary" fullWidth={true} >Tirar nova foto</Button>
                    )}
                </div>
            )}
        />
    );
}

export default CameraNavigation;
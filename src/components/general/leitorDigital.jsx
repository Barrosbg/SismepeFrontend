import React, { useState } from 'react';
import api from '../../constants/apiLocalBio';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

export default function LeitorDigital() {
    const [isBlocked, setBlocked] = useState(false);

    const lerDigital = () => {
        if (!isBlocked) {
            setBlocked(true);
            toast.info("Posicione o dedo no leitor.");
            api.get('/getDigital').then((response) => {
                toast.success('Biometria validada com sucesso');
                setBlocked(false);
            }).catch((e) => {
                toast.error('Biometria não identificada');
                setBlocked(false);
            });
        }
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={lerDigital} disabled={isBlocked}>Validar biometria</Button>
        </div>
    )
}
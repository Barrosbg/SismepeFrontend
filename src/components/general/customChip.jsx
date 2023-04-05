
import { Chip } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AutorenewIcon from '@mui/icons-material/Autorenew';


export default function CustomChip(props) {


    const getIcon = (status) => {
        switch (status) {
            case 'Agendado':
                return <ScheduleIcon style={{ color: '#fff' }} />;
            case 'Aguardando':
                return <HourglassEmptyIcon style={{ color: '#fff' }} />;
            case 'Cancelado':
                return <CloseIcon style={{ color: '#fff' }} />;
            case 'Realizado':
                return <DoneIcon style={{ color: '#fff' }} />;
            case 'Em atendimento':
                return <AutorenewIcon style={{ color: '#fff' }} />;
            case 'Finalizado':
                return <ScheduleIcon style={{ color: '#fff' }} />;
        }
    }

    const getColor = (status) => {
        switch (status) {
            case 'Agendado':
                return '#2b72b3';
            case 'Aguardando':
                return '#58a8b0';
            case 'Cancelado':
                return '#d46e6e';
            case 'Realizado':
                return '#2ca864';
            case 'Em atendimento':
                return '#9347ac';
            case 'Finalizado':
                return '#2ca864';
        }
    }
    return (
        <Chip
            label={props.status}
            size="small"
            style={{ color: '#fff', backgroundColor: getColor(props.status) }}
            onDelete={() => { }}
            deleteIcon={getIcon(props.status)}
        />
    );
}
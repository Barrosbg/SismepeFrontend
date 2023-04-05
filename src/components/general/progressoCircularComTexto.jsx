import { Box, CircularProgress, Typography } from '@mui/material';

export default function ProgressoCircularComTexto(props) {
    return (
        <Box position="relative" display="inline-flex" height={props.height}>
            <CircularProgress size={props.height} thickness={props.thickness} variant="determinate" value={props.value} color={props.color || 'primary'} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h5" component="div" color="textSecondary">{props.valueText}</Typography>
            </Box>
        </Box>
    );
}
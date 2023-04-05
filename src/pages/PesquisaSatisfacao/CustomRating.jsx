import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';




export default function CustomRating(props) {


    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(0);
    const [resposta, setResposta] = React.useState('');

    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
            color: theme.palette.action.disabled,
        },
    }));

    const customIcons = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon color="error" />,
            label: 'Muito Insatisfeito',
        },
        2: {
            icon: <SentimentDissatisfiedIcon color="error" />,
            label: 'Insatisfeito',
        },
        3: {
            icon: <SentimentSatisfiedIcon color="warning" />,
            label: 'Neutro',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon color="success" />,
            label: 'Satisfeito',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon color="success" />,
            label: 'Muito Satisfeito',
        },
    };

    function getLabelText(e) {
        console.log(customIcons[hover]?.label)
        console.log(hover)
        // return `${value} Star${value !== 1 ? 's' : ''}, ${customIcons[value]}`;
    }

    function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }


    IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
    };


    const handleChangeRespostar = (e) =>{
      
        const resposta = {
            pergunta:props.changePergunta,
            resposta: e
        }
       return props.handleChange(resposta)    
    }

    return (
        <FormControl fullWidth size="large">

            <Box sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column-reverse',
                justifyContent: 'start',


            }}>
                <StyledRating
                    size="large"
                    name="highlight-selected-only"
                    defaultValue={1}
                    value={value}
                    IconContainerComponent={IconContainer}
                    getLabelText={() => customIcons[hover]?.label}
                    highlightSelectedOnly={true}
                    precision={1}
                    onChange={(event, newValue) => {
                         setValue(newValue)
                         handleChangeRespostar(newValue)
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                        console.log(newHover);
                    }}
             
                />
                {(hover !== 0 || value !== -1) &&
                    <Box component="span" sx={{
                        ml: 1,
                        width: 200,
                        textAlign: 'center'
                    }}>
                        {customIcons[hover !== 0 ? hover : value]?.label}
                    </Box>
                }

            </Box>
        </FormControl>
    );
}



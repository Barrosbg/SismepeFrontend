import { ButtonBase, Typography } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

function ButtonImage(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            // boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
        },
        image: {
            position: 'relative',
            height: 200,
            [theme.breakpoints.down('lg')]: {
                width: '100% !important',
                height: 200,
            },
            '&:hover, &$focusVisible': {
                zIndex: 1,
                '& $imageBackdrop': {
                    opacity: 0.9,
                },
                '& $imageMarked': {
                    opacity: 0,
                },
                '& $imageTitle': {
                    border: '2px solid currentColor',
                    borderRadius: '10px'
                },
            },
        },
        focusVisible: {},
        imageButton: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.common.white,
        },
        imageSrc: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
        },
        imageBackdrop: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: theme.palette.common.black,
            opacity: 0.6,
            transition: theme.transitions.create('opacity'),
            borderRadius: '10px',
        },
        imageTitle: {
            position: 'relative',
            padding: `${theme.spacing(2)} ${theme.spacing(4)} calc(${theme.spacing(1)} + 6px)`,
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonBase
                focusRipple
                key={props.title}
                className={classes.image}
                disabled={props.disabled}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: props.imageWidth,
                }}
                onClick={props.onClick}
            >
            <span
                className={classes.imageSrc}
                style={{
                    backgroundImage: `url(${props.url})`,
                }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
                <Typography
                component="span"
                variant="overline" display="block"
                color="inherit"
                className={classes.imageTitle}
                >
                {props.title}
                </Typography>
            </span>
            </ButtonBase>
        </div>
    );
}

export default ButtonImage;
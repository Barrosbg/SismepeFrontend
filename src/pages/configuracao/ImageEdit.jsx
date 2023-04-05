import { Button, Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from "react";
import DialogHeadFooter from "../../components/general/dialogHeaderFooter";
import ButtonBase from '@mui/material/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 300,
      [theme.breakpoints.down('lg')]: {
        width: '100% !important',
        height: 200,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '2px solid currentColor',
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
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)} ${theme.spacing(4)} calc(${theme.spacing(1)} + 6px)`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));



export default function ImageEdit(props) {

    const classes = useStyles();
    const [src, setSrc] = useState(props.src);
    const [isAlterImage, setAlterImage] = useState(false);

    function closeModal() {
        props.handleModal(false);
    }

    function showInput(){
        let input = document.querySelector("#img");
        input.click();
    }

    function changeImage (img) {
        var file = img.target.files[0];
        var reader  = new FileReader();

        reader.onloadend =  () => {
            setSrc(reader.result);
            setAlterImage(true);
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setSrc("");
        }
    }

    return (
        <DialogHeadFooter title="Alterar Foto" isOpen={props.open} onClose={closeModal}
            footer={
                <div style={{padding: '20px !important'}}>
                    <Button onClick={closeModal}
                        style={{
                            backgroundColor: "#e04747",
                            color: "white",
                            margin: "10px"
                        }}
                        variant="contained">
                        CANCELAR
                    </Button>
                    <Button
                        style={{
                            backgroundColor: "#3c8dbc",
                            color: "white",
                            margin: "10px"
                        }}
                        disabled={!isAlterImage}
                        variant="contained">
                        SALVAR
                    </Button>
                </div>
            }>
                <Grid container spacing={1}>
                    
                    <Grid item={true} sm={12} xs={12} md={12}>
                        <Grid container justifyContent="center" alignContent="center">
                            <ButtonBase
                                focusRipple
                                key="ALTERAR"
                                className={classes.image}
                                onClick={showInput}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width: '30%',
                                }}
                                >
                                <span
                                    className={classes.imageSrc}
                                    style={{
                                    backgroundImage: `url(${src})`,
                                    }}
                                />
                                
                                <span className={classes.imageBackdrop} />
                                <span 
                                    className={classes.imageButton}
                                    >
                                    <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    className={classes.imageTitle}
                                    >
                                    ALTERAR
                                    <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                    
                    <input
                      type="file"
                      id="img"
                      onChange={changeImage}
                      hidden
                    />
                </Grid>
            
            </DialogHeadFooter>
    );
    
}

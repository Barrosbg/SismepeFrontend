import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import CloseIcon from '@mui/icons-material/Close';

const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 3}px 0`,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit / 2,
        top: theme.spacing.unit / 2,
        color: theme.palette.grey[500],
    },
})

function DialogHeaderFooter(props) {
    const { classes } = props;

    function handleClickClose() {
        props.handleClickClose();
    }

    return (
        <Dialog onClose={props.handleClose}  open={props.isOpen} fullWidth={true}  maxWidth={props.maxWidth || "md"} aria-labelledby={props.idComponent}>
            {props.title !== undefined && props.title.length > 0 ? 
            <DialogTitle id={props.idComponent} onClose={props.handleClose}>
                {props.closeButton ? (
                    <IconButton
                        aria-label="Close"
                        className={classes.closeButton}
                        onClick={handleClickClose}
                        size="large"
                        sx={{ marginLeft: 110 }}
                        >
                        <CloseIcon />
                    </IconButton>
                ) : null}
                {props.title}
            </DialogTitle> : null }
            <DialogContent className={props.className}  >
                        {props.children}
            </DialogContent>
            <DialogActions>
                {props.footer}
            </DialogActions>
        </Dialog>
    );
}

export default withStyles(styles)(DialogHeaderFooter);
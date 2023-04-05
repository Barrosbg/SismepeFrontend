import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material";
import { green } from "@mui/material/colors";

const withOkAndCancel = (WrappedComponent) => (props) => {
  const { okLabel = 'Ok', cancelLabel = 'Cancelar', okAction, cancelAction } = props;
  const theme = createTheme(adaptV4Theme({
    palette: {
      primary: {
        main: green[600],
      },
    },
  }));

  return (
    <WrappedComponent
      {...props}
      footer={
        <Box display="flex">
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Box m={0.5}>
                <Button
                  onClick={cancelAction}
                  variant="outlined"
                  color="secondary"
                >{cancelLabel}</Button>
              </Box>
              <Box m={0.5}>
                <Button
                  onClick={okAction}
                  variant="contained"
                  color="primary"
                >{okLabel}</Button>
              </Box>
            </ThemeProvider>
          </StyledEngineProvider>
        </Box>
      }
    >
      {props.children}
    </WrappedComponent>
  );
}

export default withOkAndCancel;
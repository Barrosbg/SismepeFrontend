import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Component } from 'react';
import withStyles from '@mui/styles/withStyles';
import { Box } from '@mui/system';
import { ClassNames } from '@emotion/react';

const styles = (theme) => ({
  option: {
    "&:hover": {
      backgroundColor: "#ddd !important"
    }
  },
  // campo: {
  //   "&:MuiAutocomplete-endAdornment": {
  //     pb: `${5}!important`,

  //   },
  // }

});

class TextFieldAutocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      options: [],
    }
  }

  search = async (filter) => {
    if (filter.trim() || this.props.minSizeFilter === 0) {
      this.setState({
        loading: true
      })

      const { actionFilter } = this.props;
      let data = await actionFilter(filter.replace(/[^\w\s]/g, ''));
      if (data && data.length) {
        this.setState({ options: data });
      }

      this.setState({
        loading: false
      })
    } else {
      this.setState({ options: [] });
    }

  }

  render() {
    const { label, classes } = this.props;

    return (
      // <Autocomplete
      //   fullWidth={true}
      //   id="combo-box-demo"
      //   sx={this.props.sx}

      //   options={this.state.options}

      //   renderInput={(params) => <TextField size="small" {...params} label="Movie" />}
      // />
      <Autocomplete
        id={label}
        fullWidth={true}
        open={this.state.open}
        // className={classe ? classe : classes.campo}
        onOpen={() => {
          this.search('')
          this.setState({ open: true });
        }}
        sx={this.props.sx}
        size="small"
        margin="dense"
        onClose={() => {
          this.setState({ open: false });
        }}
        noOptionsText="Nenhum resultado"
        loadingText="Carregando..."
        isOptionEqualToValue={(option, value) => {
          option.nome === value.nome
        }}
        classes={{
          option: classes.option,
          campo: classes.campo
        }}
        disabled={this.props.disabled ? this.props.disabled : ''}
        getOptionLabel={this.props.getOptionLabel}
        options={this.state.options}
        filterOptions={this.props.filterOptions}
        loading={this.state.loading}
        onInputChange={(event, value, reason) => {
          if (reason === 'input' && !this.state.loading) {
            this.search(value)
          }
        }}
        onChange={(event, value) => this.props.actionChangeOption(value)}
        value={this.props.value}
        renderInput={(params) => (

          <TextField
            {...params}
            label={label}
            value={this.props.value}
            error={this.props.error}
            helperText={this.props.helperText}
            variant="outlined"
            
            disabled={this.props.disabled ? this.props.disabled : ''}
            onBlur={(event) => { this.setState({ options: [] }) }}
            InputProps={{
              ClassName: `${classes.campo}`,
              ...params.InputProps,
              endAdornment: (

                <>
                  {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}

      />
    );
  }


}



export default withStyles(styles)(TextFieldAutocomplete);

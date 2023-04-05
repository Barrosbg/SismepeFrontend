import * as React from 'react';
import {TextField} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Component } from 'react';
import withStyles from '@mui/styles/withStyles';

const styles = (theme) => ({
  option: {
    "&:hover": {
      backgroundColor: "#ddd !important"
    }
  }
});

class TextFieldEdit extends Component {

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
   console.log(this.props.size)
    return (
    //   <Autocomplete
    //     id={label}
    //     fullWidth={true}
    //     open={this.state.open}
    //     onOpen={() => {
    //       this.search('')
    //       this.setState({ open: true });
    //     }}
    //     onClose={() => {
    //       this.setState({ open: false });
    //     }}
    //     noOptionsText="Nenhum resultado"
    //     loadingText="Carregando..."
    //     isOptionEqualToValue={(option, value) => {
    //       option.nome === value.nome
    //     }}
    //     classes={{
    //       option: classes.option
    //     }}
    //     disabled={this.props.disabled ? this.props.disabled : ''}
    //     getOptionLabel={this.props.getOptionLabel}
    //     options={this.state.options}
    //     filterOptions={this.props.filterOptions}
    //     loading={this.state.loading}
    //     onInputChange={(event, value, reason) => {
    //       if (reason === 'input' && !this.state.loading) {
    //         this.search(value)
    //       }
    //     }}
    //     onChange={(event, value) => this.props.actionChangeOption(value)}
    //     value={this.props.value}
    //     renderInput={(params) => (
          <TextField
            // {...params}
            label={label}
            error={this.props.error}
            helperText={this.props.helperText}
            variant="outlined"
            margin="dense"
            size={this.props.size}
            disabled={this.props.disabled ? this.props.disabled : ''}
            onBlur={(event) => { this.setState({ options: [] }) }}
            // InputProps={{
            //   ...params.InputProps,
            //   endAdornment: (
            //     <React.Fragment>
            //       {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
            //       {params.InputProps.endAdornment}
            //     </React.Fragment>
            //   ),
            // }}
          />
        // )}

    //   />
    );
  }

  
    }
  


export default withStyles(styles)(TextFieldEdit);
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import TextFieldAutocomplete from '../../../components/general/autocomplete'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBackdrop } from "../../../actions/geral/actions";
const ControleDePerfis = (props) => {
   useEffect(() => {

      console.log(props)
   });

   return (

      <Grid container>
         <Grid item>
            teste 2
         </Grid>
      </Grid>
   )
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)
export default connect(null, mapDispatchToProps)(ControleDePerfis)
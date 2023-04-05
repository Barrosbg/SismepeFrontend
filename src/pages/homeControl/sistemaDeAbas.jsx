import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import TextFieldAutocomplete from '../../components/general/autocomplete'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBackdrop } from "../../actions/geral/actions";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Switch, Redirect } from 'react-router-dom';
const sistemaDeAbas = (props) => {

   const [value, setValue] = React.useState('1');
   const [janelas, setJanelas] = React.useState([]);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   useEffect(() => {

      const abas ={
         componente:props.children.$$typeof,
         props:props.children.props
      }
     localStorage.setItem('janelas', JSON.stringify(abas))
      // janelas.push(props)
      // return (
      //    Redirect("/administrativo/jms/cadastro/manter_gerenciar")
      //  )
  
     console.log(props.children.$$typeof
      )
   }, []);
   return (

      <Grid container>
         <Grid item>
            <Box sx={{ width: '100%', typography: 'body1' }}>
               <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                     <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {janelas.map((index, key) => {
                           console.log(janelas)
                           return (
                              <div key={key}>

                                 {props.children.props.location.pathname}

                                 {/* <TabPanel value="1">Item One</TabPanel>
                           <TabPanel value="2">Item Two</TabPanel>
                           <TabPanel value="3">Item Three</TabPanel> */}
                              </div>
                           )
                        })}
                     </TabList>
                  </Box>
               </TabContext>
            </Box>
         </Grid>
      </Grid>
   )
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)
export default connect(null, mapDispatchToProps)(sistemaDeAbas)
import PropTypes from 'prop-types';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Paper, Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
  


export default function TabsTop(props) {
  const handleChange = (event, newValue) => {
    props.setCurrentTab(newValue);
  };

  return (
    <div>
      <AppBar position="sticky" style={{boxShadow: 'none'}}>
        <Paper square variant="outlined">
          <Tabs
            tabItemContainerStyle={{position: "fixed", bottom:"0"}}
            variant="scrollable"
            scrollButtons
            value={props.currentTab}
            onChange={handleChange}
            aria-label="abas"
            allowScrollButtonsMobile>
            {props.tabsToRender.map((tr) => 
              <Tab label={tr.label} {...a11yProps(tr.index)} disabled={tr.disabled} />
            )}
          </Tabs>
        </Paper>
      </AppBar>

      {props.tabsToRender.map((tr) => 
        <TabPanel value={props.currentTab} index={tr.index}>
          {tr.component}
        </TabPanel>
      )}
    </div>
  );
}
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OverallMarket from './OverallMarket';
import StockGraph from './StockGraph';

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overall Market" {...a11yProps(0)} />
          <Tab label="S&P 500 index (SPY)" {...a11yProps(1)} />
          <Tab label="Nasdaq-100 Index (QQQ)" {...a11yProps(2)} />
          <Tab label="Dow Jones Average (DIA)" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OverallMarket />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StockGraph stock="SPY" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StockGraph stock="QQQ" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <StockGraph stock="DIA" />
      </TabPanel>
    </Box>
  );
}

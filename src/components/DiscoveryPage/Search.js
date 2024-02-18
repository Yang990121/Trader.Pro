import React, {useState} from 'react';
import { Card } from "@material-ui/core/";
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import axios from "axios";
import DiscoverApp from './DiscoverApp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LineChart from './LineChart';
import BarChart from './BarChart';
import "./DiscoveryPage.css";
import BuyPage from './BuyPage';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const LineChartCard = ({ pastDataPeriod, stockInfo, duration }) => {
    return (
        <Grid
        item
        xs={100}
        sm={100}
        
        style={{ minHeight: "350px" }}
        >
        <LineChart
            pastDataPeriod={pastDataPeriod}
            stockInfo={stockInfo}
            duration={duration}
        />
        </Grid>
    );
};

const BarChartCard = ({ pastDataPeriod, stockInfo, duration }) => {
    return (
      <Grid  
      item
      xs={100}
      sm={100}

      style={{ minHeight: "350px" }}>
        <BarChart 
            pastDataPeriod={pastDataPeriod}
            stockInfo={stockInfo}
            duration={duration} />
      </Grid>
    );
  };

function Search() {
    
    const [stockSearch, setStockSearch] = useState("");
    const [stockData, setStockData] = useState({});
    const [stockPrice, setStockPrice] = useState ({});
    const [stockCompany, setStockCompany] = useState ({});
    const [stockLogo, setStockLogo] = useState ({});

    const [openBuy, setBuy] = useState(false);
    
    function searchForStock(event) {
        // Setting up the correct API call
        var urlFront = "https://cloud.iexapis.com/stable/stock/";
        const apiKey = "pk_355f42cace3c407abd220a5746c91f93";
        var urlBack = `/quote?token=${apiKey}`;
        var url = urlFront + stockSearch + urlBack;

        axios.get(url).then(function(response){
            //Success
            setStockData(response.data)
        }).catch(function (error){
            //Error
            console.log(error);
        })

        var urlFront2 = 'https://cloud.iexapis.com/stable/stock/';
        var urlBack2 = `/chart/1m?token=${apiKey}`;
        var urlPrice = urlFront2 + stockSearch + urlBack2;
        
        axios.get(urlPrice).then(function(response){
            //Success
            setStockPrice(response.data)
        }).catch(function (error){
            //Error
            console.log(error);
        })

        var urlFront3 = 'https://cloud.iexapis.com/stable/stock/';
        var urlBack3 = `/company?token=${apiKey}`;
        var urlCompany = urlFront3 + stockSearch + urlBack3;
        
        axios.get(urlCompany).then(function(response){
            //Success
            setStockCompany(response.data)
        }).catch(function (error){
            //Error
            console.log(error);
        })

        var urlFront4 = 'https://cloud.iexapis.com/stable/stock/';
        var urlBack4 = `/logo?token=${apiKey}`;
        var urlLogo = urlFront4 + stockSearch + urlBack4;
        
        axios.get(urlLogo).then(function(response){
            //Success
            setStockLogo(response.data)
        }).catch(function (error){
            //Error
            console.log(error);
        })
    }

    return (
        <div>
            <Grid container spacing={0}>
                <TextField fullWidth label="Search for a Stock" id="Stock Search" 
                    onChange={event => setStockSearch(event.target.value)}/>
            </Grid>
            <br />
            <Grid container spacing={0} justify="center">
                <Button 
                    variant="contained" 
                    onClick={event => searchForStock(event)}>
                        Search
                </Button>
            </Grid>
            <br />
            <Grid container spacing={0}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs ={12}>
                        {JSON.stringify(stockData) != "{}" ? 
                        <Item>
                            <h1 className='StockName'>{stockData.companyName}</h1>
                            <p>{stockCompany.description}</p>
                        </Item> : null }
                    </Grid>
                    <Grid item xs={8}>
                        {JSON.stringify(stockData) != "{}" ? 
                            <Item>
                            <div>
                            <LineChartCard
                            pastDataPeriod={stockPrice}
                            stockInfo={stockData}
                            duration={"1 month"}
                            />
                            <p>Adjusted closing stock price of {stockData.symbol} over the past 1 month</p>
                            </div>
                            </Item>: null}
                    </Grid>
                    <Grid item xs={4}>
                    
                    {JSON.stringify(stockData) != "{}" ? 
                        <Item>
                        <div>
                            <h1><strong>Ticker: </strong>{stockData.symbol}</h1>
                            <h3 className='Description'><strong>Latest Price: </strong>${stockData.latestPrice}<br/></h3>
                            <h3 className='Description'><strong>Previous CLose: </strong>${stockData.previousClose}<br/></h3>
                            <h3 className='Description'><strong>Percent Change: </strong>{stockData.changePercent}%<br/></h3>
                            <h3 className='Description'><strong>Market Cap: </strong>${stockData.marketCap}<br/></h3>
                            <h3 className='Description'><strong>YTD Change: </strong>{stockData.ytdChange}%<br/></h3>
                            <h3 className='Description'><strong>Price to Equity Rtio: </strong>{stockData.peRatio}%<br/></h3>
                            <h3 className='Description'><strong>52 week high: </strong>{stockData.week52High}<br/></h3>
                            <h3 className='Description'><strong>52 week low: </strong>{stockData.week52Low}<br/> </h3>
                        </div>
                        </Item>: null}
                    
                    </Grid>
                    <Grid item xs={4}>
                    
                        {JSON.stringify(stockData) != "{}" ? 
                            <Item>
                            <div>
                                <br />
                                <br />
                                <h2>Your Cash Balance</h2>
                                <h3>$100,000</h3>
                                <h3>can or cannot buy</h3>
                                <h3>if can, can buy how many, if cannot, need how much cash to buy</h3>
                                <br />
                                
                                <Button 
                                variant="contained" 
                                startIcon={<AttachMoneyIcon />} 
                                onClick={() => setBuy(true)}
                                style={{
                                    maxWidth: '500px', 
                                    maxHeight: '200px', 
                                    minWidth: '100px', 
                                    minHeight: '70px'}} >
                                    Open Purchase <br />System
                                </Button>
                                <br />
                                <br />
                                <br />
                                <br />
                            </div>
                            </Item>: null}
                    </Grid>
                    <BuyPage open={openBuy}  onClose={() => setBuy(false)} stock={stockData}  />
                    <Grid item xs={8}>
                    
                        {JSON.stringify(stockData) != "{}" ? 
                            <Item>
                            <div>
                                <BarChartCard
                                pastDataPeriod={stockPrice}
                                stockInfo={stockData}
                                duration={"2 years"}
                        />
                        <p>Adjusted stock volume of {stockData.symbol} over the past 1 month</p>
                            </div>
                            </Item>: null}
                    
                    </Grid>
                </Grid>
            </Box>
            </Grid>
            </div>   
    );
}

export default Search;
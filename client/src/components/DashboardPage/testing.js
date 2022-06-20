
import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Template/Title";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import SellPage from "./SellPage";
import { requirePropFactory } from "@mui/material";
import CreateRow from "./createRow";
import styles from "./Holdings.css";
import config from "../config";




export default function Holdings() {
    const [openSell, setSell] = useState(false);
    const [sellStock, setSellStock] = useState("");
    const [sellQuantity, setQuantity] = useState(0);
    const [currentStocks, setCurrentStocks] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const { isAuthenticated, user } = useSelector((state) => state.auth); 
    const [stockArray, setStockArray] = useState([]); //stockdata from api
    const [currentStocksArray, setCurrentStocksArray] = useState([]); //stocks the user owns in arrayform
    
    const frontURL = config.URL

    //Finding user (for sell page)
    var userURL = "/api/users/find/";
    var userId = user.id;
    var finalURL = frontURL + userURL + String(userId)
    const apiKey = "pk_f5660ce6eae543f9a8a310836d368d8d";

   
    // function handleSell() {
    //     setSell(true);
    //     // setSellStock(stock);
    // }

    const handleSell = (stock, quantity) => {
        setSell(true);
        setSellStock(stock);
        setQuantity(quantity);

    }

    //Getting the list of stocks the user owns
  var stockOwnURL = "/api/users/stocksHeld/";
  var userId = user.id;
  var StocksHeldURL = frontURL + stockOwnURL + String(userId);

  useEffect(() => {
    getStockheldData();
    

    for (let i = 0; i < currentStocks.length; i++) {
      currentStocksArray.push(currentStocks[i]);
    }
  
    
  
  
  //Ticker Strings
  var tickerStrings = "";
  
  for (let i = 0; i < currentStocksArray.length; i++) {
    if (currentStocksArray[i] !== undefined) {
      if (i !== currentStocksArray.length - 1) {
      tickerStrings = tickerStrings + currentStocksArray[i].ticker + ",";
      } else {
      tickerStrings = tickerStrings + currentStocksArray[i].ticker;
      }
  }
  }
  
  console.log("Ticker Strings", tickerStrings);
  
  
    gettingPricesfromAPI(tickerStrings);
    
  }, []);

  const getStockheldData = async () => {
    try {
      const response = await axios.get(StocksHeldURL);
      setCurrentStocks(response.data);
    } catch (e) {
      console.log(e);
    }

  }

  const gettingPricesfromAPI = async (tickerStrings) => {
    try {
      const response = await axios.get(
        `https://cloud.iexapis.com/v1/stock/market/batch?&types=quote&symbols=${tickerStrings}&token=${apiKey}`
      );
      setStockArray(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  
  

  
 




// for (const [key,value] i < stockArray.length; i++) {
//   if (stockArray[i] !== undefined) {
//     latestPriceDict[stockArray[i].quote.symbol] = stockArray[i].quote.latestPrice;
//   }
// }

console.log(stockArray, "stockArray");
console.log(currentStocksArray, "currentStocksArray");

const latestPriceDict = {}

for (const [key, value] of Object.entries(stockArray)) {
  latestPriceDict[key] = value.quote.latestPrice;
}



  //Row making function
  function createData(
    id,
    ticker,
    name,
    quantity,
    pricePurchase,
    totalPurchase,
    priceCurrent,
    priceTotal,
    difference
  ) {
    return {
      id,
      ticker,
      name,
      quantity,
      pricePurchase,
      totalPurchase,
      priceCurrent,
      priceTotal,
      difference,
    };
  }

  //Final row to be mapped
  


    


 
return (
    <React.Fragment>
   
      <Title>Stocks in your Portfolio</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Company Ticker</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price of Purchase</TableCell>
            <TableCell>Purchase Total</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Current Total</TableCell>
            <TableCell align="right">Difference</TableCell>
            <TableCell align="right">Sell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {currentStocksArray.map((row) => {

            const currentPrice = latestPriceDict[row.ticker];
  
            const difference =
                (((currentPrice - row.price) / currentPrice) * 100 ).toFixed(1) + "%";
              const purchaseTotal =
                Number(row.quantity) * Number(row.price);
              const currentTotal =
                Number(row.quantity) * Number(currentPrice);
    
            return (
                <TableRow key={row.id}>
              <TableCell>{row.ticker}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{`$${row.price}`}</TableCell>
              <TableCell>{`$${purchaseTotal}`}</TableCell>
              <TableCell align="right">{`$${currentPrice}`}</TableCell>
              <TableCell align="right">{`$${currentTotal}`}</TableCell>
              <TableCell align="right"
              className= {difference > 0 ? styles.positive : styles.negative}
              >{difference}</TableCell>
              <TableCell align="right">
                <Button 
                    variant="outlined" 
                    startIcon={<AttachMoneyIcon />} 
                    onClick={() => handleSell(row.ticker, row.quantity)} >
                        Sell
                    </Button>
                   
                    
              </TableCell>
              <SellPage open={openSell} onClose={() => setSell(false)} stock={sellStock} quantity={sellQuantity} user={currentUser[0]} stocksHeld={currentStocks} price={currentPrice}/>
            </TableRow>
            )
            
          })}
        </TableBody>
      </Table>
      <br />
      <Typography color="textSecondary" align="center">
        {new Date().toDateString()}
      </Typography>
      
    </React.Fragment>
  );
}
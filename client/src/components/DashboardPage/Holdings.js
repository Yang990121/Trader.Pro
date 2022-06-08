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




export default function Holdings() {
    const [openSell, setSell] = useState(false);
    const [sellStock, setSellStock] = useState("");
    const [sellQuantity, setQuantity] = useState(0);
    const [currentStocks, setCurrentStocks] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const { isAuthenticated, user } = useSelector((state) => state.auth); 
    const [stockArray, setStockArray] = useState([]);
    
    //Finding user (for sell page)
    var userURL = "http://localhost:3001/api/users/find/";
    var userId = user.id;
    var finalURL = userURL + String(userId)

    useEffect(() => {
        axios.get(finalURL).then((response) => {
            setCurrentUser(response.data)
        });
    }, []);

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
  var stockOwnURL = "http://localhost:3001/api/users/stocksHeld/";
  var userId = user.id;
  var StocksHeldURL = stockOwnURL + String(userId);

  useEffect(() => {
    axios.get(StocksHeldURL).then((response) => {
      setCurrentStocks(response.data);
    });
  }, []);

  


 

  console.log(tickerStrings);

  //Getting the price

var currentStocksArray = [];

for (let i = 0; i < currentStocks.length; i++) {
  currentStocksArray.push(currentStocks[i].ticker);
}

console.log("currentStocksArray", currentStocksArray);

//Ticker Strings
var tickerStrings = "";

for (let i = 0; i < currentStocksArray.length; i++) {
  if (currentStocksArray[i] !== undefined) {
    if (i !== currentStocksArray.length - 1) {
    tickerStrings = tickerStrings + currentStocksArray[i] + ",";
    } else {
    tickerStrings = tickerStrings + currentStocksArray[i];
    }
}
}
 //Getting price 
       useEffect(() => {
        const apiKey = "pk_d22d5d82426140a09dd84403c55267f6";
        var url = `https://cloud.iexapis.com/v1/stock/market/batch?&types=quote&symbols=${tickerStrings}&token=${apiKey}`      
     axios
      .get(url)
      .then((response) => setStockArray(response.data))
      .catch((error) => console.log(error));
    }, []);



console.log("stockArray",stockArray)

for (let i = 0; i < currentStocksArray.length; i++) {
  if (currentStocksArray[i] !== undefined) {
    currentStocks[i]["latestPrice"] = stockArray[currentStocksArray[i]].quote.latestPrice;
  }
}




console.log("currentStocks", currentStocks);

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
  
//   console.log(currentStocksArray.map((stock) => {return Testing(stock.ticker)}))

    
  

    

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
        {currentStocks.map((row) => {
          
            const purchaseTotal = row.price * row.quantity;
    
            return (
                <TableRow key={row.id}>
              <TableCell>{row.ticker}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{`$${row.price}`}</TableCell>
              <TableCell>{`$${row.price * row.quantity}`}</TableCell>
              <TableCell align="right">{`$${row.latestPrice}`}</TableCell>
              <TableCell align="right">{`$${row.latestPrice * row.quantity}`}</TableCell>
              <TableCell align="right">{row.difference}</TableCell>
              <TableCell align="right">
                <Button 
                    variant="outlined" 
                    startIcon={<AttachMoneyIcon />} 
                    onClick={() => handleSell(row.ticker, row.quantity)} >
                        Sell
                    </Button>
                   
                    
              </TableCell>
              <SellPage open={openSell} onClose={() => setSell(false)} stock={sellStock} quantity={sellQuantity} user={currentUser[0]} stocksHeld={currentStocks}/>
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

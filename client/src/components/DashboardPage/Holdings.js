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


//Getting the price
function Testing (ticker) {
    const [testing, setTesting] = useState(0);
       useEffect(() => {
           var urlFront = "https://cloud.iexapis.com/stable/stock/";
           const apiKey = "pk_5f92cca7a5214c9d8bc554e9b1c04bdd";
           var urlBack = `/quote?token=${apiKey}`;
           var url = urlFront + ticker + urlBack;
     axios
      .get(url)
      .then((response) => setTesting(response.data.latestPrice))
      .catch((error) => console.log(error));
    }, []);
    return testing
}





export default function Holdings() {
    const [openSell, setSell] = useState(false);
    const [sellStock, setSellStock] = useState("");
    const [sellQuantity, setQuantity] = useState(0);
    const [currentStocks, setCurrentStocks] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const { isAuthenticated, user } = useSelector((state) => state.auth); 
    
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

  
  var currentStocksArray = [];

  for (let i = 0; i < currentStocks.length; i++) {
    currentStocksArray.push(currentStocks[i]);
  }

  console.log(currentStocksArray);

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

    
  

    
  console.log(Testing("AAPL"))

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
          
            const purchaseTotal = row.price * row.quantity;
    
            return (
                <TableRow key={row.id}>
              <TableCell>{row.ticker}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{`$${row.price}`}</TableCell>
              <TableCell>{`$${row.price * row.quantity}`}</TableCell>
              <TableCell align="right">{`0`}</TableCell>
              <TableCell align="right">{`$${row.priceTotal}`}</TableCell>
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

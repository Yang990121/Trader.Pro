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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Button from "@mui/material/Button";
import SellPage from "./SellPage";
import { requirePropFactory } from "@mui/material";
import CreateRow from "./createRow";
import styles from "./Holdings.css";
import config from "../config";

export default function Holdings() {
  const [openSell, setSell] = useState(false);
  const [sellStock, setSellStock] = useState("");
  const [sellQuantity, setQuantity] = useState(0);
  const [HeldStocks, setHeldStocks] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [stockArray, setStockArray] = useState([]);
  const [tickerStrings, setTickerStrings] = useState("");

  const frontURL = config.URL

  //Finding user (for sell page)
  var userURL = "/api/users/find/";
  var userId = user.id;
  var finalURL = frontURL + userURL + String(userId);

  //Finding Stocks Held
  var stockOwnURL = "/api/users/stocksHeld/";
  var userId = user.id;
  var StocksHeldURL = frontURL + stockOwnURL + String(userId);

  useEffect(() => {
    axios.get(finalURL).then((response) => {
      setCurrentUser(response.data);
      // console.log(currentUser, "CurrentUser");
    });
    axios.get(StocksHeldURL).then((response) => {
      setHeldStocks(response.data);
      // console.log(HeldStocks, "HeldStocks");
    });
  }, []);

  useEffect(() => {
    gettingStockData();
  }, [HeldStocks]);

  // function handleSell() {
  //     setSell(true);
  //     // setSellStock(stock);
  // }

  const handleSell = (stock, quantity) => {
    setSell(true);
    setSellStock(stock);
    setQuantity(quantity);
  };

  //Getting the list of stocks the user owns (used in 2nd useEffect())

  // console.log("Held Stocks", HeldStocks);

  const gettingStockData = () => {
    var HeldStocksArray = [];

    for (let i = 0; i < HeldStocks.length; i++) {
      HeldStocksArray.push(HeldStocks[i]);
    }

    //Ticker Strings
    var temp = "";

    // console.log("Held Stocks Array", HeldStocksArray);

    for (let i = 0; i < HeldStocksArray.length; i++) {
      if (HeldStocksArray[i] !== undefined) {
        if (i !== HeldStocksArray.length - 1) {
          temp = temp + HeldStocksArray[i].ticker + ",";
        } else {
          temp = temp + HeldStocksArray[i].ticker;
        }
      }
    }

    // console.log("temp", temp);

    //Getting the stock data
    const apiKey = "pk_f8539e97b6d244ec887bd39171f7ba89";
    var url = `https://cloud.iexapis.com/v1/stock/market/batch?&types=quote&symbols=${temp}&token=${apiKey}`;
    axios
      .get(url)
      .then((response) => setStockArray(response.data))
      .catch((error) => console.log(error));

    // console.log(stockArray, "stockArray");
  };


 

  //Moving stock data into HeldStocksArray
  var HeldStocksArray = [];

  for (let i = 0; i < HeldStocks.length; i++) {
    if (HeldStocks[i].quantity > 0) {
    HeldStocksArray.push(HeldStocks[i]);
  }
}

  const latestPriceDict = {};

  for (const [key, value] of Object.entries(stockArray)) {
    latestPriceDict[key] = value.quote.latestPrice;
  }

  //Row making function
  // function createData(
  //   id,
  //   ticker,
  //   name,
  //   quantity,
  //   pricePurchase,
  //   totalPurchase,
  //   priceCurrent,
  //   priceTotal,
  //   difference
  // ) {
  //   return {
  //     id,
  //     ticker,
  //     name,
  //     quantity,
  //     pricePurchase,
  //     totalPurchase,
  //     priceCurrent,
  //     priceTotal,
  //     difference,
  //   };
  // }

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
            <TableCell align ="center">Sell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {HeldStocksArray.map((row) => {
            const currentPrice = latestPriceDict[row.ticker];
            {/* console.log(currentPrice, "currentPrice"); */}

            const difference = (
              ((currentPrice - row.price) / currentPrice) *
              100
            ).toFixed(2);
            const purchaseTotal = (Number(row.quantity) * Number(row.price)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const currentTotal = (Number(row.quantity) * Number(currentPrice)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            return (
              <TableRow key={row.id}>
                <TableCell>{row.ticker}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{`$${row.price.toFixed(2)}`}</TableCell>
                <TableCell>{`$${purchaseTotal}`}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: difference > 0 ? "green" : "red" }}
                >{`$${(currentPrice ?? 0 ).toFixed(2)}`}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: difference > 0 ? "green" : "red" }}
                >{`$${currentTotal}`}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: difference > 0 ? "green" : "red" }}
                >{difference >= 0 ? "▲" : "▼"}{" "}
                 {difference + "%"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    startIcon={<AttachMoneyIcon />}
                    onClick={() => handleSell(row.ticker, row.quantity)}
                  >
                    Sell
                  </Button>
                  <SellPage
                  open={openSell}
                  onClose={() => setSell(false)}
                  stock={sellStock}
                  quantity={sellQuantity}
                  user={currentUser[0]}
                  stocksHeld={HeldStocks}
                  price={latestPriceDict[sellStock]}
                />
                </TableCell>
                
              </TableRow>
            );
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

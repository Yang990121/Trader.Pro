import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Template/Title";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

console.log(config, "config");
console.log(config.URL, "config.base_url");

function preventDefault(event) {
	event.preventDefault();
}

export default function Balance() {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const [currentUser, setCurrentUser] = useState({});
	const [HeldStocks, setHeldStocks] = useState({});
	const [stockArray, setStockArray] = useState([]);
	const [portfolioValue, setPortfolioValue] = useState(0);
	const [currentCashBalance, setCurrentCashBalance] = useState(0);

	const frontURL = config.URL

	 //Finding user (for sell page)
	 var userURL = "/api/users/find/";
	 var userId = user.id;
	 var finalURL = frontURL + userURL + String(userId);
	 console.log(finalURL, "finalURL");
	 //Finding Stocks Held
	 var stockOwnURL = "/api/users/stocksHeld/";
	 
	 var StocksHeldURL = frontURL + stockOwnURL + String(userId);
   
	 useEffect(() => {
	   axios.get(finalURL).then((response) => {
		 setCurrentUser(response.data);
		 console.log(currentUser, "CurrentUser");
	   });
	   axios.get(StocksHeldURL).then((response) => {
		 setHeldStocks(response.data);
		 console.log(HeldStocks, "HeldStocks");
	   });
	 }, []);
   
	 useEffect(() => {
	   gettingStockData();
	   gettingCashValue();
	 }, [currentUser]);

	 const gettingCashValue = () => {
		for (const [key, value] of Object.entries(currentUser)) {
			console.log(value.cashBalance, "value")
			setCurrentCashBalance(value.cashBalance);
		}
	}
		 


	 const gettingStockData = () => {
		var HeldStocksArray = [];
	
		for (let i = 0; i < HeldStocks.length; i++) {
		  HeldStocksArray.push(HeldStocks[i]);
		}
	
		//Ticker Strings
		var temp = "";
	
		console.log("Held Stocks Array", HeldStocksArray);
	
		for (let i = 0; i < HeldStocksArray.length; i++) {
		  if (HeldStocksArray[i] !== undefined) {
			if (i !== HeldStocksArray.length - 1) {
			  temp = temp + HeldStocksArray[i].ticker + ",";
			} else {
			  temp = temp + HeldStocksArray[i].ticker;
			}
		  }
		}
	
		
		console.log("temp", temp);
	
		//Getting the stock data
		const apiKey = "pk_795ba2f0a021470285d1b51929de7097";
		var url = `https://cloud.iexapis.com/v1/stock/market/batch?&types=quote&symbols=${temp}&token=${apiKey}`;
		axios
		  .get(url)
		  .then((response) => setStockArray(response.data))
		  .catch((error) => console.log(error));
	
		console.log(stockArray, "stockArray");
	  };

	  useEffect(() => {
		gettingPortfolioValue();
		console.log("Last Use effect runs!")
	  }, [stockArray]);

const gettingPortfolioValue = () => {
  var HeldStocksArray = [];


  for (let i = 0; i < HeldStocks.length; i++) {
    if (HeldStocks[i].quantity > 0) {
    HeldStocksArray.push(HeldStocks[i]);
  }
}



console.log(HeldStocksArray, "HeldStocksArray");
console.log(stockArray, "stockArray");
//StockArray (which contains latest data) is a dictionary


	  var currentPortfolioBalance = 0;

	  for (const [key, value] of Object.entries(stockArray)) {
		  for (let i = 0; i < HeldStocksArray.length; i++) {
			if (HeldStocksArray[i].ticker === value.quote.symbol) {
				
				currentPortfolioBalance = currentPortfolioBalance + (value.quote.latestPrice * HeldStocksArray[i].quantity);
				
				break;
		}
	  }
	}
	  
	  setPortfolioValue(currentPortfolioBalance);
	
}
console.log("Current User", currentUser)
console.log("Portfolio Value", portfolioValue)
const totalValue = currentCashBalance + portfolioValue

	return (
		<React.Fragment>
			<Title>Current Balance</Title>
			<div>
				<Typography variant="h5" color="textSecondary" align="center">
					Cash Balance:
				</Typography>

				<Typography component="p" variant="h4" align="center">
					${(currentCashBalance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				</Typography>
				<br />
				<Typography variant="h5" color="textSecondary" align="center">
					Portfolio Balance:
				</Typography>
				<Typography
					component="p"
					variant="h4"
					align="center"
				>
					${(portfolioValue).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				</Typography>
				<br />
				<Typography variant="h5" color="textSecondary" align="center">
					Total:
				</Typography>
				<Typography
					component="p"
					variant="h4"
					align="center"
					style={{ color: totalValue > 100000 ? "green" : (totalValue < 100000 ? "red" : "black") }}
				>
					${(totalValue).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				</Typography>
			</div>
		</React.Fragment>
	);
}

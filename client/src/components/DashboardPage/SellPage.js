import React from "react";
import { useState , useEffect} from "react";
import Axios from "axios";
import "./SellPage.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ConfirmPage from "./ConfirmPage";
import config from "../config.json";



const SellPage = ({ open, onClose, stock , quantity , user, stocksHeld, price }) => {
    const [amount, setAmount] = useState(1);
    const [confirm, setConfirm] = useState(false);

    
    const [stockData, setStockData] = useState({});

    const frontURL = config.URL;
    
    
    

    //Price not specific to the ticker, pass in would be a better idea
    // useEffect(() => {
    //     var urlFront = "https://cloud.iexapis.com/stable/stock/";
    //     const apiKey = "pk_f5660ce6eae543f9a8a310836d368d8d";
    //     var urlBack = `/quote?token=${apiKey}`;
    //     var url = urlFront + stock + urlBack;
    //     Axios
    //         .get(url)
    //         .then((response) => setStockData(response.data))
    //         .catch((error) => console.log(error));
    // }, []);
    // console.log(stockData)
    // console.log(stockData.latestPrice)
    // const price = stockData.latestPrice
    // console.log(price)

  const changeAmount = (event) => {
    setAmount(event.target.value);
  };

  // console.log("StocksHeld on sellPage", stocksHeld)
  //Connecting to the backend
  let amountHeld;
  let currentStockID;
  for (var i = 0; i < stocksHeld.length; i++) {
    if (stocksHeld[i].ticker === stock) {
        amountHeld = stocksHeld[i].quantity;
        currentStockID = stocksHeld[i]._id;
    }
}



const updateBalance = () => {
    // console.log(user)
    // console.log(user._id)
    // console.log(user.cashBalance)
    const updateBalanceURL = frontURL + "/api/users/updateBalance/";

    Axios.put(updateBalanceURL , {
      userId: user._id,
      newCashBalance: user.cashBalance + price * amount,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

const sellStock = () => {
    const newQuantity = parseInt(amountHeld) - parseInt(amount)
    const sellStockURL = frontURL + "/api/users/changeStock/";
    
    Axios.put(sellStockURL, {
        userId: String(currentStockID), //stock's id
        price: price,
        quantity: newQuantity,
        ticker: String(stock),
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
}




const handleClick = () => {
    if (amountHeld >= amount) {
        // updateBalance();
        //  sellStock();
        //window.location.reload();

    } else {
        alert("You don't have enough stocks to sell");
    }
}

// console.log("Price on sell page", price)
  
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">

      <div
        className="modalContainer"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
     
        <img
          src="https://m.foolcdn.com/media/dubs/images/Intro_slide_-_digital_stock_chart_going_up_-_s.width-700.jpg"
          alt="/"
        />
        <div className="modalRight">
        
          <p className="closeBtn" onClick={onClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </p>
          <div className="content">
            <h2>Sell {stock} Stock</h2>
            <TextField
              disabled
              id="outlined-disabled"
              label="Stock Name"
              defaultValue={stock}
            />
            <br />
            <TextField
              disabled
              id="outlined-disabled"
              label="Stock Price"
              defaultValue={price}
            />
    

            <br />
            <TextField
              required
              id="outlined-required"
              label="Quantity"
              onChange={changeAmount}
            />
            <p>Total = {(amount * price).toFixed(2)}</p>
            <p>
            {" "}
              {amountHeld - amount >= 0
                ? "Cash Balance after purchase: $" +
                  String(((user.cashBalance ?? 0) + amount * price).toFixed(2))
                : "Insufficient Quantity"}{" "}
            
             </p>
            <Button variant="contained" startIcon={<AttachMoneyIcon />} onClick={()=> setConfirm(true)} >
              Sell Stock
            </Button>
            {/* onClick={handleClick} */}
            <br />
          </div>
        </div>
      </div>
      <ConfirmPage open={confirm} onClose={() => setConfirm(false)} stock={stock} quantity ={quantity} user = {user} stocksHeld = {stocksHeld} amount = {amount} price={price}/>
    </div>
  );
};

export default SellPage;

import React from "react";
import { useState, useEffect } from "react";
import "./DiscoveryPage.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { getUser, updateStock } from "../services/userService";
import Axios from "axios";
import ConfirmPage from "./ConfirmPage";
import config from "../config.json";

const BuyPage = ({ open, onClose, stock, user, stocksHeld, index }) => {
  const [confirm, setConfirm] = useState(false);
  const [amount, setAmount] = useState(1);
  const [balance, setBalance] = useState(0);

  const frontURL = config.URL

  console.log(index, "index")
  
  const changeAmount = (event) => {
    setAmount(event.target.value);
  };

  const addStock = () => {
    console.log("This is the index" + index);
    const updateStockURL = frontURL + "/api/users/updateStock/";
    if (user.cashBalance - stock.latestPrice * amount > 0) {
      if (index < 0) {
        console.log(user);
        console.log(user._id);
        console.log(user.cashBalance);
        Axios.post(updateStockURL, {
          userId: user._id,
          ticker: stock.symbol,
          quantity: amount,
          price: stock.latestPrice,
        })

          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const changeStockURL = frontURL + "/api/users/changeStock/";
        const prevPrice = stocksHeld[index].price;
        const prevQuantity = stocksHeld[index].quantity;
        const newQuantity = parseInt(prevQuantity) + parseInt(amount);
        const newPrice =
          (prevPrice * prevQuantity + stock.latestPrice * amount) / newQuantity;
        console.log("Prev Price: " + prevPrice);
        console.log("Prev Quantity: " + prevQuantity);
        console.log("New Quantity: " + newQuantity);
        console.log("New Price: " + newPrice);
        Axios.put(changeStockURL, {
          userId: String(stocksHeld[index]._id), //id given to the stock not userId
          price: newPrice,
          quantity: newQuantity,
          ticker: String(stock.symbol),
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const updateBalance = () => {
    const updateBalanceURL = frontURL + "/api/users/updateBalance/";
    Axios.put(updateBalanceURL , {
      userId: user._id,
      newCashBalance: user.cashBalance - stock.latestPrice * amount,
      
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    addStock();
    updateBalance();
    console.log(stocksHeld);
    console.log(stocksHeld[0].price);
    window.location.reload();
  };

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
            <CloseIcon
              sx={{
                fontSize: 30,
              }}
            />{" "}
          </p>{" "}
          <div className="content">
            <h2>
              {" "}
              Purchase {stock.symbol + " "}
               Stock{" "}
            </h2>{" "}
            <TextField
              disabled
              id="outlined-disabled"
              label="Stock Name"
              defaultValue={stock.companyName}
            />{" "}
            <br />
            <TextField
              disabled
              id="outlined-disabled"
              label="Stock Price"
              defaultValue={stock.latestPrice.toFixed(2)}
            />{" "}
            <br />
            <TextField
              required
              id="outlined-required"
              label="Quantity"
              onChange={changeAmount}
            />{" "}
            <p> Total = {(amount * stock.latestPrice).toFixed(2)} </p>{" "}
            <p>
              {" "}
              {user.cashBalance - amount * stock.latestPrice >= 0
                ? "Cash Balance after purchase: $" +
                  String((user.cashBalance - amount * stock.latestPrice).toFixed(2))
                : "Insufficient Funds"}{" "}
            </p>{" "}
            <Button
              variant="contained"
              startIcon={<AttachMoneyIcon />}
              onClick={() => setConfirm(true)}
            >
             {/* onClick={handleClick} */}
              Buy Stock{" "}
            </Button>{" "}
            <br />
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <ConfirmPage open={confirm} onClose={() => setConfirm(false)}  stock={stock}  user={user} stocksHeld={stocksHeld} index={index} amount={amount}/>
    </div>
  );
};

export default BuyPage;

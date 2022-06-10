import React from "react";
import { useState , useEffect} from "react";
import Axios from "axios";
import "./DiscoveryPage.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

//BUY CONFIRMATION PAGE

const ConfirmPage = ({ open, onClose, stock, user, stocksHeld, index, amount}) => {

    const [confirm, setConfirm] = useState(false);
  
  const [balance, setBalance] = useState(0);

  

  const addStock = () => {
    console.log("This is the index" + index);
    if (user.cashBalance - stock.latestPrice * amount > 0) {
      if (index < 0) {
        console.log(user);
        console.log(user._id);
        console.log(user.cashBalance);
        Axios.post("http://localhost:3001/api/users/updateStock", {
          userId: user._id,
          ticker: stock.symbol,
          quantity: amount,
          price: stock.latestPrice,
          latestPrice: stock.latestPrice
        })

          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const prevPrice = stocksHeld[index].price;
        const prevQuantity = stocksHeld[index].quantity;
        const newQuantity = parseInt(prevQuantity) + parseInt(amount);
        const newPrice =
          (prevPrice * prevQuantity + stock.latestPrice * amount) / newQuantity;
        console.log("Prev Price: " + prevPrice);
        console.log("Prev Quantity: " + prevQuantity);
        console.log("New Quantity: " + newQuantity);
        console.log("New Price: " + newPrice);
        Axios.put("http://localhost:3001/api/users/changeStock", {
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
    Axios.put("http://localhost:3001/api/users/updateBalance", {
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
    if (user.cashBalance - stock.latestPrice * amount > 0) {

    addStock();
    updateBalance();
    console.log(stocksHeld);
    console.log(stocksHeld[0].price);
   window.location.reload();
  } else {
    alert("You do not have enough money to buy this stock");
    }
}


  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        className="modalContainer"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="modalRight">
        
          <p className="closeBtn" onClick={onClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </p>
          <div className="content">

            <h2>Confirmation Page</h2>
            <h3>You are buying {stock.symbol}</h3> {' '}
            <h3>At ${stock.latestPrice} per stock</h3>
            <h3>Are you sure you want to buy this stock?</h3>
            <br />
            <Button variant="contained" startIcon={<AttachMoneyIcon />} onClick={handleClick} >
              Confirm Buy
            </Button>
            
            <br />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ConfirmPage;

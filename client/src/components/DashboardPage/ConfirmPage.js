import React from "react";
import { useState , useEffect} from "react";
import Axios from "axios";
import "./SellPage.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

//SELL CONFIRMATION PAGE



const ConfirmPage = ({ open, onClose, stock, quantity , user, stocksHeld, amount, price}) => {

    
    const [confirm, setConfirm] = useState(false);

    




  console.log(stocksHeld)
  //Connecting to the backend
  let amountHeld;
  let currentStockID;
  for (var i = 0; i < stocksHeld.length; i++) {
    if (stocksHeld[i].ticker === stock) {
        amountHeld = stocksHeld[i].quantity;
        currentStockID = stocksHeld[i]._id;
    }
}

  

    console.log(user.cashBalance, "cashBalance")
    console.log(amount, "amount")
    console.log(price, "price")
    

const updateBalance = () => {
    

    Axios.put("http://localhost:3001/api/users/updateBalance", {
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
    
    
    Axios.put("http://localhost:3001/api/users/changeStock", {
        userId: String(currentStockID), //stock's id
        price: price,
        quantity: newQuantity,
        ticker: String(stock),
        latestPrice: price
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
        updateBalance();
         sellStock();
        window.location.reload();

    } else {
        alert("You don't have enough stocks to sell");
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
            <h3>You are selling {stock}</h3> {' '}
            <h3>Are you sure you want to sell this stock?</h3>
            <br />
            <Button variant="contained" startIcon={<AttachMoneyIcon />} onClick={handleClick}>
              Confirm Sale
            </Button>
            
            <br />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ConfirmPage;

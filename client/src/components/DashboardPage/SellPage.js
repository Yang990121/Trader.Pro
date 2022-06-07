import React from "react";
import { useState , useEffect} from "react";
import Axios from "axios";
import "./SellPage.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ConfirmPage from "./ConfirmPage";



const SellPage = ({ open, onClose, stock , quantity , user, stocksHeld }) => {
    const [amount, setAmount] = useState(1);
    const [confirm, setConfirm] = useState(false);

    const price = 100;
    // const [price, setPrice] = useState();   
    
    // useEffect(() => {
    //     var urlFront = "https://cloud.iexapis.com/stable/stock/";
    //     const apiKey = "pk_5f92cca7a5214c9d8bc554e9b1c04bdd";
    //     var urlBack = `/quote?token=${apiKey}`;
    //     var url = urlFront + stock + urlBack;
    //     Axios
    //         .get(url)
    //         .then((response) => setPrice(response.data.latestPrice))
    //         .catch((error) => console.log(error));
    // }, []);

  const changeAmount = (event) => {
    setAmount(event.target.value);
  };

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



const updateBalance = () => {
    console.log(user)
    console.log(user._id)
    console.log(user.cashBalance)

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
        price: 50,
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
        updateBalance();
         sellStock();
        //window.location.reload();

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
            <p>Total = {amount * price}</p>
            <p>Cash Balance after purchase: </p>
            <Button variant="contained" startIcon={<AttachMoneyIcon />} onClick={()=> setConfirm(true)} >
              Sell Stock
            </Button>
            {/* onClick={handleClick} */}
            <br />
          </div>
        </div>
      </div>
      <ConfirmPage open={confirm} onClose={() => setConfirm(false)} stock={stock} quantity ={quantity} user = {user} stocksHeld = {stocksHeld} amount = {amount} />
    </div>
  );
};

export default SellPage;
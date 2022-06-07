import React from "react";
import { useState , useEffect} from "react";
import axios from "axios";
import "./SellPage.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";



const SellPage = ({ open, onClose, stock , quantity }) => {
    const [amount, setAmount] = useState(1);

    const [price, setPrice] = useState();
    
    useEffect(() => {
        var urlFront = "https://cloud.iexapis.com/stable/stock/";
        const apiKey = "pk_5f92cca7a5214c9d8bc554e9b1c04bdd";
        var urlBack = `/quote?token=${apiKey}`;
        var url = urlFront + stock + urlBack;
        axios
            .get(url)
            .then((response) => setPrice(response.data.latestPrice))
            .catch((error) => console.log(error));
    }, []);

  const changeAmount = (event) => {
    setAmount(event.target.value);
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
              defaultValue={quantity}
              onChange={changeAmount}
            />
            <p>Total = {amount * price}</p>
            <p>Cash Balance after purchase: </p>
            <Button variant="contained" startIcon={<AttachMoneyIcon />}>
              Confirm Purchase
            </Button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;

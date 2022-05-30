import React from 'react';
import { useState } from 'react';
import "./DiscoveryPage.css";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const BuyPage = ({ open, onClose, stock} ) => {
    const [amount, setAmount] = useState(1)

    const changeAmount = event => {
        setAmount(event.target.value)
    }


    if (!open) return null;
    return (
    <div onClick={onClose} className='overlay'>
        <div className='modalContainer' onClick={(event) => {event.stopPropagation();}}>
            <img src="https://m.foolcdn.com/media/dubs/images/Intro_slide_-_digital_stock_chart_going_up_-_s.width-700.jpg" alt='/' />
            <div className='modalRight'>
                <p className='closeBtn' onClick={onClose}>
                <CloseIcon sx={{ fontSize: 30 }}/>
                </p>
                <div className='content'>
                <h2>Purchase {stock.symbol} Stock</h2>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Stock Name"
                    defaultValue={stock.companyName}
                />
                <br />
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Stock Price"
                    defaultValue={stock.latestPrice}
                />
                <br />
                <TextField
                    required
                    id="outlined-required"
                    label="Quantity"
                    defaultValue= {1}
                    onChange={changeAmount}
                    />
                <p>Total = {amount * stock.latestPrice}</p>
                <p>Cash Balance after purchase: </p>
                <Button variant="contained" startIcon={<AttachMoneyIcon />} >
                    Confirm Purchase
                </Button>
                <br />
                </div>
            </div>
        </div>
    </div>
    );
};

export default BuyPage;
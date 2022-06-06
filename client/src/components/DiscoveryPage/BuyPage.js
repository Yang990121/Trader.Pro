import React from 'react';
import {
    useState,
    useEffect
} from 'react';
import "./DiscoveryPage.css";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
    getUser
} from "../services/userService"
import Axios from 'axios';




const BuyPage = ({
    open,
    onClose,
    stock,
    user,
    stocksHeld,
    index,
}) => {




    const [amount, setAmount] = useState(1)
    const [balance, setBalance] = useState(0)




    const changeAmount = event => {
        setAmount(event.target.value)
    }

    const addStock = () => {
        console.log("This is the index" + index)
        if ((user.cashBalance - (stock.latestPrice * amount)) > 0) {
            if (index < 0) {
                console.log(user)
                console.log(user._id)
                console.log(user.cashBalance)
                Axios.post("http://localhost:3001/api/users/updateStock", {
                        userId: user._id,
                        ticker: (stock.symbol),
                        quantity: (amount),
                        price: (stock.latestPrice)
                    })

                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                const prevPrice = stocksHeld[index].price;
                const prevQuantity = stocksHeld[index].quantity;
                const newQuantity = parseInt(prevQuantity) + parseInt(amount);
                const newPrice = (prevPrice * prevQuantity + stock.latestPrice * amount) / newQuantity;
                console.log("Prev Price: " + prevPrice)
                console.log("Prev Quantity: " + prevQuantity)
                console.log("New Quantity: " + newQuantity)
                console.log("New Price: " + newPrice)
                Axios.put("http://localhost:3001/api/users/changeStock", {
                    userId: String(stocksHeld[index]._id),
                    price: newPrice,
                    quantity: newQuantity,
                    ticker: String(stock.symbol)
                })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }

    const updateBalance = () => {
        Axios.put("http://localhost:3001/api/users/updateBalance", {
                userId: user._id,
                newCashBalance: (user.cashBalance - (stock.latestPrice * amount))
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    

    const handleClick = () => {
        addStock()
        updateBalance()
        console.log(stocksHeld)
        console.log(stocksHeld[0].price)
    }



    if (!open) return null;
    return ( <
        div onClick = {
            onClose
        }
        className = 'overlay' >
        <
        div className = 'modalContainer'
        onClick = {
            (event) => {
                event.stopPropagation();
            }
        } >
        <
        img src = "https://m.foolcdn.com/media/dubs/images/Intro_slide_-_digital_stock_chart_going_up_-_s.width-700.jpg"
        alt = '/' / >
        <
        div className = 'modalRight' >
        <
        p className = 'closeBtn'
        onClick = {
            onClose
        } >
        <
        CloseIcon sx = {
            {
                fontSize: 30
            }
        }
        /> <
        /p> <
        div className = 'content' >
        <
        h2 > Purchase {
            stock.symbol
        }
        Stock < /h2> <
        TextField disabled id = "outlined-disabled"
        label = "Stock Name"
        defaultValue = {
            stock.companyName
        }
        /> <
        br / >
        <
        TextField disabled id = "outlined-disabled"
        label = "Stock Price"
        defaultValue = {
            stock.latestPrice
        }
        /> <
        br / >
        <
        TextField required id = "outlined-required"
        label = "Quantity"
        defaultValue = {
            1
        }
        onChange = {
            changeAmount
        }
        /> <
        p > Total = {
            amount * stock.latestPrice
        } < /p> <
        p > {
            user.cashBalance - amount * stock.latestPrice >= 0 ? "Cash Balance after purchase: $" + String(user.cashBalance - amount * stock.latestPrice) : "Insufficient Funds"
        } < /p> <
        Button variant = "contained"
        startIcon = {
            < AttachMoneyIcon / >
        }
        onClick = {
            handleClick
        } >
        Confirm Purchase <
        /Button> <
        br / >
        <
        /div> <
        /div> <
        /div> <
        /div>
    );
};

export default BuyPage;
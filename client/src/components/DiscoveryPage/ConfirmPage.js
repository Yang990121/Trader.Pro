import React from "react";
import { useState , useEffect} from "react";
import Axios from "axios";
import "./DiscoveryPage.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";



const ConfirmPage = ({ open, onClose, stock}) => {

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
            <Button variant="contained" startIcon={<AttachMoneyIcon />} >
              Confirm Buy
            </Button>
            {/* onClick={handleClick} */}
            <br />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ConfirmPage;

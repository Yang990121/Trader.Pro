import React, { useState , useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Title from "../../Template/Title";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "./Tabs";
import styles from "./StockInfo.css"

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export default function StockInfo(props) {
    const [stockData, setStockData] = useState({});
    useEffect(() => {
        var urlFront = "https://cloud.iexapis.com/stable/stock/";
        const apiKey = "pk_a78db42ce2414fe5a55dce3a1891af53";
        var urlBack = `/quote?token=${apiKey}`;
        var url = urlFront + props.stock + urlBack;
		axios
			.get(url)
			.then((response) => setStockData(response.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
            <h1>{props.stock}</h1>
			<h3>
				<strong>Latest Price: </strong>${stockData.latestPrice}
		
			</h3>
			<h3>
				<strong>Previous CLose: </strong>${stockData.previousClose}
			</h3>
			<h3>
				<strong>YTD Change: </strong>
				<div style={{color: stockData.ytdChange > 0 ? "green" : "red"}}>
					{stockData.ytdChange >= 0 ? "▲" : "▼"}{" "}
					{Math.round(stockData.ytdChange * 1000) / 1000}%
				</div>
			</h3>

			
		</div>
	);
}

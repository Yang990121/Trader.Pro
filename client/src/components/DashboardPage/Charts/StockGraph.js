import React, { useState , useEffect } from "react";
import { Card } from "@material-ui/core/";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import axios from "axios";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LineChart from "./LineChart";

const LineChartCard = ({ pastDataPeriod, stockInfo, duration }) => {
	return (
		<Grid item xs={100} sm={100} style={{ minHeight: "240px" }}>
			<LineChart
				pastDataPeriod={pastDataPeriod}
				stockInfo={stockInfo}
				duration={duration}
			/>
		</Grid>
	);
};

function StockGraph(props) {
	const [stockPrice, setStockPrice] = useState({});
	useEffect(() => {
		var urlFront = "https://cloud.iexapis.com/stable/stock/";
		const apiKey = "pk_58968f3da90f4c0baae1b949effbb845";
		var urlBack = `/chart/?token=${apiKey}`;
		var url = urlFront + props.stock + urlBack;
		axios
			.get(url)
			.then((response) => setStockPrice(response.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			<LineChartCard
				pastDataPeriod={stockPrice}
				// stockInfo={stockData}
				duration={"1 month"}
			/>
			<p>
				Adjusted closing stock price of {props.stock} over the past
				1 month
			</p>
		</div>
	);
}

export default StockGraph;

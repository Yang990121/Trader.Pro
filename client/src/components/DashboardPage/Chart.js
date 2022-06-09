import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Title from "../Template/Title";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "./Charts/Tabs";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export default function Chart() {
	const [stockData, setStockData] = useState({});
	var urlFront = "https://cloud.iexapis.com/stable/stock/";
	const apiKey = "pk_f5660ce6eae543f9a8a310836d368d8d";
	var urlBack = `/quote?token=${apiKey}`;
	var url = urlFront + "SPY" + urlBack;

	axios
		.get(url)
		.then(function (response) {
			//Success
			setStockData(response.data);
		})
		.catch(function (error) {
			//Error
			console.log(error);
		});

	return (
		<React.Fragment>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Tabs  />
				</ Grid>
			</Grid>
		</React.Fragment>
	);
}

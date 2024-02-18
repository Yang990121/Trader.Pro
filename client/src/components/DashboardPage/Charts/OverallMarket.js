import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Title from "../../Template/Title";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "./Tabs";
import StockInfo from "./StockInfo";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export default function OverallMarket() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={4}>
				<Item><StockInfo stock="SPY" /></Item>
			</Grid>
			<Grid item xs={4}>
                <Item><StockInfo stock="QQQ" /></Item>
			</Grid>
			<Grid item xs={4}>
                <Item><StockInfo stock="DIA" /></Item>
			</Grid>
			<Grid item xs={12}>
				<Typography color="textSecondary" align="center">
					{new Date().toDateString()}
				</Typography>
			</Grid>
			
		</Grid>
	);
}

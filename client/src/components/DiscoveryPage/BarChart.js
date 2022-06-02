import React from "react";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarChart = ({ pastDataPeriod, stockInfo, duration }) => {
	const formatDate = (date) => {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [month, day].join("-");
	};

	const BarChart =
		pastDataPeriod.length > 0 ? (
			<Bar
				data={{
					labels: pastDataPeriod.map(({ date }, i) =>
						formatDate(date)
					),
					datasets: [
						{
							data: pastDataPeriod.map(({ volume }) => volume),
							label: "Volume",
							borderColor: "rgba(0, 0, 255, 0.5)",
							fill: true,
							backgroundColor: "rgba(0, 0, 255, 0.3)",
						},
					],
				}}
				options={{
					maintainAspectRatio: false,
					elements: {
						point: {
							radius: 2,
						},
					},
					legend: { display: false },
					layout: {
						padding: {
							left: 20,
							right: 20,
							top: 15,
							bottom: 0,
						},
					},
					options: {
						title: {
							display: true,
							text: `Adjusted closing stock price of ${stockInfo.symbol} over the past ${duration}`,
							position: "bottom",
						},
					},
					animation: {
						duration: 2000,
					},
				}}
			/>
		) : null;

	return BarChart;
};

export default BarChart;

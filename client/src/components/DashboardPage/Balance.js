import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Template/Title";

function preventDefault(event) {
	event.preventDefault();
}

export default function Balance() {
	return (
		<React.Fragment>
			<Title>Current Balance</Title>
			<div>
				<Typography variant="h5" color="textSecondary" align="center">
					Cash Balance:
				</Typography>

				<Typography component="p" variant="h4" align="center">
					$100,000
				</Typography>
				<br />
				<Typography variant="h5" color="textSecondary" align="center">
					Portfolio Balance:
				</Typography>
				<Typography
					component="p"
					variant="h4"
					align="center"
				>
					$000
				</Typography>
				<br />
				<Typography variant="h5" color="textSecondary" align="center">
					Total:
				</Typography>
				<Typography
					component="p"
					variant="h4"
					align="center"
				>
					$100,000
				</Typography>
			</div>
		</React.Fragment>
	);
}

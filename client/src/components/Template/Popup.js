import React from "react";
import "./Template.css";

const Popup = (props) => {
	return (
		<div>
			<div>
				<span className="close-icon" onClick={props.handleClose}></span>
				{props.content}
			</div>
		</div>
	);
};

export default Popup;

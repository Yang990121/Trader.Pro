import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
	const [data, setData] = useState();
	const apiKey = "304b8addeaa912207e3b85a3fd475193";

	useEffect(() => {
		axios
			.get(
				`https://gnews.io/api/v4/search?q=business&token=${apiKey}`
			)
			.then((response) => setData(response.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<NewsContext.Provider value={{ data }}>
			{props.children}
		</NewsContext.Provider>
	);
};


// export const NewsContextProvider = (props) => {
// 	const [data, setData] = useState();
// 	const apiKey = "be5b3f91ab9f462bae673579dc506760";

// 	useEffect(() => {
// 		axios
// 			.get(
// 				`https://newsapi.org/v2/everything?q=stocks&sortBy=publishedAt&apiKey=${apiKey}`
				
// 			)
// 			.then((response) => setData(response.data))
// 			.catch((error) => console.log(error));
// 	}, []);

// 	return (
// 		<NewsContext.Provider value={{ data }}>
// 			{props.children}
// 		</NewsContext.Provider>
// 	);
// };

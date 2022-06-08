import React from "react";
import { useState , useEffect} from "react";
import Axios from "axios";


function CreateRow(oneStock) {
    


    const [stockData, setStockData] = useState({});

     //Price not specific to the ticker, pass in would be a better idea
    useEffect(() => {
        var urlFront = "https://cloud.iexapis.com/stable/stock/";
        const apiKey = "pk_d22d5d82426140a09dd84403c55267f6";
        var urlBack = `/quote?token=${apiKey}`;
        var url = urlFront + oneStock.ticker + urlBack;
        Axios
            .get(url)
            .then((response) => setStockData(response.data))
            .catch((error) => console.log(error));
    }, []);
    console.log(stockData)
    console.log(stockData.latestPrice)
    const price = stockData.latestPrice
    console.log(price)

    function createData(
        id,
        ticker,
        name,
        quantity,
        pricePurchase,
        totalPurchase,
        priceCurrent,
        priceTotal,
        difference
      ) {
        return {
          id,
          ticker,
          name,
          quantity,
          pricePurchase,
          totalPurchase,
          priceCurrent,
          priceTotal,
          difference,
        };
      }

      return createData(oneStock._id, oneStock.ticker, oneStock.quantity, oneStock.price, oneStock.price * oneStock.quantity, stockData.latestPrice, stockData.latestPrice * oneStock.quantity, oneStock.quantity);


}

export default CreateRow;


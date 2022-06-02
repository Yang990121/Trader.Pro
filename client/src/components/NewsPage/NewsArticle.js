import React from "react";

function NewsArticle({ data }) {
	var newsUrl = data.url;
	var imgUrl = data.urlToImage;
	return (
		<div className="news">
			<img src={imgUrl} alt="none" width="300" height="250"></img>
			<a href={newsUrl} target="_blank">
				<h3 className="news__title">{data.title}</h3>
			</a>
			<p className="news__desc">{data.description}</p>
			<span className="news__author">{data.author}</span> <br />
			<span className="news__published">{data.publishedAt}</span>
			<span className="news__source">{data.source.name}</span>
		</div>
	);
}

export default NewsArticle;

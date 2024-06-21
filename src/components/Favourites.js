import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    };
  }

  handleUpdateFavorites = () => {
    this.setState({
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    });
  };

  render() {
    const { favorites } = this.state;

    return (
      <div className="container">
        <h1 className="text-center" style={{ margin: "30px 0px" }}>
          Your Favorite Articles
        </h1>
        <div className="row">
          {favorites.length === 0 ? (
            <p className="text-center">You have no favorite articles.</p>
          ) : (
            favorites.map((element, index) => (
              <div className="col-md-4" key={`${element.newsUrl}-${index}`}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.imageUrl}
                  newsUrl={element.newsUrl}
                  author={element.author}
                  date={element.date}
                  source={element.source}
                  updateFavorites={this.handleUpdateFavorites} // Pass updateFavorites as prop
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

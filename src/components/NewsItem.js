import React, { Component } from "react";

export class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.isArticleFavorite(),
    };
  }

  isArticleFavorite = () => {
    const { newsUrl } = this.props;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.some((fav) => fav.newsUrl === newsUrl);
  };

  handleFavoriteToggle = () => {
    const {
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      date,
      source,
      updateFavorites, // Callback function from parent component (Favorites)
    } = this.props;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const articleIndex = favorites.findIndex((fav) => fav.newsUrl === newsUrl);

    if (articleIndex === -1) {
      // Add to favorites
      const article = {
        title,
        description,
        imageUrl,
        newsUrl,
        author,
        date,
        source,
      };
      favorites.push(article);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Article added to favorites!");
    } else {
      // Remove from favorites
      favorites.splice(articleIndex, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Article removed from favorites!");
    }

    this.setState({ isFavorite: !this.state.isFavorite });

    // Invoke callback to update favorites in parent component (Favorites)
    updateFavorites();
  };

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    const { isFavorite } = this.state;

    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className=" badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://www.shutterstock.com/image-vector/flat-icon-nothing-here-404-260nw-2269630539.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              className="btn btn-sm btn-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
            <button
              onClick={this.handleFavoriteToggle}
              className={`btn btn-sm ${
                isFavorite ? "btn-danger" : "btn-warning"
              }`}
              style={{ marginLeft: "10px" }}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Pagination from "./Pagination";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("hello i am a constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      searchQuery: "", // Initialize searchQuery state
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews(page = 1, searchQuery = "") {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b80a3d4a512d454fa43c3f4c8525860f&page=${page}&pageSize=${this.props.pageSize}&q=${searchQuery}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false,
      page: page,
      searchQuery: searchQuery, // Update searchQuery state
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

  updateFavorites = () => {
    this.setState({
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    });
  };

  handlePageChange = (page) => {
    this.updateNews(page, this.state.searchQuery); // Pass searchQuery to updateNews
  };

  handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchInput.value;
    this.updateNews(1, searchQuery); // Update news with search query
  };

  render() {
    console.log("render");
    const { articles, page, totalResults, favorites } = this.state;
    const totalPages = Math.ceil(totalResults / this.props.pageSize);

    return (
      <>
        <h1 className="text-center" style={{ margin: "30px 0px" }}>
          NewsPortal - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        <div className="container">
          {/* Search form */}
          <form onSubmit={this.handleSearch} className="mb-3">
            <div className="flex">
              <input
                type="text"
                id="searchInput"
                name="searchInput"
                className="form-input w-full rounded-full p-2"
                placeholder="Search for news..."
                aria-label="Search for news"
                style={{
                  borderColor: "#ccc",
                  borderWidth: "1px",
                  fontSize: "14px",
                  marginRight: "8px",
                }}
              />
              <button
                className="btn bg-black text-white rounded-full px-4 py-2 hover:bg-gray-800"
                type="submit"
                style={{ fontSize: "14px" }}
              >
                Search
              </button>
            </div>
          </form>

          {/* News articles */}
          <div className="row">
            {articles &&
              articles.map((element, index) => (
                <div className="col-md-4" key={`${element.url}-${index}`}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    updateFavorites={this.updateFavorites} // Passing callback to NewsItem
                  />
                </div>
              ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={this.handlePageChange}
          />

          {/* Favorites section */}
          {favorites.length > 0 && (
            <div className="mt-5">
              <h2>Favorites</h2>
              {favorites.map((fav, index) => (
                <div key={`${fav.newsUrl}-${index}`}>
                  <p>{fav.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios'; 

import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    inputValue: '',
    page: null,
    error: false,
    loading: false,
    totalHits: 0,
  };

onSearchSubmit = inputValue => {
    this.setState({ inputValue, page: 1, images: [] });
};

incrementPage = () => {
  this.setState(prevState => ({
    page: prevState.page + 1,
  }));
};

componentDidUpdate(prevProps, prevState) {
  if (prevState.inputValue !== this.state.inputValue) {
    this.setState({ loading: true, page: 1})
    return axios
      .get(
        `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=35100362-df85f1508e5c064e35d3bf680&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(data =>
        this.setState(prev => ({
          ...prev,
          images: data.data.hits,
          loading: false,
          totalHits: data.data.totalHits
        }))
      )
      .catch(error => this.setState({error:true}))
  }

  if (prevState.page < this.state.page) {
    this.setState({ loading: true });
    return axios
      .get(
        `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=35100362-df85f1508e5c064e35d3bf680&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(data =>
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...data.data.hits],
          };
        })
      )
      .catch(error => this.setState({error:true}))
      .finally(() => {this.setState({loading: false})})
  }
}
render() {
  const { images, loading, totalHits, error } = this.state;
  return (
    <div>
      <SearchBar onSubmit={this.onSearchSubmit} />
      {loading && <Loader />}
      {error && <h1>Please try again</h1>}
      {images.length > 0 && (<ImageGallery images={images} />)}
      {images.length > 0 && !loading && images.length < totalHits && (
        <Button onLoadMore={this.incrementPage} />)}
    </div>
  );
}
};
import React, {Component} from 'react';

export default class SearchPanel extends Component {
  state = {
    searchValue: '',
  }

  onChangeInputValue = ((e) => {
    const searchValue = e.target.value;
    this.setState({searchValue});
    this.props.setSearchValue(searchValue);
  });

  onSubmit = ((e) => {
    e.preventDefault();
  });

  render() {
    return (
      <form className="search-panel"
            onSubmit={this.onSubmit}>
        <input 
          placeholder="type to search"
          className="form-control search-input"
          onChange={this.onChangeInputValue}
          value={this.state.searchValue }
        />
      </form>
    );
  }
}

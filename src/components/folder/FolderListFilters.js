import React from "react";
import { connect } from "react-redux";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import {
  setTextFilter,
  sortByCreatedAt,
  sortByUpdatedAt,
  sortByTitle,
  sortByDefault
} from "../../actions/filterActions";

export class FolderListFilters extends React.Component {
  componentWillUnmount = () => {
    this.props.sortByDefault();
  };

  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = e => {
    if (e.target.value === "title") {
      this.props.sortByTitle();
    } else if (e.target.value === "createdAt") {
      this.props.sortByCreatedAt();
    } else if (e.target.value === "updatedAt") {
      this.props.sortByUpdatedAt();
    }
  };

  render() {
    return (
      <div className="filter__wrapper">
        <div className="filter__item filter__item--text">
          <input
            type="text"
            className="form__input"
            name="inputFilter"
            placeholder="Search bookmarks by title"
            value={this.props.filters.text}
            onChange={this.onTextChange}
          />
        </div>
        <div className="filter__item filter__item--sort">
          <p>SORT BY</p>
          <div className="select__wrapper">
            <select
              className="form__input"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="title">Title</option>
              <option value="createdAt">Create Date</option>
              <option value="updatedAt">Update Date</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByCreatedAt: () => dispatch(sortByCreatedAt()),
  sortByUpdatedAt: () => dispatch(sortByUpdatedAt()),
  sortByTitle: () => dispatch(sortByTitle()),
  sortByDefault: () => dispatch(sortByDefault())
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderListFilters);

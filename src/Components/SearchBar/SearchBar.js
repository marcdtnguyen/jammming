import React from "react";
import './SearchBar.css'

export class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            term : ''
        }
        this.handleTermChange = this.handleTermChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(){
        this.props.onSearch(this.state.term)
    }
    handleTermChange(e){
        const value = e.target.value;
        this.setState({ term : value })
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button className="SearchButton" onClick={this.handleSearch}>SEARCH</button>
            </div>
        )
    }
}
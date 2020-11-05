import React from 'react'
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {term : ''}

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    search() {
        if (this.state.term.length>1)
            this.props.onSearch(this.state.term);
    }
    handleTermChange(e) {
        this.setState({term: e.target.value})
        clearTimeout(this.timer);
        this.timer = setTimeout(this.search, 1500);  
    }

    render() {
        return (

            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"  onChange={this.handleTermChange}/>
            </div>
        );
    }
}
export default SearchBar
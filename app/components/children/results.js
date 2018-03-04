// Include React
import React, { Component } from 'react';

// Helper for making AJAX requests to our API
import helpers from "../utils/helpers";


class Results extends Component {
    // Passing props in constructor arguments to access state from its parent.
    constructor(props) {
        super(props)
        this.state = {
            saved: []
        }
        
        //Binding "this" keyword to every function that might be called.
        this.handleClick = this.handleClick.bind(this);
        this.renderResults = this.renderResults.bind(this);
    }

    //Whenever users click save
    handleClick(e){
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        e.preventDefault();
        //grab number to get news from props then post to the server
        const newsNum = e.target.id;
        
        // for a UX purpose disable button after click save.
        $("#"+newsNum).text("Saved!").addClass("disabled");

            // Run the query for the "POST" to the server
            helpers.postNews(this.props.results[newsNum])
            .then(function(data) {

                //console.log(mongo db_.d if it successfully added to server. )
                console.log(data)
            }.bind(this));
    }
    renderResults() {

        // render its content whenever there are some results came from its parent.
        if(this.props.results[0]){
        return(
        <div className="panel panel-default">
                <div className="panel-heading text-center"><h5>Results</h5></div>
                <div className="panel-body">
                    {/*use a map function to loop through an array in JSX  */}
                    {this.props.results.map(function(search, i) {
                        if (i % 2 == 0){
                            return (
                                <blockquote key={i}>
                                <h5>{search.headline}</h5>
                                <p>{search.snippet}</p>
                                <small><a href={search.url}>Link </a><cite title="Source Title"> {search.date}</cite></small>
                                <button className="btn btn-primary" onClick={this.handleClick} id={i}>Save</button>
                                </blockquote>
                        )} else{
                            return (
                                <blockquote className="blockquote-reverse" key={i}>
                                <h5>{search.headline}</h5>
                                <p>{search.snippet}</p>
                                <small><a href={search.url}>Link </a><cite title="Source Title">{search.date}</cite></small>
                                <button className="btn btn-primary" onClick={this.handleClick} id={i}>Save</button>
                                </blockquote>
                        )}
                    },this)}
                </div>
            </div>
        )
        }
    }

    render() {
        return(
             <div className="col-md-10 col-md-offset-1">
            {this.renderResults()}
            </div>
        )
    }
};

// Export the component
export default Results;
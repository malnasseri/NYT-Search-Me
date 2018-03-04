// Include the React library
import React, { Component }from "react";

// Include links
import { Link } from "react-router-dom";

//Create function 
class Jumbotron extends Component {
    constructor(props){
        super(props)
        this.renderBtn = this.renderBtn.bind(this);
    }
    renderBtn() {
        // render btn as per location name
        
        if(this.props.location == "/savednews"){
            return(
                <Link to="/"><button className="btn btn-default btn-lg">Search</button></Link>
            )
        }else{
            return(
                <Link to="savednews"><button className="btn btn-danger btn-lg"><i className="fa fa-floppy-o" aria-hidden="true"></i> Saved News</button></Link>
            )
        }
    }
    render(){
        return(
            <div className="jumbotron">
                <h1 className="text-center">
                    <img src="../img/Newspaper.png"/>
                    New York Times Article Scrubber
                </h1>
                <p className="text-center">
                    {this.renderBtn()}
                </p>
            </div>
        )
    }
}


//Export Jumbotron
export default Jumbotron;
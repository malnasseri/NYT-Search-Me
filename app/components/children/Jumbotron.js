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
               <div>
                <Link to="/"><button className="btn btn-default btn-lg home">Search</button></Link>
                <Link to="savednews"><button className="btn btn-lg savednews active"> Saved News</button></Link>
                
                </div>
            )
        }else{
            return(
                <div>
                <Link to="/"><button className="btn btn-default btn-lg home active">Search</button></Link>
                <Link to="savednews"><button className="btn btn-lg savednews"> Saved News</button></Link>
                
                </div>
            )

        }
    }
    render(){
        return(
            <div className="jumbotron">
                <h1 className="header text-center">
                   
                    NYT Search Me
                </h1>
                <p>
                    {this.renderBtn()}
                </p>
            </div>
        )
    }
}


//Export Jumbotron
export default Jumbotron;
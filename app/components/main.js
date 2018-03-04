// Include React
import React, { Component }from "react";
import Jumbotron from "./children/Jumbotron";

class Main extends Component {
    constructor(props){
        super(props)
    } 
    render(){
        return(
          <div>
            {/*passing pathname to Jumbotron component  */}
            <Jumbotron location={this.props.location.pathname}/>
            {this.props.children}

            {/*Forkit  */}
     
          </div>
        )
    }

};


export default Main;
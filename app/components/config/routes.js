// Include the React library
import React from "react";

// Include the react-router-dom modules
import { Route, BrowserRouter } from "react-router-dom";

// Reference the high-level components
import Main from "../Main";
import SavedNews from "../children/SavedNews";
import Search from "../children/Search";

const routes = (
    <BrowserRouter> 
        {/*Passing location to main component  */}
        <Main location={location}>
            {/*Display main route with search component  */}
            <Route exact path="/" component={Search}/> 
            {/*Display savednews route with SavedNews component  */}
            <Route exact path="/savednews" component={SavedNews} />
        </Main>
    </BrowserRouter>
)
// export Router
export default routes;
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
import Listings from './Listings/Listings';
import Admin from './Users/Admin';
import CreateListings from './Listings/CreateListings';
import MyApplications from './Listings/MyApplications';

class Main extends Component {
    render(){
        return(
            <div className="mainComponent">
                <Route path="/" exact component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/allListings" component={Listings}/>
                <Route path="/createListings" component={CreateListings}/>
                <Route path="/myApplications" component={MyApplications}/>
            </div>
        )
    }
}

export default Main;
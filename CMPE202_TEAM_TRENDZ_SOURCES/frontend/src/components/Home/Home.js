import React, { Component } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import '../../App.css';
// import {rooturl} from '../../config/settings';
import Header from "../Header/Header";
import {Link} from 'react-router-dom';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            search_text :""
        }

        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler = (e) => {
        console.log("searchHandler", e.target.value)
        this.setState({
            search_text: e.target.value
        })
    }

    render() {
        return (
            <div className="homePage">
                <Header />
                <br/>
                <div class="textLocation">                  
                        <h1>Every Home tells a Story</h1>
                                 
                        <p>Let us help you to create one of those....</p>
                        <p>
                            
                            <Form>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter an address, neighbourhood, city, or ZIP code"
                                        aria-describedby="inputGroupPrepend"
                                        onChange={this.searchHandler}
                                        required
                                    />
                                    <Button variant="primary">
                                        <Link to={{
                                            pathname: '/allListings',
                                            state: {
                                                location_data: this.state.search_text
                                            }
                                            }}>
                                         <i id="search-logo" className="fas fa-search"></i>
                                        </Link>
                                    </Button>
                                </InputGroup>
                            </Form>
                        </p>
                    
                </div>
            </div>
        )
    }
}
export default Home;
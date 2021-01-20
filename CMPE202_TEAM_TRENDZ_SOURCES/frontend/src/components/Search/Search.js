import React, { Component } from 'react';
import '../../App.css';
import { Button, Form, Navbar, Nav, NavDropdown, FormControl, OverlayTrigger, Popover, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { backendurl, rooturl } from '../../config/settings';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_rental: "",
            min_sf: 0,
            max_sf: 100000,
            min_price: 0,
            max_price: 1000000000,
            num_beds: "",
            num_baths: "",
            num_parking_spots: "",
            is_furnished: "",
            is_pet_allowed: "",
            is_smoking_allowed: "",
            location: "",
            is_search_modified: false,
            is_rental_modified: false,
            listing_type: 1
        }

        this.rentalFlagHandler = this.rentalFlagHandler.bind(this);
        this.minAreaHandler = this.minAreaHandler.bind(this);
        this.maxAreaHandler = this.maxAreaHandler.bind(this);
        this.minPriceHander = this.minPriceHander.bind(this);
        this.maxPriceHandler = this.maxPriceHandler.bind(this);
        this.bedHandler = this.bedHandler.bind(this);
        this.bathHandler = this.bathHandler.bind(this);
        this.parkingHandler = this.parkingHandler.bind(this);
        this.furnishedHandler = this.furnishedHandler.bind(this);
        this.petHandler = this.petHandler.bind(this);
        this.smokingHandler = this.smokingHandler.bind(this);
        this.locationHandler = this.locationHandler.bind(this);
        this.saveSearch = this.saveSearch.bind(this);
        this.searchListings = this.searchListings.bind(this);
        this.mySearch = this.mySearch.bind(this);
    }

    // componentDidMount() {
    //     let user_id = Cookies.get('user_id')
    //     user_id = 15
    //     axios.get('http://' + backendurl + 'searches/getMySearch', { params: { user_id: user_id } })
    //         .then(response => {
    //             console.log("Status Code : ", response);
    //             this.setState({
    //                 is_rental: response.data.security_deposit > 0 ? true : false,
    //                 is_furnished: response.data.is_furnished,
    //                 max_price: response.data.max_price,
    //                 min_price: response.data.min_price,
    //                 max_sf: response.data.max_sf,
    //                 min_sf: response.data.min_sf,
    //                 num_baths: parseInt(response.data.num_baths),
    //                 num_beds: parseInt(response.data.num_beds),
    //                 num_parking_spots: parseInt(response.data.num_parking_spots),
    //                 pet_policy: response.data.pet_policy,
    //                 smoking_policy: response.data.smoking_policy
    //             })
    //         });



    //         // this.setState({
    //         //     is_rental: false,
    //         //     is_furnished: false,
    //         //     max_price: 100000000,
    //         //     min_price: 0,
    //         //     max_sf: 1000,
    //         //     min_sf: 0,
    //         //     num_baths: 1,
    //         //     num_beds: 2,
    //         //     num_parking_spots: 1,
    //         //     pet_policy: true,
    //         //     smoking_policy: true
    //         // })
    // }

    mySearch = (e) => {
        e.preventDefault();
        let user_id = Cookies.get('user_id')
        // user_id = 15
        console.log("mysearch", user_id)
        // this.setState({
        //     is_rental: true,
        //     is_furnished: false,
        //     max_price: 100000000,
        //     min_price: 0,
        //     max_sf: 1000,
        //     min_sf: 0,
        //     num_baths: 1,
        //     num_beds: 2,
        //     num_parking_spots: 1,
        //     pet_policy: true,
        //     smoking_policy: true
        // })
        axios.get('http://' + backendurl + 'searches/getMySearch', { params: { user_id: user_id } })
            .then(response => {
                console.log("Status Code from search: ", response.data);
                let data = response.data[0]
                console.log("data from mysearch", data)
                this.setState({
                    is_rental: data.security_deposit > 0 ? true : false,
                    is_furnished: data.is_furnished,
                    max_price: data.max_price,
                    min_price: data.min_price,
                    max_sf: data.max_sf,
                    min_sf: data.min_sf,
                    num_baths: parseInt(data.num_baths),
                    num_beds: parseInt(data.num_beds),
                    num_parking_spots: parseInt(data.num_parking_spots),
                    pet_policy: data.pet_policy,
                    smoking_policy: data.smoking_policy
                })
            });
        }

        rentalFlagHandler = (e) => {
            const isRental = (e.target.id === "rental" ? true : false);
            const data = {
                forRent: isRental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                is_rental: isRental,
                is_rental_modified: true
            })
        }

        minAreaHandler = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: e.target.value,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                min_sf: e.target.value
            })
        }

        maxAreaHandler = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: e.target.value,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                max_sf: e.target.value
            })
        }

        minPriceHander = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: e.target.value,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                min_price: e.target.value
            })
        }

        maxPriceHandler = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: e.target.value,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                max_price: e.target.value
            })
        }

        bedHandler = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: e,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                num_beds: e
            })
        }

        bathHandler = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: e,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                num_baths: e
            })
        }

        parkingHandler = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: e,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                num_parking_spots: e
            })
        }

        furnishedHandler = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: e.target.checked,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                is_furnished: e.target.checked
            })
        }

        petHandler = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: e.target.checked,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                pet_policy: e.target.checked
            })
        }

        smokingHandler = (e) => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: e.target.checked,
                location: this.state.location
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                smoking_policy: e.target.checked
            })
        }

        locationHandler = (e) => {
            console.log("locationHandler", e)
            console.log("locationHandler", e.target)
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: e.target.value
            }
            this.props.onFilterChange(this.applyFilter(data))
            this.setState({
                location: e.target.value,
                is_search_modified: true
            })
        }

        searchListings = () => {
            const data = {
                forRent: this.state.is_rental,
                min_price: this.state.min_price,
                max_price: this.state.max_price,
                min_sf: this.state.min_sf,
                max_sf: this.state.max_sf,
                num_beds: this.state.num_beds,
                num_baths: this.state.num_baths,
                num_parking_spots: this.state.num_parking_spots,
                is_furnished: this.state.is_furnished,
                pet_policy: this.state.is_pet_allowed,
                smoking_policy: this.state.is_smoking_allowed,
                location: this.state.location
            }

            // axios.get('http://' + backendurl + '/allListings', {params: {search_data: data}})
            //     .then(response => {
            //     console.log("Status Code : ", response);
            // });  
        }

        saveSearch = (e) => {
            e.preventDefault();
            const data = {
                security_deposit: this.state.is_rental ? 200 : 0,
                is_furnished: this.state.is_furnished,
                max_price: this.state.max_price,
                min_price: this.state.min_price,
                max_sf: this.state.max_sf,
                min_sf: this.state.min_sf,
                num_baths: parseInt(this.state.num_baths),
                num_beds: parseInt(this.state.num_beds),
                num_parking_spots: parseInt(this.state.num_parking_spots),
                pet_policy: this.state.pet_policy,
                smoking_policy: this.state.smoking_policy,
                user_id: parseInt(Cookies.get("user_id")),
                listing_type: this.state.listing_type
            }

            console.log("data set for save search api", data)


            axios.post('http://' + backendurl + 'searches/addMySearch', null, { params: data })
                .then(response => {
                    console.log("Status Code for save search: ", response);
                    if (response.status === 200) {
                        console.log("data from post listing response", response.data);
                        // Navigate to Home
                    }
                });
        }

        applyFilter = (data) => {
            const filterd_listings = []
            console.log("data in applyFilter", data)
            this.props.listings.map(listing => {
                console.log("listing", listing)
                let forRent = listing.securityDeposit > 0? true:false
                const match =
                    ((data.forRent !== "") ? forRent === data.forRent : true)
                    && ((data.num_beds !== "") ? listing.numBeds >= parseInt(data.num_beds) : true)
                    && ((data.num_baths !== "") ? listing.numBaths >= parseInt(data.num_baths) : true)
                    && ((data.num_parking_spots !== "") ? listing.numParkingSpots >= parseInt(data.num_parking_spots) : true)
                    && ((data.is_furnished !== "") ? listing.furnished === data.is_furnished : true)
                    && ((data.pet_policy === "" || typeof data.pet_policy === 'undefined') ? true : listing.petPolicy === data.pet_policy)
                    && ((data.smoking_policy === "" || typeof data.smoking_policy === 'undefined') ? true : listing.smokingPolicy === data.smoking_policy)
                    && (listing.price >= data.min_price && listing.price <= data.max_price)
                    && (listing.squareFeet >= data.min_sf && listing.squareFeet <= data.max_sf)
                    && ((data.location === "" || typeof data.location === 'undefined') ? true :
                        ((typeof listing.city !== 'undefined' && listing.city.toUpperCase() === data.location.toUpperCase())
                            || (typeof listing.state !== 'undefined' && listing.state.toUpperCase() === data.location.toUpperCase())
                            || (typeof listing.country !== 'undefined' && listing.country.toUpperCase() === data.location.toUpperCase())
                            || (typeof listing.zipCode !== 'undefined' && listing.zipCode.toUpperCase() === data.location.toUpperCase())
                        ));

                match && filterd_listings.push(listing);

            });

            return filterd_listings;
        }

        render() {
            const locationSearch = this.state.is_search_modified ? this.state.location : this.props.locationSearch
            //const rentalFlag = this.state.is_rental_modified?this.state.is_rental:this.props.rental_type
            const rentalFlag = this.props.rental_type
            const radioFlagRent = this.state.is_rental? true: false
            const radioFlagSale = this.state.is_rental? false: true
            console.log("this.state.is_rental_modified", this.state.is_rental_modified)
            console.log("this.state.is_rental", rentalFlag)
            return (
                <div className="searchBar">
                    <Navbar expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form inline>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                    onChange={this.locationHandler}
                                    value={locationSearch}
                                />
                                <Nav className="mr-auto">
                                    {(rentalFlag === true || rentalFlag === false) ?
                                        <span />
                                        :
                                        <Form.Group>
                                            <Form.Check type="radio" name="searchType" checked={radioFlagRent} label="For Rent" id="rental" onChange={this.rentalFlagHandler} /> &nbsp;&nbsp;&nbsp;
                                            <Form.Check type="radio" name="searchType" checked={radioFlagSale} label="For Sale" id="sale" onChange={this.rentalFlagHandler} /> &nbsp;&nbsp;&nbsp;
                                </Form.Group>
                                    }
                                    {['bottom'].map((placement) => (
                                        <OverlayTrigger
                                            trigger="click"
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Popover id={`popover-positioned-${placement}`}>
                                                    <Popover.Content>
                                                        <Form>
                                                            <Form.Row>
                                                                <Form.Group as={Col} md="5" >
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Min"
                                                                        name="minPrice"
                                                                        onChange={this.minPriceHander}
                                                                        min="0"
                                                                        value={this.state.min_price}
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} md="2">
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                            {'-'}
                                                                </Form.Group>
                                                                <Form.Group as={Col} md="5" >
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Max"
                                                                        name="maxPrice"
                                                                        onChange={this.maxPriceHandler}
                                                                        min="0"
                                                                        value={this.state.max_price}
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form>
                                                    </Popover.Content>
                                                </Popover>
                                            }
                                        >
                                            <Button variant="link">Price</Button>
                                        </OverlayTrigger>
                                    ))}
                                    {['bottom'].map((placement) => (
                                        <OverlayTrigger
                                            trigger="click"
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Popover id={`popover-positioned-${placement}`}>
                                                    <Popover.Content>
                                                        <Form>
                                                            <Form.Row>
                                                                <Form.Group as={Col} md="5" controlId="validationFormik104">
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Min"
                                                                        name="minArea"
                                                                        onChange={this.minAreaHandler}
                                                                        min="0"
                                                                        value={this.state.min_sf}
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} md="2" controlId="validationFormik104">
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                            {'-'}
                                                                </Form.Group>
                                                                <Form.Group as={Col} md="5" controlId="validationFormik104">
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Max"
                                                                        name="maxArea"
                                                                        onChange={this.maxAreaHandler}
                                                                        min="0"
                                                                        value={this.state.max_sf}
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form>
                                                    </Popover.Content>
                                                </Popover>
                                            }
                                        >
                                            <Button variant="link">Area</Button>
                                        </OverlayTrigger>
                                    ))}
                                    <NavDropdown title="Bed" id="basic-nav-dropdown-1" onSelect={this.bedHandler} value={this.state.num_beds}>
                                        <NavDropdown.Item eventKey="1">1+</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="2">2+</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="3">3+</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="4">4+</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Bath" id="basic-nav-dropdown-2" onSelect={this.bathHandler} value={this.state.num_baths}>
                                        <NavDropdown.Item eventKey="1">1+</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="2">2+</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="3">3+</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="4">4+</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Parking" id="basic-nav-dropdown-3" onSelect={this.parkingHandler} value={this.state.num_parking_spots}>
                                        <NavDropdown.Item eventKey="1">1+</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="2">2+</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="3">3+</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="4">4+</NavDropdown.Item>
                                    </NavDropdown>&nbsp;&nbsp;&nbsp;
    
                                <Form.Check type="checkbox" label="Furnished" onChange={this.furnishedHandler} checked={this.state.is_furnished} /> &nbsp;&nbsp;&nbsp;
                                <Form.Check type="checkbox" label="Pet Allowed" onChange={this.petHandler} checked={this.state.pet_policy} /> &nbsp;&nbsp;&nbsp;
                                <Form.Check type="checkbox" label="Smoking Allowed" onChange={this.smokingHandler} checked={this.state.smoking_policy} /> &nbsp;&nbsp;&nbsp;
                            </Nav>
                            <Button variant="outline-primary" size="sm" onClick={this.saveSearch}> Save Search</Button> &nbsp;&nbsp;&nbsp;
                            <Button variant="outline-primary" size="sm" onClick={this.mySearch}>My Search</Button>&nbsp;&nbsp;&nbsp;
                            {/* <Button variant="outline-primary" as="input" type="reset" value="Reset">Reset</Button> */}
                            </Form>
                            



                    </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        }
    }

    export default Search
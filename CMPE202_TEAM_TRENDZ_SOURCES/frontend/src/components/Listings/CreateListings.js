import React, { Component } from 'react';
import '../../App.css';
import { Row, Col, Form, Card, Button, CardDeck } from 'react-bootstrap';
import Header from "../Header/Header";
import Search from '../Search/Search';
import data from '../Listings/data';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { backendurl, rooturl } from '../../config/settings';

class CreateListings extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     id: 1,
        //     title: "Isolated House",
        //     description: "House with a nice garden around",
        //     apartment: "Aragon",
        //     city: "Sunnywale",
        //     state: "California",
        //     country: "United States of America",
        //     distance: 7,
        //     forRent: false,
        //     buildingNum: "No.19",
        //     streetName: "Powell Lodge",
        //     zipCode: "35889",
        //     price: 1200,
        //     listingStatus: 2,
        //     listingType: 1,
        //     listingUser: 2,
        //     listingView: 0,
        //     furnished: true,
        //     squareFeet: 1500,
        //     numBaths: 1,
        //     numBeds: 3,
        //     numParkingSpots: 2,
        //     petPolicy: true,
        //     smokingPolicy: false,
        //     securityDeposit: 2000
        // }

        this.state = {
            title: "",
            description: "",
            apartment: "",
            city: "",
            state: "",
            country: "",
            distance: 0,
            forRent: "",
            buildingNum: "",
            streetName: "",
            zipCode: "",
            price: "",
            listingStatus: "",
            listingType: "",
            listingUser: "",
            listingView: 0,
            furnished: "",
            squareFeet: "",
            numBaths: "",
            numBeds: "",
            numParkingSpots: "",
            petPolicy: "",
            smokingPolicy: "",
            securityDeposit: "",
            listing_user: "",
            edited_listing: "",
            is_editing: false,
            id: ""
        }

        this.listingTypeHandler = this.listingTypeHandler.bind(this);
        this.homeTypeHandler = this.homeTypeHandler.bind(this);
        this.createListingHandler = this.createListingHandler.bind(this);
        this.listingStatusHandler = this.listingStatusHandler.bind(this);
        this.titleHandler = this.titleHandler.bind(this);
        this.descriptionHandler = this.descriptionHandler.bind(this);
        this.priceHandler = this.priceHandler.bind(this);
        this.areaHandler = this.areaHandler.bind(this);
        this.securityDepositHandler = this.securityDepositHandler.bind(this);
        this.bedsHandler = this.bedsHandler.bind(this);
        this.bathHandler = this.bathHandler.bind(this);
        this.parkingHandler = this.parkingHandler.bind(this);
        this.apartmentHandler = this.apartmentHandler.bind(this);
        this.streetNameHandler = this.streetNameHandler.bind(this);
        this.cityHandler = this.cityHandler.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        this.zipcodeHandler = this.zipcodeHandler.bind(this);
        this.countryHandler = this.countryHandler.bind(this);
        this.furnishedHandler = this.furnishedHandler.bind(this);
        this.petHandler = this.petHandler.bind(this);
        this.smokingHandler = this.smokingHandler.bind(this);
        this.updateListing = this.updateListing.bind(this);


    }

    componentDidMount() {
        let listing = ""
        if (typeof this.props.location.state !== 'undefined' && typeof this.props.location.state.listing !== 'undefined') {
            listing = this.props.location.state.listing
            this.setState({
                title: listing.title,
                description: listing.description,
                apartment: listing.apartment,
                city: listing.city,
                state: listing.state,
                country: listing.country,
                distance: 0,
                forRent: listing.forRent,
                buildingNum: listing.buildingNum,
                streetName: listing.streetName,
                zipCode: listing.zipCode,
                price: listing.price,
                listingStatus: listing.listingStatus,
                listingType: listing.listingType,
                listingUser: listing.listingUser,
                listingView: 0,
                furnished: listing.furnished,
                squareFeet: listing.squareFeet,
                numBaths: listing.numBaths,
                numBeds: listing.numBeds,
                numParkingSpots: listing.numParkingSpots,
                petPolicy: listing.petPolicy,
                smokingPolicy: listing.smokingPolicy,
                securityDeposit: listing.securityDeposit,
                is_editing: true,
                id: listing.id
            })
        }
        // console.log("props listing", this.props.location.state.listing)
        // console.log("edited listing", listing)
    }

    updateListing = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            description: this.state.description,
            apartment: this.state.apartment,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            distance: this.state.distance,
            building_number: this.state.buildingNum,
            street_name: this.state.streetName,
            zip_code: this.state.zipCode,
            listing_price: parseInt(this.state.price),
            listing_status: parseInt(this.state.listingStatus),
            listing_type: parseInt(this.state.listingType),
            listing_user: 15,
            listing_views: 0,
            is_furnished: this.state.furnished,
            square_footage: parseInt(this.state.squareFeet),
            num_baths: parseInt(this.state.numBaths),
            num_beds: parseInt(this.state.numBeds),
            num_parking_spots: parseInt(this.state.numParkingSpots),
            pet_policy: this.state.petPolicy,
            smoking_policy: this.state.smokingPolicy,
            security_deposit: parseInt(this.state.securityDeposit),
            id: this.state.id
        }

        console.log("data set for update listing api", data)

        axios.post('http://' + backendurl + 'listing/updateListing', null, { params: data })
            .then(response => {
                console.log("Status Code for update Listing : ", response.status);
                if (response.status === 200) {
                    console.log("data from post updateListing  response", response.data);
                    // Navigate to Home
                }
            });
    }

    listingTypeHandler = (e) => {
        this.setState({
            securityDeposit: e.target.value == "1" ? 200 : null
        })
    }

    homeTypeHandler = (e) => {
        this.setState({
            listingType: e.target.value
        })
    }

    listingStatusHandler = (e) => {
        this.setState({
            listingStatus: e.target.value
        })
    }

    titleHandler = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    descriptionHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    priceHandler = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    areaHandler = (e) => {
        this.setState({
            squareFeet: e.target.value
        })
    }

    securityDepositHandler = (e) => {
        this.setState({
            securityDeposit: e.target.value
        })
    }

    bedsHandler = (e) => {
        this.setState({
            numBeds: e.target.value
        })
    }

    bathHandler = (e) => {
        this.setState({
            numBaths: e.target.value
        })
    }

    parkingHandler = (e) => {
        this.setState({
            numParkingSpots: e.target.value
        })
    }

    buildingHandler = (e) => {
        this.setState({
            buildingNum: e.target.value
        })
    }

    apartmentHandler = (e) => {
        this.setState({
            apartment: e.target.value
        })
    }

    streetNameHandler = (e) => {
        this.setState({
            streetName: e.target.value
        })
    }

    cityHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    stateHandler = (e) => {
        this.setState({
            state: e.target.value
        })
    }

    zipcodeHandler = (e) => {
        this.setState({
            zipCode: e.target.value
        })
    }

    countryHandler = (e) => {
        this.setState({
            country: e.target.value
        })
    }

    furnishedHandler = (e) => {
        console.log("furnishte", e.target.value)
        this.setState({
            furnished: e.target.value == "Yes" ? true : false
        })
    }

    petHandler = (e) => {
        console.log("Pet", e.target.value)
        this.setState({
            petPolicy: e.target.value == "Yes" ? true : false
        })
    }

    smokingHandler = (e) => {
        this.setState({
            smokingPolicy: e.target.value == "Yes" ? true : false
        })
    }

    createListingHandler = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            description: this.state.description,
            apartment: this.state.apartment,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            distance: this.state.distance,
            building_number: this.state.buildingNum,
            street_name: this.state.streetName,
            zip_code: this.state.zipCode,
            listing_price: parseInt(this.state.price),
            listing_status: parseInt(this.state.listingStatus),
            listing_type: parseInt(this.state.listingType),
            listing_user: 15,
            listing_views: 0,
            is_furnished: this.state.furnished,
            square_footage: parseInt(this.state.squareFeet),
            num_baths: parseInt(this.state.numBaths),
            num_beds: parseInt(this.state.numBeds),
            num_parking_spots: parseInt(this.state.numParkingSpots),
            pet_policy: this.state.petPolicy,
            smoking_policy: this.state.smokingPolicy,
            security_deposit: parseInt(this.state.securityDeposit)
        }

        console.log("data set for create listing api", data)

        axios.post('http://' + backendurl + 'listing/postListing', null, { params: data })
            .then(response => {
                console.log("Status Code for create Listing : ", response.status);
                if (response.status === 200) {
                    console.log("data from post listing response", response.data);
                    // Navigate to Home
                    alert("Listing has been created successfully")
                    this.setState
                        ({
                            title: "",
                            description: "",
                            apartment: "",
                            city: "",
                            state: "",
                            country: "",
                            distance: 0,
                            forRent: "",
                            buildingNum: "",
                            streetName: "",
                            zipCode: "",
                            price: "",
                            listingStatus: "",
                            listingType: "",
                            listingUser: "",
                            listingView: 0,
                            furnished: "",
                            squareFeet: "",
                            numBaths: "",
                            numBeds: "",
                            numParkingSpots: "",
                            petPolicy: "",
                            smokingPolicy: "",
                            securityDeposit: "",
                            listing_user: ""
                        })
                }
            });
    }

    render() {
        console.log("this.state.is_editing", this.state.is_editing)
        let listingFlag = (this.state.securityDeposit && this.state.securityDeposit >= 0) ? "1" : "2"
        let furnished = this.state.furnished ? "Yes" : "No"
        let pet = this.state.petPolicy ? "Yes" : "No"
        let smoking = this.state.smokingPolicy ? "Yes" : "No"
        return (

            <div>
                <Header />
                <div className="formPage">
                    {this.state.is_editing ? <h3 className="pageTitle">Update Listing</h3> :
                        <h3 className="pageTitle">Create a New Listing</h3>
                    }
                    <br />
                    <Form onSubmit={this.createListingHandler}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Choose a type of listing </Form.Label>
                                <Form.Control as="select" defaultValue=" " value={listingFlag} onChange={this.listingTypeHandler} required >
                                    <option value="1">For Rent</option>
                                    <option value="2">For Sale</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Home Type*</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    id="inlineFormCustomSelect"
                                    custom required
                                    defaultValue="0"
                                    value={this.state.listingType}
                                    onChange={this.homeTypeHandler}
                                >
                                    <option value="0">Houses</option>
                                    <option value="1">Condos</option>
                                    <option value="2">Apartments</option>
                                    <option value="3">Town houses</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Listing Status*</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom required
                                    defaultValue="0"
                                    value={this.state.listingStatus}
                                    onChange={this.listingStatusHandler}
                                >
                                    <option value="0">Posted</option>
                                    <option value="1">Verified</option>
                                    <option value="2">Rejected</option>
                                    <option value="3">Occupied</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Title*</Form.Label>
                            <Form.Control placeholder="" required value={this.state.title} onChange={this.titleHandler} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description*</Form.Label>
                            <Form.Control as="textarea" row={5} placeholder="Other details here...." value={this.state.description} onChange={this.descriptionHandler}
                                required />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Price*</Form.Label>
                                <Form.Control type="number" min="0" value={this.state.price} onChange={this.priceHandler} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Area</Form.Label>
                                <Form.Control type="number" min="0" value={this.state.squareFeet} onChange={this.areaHandler} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Security Deposit</Form.Label>
                                <Form.Control type="number" min="0" defaultValue="0" value={this.state.securityDeposit} onChange={this.securityDepositHandler} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Bed*</Form.Label>
                                <Form.Control type="number" min="0" value={this.state.numBeds} onChange={this.bedsHandler} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Bath*</Form.Label>
                                <Form.Control type="number" min="0" value={this.state.numBaths} onChange={this.bathHandler} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Parking</Form.Label>
                                <Form.Control type="number" min="0" value={this.state.numParkingSpots} onChange={this.parkingHandler} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Building</Form.Label>
                                <Form.Control value={this.state.buildingNum} onChange={this.buildingHandler} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Apartment</Form.Label>
                                <Form.Control value={this.state.apartment} onChange={this.apartmentHandler} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Street Name*</Form.Label>
                                <Form.Control required value={this.state.streetName} onChange={this.streetNameHandler} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>City</Form.Label>
                                <Form.Control value={this.state.city} onChange={this.cityHandler} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>State</Form.Label>
                                <Form.Control value={this.state.state} onChange={this.stateHandler} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control value={this.state.zipCode} onChange={this.zipcodeHandler} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Country</Form.Label>
                                <Form.Control value={this.state.country} onChange={this.countryHandler} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Furnished</Form.Label>
                                <Form.Control as="select" defaultValue=" " value={furnished} onChange={this.furnishedHandler}>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Pet Allowed</Form.Label>
                                <Form.Control as="select" defaultValue=" " value={pet} onChange={this.petHandler}>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Smoking Allowed</Form.Label>
                                <Form.Control as="select" defaultValue=" " value={smoking} onChange={this.smokingHandler}>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.File id="formcheck-api-regular">
                                    <Form.File.Label>Upload Images</Form.File.Label>
                                    <Form.File.Input />
                                </Form.File>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                {this.state.is_editing ?
                                    <Button variant="primary" onClick={this.updateListing}>Update</Button> :
                                    <Button variant="primary" type="submit">Submit </Button>
                                }

                            </Form.Group>
                        </Form.Row>


                    </Form>
                </div>
            </div>
        )
    }
}

export default CreateListings
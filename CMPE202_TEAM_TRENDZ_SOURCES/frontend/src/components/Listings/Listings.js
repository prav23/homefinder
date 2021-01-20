import React, { Component } from 'react';
import '../../App.css';
import { Row, Col, Card, Button, CardDeck, InputGroup, FormControl, Tooltip, Modal, Table } from 'react-bootstrap';
import Header from "../Header/Header";
import Search from '../Search/Search';
import data from '../Listings/data';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { backendurl, rooturl } from '../../config/settings';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class Listings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listings: [],
            filteredListings: [],
            location_search: "",
            showModal: false,
            closeModal: true,
            showSubmitOfferModal: false,
            showOpenApplicationsModal: false,
            applications: [],
            numParkingSpots: "",
            furnished: "",
            petPolicy: "",
            smokingPolicy: "",
            listingType: "",
            rental_type: "",
            selected_listing: "",
            offer_sent: false,
            favoriteListings: [], 
            showOpenHouseModal: false,
            openHouseDate:"",
            bestOffer:""
        }
        this.filterListings = this.filterListings.bind(this)
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openSubmitOfferModal = this.openSubmitOfferModal.bind(this)
        this.openApplicationsModal = this.openApplicationsModal.bind(this)
        this.deleteListing = this.deleteListing.bind(this)
        // this.sendMyOffer = this.sendMyOffer.bind(this)
        this.addFavourite = this.addFavourite.bind(this)
        this.openOpenHouseModal = this.openOpenHouseModal.bind(this)
        this.scheduleOpenHouse = this.scheduleOpenHouse.bind(this)
        this.openHouseHandler = this.openHouseHandler.bind(this)
        this.submitOfferHandler = this.submitOfferHandler.bind(this)
        this.submitOffer = this.submitOffer.bind(this)
    }

    componentDidMount() {
        const applicationReceived = [
            {
                first_name: "Nakul",
                last_name: "Gupta",
                offer: "1234",
                status: 'pending'
            }
        ]

        // Cookies.set('session', true)
        // Cookies.set('user_type', "Renter")

        let location_data = "";
        let rental_type = "";
        console.log("user id from cookies", Cookies.get("user_id"))
        let user_id = (Cookies.get("user_id") === "" || typeof Cookies.get("user_id") === 'undefined') ? 0 : parseInt(Cookies.get("user_id"))
        console.log("user_id in listings did mount", user_id)
        if (typeof this.props.location.state.location_data !== 'undefined') {
            location_data = this.props.location.state.location_data
        }
        else if (typeof this.props.location.state.rental_type !== 'undefined') {
            rental_type = this.props.location.state.rental_type
        }
        console.log("listings location data", location_data)
        console.log("listings rental type", rental_type)

        axios.get('http://' + backendurl + 'listing/getListings')
            .then(response => {
                console.log("Status Code : ", response.data);
                let listings_arr = response.data

                axios.get('http://' + backendurl + 'favoritehomes/getFavoriteHomes', { params: { user_id: user_id } })
                    .then(response1 => {
                        console.log("Status Code getFavoriteHomes: ", response1.data);
                        if (response1.status === 200) {
                            console.log("data from login response", response1.data);
                            this.setState({
                                listings: listings_arr,
                                filteredListings: this.applyFilter(listings_arr, location_data, rental_type),
                                location_search: location_data,
                                applications: applicationReceived,
                                rental_type: rental_type,
                                favoriteListings: response1.data
                            })
                        }
                        else {
                            this.setState({
                                listings: listings_arr,
                                filteredListings: this.applyFilter(listings_arr, location_data, rental_type),
                                location_search: location_data,
                                applications: applicationReceived,
                                rental_type: rental_type
                            })
                        }

                    });


            });

        // let listings_arr = data.listings
        // this.setState({
        //     listings: listings_arr,
        //     filteredListings: this.applyFilter(listings_arr, location_data, rental_type),
        //     location_search: location_data,
        //     applications: applicationReceived,
        //     rental_type: rental_type
        // })


    }

    // sendMyOffer =(e) => {
    //     e.preventDefault();

    // }
    deleteListing = (e) => {
        e.preventDefault();
        let id = e.target.id
        console.log("delete id", e.target.id)
        const data = {
            id: e.target.id
        }

        let filtered_listings = []
        let all_listings = []

        this.state.filteredListings.map(listing => {
            if (listing.id !== id) {
                filtered_listings.push(listing)
            }
        })

        this.state.listings.map(listing => {
            if (listing.id !== id) {
                all_listings.push(listing)
            }
        })

        axios.post('http://' + backendurl + 'listing/deleteListing', null, { params: data })
            .then(response => {
                console.log("Status Code deletelisting: ", response);
                if (response.status === 200) {
                    console.log("data from deletelisting response", response.data);
                    this.setState({
                        filteredListings: filtered_listings,
                        listings: all_listings
                    })
                }
            });



    }

    addFavourite = (e) => {
        e.preventDefault();

        const data = {
            listing_id: parseInt(e.target.id),
            user_id: parseInt(Cookies.get("user_id")),
            user_type: Cookies.get("user_type")
        }

        console.log("addFavourite", data)
        axios.post('http://' + backendurl + 'favoritehomes/addFavoriteHome', null, { params: data })
            .then(response => {
                console.log("Status Code from favourite : ", response);
                this.setState({
                    favoriteListings: this.state.favoriteListings.concat(data)
                })

            });

    }

    scheduleOpenHouse = (e) => {
        e.preventDefault();
        let open_house_date = this.state.openHouseDate;
        let id = parseInt(e.target.id)
        const data = {
            app_type: "openHouse",
            buyer_id: 0,
            date: open_house_date,
            listing_id: id,
            price: this.state.selected_listing.price,
            seller_id: parseInt(Cookies.get("user_id")),
            status: "Pending"
        }

        console.log("data prep for open house api", data)
        axios.post('http://' + backendurl + 'application/submitApplication', null, { params: data })
        .then(response => {
            console.log("Status Code from openhouse : ", response);
            this.setState({
                showOpenHouseModal: false
            })

        });
    }

    submitOffer = (e) => {
        e.preventDefault();
        let bestOffer= parseInt(this.state.bestOffer);
        const data = {
            app_type: "offer",
            buyer_id: parseInt(Cookies.get("user_id")),
            date: "12/03/2020",
            listing_id: this.state.selected_listing.id,
            price: bestOffer,
            seller_id: 0,
            status: "Pending"
        }

        console.log("data prep for submit offer api", data)
        axios.post('http://' + backendurl + 'application/submitApplication', null, { params: data })
        .then(response => {
            console.log("Status Code from submit offer : ", response);
            this.setState({
                showSubmitOfferModal: false
            })

        });
    }

    filterListings = (filteredListings) => {
        this.setState({
            filteredListings: filteredListings
        })
    }

    applyFilter = (listings, location_data, rental_type) => {
        let filterd_listings = []

        listings.map(listing => {
            let forRent = listing.securityDeposit > 0 ? true : false
            const match =
                ((location_data === "" || typeof location_data === 'undefined') ? true :
                    ((typeof listing.city !== 'undefined' && listing.city.toUpperCase() === location_data.toUpperCase())
                        || (typeof listing.state !== 'undefined' && listing.state.toUpperCase() === location_data.toUpperCase())
                        || (typeof listing.country !== 'undefined' && listing.country.toUpperCase() === location_data.toUpperCase())
                        || (typeof listing.zipCode !== 'undefined' && listing.zipCode.toUpperCase() === location_data.toUpperCase())
                    ))
                && ((rental_type === "" || typeof rental_type === 'undefined') ? true :
                    forRent === rental_type);

            match && filterd_listings.push(listing);

        });

        return filterd_listings;
    }

    openHouseHandler = (e) => {
        this.setState({
            openHouseDate: e.target.value
        })
    }

    submitOfferHandler = (e) => {
        this.setState({
            bestOffer: e.target.value
        })
    }

    openModal = (e) => {
        e.preventDefault();
        let id = parseInt(e.target.id);
        console.log("id", id)
        let selected_listing = this.state.listings.filter(
            (t) => {
                if (t.id === id) {
                    return t
                }
            })
        this.setState({
            showModal: true,
            selected_listing: selected_listing.length > 0 ? selected_listing[0] : ""
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            showSubmitOfferModal: false,
            showOpenApplicationsModal: false,
            showOpenHouseModal:false
        })
    }

    openSubmitOfferModal = (e) => {
        let id = parseInt(e.target.id)
        let selected_listing = this.state.listings.filter(
            (t) => {
                if (t.id === id) {
                    return t
                }
            })
        this.setState({
            showSubmitOfferModal: true,
            selected_listing: selected_listing.length > 0 ? selected_listing[0] : ""
        })
    }

    openOpenHouseModal = (e) =>{
        let id = parseInt(e.target.id)
        let selected_listing = this.state.listings.filter(
            (t) => {
                if (t.id === id) {
                    return t
                }
            })
        this.setState({
            showOpenHouseModal: true,
            selected_listing: selected_listing.length > 0 ? selected_listing[0] : ""
        })
    }

    openApplicationsModal = () => {
        this.setState({
            showOpenApplicationsModal: true
        })
    }
    render() {
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Delete listing
            </Tooltip>
        );

        console.log("this.state.selected_listing", this.state.selected_listing)
        console.log("this.state.filteredListings", this.state.filteredListings)


        let details = this.state.filteredListings.map(listing => {
            let building_Num = listing.buildingNum ? listing.buildingNum + "," : ""
            let street_name = listing.streetName ? listing.streetName + "," : ""
            let listing_city = listing.city ? listing.city + "," : ""
            let selectedFav = this.state.favoriteListings.length > 0 ? this.state.favoriteListings.filter((t) => { return t.listing_id === listing.id }) : this.state.favoriteListings
            let isFavorite = this.state.favoriteListings.length === 0 ? false : selectedFav.length > 0 ? true : false
            console.log(isFavorite)
            return (
                <Col xs={4}>
                    <Card id={`listing-${listing.index}`} style={{ width: '24rem' }}>
                        <Card.Img src={`http://${rooturl}/${listing.id}.jpg`} style={{ height: '15rem' }}></Card.Img>
                        <Card.Body>
                            <Card.Title>{listing.title}</Card.Title>
                            <Row>
                                <Col xs={5}><NumberFormat
                                    value={listing.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                </Col>
                                <Col xs={7}>
                                    <p>
                                        {listing.numBeds} <i className="fas fa-bed" /> |
                                        {listing.numBaths} <i className="fas fa-bath" /> |
                                        <NumberFormat
                                            value={listing.squareFeet}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' sq ft'}
                                        />
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {building_Num}{street_name}{listing_city}{listing.state}
                                     </Col>
                                {/* <Col>
                                    <Button variant="link" size='sm' onClick={this.openModal}>More Details....</Button>
                                </Col> */}
                            </Row>
                            <br/>
                            <Row>
                                {Cookies.get('user_type') === 'Buyer' || Cookies.get('user_type') == 'Renter' ?
                                    <Col>
                                        <Button id={listing.id} variant='primary' size='sm' onClick={this.openSubmitOfferModal}>Submit Offer</Button>
                                    </Col>
                                    : <span />

                                }

                                {/* <Col><Button variant='primary' size='sm' onClick={this.openSubmitOfferModal}>Submit Offer</Button></Col> */}

                                {Cookies.get('user_type') === 'Seller' || Cookies.get('user_type') == 'Realtor' || Cookies.get('user_type') == 'Landlord' ?
                                    <Col><Button variant='primary' size='sm' onClick={this.openApplicationsModal}>Applications</Button></Col>
                                    : <span />
                                }

                                {Cookies.get('user_type') ?
                                    isFavorite ? <Col><Button id={listing.id} style={{ float: "right" }} variant='primary' size='sm' onClick={this.addFavourite} ><i id={listing.id} class="fas fa-heart" /></Button></Col> :

                                        <Col><Button id={listing.id} style={{ float: "right" }} variant='outline-primary' size='sm' onClick={this.addFavourite} ><i id={listing.id} class="fas fa-heart" /></Button></Col>
                                    : <span />
                                }

                                {Cookies.get('user_type') === 'Seller' || Cookies.get('user_type') == 'Realtor' || Cookies.get('user_type') == 'Landlord' ?
                                    <Col>
                                        <Link to={{
                                            pathname: '/createListings',
                                            state: {
                                                listing: listing
                                            }
                                        }}>
                                            <Button id={listing.id} style={{ float: "right" }} variant='primary' size='sm'><i id={listing.id} className="fas fa-edit" /></Button>
                                        </Link>
                                    </Col>
                                    : <span />
                                }



                                {Cookies.get('user_type') === 'Seller' || Cookies.get('user_type') == 'Realtor' || Cookies.get('user_type') == 'Landlord' ?
                                    <Col><Button id={listing.id} style={{ float: "right" }} variant='primary' size='sm' onClick={this.deleteListing}><i className="fas fa-trash-alt" /></Button></Col>
                                    : <span />
                                }
                            </Row>
                            <br/>
                            <Row>
                                <Col md={7}>{Cookies.get('user_type') === 'Seller' || Cookies.get('user_type') == 'Realtor' || Cookies.get('user_type') == 'Landlord' ?
                                    <Col><Button id={listing.id} variant='primary' size='sm'  onClick={this.openOpenHouseModal}block >Schedule Open house</Button></Col>
                                    : <span />
                                }
                                </Col>
                                <Col md={3}> 
                                <Button id={listing.id} variant="link" size='sm' onClick={this.openModal}>More details</Button>
                               </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br />
                </Col>


            )
        })
        return (
            <div>
                <Header />
                <Search
                    listings={this.state.listings}
                    onFilterChange={this.filterListings}
                    locationSearch={this.state.location_search}
                    rental_type={this.state.rental_type}
                />
                <br />
                <div className="listings">
                    <CardDeck>{details}</CardDeck>
                </div>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Additional Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Description: {this.state.selected_listing.description}</p>
                        <p>Parking: {this.state.selected_listing.numParkingSpots}</p>
                        <p>Furnished: {this.state.selected_listing.furnished ? "Yes" : "No"}</p>
                        <p>Pet Allowed: {this.state.selected_listing.petPolicy ? "Yes" : "No"}</p>
                        <p>Smoking Allowed: {this.state.selected_listing.smokingPolicy ? "Yes" : "No"}</p>
                        <p>House type: {this.state.selected_listing.listingType == 1 ? "Houses" :
                            this.state.selected_listing.listingType == 2 ? "Condos" :
                                this.state.selected_listing.listingType == 3 ? "Apartments" :
                                    "Town Houses"}
                        </p>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showSubmitOfferModal} onHide={this.closeModal} backdrop="static" keyboard="false">
                    <Modal.Header closeButton>
                        <Modal.Title>Submit your best offer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="My Best Offer" type="number" min="0" onChange={this.submitOfferHandler}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.submitOffer}>Send My Offer</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showOpenHouseModal} onHide={this.closeModal} backdrop="static" keyboard="false">
                    <Modal.Header closeButton>
                        <Modal.Title>Schedule Open house</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text> Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Please Input the date in MM/DD/YYYY" type="text" onChange={this.openHouseHandler}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button id={this.state.selected_listing.id} variant="primary" onClick={this.scheduleOpenHouse}>Schedule</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showOpenApplicationsModal} onHide={this.closeModal} backdrop="static" keyboard="false" size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Applications Recieved</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Offer</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.applications.map((app, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{app.first_name} {app.last_name}</td>
                                        <td>{app.offer}</td>
                                        <td>{app.status}</td>
                                        <td>{(app.status === 'approved') ? <span>Offer Approved</span> : <Button onClick={this.approveRequest} value={index} variant="outline-primary">Approve</Button>} &nbsp;&nbsp;&nbsp;&nbsp;</td>
                                        <td><Button onClick={this.deleteRequest} value={index} variant="danger">Reject Offer</Button></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Listings
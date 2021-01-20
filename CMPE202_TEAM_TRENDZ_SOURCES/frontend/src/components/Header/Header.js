import React, { Component } from 'react'
import { Button, Modal, Form, Navbar, Nav, Image, Tabs, Tab, Row, Container, Col } from 'react-bootstrap';
import '../../App.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { backendurl, rooturl } from '../../config/settings';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: false,
            modalShow: false,
            modalSignUp: false,
            email: "",
            password: "",
            newEmail: "",
            newPassword: "",
            first_name: "",
            last_name: "",
            user_type: "",
            successSignup: false,
            show: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.newEmailhandler = this.newEmailhandler.bind(this);
        this.newPasswordHandler = this.newPasswordHandler.bind(this);
        this.firstNameHandler = this.firstNameHandler.bind(this);
        this.lastNameHandler = this.lastNameHandler.bind(this);
        this.userTypeHandler = this.userTypeHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    componentDidMount() {
        // Cookies.set('session', true)
        //Cookies.set('user_type', "seller")
    }

    handleOpen() {
        if (Cookies.get('session') === "true") {
            // Add: Logout changes goes here
            // this.setState({
            //     session: false,
            //     modalShow: false,
            // })
            Cookies.set('session', false);
            this.props.history.push("/home")
        }
        else {
            this.setState({
                modalShow: true
            })
        }
    }

    handleClose() {
        this.setState({
            modalShow: false
        })
    }

    emailHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }


    firstNameHandler = (e) => {
        this.setState({
            first_name: e.target.value
        })
    }

    lastNameHandler = (e) => {
        this.setState({
            last_name: e.target.value
        })
    }

    newEmailhandler = (e) => {
        this.setState({
            newEmail: e.target.value
        })
    }

    newPasswordHandler = (e) => {
        this.setState({
            newPassword: e.target.value
        })
    }

    userTypeHandler = (e) => {
        this.setState({
            user_type: e.target.value
        })
    }

    loginHandler = (e) => {

        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        console.log("data set for login api", data)

        //set the with credentials to true
        //axios.defaults.withCredentials = true;

        // Delete below 2 lines and uncomment part below it when integrated with backend
        // Cookies.set('session', true)
        // Cookies.set('first_name', "Nakul")
        // Cookies.set('user_id', 1)
        // Cookies.set('user_type', "admin")


        axios.post('http://' + backendurl + 'login', null, { params: data })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("data from login response", response.data);

                    if (response.data.loginStatus === 'UNKNOWN_USER') {
                        this.setState({
                            // show: true,
                            email: '',
                            password: ''
                        })
                        alert("No such user found, Please try again with valid credentials")
                    }                    
                    else {
                        Cookies.set('session', true)
                        Cookies.set('user_type', response.data.user_type)
                        // Cookies.set('user_type', response.data.user_type)
                        Cookies.set('first_name', response.data.first_name)
                        Cookies.set('user_id', response.data.user_id)
                        // this.props.history.push('/');
                        alert("You have successfully logged in")
                        this.setState({
                            modalShow: false
                        })

                    }
                }



            });
    }

    submitNewUser = (e) => {
        e.preventDefault();
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.newEmail,
            password: this.state.newPassword,
            user_type: this.state.user_type
        }
        

        //set the with credentials to true
        //axios.defaults.withCredentials = true;
        console.log("data from form", data);
        axios.post('http://' + backendurl + 'user/register', null, { params: data })
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200) {

                    Cookies.set('session', true)
                    Cookies.set('user_id', response.data.id)
                    Cookies.set('first_name', response.data.first_name)
                    Cookies.set('user_type', response.data.user_type)
                    this.setState({
                        modalShow: false
                    })
                    alert("Your account has been created successfully!")
                } else {
                    this.setState({
                        authFlag: false
                    })
                }

            });
    }

    logoutHandler = (e) => {
        console.log("logout working fine")
        alert("Successfully logout")
        Cookies.set('session', false);
        Cookies.set('user_id', "");
        Cookies.set('user_type', "")
        Cookies.set('first_name', "")
        
        // this.props.history.push("/home")
    }


    render() {
        return (
            // <div className='headerdiv'>
            <div>
                <Navbar  fixed="top">
                    <Navbar.Brand>
                    <Link to="/home">
                                    <Image src={`http://${rooturl}/homeFinderLogo.png`} width="150px" height="130px" />
                                </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#buy"><Link to={{
                                pathname: '/allListings',
                                state: {
                                    rental_type: false
                                }
                            }}>
                                Buy
                                        </Link></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Nav.Link href="#rent"><Link to={{
                                pathname: '/allListings',
                                state: {
                                    rental_type: true
                                }
                            }}>
                                Rent
                                        </Link></Nav.Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Nav>
                        <Form inline>
                            {
                                (Cookies.get('session') === "true") && (Cookies.get('user_type') === "Admin") ?
                                    <Nav.Link eventKey="Admin"><Link to='/admin'>Users</Link></Nav.Link> :
                                    (Cookies.get('session') === "true") && (Cookies.get('user_type') === "Renter" || Cookies.get('user_type') === "Buyer") ?
                                        <Nav.Item>
                                            {/* <Nav.Link><Link to={{
                                                        pathname: '/allListings',
                                                        state: {
                                                            rental_type: false
                                                        }
                                                    }}>Listings</Link></Nav.Link> */}
                                            <span />
                                        </Nav.Item> :
                                        (Cookies.get('session') === "true") ?
                                            <Nav.Item>
                                                <Nav.Link><Link to={{
                                                    pathname: '/allListings',
                                                    state: {
                                                        rental_type: false
                                                    }
                                                }}>My Listings</Link></Nav.Link>
                                            </Nav.Item> :
                                            <Nav.Item></Nav.Item>
                            }

                            {
                                (Cookies.get('session') === "true") && (Cookies.get('user_type') === "Admin") ?
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </span> :
                                    (Cookies.get('session') === "true") && (Cookies.get('user_type') === "Renter" || Cookies.get('user_type') === "Buyer") ?
                                        <Nav.Item>
                                            <Nav.Link><Link to='/myApplications'>My Applications</Link></Nav.Link>
                                        </Nav.Item> :
                                        (Cookies.get('session') === "true") ?
                                            <Nav.Item>
                                                <Nav.Link><Link to={{
                                                    pathname: '/createListings',
                                                    state: {
                                                        rental_type: false
                                                    }
                                                }}>Add Listing </Link></Nav.Link>
                                            </Nav.Item> :
                                            <Nav.Item></Nav.Item>

                            }
                            {(Cookies.get('session') === "true") ?
                                <Nav.Item>
                                    <Nav.Link onClick={this.logoutHandler}>
                                        <Link to={{
                                            pathname: '/home'
                                        }}>
                                            Sign Out
                                        </Link></Nav.Link>
                                </Nav.Item>
                                :
                                <Nav.Item className="ml-auto" >
                                    <Nav.Link onClick={this.handleOpen}>Sign in</Nav.Link>
                                </Nav.Item>
                            }
                        </Form>
                    </Navbar.Collapse>
                </Navbar>

                <Modal show={this.state.modalShow && !(Cookies.get('session') === "true")} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Welcome to HomeFinder</Modal.Title>
                    </Modal.Header>
                    <Tabs defaultActiveKey="Signin" transition={false} id="noanim-tab-example">
                        <Tab eventKey="Signin" title="Sign in">
                            <div className="insideModal">
                                <Form onSubmit={this.loginHandler}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.emailHandler} required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Password" value={this.state.password} onChange={this.passwordHandler} required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" size="lg" block>
                                        Sign in
                                    </Button>

                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="newAccount" title="New Account">
                            <div className="insideModal">
                                <Form onSubmit={this.submitNewUser}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="name@example.com" onChange={this.newEmailhandler} required />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="create password" onChange={this.newPasswordHandler} required />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput3">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="firstName" placeholder="First Name" onChange={this.firstNameHandler} required />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput4">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="lastName" placeholder="Last Name" onChange={this.lastNameHandler} />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect5">
                                        <Form.Label>Who am I?</Form.Label>
                                        <Form.Control as="select" onChange={this.userTypeHandler} required>
                                            <option>Buyer</option>
                                            <option>Landlord</option>
                                            <option>Realtor</option>
                                            <option>Renter</option>
                                            <option>Seller</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" size="lg" block>
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </Tab>
                    </Tabs>
                </Modal>
            </div >
        )
    }
}

export default Header

import React, { Component } from 'react';
import '../../App.css';
import { Table, Button } from 'react-bootstrap';
// import {rooturl} from '../../config/settings';
import Header from "../Header/Header";
import axios from 'axios';
import { backendurl, rooturl } from '../../config/settings';


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

        this.deleteRequest = this.deleteRequest.bind(this);
        this.approveRequest = this.approveRequest. bind(this);
    }

    componentDidMount() {
        // const data = [
        //     {
        //         user_id:1,
        //         first_name: "Nakul",
        //         last_name: "Gupta",
        //         email: "test@xyz.com",
        //         status: 'pending'
        //     },
        //     {
        //         user_id:2,
        //         first_name: "Sam",
        //         last_name: "Mendes",
        //         email: "sam@xyz.com",
        //         status: 'pending'
        //     }
        // ]

        axios.get('http://' + backendurl + 'user/getAllUsers')
            .then(response => {
            console.log("Status Code in admin: ", response);
            this.setState({
                users: response.data
            })
        });  

    }

    deleteRequest = (e) => {
        console.log("in admin delete request")
        e.preventDefault();
        let user_id = parseInt(e.target.id)
        console.log("user_id", user_id)
        const data = {
            id: user_id
        }
        let filtered_users = []

        this.state.users.map(user => {
            if (user.id !== user_id){
                filtered_users.push(user)
            }
        })

        axios.post('http://' + backendurl + 'user/delete', null, { params: data })
            .then(response => {
                console.log("Status Code delete : ", response.status);
                if (response.status === 200) {
                    console.log("data from login response", response.data);
                }
            });

        console.log("admin users", filtered_users)
        this.setState({
            users: filtered_users
        })

    }

    approveRequest =(e) =>{
        e.preventDefault();
        let user_id = parseInt(e.target.id);
        // axios.post('http://' + backendurl + 'listing/getListings')
        //     .then(response => {
        //         console.log("Status Code : ", response.data);
        //         let listings_arr = response.data
        //         this.setState({
        //             listings: listings_arr,
        //             filteredListings: this.applyFilter(listings_arr, location_data, rental_type),
        //             location_search: location_data,
        //             applications: applicationReceived,
        //             rental_type: rental_type
        //         })
        //     });
        console.log("user_id", user_id)
        let selected_user = this.state.users.filter(
            (t) => {
                if (t.id === user_id) {
                    console.log("inside check admin")
                    t.status = "approved"
                }
            })
        console.log("admin users", this.state.users)
        this.setState({
            users: this.state.users
        })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="displayPage">
                    <br /><br />
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Email</th>
                                {/* <th>Status</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((u, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{u.first_name} {u.last_name}</td>
                                    <td>{u.email}</td>
                                    {/* <td>{(u.status === 'approved') ? <span>Approved</span> : <Button id={u.user_id} onClick={this.approveRequest} value={index} variant="outline-primary">Approve</Button>}</td> */}
                                    <td> 
                                <Button id={u.id} onClick={this.deleteRequest} value={index} variant="danger">Remove User</Button></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )

    }
}

export default Admin
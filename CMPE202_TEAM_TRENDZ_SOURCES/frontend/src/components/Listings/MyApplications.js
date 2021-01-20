import React, { Component } from 'react';
import '../../App.css';
import { Table, Button } from 'react-bootstrap';
// import {rooturl} from '../../config/settings';
import Header from "../Header/Header";
import axios from 'axios';
import { backendurl, rooturl } from '../../config/settings';
import Cookies from 'js-cookie';


class MyApplications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myApplications: []
        }

    }

    componentDidMount() {
        let user_id = parseInt(Cookies.get("user_id"))
        user_id = 2
        const data = [
            {
                buyer_id: 2
            }
        ]

        axios.get('http://' + backendurl + 'application/getMyApplications', {params:{buyer_id: user_id}})
            .then(response => {
                console.log("Status Code in myapplications: ", response);
                this.setState({
                    myApplications: response.data
                })
            });
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
                                <th>User Name</th>
                                <th>Application Date</th>
                                <th>Offer</th>
                                <th>Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.myApplications.map((app, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{Cookies.get("first_name")}</td>
                                    <td>{app.app_date}</td>
                                    <td>{app.price}</td>
                                    <td>{(app.status === 'Approved') ? <span>Offer Approved</span> : <Button onClick={this.approveRequest} value={index} variant="outline-primary">Approve</Button>} &nbsp;&nbsp;&nbsp;&nbsp;</td>
                                    {/* <td><Button onClick={this.deleteRequest} value={index} variant="danger">Reject Offer</Button></td> */}
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )

    }
}

export default MyApplications
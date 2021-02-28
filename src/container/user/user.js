
import React, { Component } from 'react'
import UserList from './UserList';

export default class Users extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mt-5 "></div>
                    <div class="card" style={{ marginBottom: 50 }}>
                        <h5 class="card-header d-flex justify-content-start">Data Users</h5>
                        <div class="card-body">
                            <UserList />
                        </div>
                    </div>

                </div>
            </div >
        )
    }
}

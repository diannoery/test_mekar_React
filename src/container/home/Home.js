import React, { Component } from 'react'


export default class Home extends Component {
    render() {
        return (
            <div>

                <div className="container-image">
                    <img className="image-home" alt="" />
                </div>
                <div className="container-fluid">
                    <h2>Selamat Datang Di Website Pengelolaan data</h2>
                    <div className="row d-flex justify-content-center ">
                        <img src="https://wallpaperaccess.com/full/1614778.jpg" style={{ width: 100, height: 100 }} />
                    </div>
                </div>

            </div>
        )
    }
}

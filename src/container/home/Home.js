import React, { Component } from 'react'

import Bg from '../../assets/cr.jpg'
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
                        <img src={Bg} style={{ width: 800, height: 300 }} />
                    </div>
                </div>

            </div>
        )
    }
}

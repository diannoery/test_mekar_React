

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, withRouter } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = (prop) => {
    const { logOut } = prop

    const styleLink = {
        color: "black",
        marginLeft: 10,
    };
    return (
        <div>
            <div className="">
                <Navbar className="navbar navbar-light bg-light justify-content-between">
                    <Navbar.Brand href="#home">Pengolahan Data</Navbar.Brand>
                    <Nav className="justify-content-end" >
                        <Nav.Item>
                            <Link style={styleLink} to="/">
                                Home
                                 </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link style={styleLink} to="/user">
                                User
                                 </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link style={styleLink} onClick={() => logOut()} >
                                LogOut
                                 </Link>
                        </Nav.Item>
                        <Nav.Item>
                        </Nav.Item>

                    </Nav>
                </Navbar>
            </div>

        </div>
    )

}

export default Header
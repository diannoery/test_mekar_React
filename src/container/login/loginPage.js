import React, { Component, useState, useEffect, } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Swal from 'sweetalert2';
import { loginAdmin, register } from '../../config/API';
import Bg from '../../assets/bg.jpg'

const LoginPage = (props) => {
    const { isLogin } = props
    const [formInput, setForm] = useState("Login");
    const [loginInput, setLogin] = useState({
        username: "",
        password: "",

    });
    const reset = () => {

        setLogin({
            ...loginInput,
            username: "",
            password: "",
        })

    }
    const onCangeInput = (name, value) => {

        setLogin({
            ...loginInput,
            [name]: value
        })
    }
    const onCangeForm = () => {

        if (formInput == "Login") {
            setForm("Register")
        } else {
            setForm("Login")
        }

    }
    const handleSubmit = () => {
        let login = {
            username: loginInput.username,
            password: loginInput.password
        }

        if (loginInput.username == "" || loginInput.password == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'username dan password tidak boleh kosong',

            })
        } else {
            if (formInput == "Login") {
                loginAdmin(login).then((res) => {
                    console.log(res.Data.token)
                    Swal.fire("", "berhasil login", "success");
                    isLogin(res.Data.token)
                }).catch(() => {
                    Swal.fire(
                        {
                            icon: 'error',
                            title: 'Oops...',
                            text: 'username dan password salah',

                        }

                    ).then(r => r.dismiss)


                })
                reset()

            } else {
                register(login).then((res) => {
                    console.log(res.Data.token)
                    Swal.fire("", "berhasil Register", "success");
                    setForm("Login")
                }).catch(() => {
                    Swal.fire(
                        {
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Gagal Register',

                        }

                    ).then(r => r.dismiss)


                })
                reset()
            }


            reset()
        }


    }



    return (
        <div >
            <div className="container-fluid" >

                <div className="row d-flex justify-content-center " style={{ marginTop: 50 }} >
                    <div class="card " style={{ width: " 18rem" }}>
                        <div class="card-header text-left">
                            {formInput == "Login" ? "LOGIN" : "REGISTER"}

                        </div>
                        <div class="card-body">

                            <Form className="text-left">
                                <FormGroup>
                                    <Label for="exampleEmail">USERNAME</Label>
                                    <Input type="text" name="username" placeholder="Username" onChange={(e) => onCangeInput(e.target.name, e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">PASSWORD</Label>
                                    <Input type="password" name="password" placeholder="Password" onChange={(e) => onCangeInput(e.target.name, e.target.value)} />
                                </FormGroup>

                                <div className="d-flex justify-content-center">
                                    <Button color={"success"} onClick={() => handleSubmit()} >Submit</Button>
                                </div>

                            </Form>
                            <p class="mb-1">
                                <a href="#" onClick={onCangeForm}>{formInput == "Login" ? "Register" : "Login"}</a>
                            </p>
                        </div>

                    </div>


                </div>

            </div>
        </div>
    )

}


export default LoginPage
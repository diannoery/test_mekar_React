import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import React, { useState, useEffect, useRef } from 'react';
import { addtUser, pekerjaan, pendidikan, updateUser } from '../config/API';
import Swal from 'sweetalert2';

const FormUser = (props) => {
    const { toggle, detail, form } = props
    const [pekerjaanList, setPekerjanList] = useState([]);
    const [pendidikanList, setPendidikanList] = useState([]);
    const [userInput, setUser] = useState({
        id: "",
        nik: "",
        nama: "",
        tglLahir: "",
        pekerjaan: "",
        pendidikan: "",
    });

    const onCangeInput = (name, value) => {
        console.log(name)
        console.log(value)
        setUser({
            ...userInput,
            [name]: value
        })
    }
    const reset = () => {
        setUser({
            ...userInput,
            id: "",
            nik: "",
            nama: "",
            tglLahir: "",
            pekerjaan: "",
            pendidikan: "",
        })
    }
    const handleSubmit = () => {
        let user = {
            user_id: userInput.id,
            nik: userInput.nik,
            nama: userInput.nama,
            tanggal_lahir: userInput.tglLahir,
            pekerjaan: { pekerjaan_id: userInput.pekerjaan },
            pendidikan_terakhir: { id_pendidikan: userInput.pendidikan }
        }

        console.log(user)
        if (form == "Edit") {
            updateUser(user).then((res) => {
                Swal.fire("", "Update User", "success");

            }).catch((e) => {
                Swal.fire("", "Update User", "error");
            })
        } else {
            addtUser(user).then((res) => {
                Swal.fire("", "Tambah User", "success");
                reset()

            }).catch((e) => {
                Swal.fire("", "Tambah User", "error");
            })
        }



    }

    const validationForm = () => {
        return (userInput.nik !== "" && userInput.nama !== "" && userInput.tglLahir !== "" && userInput.pekerjaan !== "" && userInput.pendidikan !== "")
    }
    const loadDataPekerjan = () => {
        pekerjaan().then((res) => {
            setPekerjanList(res.Data);

        });

    };
    const loadDataPendidikan = () => {
        pendidikan().then((res) => {
            setPendidikanList(res.Data);

        });

    };
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const prevEditedData = usePrevious({ detail });
    useEffect(() => {
        if (prevEditedData !== detail && Object.keys(detail).length !== 0) {
            setUser({
                ...userInput,
                id: detail.user_id,
                nik: detail.nik,
                nama: detail.nama,
                tglLahir: detail.tanggal_lahir,
                pekerjaan: detail.pekerjaan.pekerjaan_id,
                pendidikan: detail.pendidikan_terakhir.id_pendidikan,
            })
            loadDataPekerjan();
            loadDataPendidikan();
        } else {
            reset()
            loadDataPekerjan();
            loadDataPendidikan();
        }



    }, []);

    const listPekerjaan = pekerjaanList.map((list) => (

        form === "Detail" ? < option selected value={detail.pekerjaan.pekerjaan_id} > {detail.pekerjaan.pekerjaan} </option > :
            < option value={list.pekerjaan_id} > {list.pekerjaan} </option >
    ))
    const listPendidikan = pendidikanList.map((list) => (

        form === "Detail" ? <option selected value={detail.pendidikan_terakhir.id_pendidikan} > {detail.pendidikan_terakhir.pendidikan} </option> :
            <option value={list.id_pendidikan} > {list.pendidikan} </option>
    ))
    return (
        <div>

            <Form>
                <FormGroup>

                    <Label for="exampleEmail">NIK</Label>
                    <Input type="number" name="nik" value={userInput.nik} onChange={e => onCangeInput(e.target.name, e.target.value)} id="exampleEmail" placeholder="Masukan NIK" disabled={form === "Detail"} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">NAMA</Label>
                    <Input type="text" name="nama" value={userInput.nama} onChange={e => onCangeInput(e.target.name, e.target.value)} placeholder="Masukan Nama Lengkap" disabled={form === "Detail"} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">TANGGAL LAHIR</Label>
                    <Input type="date" name="tglLahir" value={userInput.tglLahir} onChange={e => onCangeInput(e.target.name, e.target.value)} placeholder="Tanggal lahir" disabled={form === "Detail"} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">PEKERJAAN</Label>
                    <Input type="select" value={userInput.pekerjaan} name="pekerjaan" disabled={form === "Detail"} id="exampleSelect" onChange={e => onCangeInput(e.target.name, e.target.value)}>
                        <option  >Pilih Pekerjaan</option>
                        {listPekerjaan}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">PENDIDIKAN</Label>
                    <Input type="select" value={userInput.pendidikan} name="pendidikan" disabled={form === "Detail"} id="exampleSelect" onChange={e => onCangeInput(e.target.name, e.target.value)}>
                        <option  >Pilih Pendidikan</option>
                        {listPendidikan}
                    </Input>
                </FormGroup>
                <Input type="text" hidden value={userInput.user_id} name="id" onChange={e => onCangeInput(e.target.name, e.target.value)} />
                <div className="d-flex justify-content-center">
                    {form == "Detail" ? "" : <Button disabled={!validationForm()} onClick={() => handleSubmit()} color={"success"} >Submit</Button>}
                </div>

            </Form>
        </div>
    )
}

export default FormUser
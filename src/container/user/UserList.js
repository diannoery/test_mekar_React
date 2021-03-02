import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faEdit, faInfoCircle, faPlusSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from 'react-bootstrap'
import { addtUser, deleteUser, getUser } from '../../config/API';
import ModalUser from '../../components/ModalInfoUser';
import LoadingPage from '../../assets/loading.gif'
import Swal from 'sweetalert2';
const UserList = (props) => {
    const { userPage } = props
    const [userList, setUserList] = useState([]);
    const [showDetail, setShowDetail] = useState(false)
    const [formType, setFormType] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [userDetail, setUserDetail] = useState({})

    const loadData = () => {
        // getUser().then((res) => {
        //     setUserList(res.Data);
        //     setLoading(true)
        // });

        if (userPage != null) {
            setLoading(true)
        }
    };

    useEffect(() => {

        loadData();

    }, [userPage]);

    const detailUser = (list, detail) => {


        setUserDetail(list)
        setFormType(detail)
        setShowDetail(true)


    }

    const AddUser = () => {
        setShowDetail(true)
    }

    const closeModal = () => {
        setUserDetail({})
        setFormType("")
        setShowDetail(false)
    }

    const deleteUserById = (id) => {
        Swal.fire({
            title: 'Apa Kamu Yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                deleteUser(id).then((response) => {
                    console.log(response)
                    if (response.statusCode === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then(r => r.dismiss)
                        loadData()
                    }
                }).catch(() => {
                    Swal.fire(
                        'Error!',
                        'Error Deleted File',
                        'error'
                    ).then(r => r.dismiss)
                })
            }
        })
    }


    const user = userPage.map((list) => (
        <tr>
            <td> {list.nik} </td>
            <td> {list.nama} </td>
            <td> {list.tanggal_lahir} </td>

            <td >
                <Button className="bg-success m-1 border-0" onClick={() => detailUser(list, "Edit")} ><FontAwesomeIcon icon={faEdit} /></Button>
                <Button className="bg-danger m-1 border-0" onClick={() => deleteUserById(list.user_id)} ><FontAwesomeIcon icon={faTrash} /></Button>
                <Button className="bg-primary m-1 border-0" onClick={() => detailUser(list, "Detail")} ><FontAwesomeIcon icon={faInfoCircle} /></Button>

            </td>
        </tr>
    ))
    return (
        <div className="container">
            <div className="row mt-4 mb-3 d-flex justify-content-end">
                <Button onClick={() => AddUser()} ><FontAwesomeIcon icon={faPlusSquare} /> USER </Button>
            </div>

            <div className="row d-flex justify-content-center">
                {isLoading ? <Table bordered >
                    <thead>
                        <tr>
                            <th >Nomor KTP</th>
                            <th >Nama</th>
                            <th >Tanggal Lahir</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user}
                    </tbody>
                </Table> :
                    <img src={LoadingPage} style={{ marginLeft: 180, alignContent: "center" }} />
                }

            </div>

            <ModalUser modal={showDetail} toggle={closeModal} detail={userDetail} form={formType} />
        </div>
    )

}

export default UserList
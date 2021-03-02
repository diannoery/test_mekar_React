
import React, { useState, useEffect } from 'react'
import UserList from './UserList';
import { Button, Container, Pagination } from "react-bootstrap";
import { getUserPage } from '../../config/API';
const Users = () => {
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState({
        currentPage: 1,
        firstPage: 1,
        lastPage: 0,
        totalData: 0,
        limit: 5
    })

    const loadData = () => {
        getUserPage(page.currentPage, page.limit).then((result) => {

            if (result.users === undefined) {
                setUserList([])
            } else {
                setUserList(result.users)
            }
            setPage({
                ...page,
                currentPage: result.metadata.currentPage,
                firstPage: result.metadata.firstPage,
                lastPage: result.metadata.lastPage,
                totalData: result.metadata.totalData
            })
        })
    }
    useEffect(() => {
        loadData()

    },// eslint-disable-next-line
        [page.currentPage])
    const pageClick = (i) => {
        if (i >= page.firstPage && i <= page.lastPage) {
            setPage({
                ...page,
                currentPage: i
            })
        }
    }
    let pagination = []
    for (let i = 1; i <= page.lastPage; i++) {
        if (i === page.currentPage) {
            pagination.push(<Pagination.Item active key={i}>{i}</Pagination.Item>)
        } else {
            pagination.push(<Pagination.Item key={i} onClick={() => pageClick(i)} >{i}</Pagination.Item>)
        }
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row mt-5 "></div>
                <div class="card" style={{ marginBottom: 50 }}>
                    <h5 class="card-header d-flex justify-content-start">Data Users</h5>
                    <div class="card-body">
                        <UserList userPage={userList} />
                    </div>
                    <div className="container-pagination d-flex justify-content-center">
                        <div className="container-pagination">
                            <Pagination>
                                <Pagination.First onClick={() => pageClick(page.currentPage - 1)} />
                                {pagination}
                                <Pagination.Last onClick={() => pageClick(page.currentPage + 1)} />
                            </Pagination>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )

}

export default Users
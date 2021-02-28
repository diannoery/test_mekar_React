

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormUser from './Form';

const ModalUser = (props) => {
    const { detail, modal, toggle, className, form } = props
    const header = form == "Detail" ? "Detail User" : form == "Edit" ? "Edit User" : "Add User"


    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{header}</ModalHeader>
                <ModalBody>
                    <FormUser hide={toggle} detail={detail} form={form} />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalUser
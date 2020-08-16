import React, { useState } from 'react';
import Modal from 'react-modal';

export const usersModal = ({ openUserDetails, closeUserModal, selectedUser }) => {

    return (
        <div className='modal-wrapper'>
            <Modal className='usermodal' isOpen={openUserDetails}>
                <div className='userdata'>
                    {selectedUser.email}
                    {selectedUser.name}
                    {selectedUser.first_name}
                    {selectedUser.last_name}
                    <img src={selectedUser.avatar} width="45" height="35" />
                </div>
                <button className='close-button' onClick={(e) => closeUserModal(false)} >Close</button>
            </Modal>
        </div>
    )
}
export default usersModal;
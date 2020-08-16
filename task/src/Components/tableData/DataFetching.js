import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Pagination from '../Pagination/Pagination'
import UsersModal from '../Modal/usersModal'


function Table() {
    const [posts, setPosts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState();
    const [currentPage, setCurrentpage] = useState(1);
    const [postsPerPage] = useState(4);
    const [totalUsers, setTotalUsers] = useState()
    const [openUserDetails, setOpenUserDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://reqres.in/api/users', {
                params: {
                    page: currentPage,
                    per_page: postsPerPage
                }
            })
            setPosts(response.data.data);
            setTotalUsers(response.data.total);
        }
        fetchData()
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost - indexOfLastPost)

    const searchResult = (event) => {
        let keyword = event.target.value;
        setSearchKeyword(keyword);
    }

    const openUserModel = (userInfo) => {
        setSelectedUser(userInfo);
        setOpenUserDetails(true);
        // alert(userInfo.email);
    }

    const getUsers = (currentPage) => {
        axios.get('https://reqres.in/api/users', {
            params: {
                page: currentPage,
                per_page: postsPerPage
            }
        }).then(response => {
            console.log(response)
            setPosts(response.data.data)
            setTotalUsers(response.data.total);
        }).catch(err => {
            console.log(err);
        });
    }

    const renderHeader = () => {
        let headerElement = ['id', 'email', 'Firstname', 'Lastname', 'avatar']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    // Change page
    const paginate = (pageNumber) => {
        // console.log("CurrentPage in parent" + pageNumber);
        setCurrentpage(pageNumber);
        getUsers(pageNumber);
    }

    const closeUserModal = () => {
        setOpenUserDetails(false);
    }
    const renderBody = () => {
        return posts && posts.filter((data) => {
            if (searchKeyword === undefined)
                return data
            else if (data.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                data.first_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                data.last_name.toLowerCase().includes(searchKeyword.toLowerCase()))
                return data;
        }).map(data => {
            return (
                < tr key={data.id} onClick={() => openUserModel(data)}>
                    <td>{data.id}</td>
                    <td>{data.email}</td>
                    <td>{data.first_name}</td>
                    <td>{data.last_name}</td>
                    <td><img src={data.avatar} width="45" height="35" /></td>
                </tr >
            )
        })
    }

    const getModal = () => {
        let userCurrentUser = (
            < UsersModal openUserDetails={openUserDetails} closeUserModal={closeUserModal} selectedUser={selectedUser} />
        );
        if (!openUserDetails) {
            userCurrentUser = (<div></div>)
        }
        return userCurrentUser;
    }
    return (
        <div>
            <h1 id='title'>React Table</h1>

            <input className='search' type="text" id="myInput" onChange={(e) => searchResult(e)} placeholder="Search...." title="Type in a name" />
                <br />
                <br />
            <table id='list'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            <Pagination postsPerPage={postsPerPage}
                totalPosts={totalUsers}
                paginate={paginate} />

            {getModal()}
        </div>
    )

} export default Table

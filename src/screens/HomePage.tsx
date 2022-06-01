import React,{ useEffect, useState, ChangeEvent} from "react";
import axios from "axios";
import User from '../components/User';
import { Pagination } from '@mui/material';
import '../styles/HomePageStyle.css';
import {BASE_URL} from '../utils/globalVar';
import {UsersType, UserType} from "../types/UserTyps";

function HomePage(){
  const [users, setUsers] = useState<UsersType>({});
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() =>{
    getUsers();
  },[]);

  const getUsers = () => {
    axios.get(`${BASE_URL}/users`).then(data => {
      setPageCount(data.data.usersLength);
      getUser(0);
    }).catch(err => setError(true))
  }

  const getUser = (page: number) => {
    setIsLoading(true)
    axios.get(`${BASE_URL}/user/${page}`)
      .then(data => {
        setUsers({...users, [page]: data.data.user});
        setCurrentUser(data.data.user);
        setIsLoading(false);
      })
      .catch(err => setError(true))
  }

  const onChangePage = (event: ChangeEvent<unknown>, page: number) => {
    const newPage = page - 1;
    if(newPage in users ){
      setCurrentUser(users[newPage])
    }else{
      getUser(newPage);
    }
  };

  if (error){
    return <h1>Sorry, there was a problem.. please try again later </h1>
  }

  return(
    <div className="Home-page-container">
      {isLoading && <div className="loader"></div>}
      {currentUser && <User user={currentUser}/>}
      <Pagination className="pagination" color="primary" count={pageCount} onChange={onChangePage}/>
    </div>
  )
}


export default HomePage;

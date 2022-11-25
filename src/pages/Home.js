import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaEye, FaPencilAlt } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import "../App.css"
export default function Home() {

    const [books, setBooks] = useState([]);
    const [filterVal, setFilterVal] = useState();
    const [searchData, setSearchData] = useState([]);
    const {isbn} = useParams();
    useEffect(()=>{
        loadUsers();
    }, []);

    const loadUsers = async() => {
        const result = await axios.get("http://localhost:8081/books");
        setBooks(result.data);
        setSearchData(result.data);
        console.log(result.data);
    }
    const deleteUser = async(isbn) => {
      await axios.delete(`http://localhost:8081/book/${isbn}`);
      loadUsers();
    }
    // const handleFilter = (e) =>{

    //   setUsers(users);
    //   setSearchData(searchData);
    //   if(e.target.value == ''){
    //     setUsers(searchData);
    //   } else {
    //     const filterResult = searchData.filter(item => item.toLowerCase().includes(e.target.value.toLowerCase()));
    //     setUsers(filterResult);
    //   }
    //   setFilterVal(e.target.value);  
   
    // }

  return ( 
    <div className='container'>
        <div className='py-4'>
       
        <table className="table border shadow">
  <thead>
    <tr>
 
      <th scope="col" className='text1'>ISBN</th>
      <th scope="col" className='text1'>Title</th>
      <th scope="col" className='text1'>Author</th>
      <th scope="col" className='text1'>Page no.</th>
      <th scope="col" className='text1'>Notes</th>
      <th scope='col' className='text1'>Status</th>
      <th scope="col" className='text1'>Action</th>
      
      
    </tr>
  </thead>
  <tbody>
    {
        books.map((book, index) => (
            <tr>
                
                <td className='text2'>{book.isbn}</td>
                <td className='text2'>{book.title}</td>
                <td className='text2'>{book.author}</td>
                <td className='text2'>{book.totalPageNo}</td>
                <td className='text2'>{book.notes}</td>
                <td className='text2'>{book.status}</td>
                <td>
                    <Link className='btn btn-primary mx-2'  to={`viewBook/${book.isbn}`}><FaEye /></Link>
                    <Link className='btn btn-outline-primary mx-2' to={`/editBook/${book.id}`}><FaPencilAlt /></Link>
                    <button
                     onClick = {()=> deleteUser(book.isbn)} 
                     className='btn btn-danger mx-2'><MdDeleteForever /></button>
                </td>
             </tr>
        ))
    }
   
    
  </tbody>
</table>
        </div>
    </div>
  )
}

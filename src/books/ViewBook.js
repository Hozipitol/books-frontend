import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewBook() {

    const [book, setBook] = useState({
        isbn: "",
        title: "",
        author: "",
        totalPageNo: "",
        notes: "",
        status: ""
    })

    const {isbn} = useParams();

    useEffect(()=>{
        loadUser();
    }, [])

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8081/book/${isbn}`)
        console.log(result.data);
        setBook(result.data);
    }
  return (
    <div className='container'>
    <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4 text1'>Book Details</h2>

                <div className='card'>
                    <div className='card-header text3' > 
                    Details of Book: <ul className='list-group list-group-flush'>
                        <li className='list-group-item text4'><b className='text1'>ISBN:</b>{book.isbn}</li>
                         <li className='list-group-item text4'><b className='text1'>Title:</b>{book.title}</li>
                         <li className='list-group-item text4'><b className='text1'>Author:</b>{book.author}</li>
                         <li className='list-group-item text4'><b className='text1'>Total Number of Pages:</b>{book.totalPageNo}</li>
                         <li className='list-group-item text4'><b className='text1'>Notes:</b>{book.notes}</li>
                         <li className='list-group-item text4'><b className='text1'>Status:</b>{book.status}</li>
                    </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to="/">Back to Home</Link>
        </div>
    </div>
    </div>

  )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import "../App.css"
 
 export default function EditBook() {


    let navigate = useNavigate();
    const {id} = useParams();

    const [book, setBook] = useState({
        isbn: "",
        title: "",
        author: "",
        totalPageNo: "",
        notes: "",
        status:""
    })

    const{isbn,title,author,totalPageNo,notes,status} = book;


    const onInputChange = (e) => {
        setBook({...book,[e.target.name]: e.target.value});
    }; 
    useEffect(()=> {
        loadUser();
    }, []);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/book/${id}`, book);
        navigate("/");


    }

    const loadUser = async () => {
        // const result = await axios.get(`http://localhost:8081/user/${id}`)
        // console.log(result);
        // setBook(result.data);
        const result = await axios.get(`http://localhost:8081/books/${id}`)
        console.log(result.data);
        setBook(result.data);
    }
    
   return (
     <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center text1 m-4'>Ayy, What do you wanna change!!</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='ISBN' className='form-label text1'>
                            ISBN
                        </label>
                        <input
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Enter ISBN of the Book'
                        name="isbn"
                        value={isbn}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Title' className='form-label text1'>
                            Title
                        </label>
                        <input
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Enter Title of the Book'
                        name="title"
                        value={title}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Author' className='form-label text1'>
                            Author
                        </label>
                        <input
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Enter the name of the author'
                        name="author"
                        value={author}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='TotalPageNo' className='form-label text1'>
                            No. of Pages
                        </label>
                        <input
                        type = {"text"}
                        className="form-control text2"
                        placeholder='How long it was'
                        name="totalPageNo"
                        value={totalPageNo}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Notes' className='form-label text1'>
                            Notes
                        </label>
                        <input
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Something about the book you wanna say?!'
                        name="notes"
                        value={notes}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Notes' className='form-label text1'>
                            Status
                        </label>
                        <input
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Anyy updates?'
                        name="status"
                        value={status}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <button type='submit' className='btn btn-outline-primary text1'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2 text2' to='/'>Cancel</Link>
                    </form>
            </div>
        </div>
     </div>
   )
 }
 
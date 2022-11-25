import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

 
 export default function AddBook() {

    let navigate = useNavigate();
  

    const initialValues = {
    isbn: "",
    title: "",
    author: "",
    totalPageNo: "",
    notes: "",
    status: ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


 


    const onInputChange = (e) => {
        const { name, value } = e.target; 
        setFormValues({...formValues,[name]: value});
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));       
        if(Object.keys(formErrors).length === 0){
            setIsSubmit(false);
        
        }
        if(setIsSubmit){
       await axios.post("http://localhost:8081/book", formValues);
        
        navigate("/");
        }

    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formValues);
        }
      }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$| (?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?↵ [0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
            
        if (!values.title) {
          errors.username = "Title is required!";
        }
        if (!values.status) {
            errors.username = "Status is required!";
          }
        if (!values.author) {
            errors.author = "Author is required!";
          }
        // if (!values.isbn) {
        //     errors.isbn = "Username is required!";
        //   }
        if (!values.notes) {
            errors.notes = "Notes is required!";
          }
          if (!values.totalPageNo) {
            errors.totalPageNo = "Total number of pages are required!";
          }
        // if (!values.isbn) {
        //   errors.isbn = "Email is required!";
        // } else if (!regex.test(values.email)) {
        //   errors.isbn = "This is not a valid email format!";
        // }
        if (!regex.test(values.isbn)) {
            // Remove non ISBN digits, then split into an array
            var chars = values.isbn.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");

      
            // Remove the final ISBN digit from `chars`, and assign it to `last`
            var last = chars.pop();
            // console.log(last);
            var sum = 0;
            var check, i;
        
            // eslint-disable-next-line eqeqeq
            if (chars.length == 9) {
                // Compute the ISBN-10 check digit
                chars.reverse();
                for (i = 0; i < chars.length; i++) {
                    sum += (i + 2) * parseInt(chars[i], 10);
                }
                check = 11 - (sum % 11);
                // eslint-disable-next-line eqeqeq
                if (check == 10) {
                    check = "X";
                // eslint-disable-next-line eqeqeq
                } else if (check == 11) {
                    check = "0";
                }
            } else {
                // Compute the ISBN-13 check digit
                for (i = 0; i < chars.length; i++) {
                    sum += (i % 2 * 2 + 1) * parseInt(chars[i], 10);
                }
                check = 10 - (sum % 10);
                if (check == 10) {
                    check = "0";
                }
            }
        
            // eslint-disable-next-line eqeqeq
            if (check != last) {
                errors.isbn = "Invalid ISBN check digit";
            }
        } else {
            errors.isbn = "Invalid ISBN";
        }
        // if (!values.isbn) {
        //   errors.isbn = "Password is required";
        // } else if (values.isbn.length < 9) {
        //   errors.isbn = "Password must be more than 9 characters";
        // } else if (values.isbn.length > 13) {
        //   errors.isbn = "Password cannot exceed more than 13 characters";
        // }
        return errors;
      };
    
   return (
     <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4 text3'>Woah, Read Something new! Add here</h2>
                    {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <div className="ui message success text1">Submitted your book</div>
                    ) : (
                        <div className="ui message success text1">Please fill all the fields correctly</div>
                    )}
                    <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='ISBN' className='form-label text1'>
                            ISBN
                        </label>
                        <input
                        required
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Enter ISBN of the Book'
                        name="isbn"
                        value={formValues.isbn}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <p>{formErrors.isbn}</p>
                    <div className='mb-3'>
                        <label htmlFor='Title' className='form-label text1'>
                            Title
                        </label>
                        <input
                        required
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Enter Title of the Book'
                        name="title"
                        value={formValues.title}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <p>{formErrors.title}</p>
                    <div className='mb-3'>
                        <label htmlFor='Author' className='form-label text1'>
                            Author
                        </label>
                        <input
                        required
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Enter the name of the author'
                        name="author"
                        value={formValues.author}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <p>{formErrors.author}</p>
                    <div className='mb-3'>
                        <label htmlFor='TotalPageNo' className='form-label text1'>
                            No. of Pages
                        </label>
                        <input
                        required
                        type = {"text"}
                        className="form-control text2"
                        placeholder='How long it was'
                        name="totalPageNo"
                        value={formValues.totalPageNo}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <p>{formErrors.totalPageNo}</p>
                    <div className='mb-3'>
                        <label htmlFor='Notes' className='form-label text1'>
                            Notes
                        </label>
                        <input
                        required
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Something about the book you wanna say?!'
                        name="notes"
                        value={formValues.notes}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <p>{formErrors.notes}</p>
                    <div className='mb-3'>
                        <label htmlFor='Notes' className='form-label text1'>
                            Status
                        </label>
                        <input
                        required
                        type = {"text"}
                        className="form-control text2"
                        placeholder='Tell us'
                        name="status"
                        value={formValues.status}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to='/'>Cancel</Link>
                    
                    </form>
            </div>
        </div>
     </div>
   )
 }
 
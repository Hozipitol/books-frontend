import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
     <div className="container-fluid">
    <Link className="navbar-brand text3" to="/" >Book Inventory</Link>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>  */}
    <Link className='btn btn-outline-light text1' to="/addBook"> Add Book</Link>
    </div>
</nav>
    </div>
  ) 
}

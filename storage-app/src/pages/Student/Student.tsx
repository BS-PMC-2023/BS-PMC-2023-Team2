import React from 'react'
import './Student.css'
import { Link } from "react-router-dom";

const Student = () => {

  return (
    <div>
      <h1>Welcome to the Order page</h1>
      <Link to="/Student/AddOrder">
        <button>Personal</button>
      </Link>
      <Link to="/Student/AddOrderGroup">
        <button>Group</button>
      </Link>
    </div>
  )
}

export default Student

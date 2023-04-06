import React from 'react'
import './Admin.css'
import AddProduct from '../../components/AddProduct/AddProduct';
import Summery from '../../components/Summery/Summery';


const Admin = () => {
  return (
    <div className="Box">
      <AddProduct />
      <br />
      <Summery />
    </div>
  )
}

export default Admin
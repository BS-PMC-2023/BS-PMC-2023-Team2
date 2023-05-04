import React from 'react'
import './Admin.css'
import AddProduct from '../../components/AddProduct/AddProduct';
import Summery from '../../components/Summery/Summery';
import Exl from '../../components/Exl/Exl';
import FoultyItems from '../../components/FoultyItems/FoultyItems';


const Admin = () => {
  return (
    <div className="Box">
      <h1>Welcome to the Admin page</h1>
      <h2>To add product to the storage</h2>
      <AddProduct />
      <br />
      <h2>To show the summery of the storage</h2>
      <Summery />
      <br />
      
      <Exl />
      <br />
      <FoultyItems />
    </div>
  )
}

export default Admin

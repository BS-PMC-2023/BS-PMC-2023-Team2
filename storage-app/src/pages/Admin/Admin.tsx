import React from 'react'
import './Admin.css'
import AddProduct from '../../components/AddProduct/AddProduct';
import Summery from '../../components/Summery/Summery';
import Exl from '../../components/Exl/Exl';
import FoultyItems from '../../components/FoultyItems/FoultyItems';


const Admin = () => {
  return (
    <div className="Box">
      <AddProduct />
      <br />
      <Summery />
      <br />
      <Exl />
      <br />
      <FoultyItems />
    </div>
  )
}

export default Admin
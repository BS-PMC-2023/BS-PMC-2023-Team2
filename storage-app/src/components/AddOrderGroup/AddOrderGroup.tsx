import React, { useState } from 'react';
import './AddOrderGroup.css';
import Policy from '../Policy/Policy';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Message from '../Message/Message';


interface Order {
  type: string;
  itemName: string;
  groupMember: string,
  fromDate: string;
  toDate: string;
}

const AddOrderGroup: React.FC = () => {
  const navigate = useNavigate();
  const [wobble, setWobble] = useState(0);

  const [product, setProduct] = useState<Order>({
    type: "",
    itemName: "",
    groupMember: "",
    fromDate: "",
    toDate: "",
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:${process.env.REACT_APP_URL}/item/addNewItem`,
        { product },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setWobble(1);
      setTimeout(() => {
        navigate("/");
      }, 6000);
    } catch (err) {
      console.error("problem");
    }
  };

  return (
    <div className="add-order">
      <Message wobble={wobble} setWobble={setWobble} />
      <h2>Add Order</h2>
      <div>
        <label htmlFor="Kind">Item Type:</label>
        <select>
          <option value="Camera" >Camera</option>
          <option value="Mic">Mic</option>
          <option value="Ipad">Ipad</option>
          <option value="Tripod">Tripod</option>
        </select>
        <br />
        <label>
          Order Manager
          <input type="text" onChange={handleChange} />
        </label>
        <br />
        <label>
          Group Members
          <input type="box" onChange={handleChange} />
        </label>
        <br />
        <label>
          From Date:
          <input type="Date" value={product.fromDate} onChange={handleChange} />
        </label>
        <br />
        <label>
          To Date:
          <input type="Date" value={product.toDate} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>Order</button>
        <br />
        <br />
        <Policy />
      </div>
    </div>
  );
}

export default AddOrderGroup



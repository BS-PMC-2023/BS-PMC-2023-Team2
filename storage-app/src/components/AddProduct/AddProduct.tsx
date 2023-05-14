import React, { useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from "../Message/Message";

interface IItem {
  serialNumber: string;
  itemName: string;
  condition: number; // true: works well, false: broken
  kind: string;
  // subItems: ISubItem[]
  subItems: string;
}

const AddProduct = () => {
  const navigate = useNavigate();
  const [wobble, setWobble] = useState(0);
  const [product, setProduct] = useState<IItem>({
    serialNumber: "",
    itemName: "",
    kind: "Camera",
    condition: 0,
    subItems: "",
  });

  const handleChange = (
    event: any
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
    <div className="add-product">
      <Message wobble={wobble} setWobble={setWobble} />
      <label htmlFor="Kind">Kind:</label>
      <select onChange={handleChange} name="kind" >
        <option value="Camera">Camera</option>
        <option value="Mic">Mic</option>
        <option value="Ipad">Ipad</option>
        <option value="Tripod">Tripod</option>
      </select>
      <label htmlFor="itemName">Item Name:</label>
      <input
        type="text"
        id="itemName"
        name="itemName"
        value={product.itemName}
        onChange={handleChange}
      />

      <label htmlFor="serialNumber">Serial Number:</label>
      <input
        type="text"
        id="serialNumber"
        name="serialNumber"
        value={product.serialNumber}
        onChange={handleChange}
      />

      <label htmlFor="condition">Condition:</label>
      <select name="condition" onChange={handleChange}>
        <option value={0}>OK</option>
        <option value={1}>Fauly</option>
      </select>
      
      <button type="submit" onClick={handleSubmit}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;

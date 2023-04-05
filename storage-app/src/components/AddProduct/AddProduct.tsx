import React, { useState } from "react";
import "./AddProduct.css";
import { log } from "console";
import axios from "axios";

interface IItem {
  serialNumber: string;
  itemName: string;
  condition: boolean; // true: works well, false: broken
  kind: string;
  // subItems: ISubItem[]
  subItems: string;
}

const AddProduct = () => {
  const [product, setProduct] = useState<IItem>({
    serialNumber: "",
    itemName: "",
    kind: "Camera",
    condition: true,
    subItems: "",
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
    } catch (err) {
      console.error("problem");
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      {/* <form onSubmit={handleSubmit}> */}
        <label htmlFor="Kind">Kind:</label>
        <select>
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
        <select>
          <option value="">True</option>
          <option value="">False</option>
        </select>

        <label htmlFor="subItems">SubItems:</label>
        <input
          type="text"
          id="subItems"
          name="subItems"
          value={product.subItems}
          onChange={handleChange}
        />

        <button type="submit" onClick={handleSubmit}>
          Add Product
        </button>
      {/* </form> */}
    </div>
  );
};

export default AddProduct;

import React, { useState } from "react";
import "./AddProduct.css"; 

interface IItem {
    serialNumber: string;
    itemName: string;
    condition: boolean; // true: works well, false: broken 
    //subItems: ISubItem[]
    subItems: string;
}

const AddProduct = () => {
  const [product, setProduct] = useState<IItem>({
    serialNumber: "",
    itemName: "",
    condition: true,
    subItems: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(product);
    
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="condition">condition:</label>
        <select>
            <option value = "">True</option>
            <option value = "">False</option>
        </select>
        {/* <input 
          type="radio"
          id="condition"
          name="condition"
          onChange={handleChange}
        /> */}

        <label htmlFor="subItems">subItems:</label>
        <input
          type="text"
          id="subItems"
          name="subItems"
          value={product.subItems}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;

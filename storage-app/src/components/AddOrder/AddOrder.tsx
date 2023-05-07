import React, { useState } from "react";
import "./AddOrder.css";
import Policy from "../Policy/Policy";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddOrder.css";
import { IItem } from "../../interfaces/interfaces";
import { log } from "console";
interface Order {
  type: string;
  fromDate: string;
  toDate: string;
}

const AddOrder: React.FC = () => {
  const navigate = useNavigate();
  const [wobble, setWobble] = useState(0);
  const [AvilabilityP, setAvilabilityP] = useState<IItem[]>([]);
  const [product, setProduct] = useState<Order>({
    type: "Camera",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const avlItems = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/item/getAvailableItems`,
        { params: { product: product } }
      );
      setAvilabilityP(avlItems.data.items);

      // setTimeout(() => {
      //   navigate("/");
      // }, 6000);
    } catch (err) {
      console.error("problem");
    }
  };

  return (
    <div className="add-order">
      <h2>Add Order</h2>
      <div>
        <label htmlFor="Kind">Item Type:</label>

        <select onChange={handleChange} value={product.type} name="type">
          <option value="Camera">Camera</option>
          <option value="Mic">Mic</option>
          <option value="Ipad">Ipad</option>
          <option value="Tripod">Tripod</option>
        </select>
        <br />
        <div className="dates">
          <label>
            From Date:
            <input
              type="Date"
              value={product.fromDate}
              name="fromDate"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            To Date:
            <input
              type="Date"
              min={product.fromDate}
              value={product.toDate}
              name="toDate"
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Check Avilability
        </button>

        <span className="prodMap">
          {AvilabilityP &&
            AvilabilityP.map((prod) => (
              <div className="prodCont">
                <p>{prod.kind}</p>
                <p>{prod.itemName}</p>
              </div>
            ))}
        </span>
        <br />
        <br />
        <br />
        <Policy />
      </div>
    </div>
  );
};

export default AddOrder;

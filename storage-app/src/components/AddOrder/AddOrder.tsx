import React, { useState } from "react";
import "./AddOrder.css";
import Policy from "../Policy/Policy";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddOrder.css";
import { IItem } from "../../interfaces/interfaces";
import { log } from "console";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/Store";
interface Order {
  type: string;
  fromDate: string;
  toDate: string;
}

const AddOrder: React.FC = () => {
  const user = useAppSelector(state => state.user)
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

  const handleOrder = async (prod: any) => {
    try {
      const obj = {
        itemName: prod.kind,
        DateFrom: product.fromDate,
        DateTo: product.toDate,
      }
      const order = await axios.post(`http://localhost:${process.env.REACT_APP_URL}/order/makeOrder`, {
        obj
      }, { headers: {
        token: user.token
      }})
      alert("The Order Has Received 👍🏼")
      navigate('/Student/studentGetOrders')
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const waitingList = async () => {
    alert("we added the order to the waiting list");

    navigate("/student");
  };

  return (
    <div className="add-order">
      <h2>Make a Reservation 📩</h2>
      <div>
        <span className="Updates">
          <label htmlFor="Kind">Item Type:</label>

          <select onChange={handleChange} value={product.type} name="type">
            <option value="Camera">Camera</option>
            <option value="Mic">Mic</option>
            <option value="Ipad">Ipad</option>
            <option value="Tripod">Tripod</option>
          </select>
        </span>
        <br />
        <span className="dates">
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
        </span>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Check Avilability
        </button>

        <span className="prodMap">
          {AvilabilityP &&
            AvilabilityP.map((prod) => (
              <div className="prodCont" onClick={() => handleOrder(prod)}>
                <p>{prod.kind}</p>
                <p>{prod.itemName}</p>
              </div>
            ))}
        </span>
        <br />
        {AvilabilityP && (
          <span className="WaitingList">
            <p>didn't find what you look for? 🤔</p>
            <button type="submit" onClick={waitingList}>
              Enter To Waiting list 📋
            </button>
          </span>
        )}
        <br />
        <Policy />
      </div>
    </div>
  );
};

export default AddOrder;

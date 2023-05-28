import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import "./ManageOrders.css";

const ManageOrders: FC = ({}) => {
  const [orders, setOrders] = useState<[]>();

  useEffect(() => {
    const getData = async () => {
      const ord: any = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/order/AdminGetOrders`
      );
      console.log(ord.data);

      setOrders(ord.data);
    };
    getData();
  }, []);

  const confirmOrder = async (item: any) => {
    if (window.confirm(`confirm ${item.student.FullName}'s order?`)) {
      try {
        await axios.post(
          `http://localhost:${process.env.REACT_APP_URL}/order/confirmOrder`,
          { item },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        alert("order has confirmed, you can find it on reservations section.");
        window.location.reload();
      } catch (error:any) {
        alert(error.message);
        console.log(error);
      }
    }
  };


  return (
    <div className="contManager">
      <h1>Manage The Orders Here</h1>
      {orders ? (
        <table className="table-fill">
          <thead>
            <tr>
              <th className="text-left">Student Name</th>
              <th className="text-left">Item Name</th>
              <th className="text-left">From</th>
              <th className="text-left">To </th>
              <th className="text-left">Condition</th>
              <th className="text-left">Confirm Order</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {orders.map((item: any) => (
              <tr key={item._id}>
                <td className="text-left">{item.student.FullName}</td>
                <td className="text-left">{item.itemName}</td>
                <td className="text-left">{item.DateFrom.split("T")[0]}</td>
                <td className="text-left">{item.DateTo.split("T")[0]}</td>
                <td className="text-left">
                  {item.status ? "Confirmed" : "Pending"}
                </td>
                <td className="text-left">
                  <button
                    className="ConfirmBtn"
                    onClick={() => confirmOrder(item)}
                  >
                    Confirm Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default ManageOrders;

import React, { FC, useEffect, useState } from "react";
import "./StudentOrders.css";
import axios from "axios";
import { useSelector } from "react-redux";

const StudentOrders: FC = ({}) => {
  const user = useSelector((state: any) => state.user);
  const [orders, setOrders] = useState<[]>();
  const [reservations, setreservations] = useState<[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:${process.env.REACT_APP_URL}/order/studentGetOrders`,
          {
            headers: {
              token: user.token,
            },
          }
        );
        setOrders(data.data.orders);
        setreservations(data.data.resWithItems);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="STCONT">
      <div className="inventory-summary">
        <h1>Your Orders:</h1>
        <div className="col">
          <table className="table-fill">
            <thead>
              <tr>
                <th className="text-left">Kind</th>
                <th className="text-left">from date</th>
                <th className="text-left">to date</th>
              </tr>
            </thead>
           {orders && (
              <tbody className="table-hover">
                {orders.map((item: any) => (
                  <tr key={item._id}>
                    <td className="text-left">{item.itemName}</td>
                    <td className="text-left">{item.DateFrom.split("T")[0]}</td>
                    <td className="text-left">{item.DateTo.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <div className="inventory-summary">
           <h1>Your Reservations:</h1>
        <div className="col">
          <table className="table-fill">
            <thead>
              <tr>
                <th className="text-left">Item Name</th>
                <th className="text-left">Kind</th>
                <th className="text-left">Serial Number</th>
                <th className="text-left">Return Date</th>
              </tr>
            </thead>
            {reservations && (
              <tbody className="table-hover">
                {reservations.map((item: any) => (
                  <tr key={item.itm.serialNumber}>
                    <td className="text-left">{item.itm.itemName}</td>
                    <td className="text-left">{item.itm.kind}</td>
                    <td className="text-left">{item.itm.serialNumber}</td>
                    <td className="text-left">
                      {item.rsv.DateTo.split('T')[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentOrders;

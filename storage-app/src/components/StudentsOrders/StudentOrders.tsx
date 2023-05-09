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
        console.log(data.data);
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
                <th className="text-left">Item Name</th>
                <th className="text-left">Kind</th>
                <th className="text-left">Serial Number</th>
                <th className="text-left">Condition</th>
              </tr>
            </thead>
            {orders && (
              <tbody className="table-hover">
                {orders.map((item: any) => (
                  <tr key={item.serialNumber}>
                    <td className="text-left">{item.itemName}</td>
                    <td className="text-left">{item.kind}</td>
                    <td className="text-left">{item.serialNumber}</td>
                    <td className="text-left">
                      {item.condition ? "OK" : "Fauly"}
                    </td>
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
                <th className="text-left">Condition</th>
              </tr>
            </thead>
            {reservations && (
              <tbody className="table-hover">
                {reservations.map((item: any) => (
                  <tr key={item.serialNumber}>
                    <td className="text-left">{item.itemName}</td>
                    <td className="text-left">{item.kind}</td>
                    <td className="text-left">{item.serialNumber}</td>
                    <td className="text-left">
                      {item.condition ? "OK" : "Fauly"}
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

import React, { FC, useEffect, useState } from "react";
import CheckList from "../CheckList/CheckList";
import "./ReturnProduct.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { IItem, IReservation } from "../../interfaces/interfaces";

interface ReturnProductProps {}
interface itmPrsv {
  itm: IItem;
  rsv: IReservation;
}

const ReturnProduct: FC<ReturnProductProps> = ({}) => {
  const user = useSelector((state: any) => state.user);
  const [itemToReturn, setItemToReturn] = useState<itmPrsv>();
  const [reservations, setReservations] = useState<[]>();
  const [ok, setOk] = useState<boolean>(false);

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
        setReservations(data.data.resWithItems);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  const hundleClick = async () => {
    if (!ok) {
      alert("please check all th checkboxes!");
    } else {
      try {
        await axios.post(
          `http://localhost:${process.env.REACT_APP_URL}/order/StudentReturnItem`,
          { itemToReturn }
        );
        window.location.reload();
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="ReturnCont">
      <div className="headerR">
        <p>Return Product</p>
      </div>
      <div className="headerR1">
        <p>Your Reservations:</p>
        <h4>Choose the reservation you want to return</h4>
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
                    <tr
                      key={item.itm.serialNumber}
                      onClick={() => setItemToReturn(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="text-left">{item.itm.itemName}</td>
                      <td className="text-left">{item.itm.kind}</td>
                      <td className="text-left">{item.itm.serialNumber}</td>
                      <td className="text-left">
                        {item.rsv.DateTo.split("T")[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      {itemToReturn && (
        <div className="choosenItemcheck">
          <div className="ci">
            <h4>Chosen Item To Return:</h4>
            <div className="row center">
              <p>{itemToReturn.itm.kind}, </p>
              <p>{itemToReturn.itm.itemName}, </p>
              <p>{itemToReturn.itm.serialNumber}</p>
            </div>
          </div>
          <CheckList setOk={setOk} />
          <button onClick={hundleClick}>Return Item</button>
        </div>
      )}
    </div>
  );
};

export default ReturnProduct;

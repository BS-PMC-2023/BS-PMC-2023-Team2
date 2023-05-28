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
  );
};

export default ReturnProduct;

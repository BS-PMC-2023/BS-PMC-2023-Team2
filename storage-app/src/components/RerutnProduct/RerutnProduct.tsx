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
  return (
  );
};

export default ReturnProduct;

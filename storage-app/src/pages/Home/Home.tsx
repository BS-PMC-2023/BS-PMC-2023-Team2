import { log } from "console";
import React, { FC } from "react";
import { useAppSelector } from "../../redux/Store";
import { IUser } from "../../redux/userSlice";
import "./home.css";
import * as XLSX from "xlsx";
import axios from "axios";
const Home: FC = ({}) => {
  // @ts-ignore
  const user: IUser = useAppSelector((state) => state.user);

  return (
    <div>
      Home
    </div>
  );
};

export default Home;

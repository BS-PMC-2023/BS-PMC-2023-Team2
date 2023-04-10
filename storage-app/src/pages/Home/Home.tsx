import React, { FC } from "react";
import { useAppSelector } from "../../redux/Store";
import { IUser } from "../../redux/userSlice";
import "./home.css";
import Exl from "../../components/Exl/Exl";
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

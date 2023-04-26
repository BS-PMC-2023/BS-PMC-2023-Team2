import React, { FC, useState } from "react";
import "./FoultyItems.css";
import axios from "axios";
import { IItem } from "../../interfaces/interfaces";

interface FoultyItemsProps {}

const FoultyItems: FC<FoultyItemsProps> = ({}) => {
  const [show, setShow] = useState(false);
  const [FaultyProduncts, setFaultyProduncts] = useState<[IItem] | []>([]);

  const handleOpen = async () => {
    try {
      const FaultyProduncts = await axios.get(
        `http://localhost:${process.env.REACT_APP_URL}/item/getFaultyProducts`
      );
      console.log(FaultyProduncts.data.FaultyProducts);

      //@ts-ignore
      setFaultyProduncts(FaultyProduncts.data.FaultyProducts);
      setShow(!show);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="FIContainer">
        <p style={{fontSize: 24, fontWeight: 700}}>Faulty Products</p>
      {!show ? (
        <>
          <button onClick={handleOpen}>Show Faulty Products</button>
        </>
      ) : (
        <div className="faultyProducts">
          {FaultyProduncts.length != 0
            ? FaultyProduncts.map((item) => (
                <div className="card">
                  <div className="first-content">
                    <span> {item.itemName}</span>
                  </div>
                  <div className="second-content">
                    <span> {item.serialNumber}</span>
                    <span> {item.kind}</span>
                  </div>
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default FoultyItems;

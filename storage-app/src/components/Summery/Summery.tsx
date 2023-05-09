import axios from "axios";
import React, { useState } from "react";
import "./Summery.css";
import { IItem } from "../../interfaces/interfaces";

const Summery = () => {
  const [items, setItems] = useState<IItem[]>([]);

  const [showInventory, setShowInventory] = useState<boolean>(false);

  const handleButtonClick = async () => {
    try {
      if (!showInventory) {
        const prod = await axios.get(
          `http://localhost:${process.env.REACT_APP_URL}/item/getItems`
        );
        setItems(prod.data);
      }

      setShowInventory(!showInventory);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="inventory-summary">
      <button onClick={handleButtonClick}>Show Inventory</button>
        <div className="col">
          {showInventory && (
            <table className="table-fill">
              <thead>
                <tr>
                  <th className="text-left">Item Name</th>
                  <th className="text-left">Kind</th>
                  <th className="text-left">Serial Number</th>
                  <th className="text-left">Condition</th>
                </tr>
              </thead>
              <tbody className="table-hover">
                {items.map((item: any) => (
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
            </table>
          )}
      </div>
    </div>
  );
};

export default Summery;

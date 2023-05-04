import React, { useState } from "react";

const Summery = () => {
    const initialInventoryList = [{name:'a',amount:'30'}, {name:'ab',amount:'60'}];

    const [showInventory, setShowInventory] = useState<boolean>(false);

    const handleButtonClick = () => {
        setShowInventory(!showInventory);
    };
    
  return (
    <div className="inventory-summary">
            <button onClick={handleButtonClick}>Show Inventory</button>
            {showInventory && (
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {initialInventoryList.map((item) => (
                    <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
    </div>
  )
}

export default Summery
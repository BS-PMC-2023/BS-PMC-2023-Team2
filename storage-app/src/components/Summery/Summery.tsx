import React, { useState } from "react";

const Summery = () => {
    const initialInventoryList = [{name:'a'}, {name:'ab'}];

    const [showInventory, setShowInventory] = useState<boolean>(false);

    const handleButtonClick = () => {
        setShowInventory(!showInventory);
      };
    
  return (
    <div className="inventory-summary">
        <h2>Inventory</h2>
        <form>
            <button onClick={handleButtonClick}>Show Inventory</button>
            {showInventory && (
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                    {initialInventoryList.map((item) => (
                    <tr key={item.name}>
                        <td>{item.name}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
      </form>
    </div>
  )
}

export default Summery
import React, { useState } from 'react';
import './AddOrder.css';

interface Order {
  type: string;
  itemName: string;
  fromDate: string;
  toDate: string;
}

const AddOrder: React.FC = () => {
  const [type, settype] = useState('');
  const [itemName, setItemName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handletypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settype(event.target.value);
  };

  const handleItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  return (
    <div className="add-order">
      <h2>Add Order</h2>
      <div>
        <label>
          Item Type:
          <input type="text" value={type} onChange={handletypeChange} />
        </label>
        <br />
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={handleItemNameChange} />
        </label>
        <br />
        <label>
          From Date:
          <input type="Date" value={fromDate} onChange={handleFromDateChange} />
        </label>
        <br />
        <label>
          To Date:
          <input type="Date" value={toDate} onChange={handleToDateChange} />
        </label>
        <br />
        <button type="submit">Order</button>
      </div>
    </div>
  );
};

export default AddOrder;

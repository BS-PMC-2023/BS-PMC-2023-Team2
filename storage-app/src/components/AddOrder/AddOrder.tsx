import React, { useState } from 'react';
import './AddOrder.css';
import Policy from '../Policy/Policy';

interface Order {
  type: string;
  itemName: string;
  fromDate: string;
  toDate: string;
}

const AddOrder: React.FC = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

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
        <label htmlFor="Kind">Item Type:</label>
        <select>
          <option value="Camera" >Camera</option>
          <option value="Mic">Mic</option>
          <option value="Ipad">Ipad</option>
          <option value="Tripod">Tripod</option>
        </select>
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
        <button type="submit">Check Avilability</button>
        <br />
        <br />
        <br />
        <button><Policy /></button>
      </div>
    </div>
  );
};

export default AddOrder;

import React, { useState } from 'react';
import './AddOrderGroup.css';


const AddOrderGroup: React.FC = () => {
  const [type, settype] = useState('');
  const [itemName, setItemName] = useState('');
  const [group, setGroup] = useState('');
  const [groupMember, setGroupMember] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handletypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settype(event.target.value);
  };

  const handleItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };
  const handleGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(event.target.value);
  };
  const handleGroupMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupMember(event.target.value);
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
      <form>
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
          Order Manager
          <input type="text" value={group} onChange={handleGroup} />
          Group Members
          <input type="box" value={groupMember} onChange={handleGroupMember} />
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
      </form>
    </div>
  );
}

export default AddOrderGroup



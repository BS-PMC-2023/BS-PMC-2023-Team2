import React, { useState } from 'react';

const AddWatingList: React.FC = () => {
    const [type, settype] = useState('');
    const [itemName, setItemName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handletypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settype(event.target.value);
    };

    const handleItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(event.target.value);
    };

    const handleTeacherNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherName(event.target.value);
    };

    const handleTeacherIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherId(event.target.value);
    };

    const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToDate(event.target.value);
    };

    return (
        <div className="add-order">
            <h2>Waiting List:</h2>
            <div>
                <label>
                    Teacher Name:
                    <input type="text" value={teacherName} onChange={handleTeacherNameChange} />
                </label>
                <label>
                    Teacher Id:
                    <input type="text" value={teacherId} onChange={handleTeacherIdChange} />
                </label>
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
                <button type="submit">Submit</button>
            </div>
        </div>
    );
}

export default AddWatingList
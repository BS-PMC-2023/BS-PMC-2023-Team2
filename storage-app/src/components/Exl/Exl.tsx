import React from 'react'
import * as XLSX from "xlsx";
import axios from "axios";


const Exl = () => {
    const uploadFiles = async (e: any) => {
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(e.target.files[0]);
          fileReader.onload = (e) => {
            const bufferArray = e.target?.result;
    
            const WB = XLSX.read(bufferArray, { type: "buffer" });
    
            const wsname = WB.SheetNames[0];
    
            const ws = WB.Sheets[wsname];
    
            const Data = XLSX.utils.sheet_to_json(ws);
    
            resolve(Data);
          };
        });
        const students = await promise;
        console.log(students);
    
        const sendData = async (data: any) => {
    
          const res = await axios.post(
            // `http://localhost:${process.env.REACT_APP_URL}/user/addStudentsList`,
            `http://localhost:4000/user/addStudentsList`,
            { students: data }
          );
          console.log(res.data);
        };
        sendData(students);
      };
    
  return (
    <div>
        <input type="file" id="input" onChange={(e) => uploadFiles(e)} />
    </div>
  )
}

export default Exl
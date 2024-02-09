import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import { getAllEmpAPI } from '../services/allAPI';

function PdfData() {
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
    const {id} = useParams()
    const [Employee,setEmployee] = useState({})
    
    //fetching all employee from db
    const getAllEmployees = async()=>{
        const result = await getAllEmpAPI()
        //console.log(result.data);
        const employee = result.data.find(item=>item._id == id)
        console.log(employee);
        setEmployee(employee)
    }
    useEffect(()=>{
        getAllEmployees()
    },[])
  return (
    <div>
        <div>
            <h1 className='fw-bold text-center pt-5'>Download your PDF</h1>
        <div className='d-flex justify-content-center align-items-center flex-column' style={{height:'60vh'}}>
         <div ref={targetRef} className='card p-5 shadow' style={{marginTop:'100px'}}>
            <h3 className='fw-bold'>Employee Detials</h3>
            <p><span className='fw-bold'>Employee name:</span>{Employee.empName}</p>
            <p><span className='fw-bold'>Employee email:</span>{Employee.empEmail}</p>
            <p><span className='fw-bold'>Employee designation:</span>{Employee.empDesig}</p>
            <p><span className='fw-bold'>Employee Address:</span>{Employee.empAddress}</p>
            <p><span className='fw-bold'>Employee id:</span>{Employee.empID}</p>
         </div>
         <button onClick={() => toPDF()} className='btn btn-success rounded mt-5'>Download PDF</button>
      </div>
    </div>
    </div>
  )
}

export default PdfData
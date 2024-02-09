import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { deleteEmployeeAPI, getAllEmpAPI } from '../services/allAPI'

function CandidateList() {

    const [allEmployees,setAllEmployees] = useState([])
    
    //fetching all employee from db
    const getAllEmployees = async()=>{
        const result = await getAllEmpAPI()
        //console.log(result.data);
        setAllEmployees(result.data)
    }
    console.log(allEmployees);

    const handleEmployeeDelete = async(e,id)=>{
        e.preventDefault()
        const result = await deleteEmployeeAPI(id)
        console.log(result);
        if(result.status === 200){
            swal({
                title: 'Done ✅',
                text: `Employee Deleted Successfully`,
                icon: 'success',
            });
            getAllEmployees()
        }
        else{
            console.log(result.response.data);
            swal({
                title: 'Error ❌',
                text: `Couldn't Delete Employee`,
                icon: 'error',
            });
        }
    }

    useEffect(()=>{
        getAllEmployees()
    },[])
  return (
    <div style={{height:"100vh",backgroundColor:"white"}}>
        <h3 className='fw-bold text-center pt-2'>Candidate detials</h3>
        <div className='d-flex flex-row-reverse pe-5'>
            <a href='/' className='btn btn-danger rounded'>Go Back to Home</a>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
            <div className='w-75 mt-5'>
                <Table striped bordered hover variant='dark'>
                    <thead>
                    <tr>
                        <th className='text-center'>Emp ID</th>
                        <th className='text-center'>Emp Name</th>
                        <th className='text-center'>Email</th>
                        <th className='text-center'>Designation</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                    </thead>
                    {allEmployees.length>0?
                    <tbody>
                    {allEmployees.map((employee)=>(
                        <tr>
                        <td className='text-center'>{employee.empID}</td>
                        <td className='text-center fw-bold'>{employee.empName}</td>
                        <td className='text-center'>{employee.empEmail}</td>
                        <td className='text-center'>{employee.empDesig}</td>
                        <td className='d-flex justify-content-center align-items-center '>
                            <div className='d-flex gap-3'>
                                <a href={`/candidate-edit/${employee._id}`} className='btn btn-outline-info'><i class="fa-solid fa-user-pen"></i></a>
                                <a href={`/pdf/${employee._id}`} className='btn btn-outline-success'><i class="fa-solid fa-print"></i></a>
                                <a className='btn btn-outline-danger' onClick={(e)=>{handleEmployeeDelete(e,employee._id)}}><i class="fa-solid fa-trash-can"></i></a>
                            </div>
                        </td>
                    </tr>
                    ))
                    }
                    </tbody>:
                    <p>No Employees Added Yet...!</p>
                    }
                </Table>
            </div>

        </div>
        
    </div>
  )
}

export default CandidateList
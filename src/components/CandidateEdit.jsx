import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { editEmployeeAPI, getAllEmpAPI } from '../services/allAPI'

function CandidateEdit() {
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

    const handleEmployeeUpdate = async()=>{

        const {_id,empID,empName,empEmail,empDesig,empAddress} = Employee

        if(!empID || !empName || !empEmail || !empDesig || !empAddress){
            swal({
                title: 'Oops',
                text: `Please fill the form completely`,
                icon: 'info',
            });
        }
        else{
            const reqBody = new FormData()

            reqBody.append("empID",empID)
            reqBody.append("empName",empName)
            reqBody.append("empEmail",empEmail)
            reqBody.append("empDesig",empDesig)
            reqBody.append("empAddress",empAddress)
            const result = await editEmployeeAPI(_id,reqBody)
            //console.log(result);
            if(result.status===200){
                swal({
                    title: 'Good Job 😍',
                    text: `${Employee.empName} Successfully Added`,
                    icon: 'success',
                });
            }
            else{
            console.log(result.response.data);
            swal({
                title: 'Oh sorry..😶',
                text: `${result.response.data} `,
                icon: 'error',
            });
            }
        }

    }

    console.log(Employee);
    useEffect(()=>{
        getAllEmployees()
    },[])
  return (
    <div className='d-flex justify-content-center align-items-center flex-coloumn' style={{height:'100vh',backgroundColor:"lavender"}}>
        <div className='card shadow w-50 p-5 border border-0'>
            <h3 className='text-center fw-bold mb-5'>Edit candidate detials</h3>
            <form>
                <input value={Employee.empID} onChange={(e)=>setEmployee({...Employee,empID:e.target.value})} type="text" placeholder='Emp ID' className='form-control mb-3 w-100 shadow'/>
                <input value={Employee.empName} onChange={(e)=>setEmployee({...Employee,empName:e.target.value})} type="text" placeholder='Emp Name'  className='form-control mb-3 shadow'/>
                <input value={Employee.empEmail} onChange={(e)=>setEmployee({...Employee,empEmail:e.target.value})} type="text" placeholder='Emp Email'  className='form-control mb-3 shadow'/>
                <input value={Employee.empDesig} onChange={(e)=>setEmployee({...Employee,empDesig:e.target.value})} type="text" placeholder='Emp Designation'  className='form-control mb-3 shadow'/>
                <textarea value={Employee.empAddress} onChange={(e)=>setEmployee({...Employee,empAddress:e.target.value})}  type="text" placeholder='Emp Address'  className='form-control mb-3 shadow'/>
                <div className='d-flex gap-2 w-100'>
                    <Button variant='warning' className='rounded w-100' onClick={handleEmployeeUpdate}>Update</Button>
                    <Button variant='info' className='rounded w-100'>Cancel</Button>
                </div>
            </form>
        </div>
    </div>

  )
}

export default CandidateEdit
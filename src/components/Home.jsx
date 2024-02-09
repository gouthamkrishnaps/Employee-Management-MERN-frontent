import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { uploadEmpAPI } from '../services/allAPI'
import swal from 'sweetalert';

function Home() {
    const [employee,setEmployee] = useState({
        empID: "",
        empName: "",
        empEmail: "",
        empDesig: "",
        empAddress: ""
    })
    console.log(employee);

    const handleReset = ()=>{
        setEmployee({
            empID: "",
            empName: "",
            empEmail: "",
            empDesig: "",
            empAddress: ""
        })
    }

    const handleEmployeeUpload = async()=>{

        const {empID,empName,empEmail,empDesig,empAddress} = employee

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
            const result = await uploadEmpAPI(reqBody)
            //console.log(result);
            if(result.status===200){
                swal({
                    title: 'Good Job 😍',
                    text: `${employee.empName} Successfully Added`,
                    icon: 'success',
                });
                handleReset()
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

    
  return (
    <div style={{backgroundColor:"azure"}}>
        <h2 className='text-center fw-bold pt-2'>Ociuz Infotech</h2>
        <h5 className='text-center mt-2'>Candidate Detials</h5>
        <div className='d-flex flex-row-reverse pe-5'>
            <a href='/candidate-list' className='btn btn-danger rounded'>Candidate List</a>
        </div>
        <div className='d-flex justify-content-center align-items-center flex-coloumn' style={{height:'82vh'}}>
            <div className='card shadow w-50 p-5 border border-0'>
                <h3 className='text-center fw-bold mb-5'>Enter candidate detials</h3>
                <form>
                    <input value={employee.empID} onChange={(e)=>setEmployee({...employee,empID:e.target.value})}  type="text" placeholder='Emp ID' className='form-control mb-3 w-100 shadow'/>
                    <input value={employee.empName} onChange={(e)=>setEmployee({...employee,empName:e.target.value})} type="text" placeholder='Emp Name'  className='form-control mb-3 shadow'/>
                    <input value={employee.empEmail} onChange={(e)=>setEmployee({...employee,empEmail:e.target.value})} type="text" placeholder='Emp Email'  className='form-control mb-3 shadow'/>
                    <input value={employee.empDesig} onChange={(e)=>setEmployee({...employee,empDesig:e.target.value})} type="text" placeholder='Emp Designation'  className='form-control mb-3 shadow'/>
                    <textarea value={employee.empAddress} onChange={(e)=>setEmployee({...employee,empAddress:e.target.value})}  type="text" placeholder='Emp Address'  className='form-control mb-3 shadow'/>
                    <div className='d-flex gap-2 w-100'>
                        <Button variant='success' onClick={handleEmployeeUpload} className='rounded w-100'>Submit</Button>
                        <Button variant='info' onClick={handleReset} className='rounded w-100'>Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Home
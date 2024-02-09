import { BASE_URL } from "./base_URL"
import { commonApi } from "./commonAPI"


//upload employee api
export const uploadEmpAPI = async(Employee)=>{
    return await commonApi("POST",`${BASE_URL}/employee/upload`,Employee,"")
}

//get all employee
export const getAllEmpAPI = async()=>{
    return await commonApi("GET",`${BASE_URL}/employees/get`)
}

//edit employee
export const editEmployeeAPI = async(employeeId,reqBody)=>{
    return await commonApi("PUT",`${BASE_URL}/employee/update/${employeeId}`,reqBody)
}

//delete employee
export const deleteEmployeeAPI = async(employeeId)=>{
    return await commonApi("DELETE",`${BASE_URL}/employee/delete/${employeeId}`,{})
}
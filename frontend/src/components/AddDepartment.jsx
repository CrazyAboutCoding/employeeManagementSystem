import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Adddepartment = () => {
    const [department, setdepartment] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/auth/add_department', {department})
        .then(result => {
            if(result.data.Status) {
              console.log(result.data.message);
              navigate('/dashboard/department');
            } else {
              alert(result.data.Error || "An error occurred"); // Display the error message or a default message
            }
          })
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-25 border'>
            <h2>Add Department</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="department"><strong>Department:</strong></label>
                    <input type="text" name='department' placeholder='Enter department'
                     onChange={(e) => setdepartment(e.target.value)} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add Department</button>
            </form>
        </div>
    </div>
  )
}

export default Adddepartment
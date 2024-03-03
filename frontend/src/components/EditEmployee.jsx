import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        department: "",
        category_id: "",
        dateOfBirth: "",
        age: 0,
      });
      const [department, setdepartment] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:8081/auth/department')
        .then(result => {
            if(result.data.Status) {
                setdepartment(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:8081/auth/employee/'+id)
        .then(result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                address: result.data.Result[0].address,
                salary: result.data.Result[0].salary,
                department: result.data.Result[0].department,
                category_id: result.data.Result[0].category_id,
                dateOfBirth: result.data.Result[0].dateOfBirth || "",
                age: result.data.Result[0].age || 0,
            })
            console.log(result);
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!employee.dateOfBirth) {
          alert("Date of Birth cannot be empty");
          return;
        }
    
        const dob = new Date(employee.dateOfBirth);
        const currentDate = new Date();
        
        if (dob > currentDate) {
          alert("Date of Birth cannot be in the future");
          return;
        }
    
        const ageDiffMs = currentDate - dob.getTime();
        const ageDate = new Date(ageDiffMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        
        if (age < 18) {
          alert("Employee must be at least 19 years old");
          return;
        }

        axios.put('http://localhost:8081/auth/edit_employee/'+id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputDateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDateOfBirth"
              onChange={(e) =>
                setEmployee({ ...employee, dateOfBirth: e.target.value })
              }
              value={employee.dateOfBirth}
            />
          </div>
          <div className='col-12'>
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="department" className="form-label">
              Department
            </label>
            {/* <select name="department" id="department" className="form-select"
                onChange={(e) => setEmployee({...employee, department_id: e.target.value})}>
              {department.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select> */}

            <select
              name="category"
              id="category"
              className="form-select rounded-0"
              onChange={(e) => {
                const selectedDepartment = department.find((c) => c.id === parseInt(e.target.value));
                setEmployee({
                  ...employee,
                  category_id: e.target.value,
                  department: selectedDepartment ? selectedDepartment.name : '',
                });
              }}
            >
              <option value="" disabled selected>
                Select Departement
              </option>
              {department.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    age: 0,
    salary: null,
    address: "",
    category_id: 1,
    // image: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()
  //const cate = [{"name": "FSD"}, {"name": "SDE"}];
  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/department")
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.Result);
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    const employeeData = {
      Name: employee.name,
      Email: employee.email,
      Password: employee.password,
      dob: employee.dateOfBirth,
      Address: employee.address,
      Salary: employee.salary,
      Category_id: employee.category_id,
    };
    console.log(employeeData);
    for (const key in employeeData) {
      if (!employeeData[key]) {
          alert(`${key} cannot be empty`);
          return;
      }
    }

    if (!employee.dateOfBirth) {
      alert('Date of Birth cannot be empty');
      return;
    }

    const dob = new Date(employee.dateOfBirth);
    const currentDate = new Date();
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (dob > currentDate) {
      alert('Date of Birth cannot be in the future');
      return;
    }

    if (age < 18) {
      alert('Employee must be at least 19 years old');
      return;
    }

    axios.post('http://localhost:8081/auth/add_employee', employeeData)
    .then(result => {
      if(result.data.Status) {
        console.log(result.data.message);
        navigate('/dashboard/employee');
      } else {
        alert(result.data.Error || "An error occurred"); // Display the error message or a default message
      }
    })
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
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
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <div className="col-12">
              <label for="inputDateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control rounded-0"
                id="inputDateOfBirth"
                onChange={(e) => setEmployee({ ...employee, dateOfBirth: e.target.value })}
              />
            </div>
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
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
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Department
            </label>
            <select
              name="category"
              id="category"
              className="form-select rounded-0"
              onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
            >
              <option value="" disabled selected>
                Select Departement
              </option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
                // <option>
                //   {c.name}
                // </option>
              ))}
            </select>
          </div>
          {/* <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
            />
          </div> */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
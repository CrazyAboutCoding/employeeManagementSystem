import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Department = () => {

    const [department, setdepartment] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:8081/auth/department')
        .then(result => {
            if(result.data.Status) {
                setdepartment(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Department List</h3>
        </div>
        <Link to="/dashboard/add_department" className='btn btn-success'>Add Department</Link>
        <div className='mt-3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        department.map(c => (
                            <tr>
                                <td>{c.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Department
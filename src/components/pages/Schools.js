import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { YesNoPopUps } from '../PopupModels/YesNoPopUps'
import { SchoolModel } from '../PopupModels/SchoolModel'
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// const animatedComponents = makeAnimated();

export default function Schools() {
    //State variables
    const [curKey, setCurKey] = useState()
    // const [grades, setGrades] = useState([])
    const [SchoolData, setSchoolData] = useState([])
    const [school, setSchool] = useState({ schoolName: '', region: '', am: '', om: ''})

    // const options = [
    //     { value: 'Grade 1', label: 'Grade 1' },
    //     { value: 'Grade 2', label: 'Grade 2' },
    //     { value: 'Grade 3', label: 'Grade 3' },
    // ];

    //################## Handelling the changes and storing into state variables ##########################

    const handleChange = (e) => {
        setSchool({
            ...school, [e.target.name]: e.target.value
        })
        console.log(school);
    }

    // const handelGrades = (selectedOptions) => {
    //     setGrades(selectedOptions.map(option => option.value));
    //     console.log(grades);
    //   };

    /* ########################### Sending School Data to Back-End ####################################### */

    const saveSchoolDetails = async () => {
        const schoolDetails = new FormData()
        schoolDetails.append('school', school.schoolName)
        schoolDetails.append('region', school.region)
        schoolDetails.append('am', school.am)
        schoolDetails.append('om', school.om)
        schoolDetails.append('catagory', school.catagory)
        // schoolDetails.append('grades', school.grades)

        console.log(schoolDetails)
        await axios(
            {
                method: 'post',
                url: 'http://localhost:8000/schooldata',
                data: schoolDetails
            }
        ).then((response) => {
            setSchoolData([...SchoolData, response.data]);
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response.statusText)
        })
    }


    /* ######################################## Fetching Data From API ############################################## */

    useEffect(() => {
        axios.get('http://localhost:8000/schooldata')
            .then((response) => {
                setSchoolData(response.data);
            })
    }, [])


    // if (SchoolData.length === 0) {
    //     return (
    //         <div className='container d-flex justify-content-center align-item-center'>
    //             <h1>Loading ......</h1>
    //         </div>
    //     )
    // }

    return (
        <div className='my-5'>
            <div className="container d-flext justify-content-center my-4">
                <div className="my-3">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add School</button>
                </div>

                <hr className='border border-primary border-3 opacity-50 my-2' />

                {/*################################ Model Starts ######################################### */}
                <SchoolModel id={curKey} />                         {/* For Modifiation */}
                <YesNoPopUps path='schooldata' id={curKey} />       {/* For Deletion */}

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add School</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <form>
                                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                                    <div className="row mb-2">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example1">School Name</label>
                                                <input type="text" id="form6Example1" className="form-control" name='schoolName' onChange={handleChange} required />
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example2">Region</label>
                                                <input type="text" id="form6Example2" className="form-control" name='region' onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>


                                    {/* ################ Grades Section ################## */}


                                    {/* <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form6Example3">Select Grades</label>
                                        <Select className='mb-3'
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={options}
                                            onChange={handelGrades}
                                        />
                                    </div> */}

                                    {/* <!-- AM --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form6Example3">Academic Manager</label>
                                        <input type="text" id="form6Example3" className="form-control" name='am' onChange={handleChange} required />
                                    </div>

                                    {/* <!-- OM --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form6Example4">Operation Manager</label>
                                        <input type="url" id="form6Example4" className="form-control" name='om' onChange={handleChange} required />
                                    </div>


                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form6Example5">School Catagory</label>
                                        <select className="form-select" aria-label="Default select example" name='catagory' onChange={handleChange} required>
                                            <option value='none' hidden>Catagory</option>
                                            <option value="Catagory A">Catagory A</option>
                                            <option value="Catagory B">Catagory B</option>
                                            <option value="Catagory C">Catagory C</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary px-4" data-bs-dismiss="modal" onClick={saveSchoolDetails}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*###################################### Popup Model End ############################################# */}

                <div className='container table-responsive'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">SchoolID</th>
                                <th scope="col">School Name</th>
                                <th scope="col">Region</th>
                                <th scope="col">Academic Manager</th>
                                <th scope="col">Operations Manager</th>
                                <th scope="col">Catagory</th>
                                <th scope='col'>Delete</th>
                                <th scope='col'>Modity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                SchoolData.map((school) => {

                                    return <tr key={school.id}>
                                        <th scope="row">{school.id}</th>
                                        <td>{school.school}</td>
                                        <td>{school.region}</td>
                                        <td>{school.am}</td>
                                        <td>{school.om}</td>
                                        <td>{school.catagory}</td>
                                        <td><button className='btn btn-danger' data-bs-toggle="modal" onClick={() => setCurKey(school.id)} data-bs-target="#exampleModalCenter">Delete</button></td>
                                        <td><button className='btn btn-warning' data-bs-toggle="modal" onClick={() => setCurKey(school.id)} data-bs-target="#examp2">Modify</button></td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

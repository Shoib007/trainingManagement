import React from 'react'
import { TrainerData } from '../DemoTrainerData';

export default function TrainerDetails() {

  return (
    <>
      <div className="container d-flext jutify-content-center my-5">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Trainer</button>

        {/* Model Starts */}

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Assign Training</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <form>
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div class="row mb-2">
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form6Example1">First name</label>
                        <input type="text" id="form6Example1" class="form-control" required />
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form6Example2">Last name</label>
                        <input type="text" id="form6Example2" class="form-control" required />
                      </div>
                    </div>
                  </div>

                  {/* <!-- Phone number --> */}
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form6Example3">Phone Number</label>
                    <input type="number" id="form6Example3" class="form-control" required />
                  </div>

                  {/* <!-- Meeting Link --> */}
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form6Example4">Meeting Link</label>
                    <input type="url" id="form6Example4" class="form-control" required />
                  </div>

                  {/* <!-- Email input --> */}
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form6Example5">Email</label>
                    <input type="email" id="form6Example5" class="form-control" required />
                  </div>

                  <div className="row">

                    {/* Trainer Type */}
                    <div className="col">
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form6Example5">Select Trainer Type</label>
                        <select class="form-select" aria-label="Default select example" required>
                          <option value='none' hidden>Trainer Type</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Robotics">Robotics</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>
                    </div>

                    {/* Department */}
                    <div className="col">
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form6Example5">Department</label>
                        <select class="form-select" aria-label="Default select example" required>
                          <option value='none' hidden>Select Department</option>
                          <option value="Computer Science">Business to Business (B2B) </option>
                          <option value="Robotics">Business to Costomer (B2C) </option>
                          <option value="Both">Both</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </form>

              </div>



              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Assign</button>
              </div>
            </div>
          </div>
        </div>

        {/* Models Ends */}

        <hr style={{ zIndex: '-2' }} />
      </div>

      <div className='d-flext jutify-content-center container mt-5'>

        {/* Showing Data */}

        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">TrainerID</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Meeting Link</th>
              <th scope="col">E-Main</th>
              <th scope="col">Trainer Type</th>
              <th scope="col">Department</th>
            </tr>
          </thead>
          <tbody>
            {TrainerData.map((data) => (
              <tr>
                <th scope='row'>{data.TrainerID}</th>
                <td>{data.FirstName}</td>
                <td>{data.LastName}</td>
                <td>{data.PhoneNumber}</td>
                <td><a className='text-decoration-none' href={data.MeetingLink}>{data.MeetingLink}</a></td>
                <td>{data.Email}</td>
                <td>{data.TrainerType}</td>
                <td>{data.Department}</td>

              </tr>
            )

            )}
          </tbody>
        </table>

      </div>
    </>
  )
}

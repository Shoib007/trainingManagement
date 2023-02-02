import React from 'react'

export default function TrainerRegistration() {
    return (
        <>
            <div className='d-flext jutify-content-center container mt-5' style={{ width: '40%' }}>
                <h2 className='text-center'>Trainer Registration</h2>
                <hr className='mb-4' />
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
                        <div className='col'>
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

                        <div className='col-6'>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="form6Example5">Departments</label>
                                <select class="form-select" aria-label="Default select example" required>
                                    <option value='none' hidden>Select Department</option>
                                    <option value="Computer Science">Business to Business (B2B) </option>
                                    <option value="Robotics">Business to Costomer (B2C) </option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Submit button --> */}
                    <button type="submit" class="btn btn-primary mb-4">Save</button>
                </form>
                <hr />
                <hr />
            </div>
        </>
    )
}

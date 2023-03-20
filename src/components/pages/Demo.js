import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { CDBInput, CDBContainer } from 'cdbreact';
const animatedComponents = makeAnimated();


export default function AnimatedMulti() {
  const [option, setOption] = useState([]);

  const options = [
    { value: 'Grade 1', label: 'Grade 1' },
    { value: 'Grade 2', label: 'Grade 2' },
    { value: 'Grade 3', label: 'Grade 3' },
  ];

  const handleChange = (selectedOptions) => {
    setOption(selectedOptions.map(option => option.value));
    console.log(option);
  };

  return (
    <CDBContainer>
      <CDBInput type="text" placeholder="School Name" color="primary" className='mb-3' />
      <CDBInput type="text" placeholder="Region" color="primary" className='mb-3'/>
      <CDBInput type="text" placeholder="Academic Manager" color="primary" className='mb-3'/>
      <CDBInput type="text" placeholder="Operations Manager" color="primary" className='mb-3'/>

      <CDBInput type="date" placeholder="Date" className='mb-3'/>
      <label>Select Grades</label>
      <Select className='mb-3'
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        onChange={handleChange}
      />
    </CDBContainer>
  );
}

import React from 'react'
import DoctorCard from './DoctorCard'
import DocApi from './DocApi'
const DoctorList = () => {
  
  return (
   <>
   <div className='doclist'>
        {
                DocApi.map((doctor,index)=>{
                       return <DoctorCard key={index} doctor={doctor} />
                })
        }

   </div>
   
   </>
  )
}

export default DoctorList

import React from 'react'


const stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const Stats = () => {
  return (
    <div className='flex bg-[#161D29] w-full flex items-center justify-around py-20 '>
        {
        stats.map((stat,index)=>{
        return <div className='flex flex-col items-center' key={index}>
            <p className='text-[#999DAA] font-semibold text-2xl font-semibold'>{stat.count}</p>
            <p className='text-[#999DAA]'>{stat.label}</p>
        </div>
      })
        }
      
    </div>
  )
}

export default Stats

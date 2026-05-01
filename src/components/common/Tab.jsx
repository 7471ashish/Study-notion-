import React from 'react'

const Tab = ({tabData,field,setField}) => {
  return (
    <div>
      <div className='flex flex-row px-4 py-1 bg-[#161D29] text-[#F1F2FF] w-fit rounded-lg items-center gap-12'>
        {
            tabData.map((tab,index)=>{
                return <button key={tab.type}
                onClick={()=>{
                    setField(tab.type)
                }}
                className={`${field===tab.type?
                    "bg-[#000814] text-[#F1F2FF]":
                   "text-[#999DAA] bg-transparent"
                } py-2 px-5 rounded-full transition-all duration-200`}>
                       {tab?.tabName}
                </button>
            })
        }
      </div>
    </div>
  )
}

export default Tab

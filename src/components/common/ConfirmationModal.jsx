import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div>
      <div>
        <p>{modalData.text}</p>
        <p>{modalData.text2}</p>
        <div>
            <IconBtn onClick={modalData?.btnHandler} text={modalData?.btnText}></IconBtn>
            <button onClick={modalData?.btn2Handler}
        > {modalData.btn2text}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal

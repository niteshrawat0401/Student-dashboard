import React from 'react'
import "./Quicknotes.css"

export const Addquicknotes = () => {
  return (
    <>
    <div className='quicknotesdiv'>
        <form className='notesform'>
        <input className='inpdate' type='date'/>
        <br/>
        <input className='inpsub' type='text' placeholder='Subject'/>
        <div className='filechoose'>
        <input className='inpsubpdf' type='file'/>
        <input className='inpsubqna' type='file'/>
        </div>
        <br/>
        <input className='inpsubform' type='submit' value="Submit"/>
        </form>
    </div>
    </>
  )
}

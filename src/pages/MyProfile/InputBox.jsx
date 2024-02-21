import { DocumentScannerOutlined, FilePresent, Upload } from '@mui/icons-material'
import { MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const InputBox = ({name,value,fun,type,placeholder,label,error}) => {
  return <>
  <div className="filedContainer">
    <label htmlFor="">enter {name} get {label}* points</label>
    <TextField
    name={name}
    value={value}
    onChange={fun}
    type={type}
    placeholder={placeholder}
    fullWidth
    />
    {error&&<span className="error">{error}</span>}
  </div>
  
  </>
}
export const SelectBox = ({name,value,fun,options,label,placeholder,error}) => {
  return <>
  <div className="filedContainer">
    <label htmlFor="">Select {name} get {label}* points</label>
    <Select
    name={name}
    value={!value?placeholder:value}
    onChange={fun}
    fullWidth
    >
      <MenuItem disabled value={placeholder}>{placeholder}</MenuItem>
    {
      options.map((option,index)=>(
        <MenuItem key={index} value={option}>{option}</MenuItem>
      ))
    }
    </Select>
    {error&&<span className="error">{error}</span>}

  </div>
  
  </>
}
export default InputBox
export const FileBox = ({name,value,fun,type,placeholder,label,error}) => {
    return <>
    <div className="filedContainers">
      <p >upload {name} get {label}* points</p>
     <div className="fileBorder">
      <label htmlFor={name}>
        <Upload/> upload resume
      </label>
     <input
      name={name}
      value={value}
      onChange={fun}
      type={type}
      placeholder={placeholder}
      hidden
      id={name}
      />
     </div>
    {error&&<span className="error">{error}</span>}

    </div>
    
    </>
  }
import React from 'react'
export default (props) => {

  const changeIt = (e) => {
    props.valueChange(e.target.value)
  }

  return (
    <input type="text" placeholder="enter" onChange={changeIt} />
  )
}

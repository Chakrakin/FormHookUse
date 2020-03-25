import React from 'react'
export default (props) => {
  console.log(props)

  const changeIt = (e) => {
    props.valueChange(e.target.value)
  }

  return (
    <input type="text" onChange={changeIt} />
  )
}

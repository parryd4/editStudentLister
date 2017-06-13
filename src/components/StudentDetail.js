import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

export default function StudentDetail(props){
  if (!props.student) {
    return null
  }

  return(
    <div>
      <h2>{props.student.name}</h2>

      <Link to={`/students/${props.student.id}/edit`}><button className="btn btn-warning">Edit This Student</button></Link>
      <button onClick={() => props.deleteStudent(props.student.id) } className="btn btn-danger">Delete This Student</button>
    </div>

  )
}

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import StudentCount from './StudentCount'
import StudentForm from './StudentForm'
import StudentsList from './StudentsList'
import StudentDetail from './StudentDetail'
import EditForm from './EditForm'

export default class StudentsPage extends Component {

  constructor(){
    super()
    this.state = {
      students: []
    }
    this.createStudent = this.createStudent.bind(this)
    this.deleteStudent = this.deleteStudent.bind(this)
    this.editStudent = this.editStudent.bind(this)
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/students')
      .then( res => res.json() )
      .then( data => this.setState({ students: data}) )
  }

  createStudent(name){
    // here's where i want to make the post request to save the data...
    fetch('http://localhost:3000/api/v1/students', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        student: {name: name}
      })
    }).then(response => response.json() )
      .then(student => this.setState((previousState) => {
        return {
          students: [...previousState.students, student]
        }}))}

  editStudent(id, name){
    fetch(`http://localhost:3000/api/v1/students/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        student: {name: name}
      })
    })
    .then(this.setState(function(previousState){
      return {
        students: previousState.students.map(function(student){
          if (student.id == id){
            student.name = name
          }
          return student
        })
      }
    }))
    this.props.history.push(`/students/`)
  }

  deleteStudent(id){
    // here, make a delete request to the API to remove that student from the database...
    fetch(`http://localhost:3000/api/v1/students/${id}`, {
      method: 'DELETE'
    })
    .then(this.setState(function(previousState){
      return {
        students: previousState.students.filter(function(student){
          return student.id !== id
        })
      }
    }))
    this.props.history.push("/students")
  }

  render(){
    return(
      <div className='row'>
        <div className='col-md-4'>
          < StudentsList students={this.state.students} />
        </div>
        <div className='col-md-8'>
          <Switch>
            <Route exact path='/students/new' render={() => <StudentForm onSubmit={this.createStudent}/>} />
            <Route exact path='/students/:id/edit' render={(routerProps)=>{
              console.log(routerProps)
              // if (!routerProps.student) {
              // //  this.props.history.push("/students")
              //   return null
              // }
              const id = routerProps.match.params.id
              const student = this.state.students.find( s =>  s.id === parseInt(id) )
              return <EditForm student={student} editStudent={this.editStudent}/>} }/>

            <Route exact path='/students/:id' render={(routerProps) => {
              const id = routerProps.match.params.id
              const student = this.state.students.find( s =>  s.id === parseInt(id) )
              return <StudentDetail student={student} deleteStudent={this.deleteStudent}/>
            }} />
          </Switch>
          <StudentCount count={this.state.students.length}/>
        </div>
      </div>
    )
  }
}

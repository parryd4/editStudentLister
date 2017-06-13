import React, { Component } from 'react'

export default class EditForm extends Component {

  constructor(props){
    super(props)
    //console.log(props)
    this.state = {
      fullName: props.student.name
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    const fullName = `${this.state.fullName}`
    this.props.editStudent( this.props.student.id , fullName )
  }
  componentWillMount() {

  }
  render(){
    return(
      <div>
        <h2>Edit Form</h2>
        <form onSubmit={this.handleSubmit} >
          <input type='text' name="fullName" value={this.state.fullName} onChange={this.handleChange}/>
          <input type='submit' value="Edit Student" />
        </form>
      </div> )}}

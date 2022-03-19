import React from "react";
import './sections.css'

export default class PersonalInfo extends React.Component{
   constructor(props){
      super(props)

      this.state = {
         showForm: false,
         information: {
            name: 'Set Fullname',
            email: 'Set Email adress',
            phone: 'Set Phone number'
         }
      }

      this.showForm = this.showForm.bind(this)
      this.updateInfo = this.updateInfo.bind(this)
   }

   showForm = () => {
      const info = { name: 'Set Fullname', email: 'Set Email adress', phone: 'Set Phone number'}
      this.setState({ information: info })
      this.setState({ showForm : true });
   }

   updateInfo = (receivedInfo) => {
      this.setState({ information : {
         name: receivedInfo.name,
         email: receivedInfo.email,
         phone: receivedInfo.phone,
      }, 
      showForm : false })

   }

   render(){
      const information = this.state.information;
      return(
         <section className="personal-info container">
            <h1>Personal Information <button onClick={this.showForm}>+</button></h1>
            <div className={"form " + (this.state.showForm ? '' : 'hidden') }>
               <Form data={information} callback={this.updateInfo} />
            </div>
            <h2><strong>Fullname : </strong>{information.name}</h2>
            <h2><strong>Email : </strong>{information.email}</h2>
            <h2><strong>Phone number : </strong>{information.phone}</h2>
         </section>
      )
   }
}

class Form extends React.Component{
   constructor(props){
      super(props)

      this.state = { name: this.props.data.name, email: this.props.data.email, phone: this.props.data.phone }

      this.updateState = this.updateState.bind(this)
   }

   submit = e => {
      e.preventDefault()
      this.props.callback(this.state)
   }

   updateState = e => {
      if (e.target.id === 'name'){
         this.setState({ name: e.target.value })
      }else if (e.target.id === 'email'){
         this.setState({ email: e.target.value })
      }else if (e.target.id === 'phone'){
         this.setState({ phone: e.target.value })
      }
   }

   render(){
      return(
         <form onSubmit={this.submit}>
            <p>
               <label>Fullname : </label>
               <input id='name' placeholder={this.state.name} onChange={this.updateState} required></input>
            </p>
            <p>
               <label>Email : </label>
               <input type='email' id='email' placeholder={this.state.email} onChange={this.updateState} required></input>
            </p>
            <p>
               <label>Phone : </label>
               <input type='tel' id='phone' placeholder={this.state.phone} onChange={this.updateState} required></input>
            </p>
            <p><button>Submit</button></p>
         </form>
      )
   }
}
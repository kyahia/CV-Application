import React from "react";
import uniqid from 'uniqid';
import './sections.css';

export default class Education extends React.Component{
   constructor(){
      super()
      this.state = {
         showForm: false,
         form: <form></form>,
         studies : [],
         univ : '', 
         from: '', 
         to: '', 
         title: ''
      }
   }

   displayForm = (state = this.state) => {
      this.setState(prevState => ({ 
         showForm: !prevState.showForm,
         form: <form onSubmit={this.submitEd}>
            <p>
               <label>Institution : </label>
               <input id="univ" onChange={this.handleChange} required defaultValue={state.univ}></input>
            </p>
            <p>
               <label>From : </label>
               <input id="from" type="date" onChange={this.handleChange} required defaultValue={state.from}></input>
               <label> To : </label>
               <input id="univ-to" type="date" onChange={this.handleChange} required defaultValue={(state.to !== 'actual') ? state.to : ''}></input>
               <label htmlFor='actual-step'> Actual </label>
               <input id='actual-step' type='checkbox' onChange={this.handleChange}></input>
            </p>
            <p>
               <label>Title : </label>
               <input id="title" onChange={this.handleChange} required defaultValue={state.title}></input>
            </p>
            <button>Submit</button>
         </form>
      }));
   }

   handleChange = e => {
      if (e.target.id === 'univ'){
         this.setState({ univ: e.target.value })
      }else if (e.target.id === 'from'){
         this.setState({ from: e.target.value })
      }else if (e.target.id === 'to'){
         this.setState({ to: e.target.value })
      }else if (e.target.id === 'title'){
         this.setState({ title: e.target.value })
      }else if (e.target.id === 'actual-step'){
         if (e.target.checked){
            this.setState({ to: 'actual' })
            document.getElementById('univ-to').removeAttribute('required');
            document.getElementById('univ-to').setAttribute('disabled', true);
         }else{
            document.getElementById('univ-to').removeAttribute('disabled');
            document.getElementById('univ-to').setAttribute('required', true);
         }
      }
   }

   submitEd = e => {
      const state = this.state;
      const study = { univ: state.univ, from: state.from, to: state.to, title: state.title, id: uniqid('stud')}
      e.preventDefault();
      this.setState({ form: <form></form>, univ: '', from: '', to:'', title: '' });
      this.setState({ studies: state.studies.concat(study) })
   }

   deleteItem = e => {
      const targetId = e.target.id
      this.setState(prevState => (
         { studies : prevState.studies.filter(study => study.id !== targetId) }
      ))
   }

   editItem = e => {
      const editingStudy = this.state.studies.find(step => step.id === e.target.id)
      this.deleteItem(e)
      this.setState({ univ: editingStudy.univ, from: editingStudy.from, to: editingStudy.to, title: editingStudy.title, id: editingStudy.id})
      this.displayForm(editingStudy)
   }

   render(){
      return(
         <section className="studies container">
            <h1>Education <button onClick={this.displayForm}>+</button></h1>
            <div className="form-wrapper">
               {this.state.form}
            </div>
            <Steps data={this.state.studies} deleteStep={this.deleteItem} editStep={this.editItem} />
         </section>
      )
   }
}

class Steps extends React.Component{
   constructor(props){
      super(props)
   }

   render(){
      const orderedSteps = this.props.data.sort((prev, next) => {
         if (next.to === 'actual') return 1;
         return (next.to > prev.to) ? 1 : -1
      });
      return (
         <div>
            {orderedSteps.map(study => {
               return (
               <div key={study.id}>
                  <h3>
                     <span>{study.title} </span>
                     <button onClick={this.props.editStep} id={study.id}>E</button>
                     <button onClick={this.props.deleteStep} id={study.id}>X</button>
                  </h3>
                  <h4>{study.univ}</h4>
                  <p>{study.from} - {study.to}</p>
               </div>
               )
            })}
         </div>
      )
   }
}
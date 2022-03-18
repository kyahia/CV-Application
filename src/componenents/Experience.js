import React from "react";
import uniqid from 'uniqid';

export default class Experience extends React.Component{
   constructor(){
      super()
      this.state = {
         showForm: false,
         form: <form></form>,
         jobs : [],
         company : '', 
         from: '', 
         to: '', 
         title: '',
         tasks: ''
      }
   }

   displayForm = (state = this.state) => {
      this.setState(prevState => ({ 
         showForm: !prevState.showForm,
         form: <form onSubmit={this.submitExp}>
            <p>
               <label>Company : </label>
               <input id="company" onChange={this.handleChange} required defaultValue={state.company}></input>
            </p>
            <p>
               <label>From : </label>
               <input id="from" type="date" onChange={this.handleChange} required defaultValue={state.from}></input>
               <label> To : </label>
               <input id="job-to" type="date" onChange={this.handleChange} required defaultValue={(state.to !== 'actual') ? state.to : ''}></input>
               <label htmlFor='actual-step'> Actual </label>
               <input id='actual-step' type='checkbox' onChange={this.handleChange}></input>
            </p>
            <p>
               <label>Title : </label>
               <input id="title" onChange={this.handleChange} required defaultValue={state.title}></input>
            </p>
            <p>
               <label>Tasks : </label>
               <textarea id="tasks" onChange={this.handleChange} required defaultValue={state.tasks}></textarea>
            </p>
            <button>Submit</button>
         </form>
      }));
   }

   handleChange = e => {
      if (e.target.id === 'company'){
         this.setState({ company: e.target.value })
      }else if (e.target.id === 'title'){
         this.setState({ title: e.target.value })
      }else if (e.target.id === 'tasks'){
         this.setState({ tasks: e.target.value })
      }
      else if (e.target.id === 'from'){
         this.setState({ from: e.target.value })
      }else if (e.target.id === 'job-to'){
         this.setState({ to: e.target.value })
      }else if (e.target.id === 'actual-step'){
         if (e.target.checked){
            this.setState({ to: 'actual' })
            document.getElementById('job-to').removeAttribute('required');
            document.getElementById('job-to').setAttribute('disabled', true);
         }else{
            document.getElementById('job-to').removeAttribute('disabled');
            document.getElementById('job-to').setAttribute('required', true);
         }

      }
   }

   submitExp = e => {
      const state = this.state;
      const job = { company: state.company, from: state.from, to: state.to, title: state.title, tasks: state.tasks, id: uniqid('job')}
      e.preventDefault();
      this.setState({ form: <form></form>, company: '', from: '', to:'', title: '' , tasks: '' });
      this.setState({ jobs: state.jobs.concat(job) })
   }

   deleteItem = e => {
      this.setState(prevState => (
         { jobs : prevState.jobs.filter(job => job.id !== e.target.id) }
      ))
   }

   editItem = e => {
      const editingJob = this.state.jobs.find(job => job.id === e.target.id)
      this.deleteItem(e)
      this.setState({ company: editingJob.company, from: editingJob.from, to: editingJob.to, title: editingJob.title, tasks: editingJob.tasks, id: editingJob.id})
      this.displayForm(editingJob)
   }

   render(){
      return(
         <section className="jobs container">
            <h1>Experience <button onClick={this.displayForm}>+</button></h1>
            <div className="form-wrapper">
               {this.state.form}
            </div>
            <Steps data={this.state.jobs} deleteStep={this.deleteItem} editStep={this.editItem}/>
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
            {orderedSteps.map(job => {
               return (
               <div key={job.id}>
                  <h3>
                     {job.title} 
                     <button onClick={this.props.editStep} id={job.id}>E</button>
                     <button onClick={this.props.deleteStep} id={job.id}>X</button>
                  </h3>
                  <h4>{job.company}</h4>
                  <p>{job.from} - {job.to}</p>
                  <p>{job.tasks}</p>
               </div>
               )
            })}
         </div>
      )
   }
}
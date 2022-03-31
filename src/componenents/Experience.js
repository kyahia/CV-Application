import React, {useState} from "react";
import uniqid from 'uniqid';

export default function Experience (){
   const [showForm, setShowFrom] = useState(false)
   const [jobs, setJobs] = useState([])
   const [company, setCompany] = useState('')
   const [from, setFrom] = useState('')
   const [to, setTo] = useState('')
   const [title, setTitle] = useState('')
   const [tasks, setTasks] = useState('')
   const [id, setId] = useState(uniqid('job-'))

   function displayForm(condition){
      if (!condition) return null
      return (
         <form onSubmit={submitExp}>
            <p>
               <label>Company : </label>
               <input id="company" onChange={e => setCompany(e.target.value)} required defaultValue={company}></input>
            </p>
            <p>
               <label>From : </label>
               <input id="from" type="date" onChange={e => setFrom(e.target.value)} required defaultValue={from}></input>
               <label> To : </label>
               <input id="job-to" type="date" onChange={e => setTo(e.target.value)} required defaultValue={(to !== 'actual') ? to : ''}></input>
               <label htmlFor='actual-step'> Actual </label>
               <input id='actual-step' type='checkbox' onChange={setActual}></input>
            </p>
            <p>
               <label>Title : </label>
               <input id="title" onChange={e => setTitle(e.target.value)} required defaultValue={title}></input>
            </p>
            <p>
               <label>Tasks : </label>
               <textarea id="tasks" onChange={e => setTasks(()=> {
                  let txt = e.target.value;
                  let listing = txt.split('\n')
                  return txt;
               })} required defaultValue={tasks} cols={50} rows={5}></textarea>
            </p>
            <button type="submit">Submit</button>
         </form>
      )
   }

   function setActual(e){
      if (e.target.checked) {
         setTo('actual')
         document.getElementById('job-to').setAttribute('disabled', true);
         document.getElementById('job-to').setAttribute('required', false);
      }else if (!e.target.checked){
         document.getElementById('job-to').removeAttribute('disabled');
         document.getElementById('job-to').setAttribute('required', true);
      }
   }

   function submitExp(e){
      e.preventDefault()
      const job = {company, from, to, title, tasks, id}
      setJobs(prev => prev.concat(job))
      setShowFrom(false)
      setCompany('')
      setFrom('')
      setTo('')
      setTitle('')
      setTasks('')
      setId(uniqid('job-'))
   }

   function deleteItem(e){
      setJobs(prev => prev.filter(elem => elem.id !== e.target.id))
   }

   function editItem(e){
      let edition = jobs.find(job => job.id === e.target.id)
      setCompany(edition.company)
      setFrom(edition.from)
      setTo(edition.to)
      setTitle(edition.title)
      setTasks(edition.tasks)
      setId(edition.id)
      setShowFrom(true)
      deleteItem(e)
   }

   return(
      <section className="jobs container">
         <h1>Experience <button onClick={() => setShowFrom(true)}>+</button></h1>
         <div className="form-wrapper">
            {displayForm(showForm)}
         </div>
         <Steps data={jobs} deleteStep={deleteItem} editStep={editItem}/>
      </section>
   )

}

function Steps(props) {

   const orderedSteps = props.data.sort((prev, next) => {
      if (next.to === 'actual') return 1;
      return (next.to > prev.to) ? 1 : -1
   });

   if (!orderedSteps) return null

   return (
      <div>
         {orderedSteps.map(job => {
            let tasksUl = job.tasks.split('\n')
            return (
               <div key={job.id}>
                  <h3>
                     <span>{job.title} </span>
                     <button onClick={props.editStep} id={job.id}>E</button>
                     <button onClick={props.deleteStep} id={job.id}>X</button>
                  </h3>
                  <h4>{job.company}</h4>
                  <p>{job.from} - {job.to}</p>
                  <p>
                     <strong>Tasks: </strong>
                     {tasksUl.map((line, key) => (line !== '') ? <li key={key}>{line}</li> : null)}
                  </p>
               </div>
            )
         })}
      </div>
   )
}


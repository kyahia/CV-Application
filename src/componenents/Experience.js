import React, {useState} from "react";
import uniqid from 'uniqid';

export default function Experience (){
   const [showForm, setShowFrom] = useState(false)
   const [jobs, setJobs] = useState([])
   const [company, setCompany] = useState('')
   const [from, setFrom] = useState('')
   const [to, setTo] = useState('')
   const [title, setTitle] = useState('')
   const [jobDesc, setJobDesc] = useState('')
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
               <label style={{textAlign: 'center'}}>To : </label>
               <input id="job-to" type="date" onChange={e => setTo(e.target.value)} required defaultValue={(to !== 'actual') ? to : ''}></input>
               <label htmlFor='actual-step' style={{textAlign: 'center'}}>Actual </label>
               <input id='actual-step' type='checkbox' onChange={setActual}></input>
            </p>
            <p>
               <label>Title : </label>
               <input id="title" onChange={e => setTitle(e.target.value)} required defaultValue={title}></input>
            </p>
            <p>
               <label>Role description : </label>
               <input id="job-description" onChange={e => setJobDesc(e.target.value)} required defaultValue={jobDesc}></input>
            </p>
            <p>
               <label>Tasks : </label>
               <textarea id="tasks" onChange={e => setTasks(e.target.value)} 
               required defaultValue={tasks} cols={50} rows={5}></textarea>
            </p>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowFrom(!showForm)}>Cancel</button>
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
      const job = {company, from, to, title, jobDesc, tasks, id}
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
      setJobDesc(edition.jobDesc)
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
      <div className='steps'>
         {orderedSteps.map(job => {
            let tasksUl = job.tasks.split('\n')
            return (
               <div key={job.id} className='step'>
                  <h2>
                     <strong>{capitalize(job.title)}</strong>
                     <button onClick={props.editStep} id={job.id}>E</button>
                     <button onClick={props.deleteStep} id={job.id}>X</button>
                     <br/>
                     <em>{job.from.slice(0,4)} - {(job.to === 'actual') ? '(actual)' : job.to.slice(0,4)}
                     : {camelCase(job.company)}
                     </em>
                  </h2>
                  <p>{job.jobDesc}</p>
                  <ul>
                     {tasksUl.map((line, key) => (line !== '') ? <li key={key}>{line}</li> : null)}
                  </ul>
               </div>
            )
         })}
      </div>
   )
}

function camelCase(txt){
   const arr = txt.split(' ');
   return arr.map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}
function capitalize(txt){
   return txt[0].toUpperCase() + txt.slice(1)
}


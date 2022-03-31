import React, {useEffect, useState} from "react";
import uniqid from 'uniqid';
import './sections.css';

function Steps(props) {

   const orderedSteps = props.data.sort((prev, next) => {
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
                     <button onClick={props.editStep} id={study.id}>E</button>
                     <button onClick={props.deleteStep} id={study.id}>X</button>
                  </h3>
                  <h4>{study.univ}</h4>
                  <p>{study.from} - {study.to}</p>
               </div>
            )
         })}
      </div>
   )
}

export default function Education(){

   const [showForm, setShowForm] = useState(false);
   const [studies, setStudies] = useState([]);
   const [univ, setUniv] = useState('');
   const [from, setFrom] = useState('');
   const [to, setTo] = useState('actual');
   const [title, setTitle] = useState('');
   const [id, setId] = useState(uniqid());
   
   function displayForm (condition) {
      if (!condition) return null
      return (
         <form onSubmit={submitEd}>
            <p>
               <label>Institution : </label>
               <input id="univ" onChange={e => {setUniv(e.target.value)}} required defaultValue={univ}></input>
            </p>
            <p>
               <label>From : </label>
               <input id="from" type="date" onChange={e => setFrom(e.target.value)} required defaultValue={from}></input>
               <label> To : </label>
               <input 
                  id="univ-to" type="date" onChange={e => setTo(e.target.value)} defaultValue={(to !== 'actual') ? to : ''}
                  required={to !== 'actual'}  disabled={to === 'actual'}>
               </input>
               <label htmlFor='actual-step'> Actual </label>
               <input id='actual-step' type='checkbox' 
                  defaultChecked={to !== 'actual' ? false : true}
                  onChange={setActual}
               ></input>
            </p>
            <p>
               <label>Title : </label>
               <input id="title" onChange={e => setTitle(e.target.value)} required defaultValue={title}></input>
            </p>
            <button type="submit">Submit</button>
         </form>
      )
   }

   function submitEd(e) {
      let study = {univ, from, to, title, id}
      e.preventDefault()
      setId(uniqid());
      setStudies(prevStudies => prevStudies.concat(study));
      setShowForm(false);
      setUniv('')
      setFrom('')
      setTo('')
      setTitle('')
   }

   function setActual(e){
      if (e.target.checked) {
         setTo('actual')
         document.getElementById('univ-to').setAttribute('disabled', true);
         document.getElementById('univ-to').setAttribute('required', false);
      }else if (!e.target.checked){
         document.getElementById('univ-to').removeAttribute('disabled');
         document.getElementById('univ-to').setAttribute('required', true);
      }
   }

   const deleteItem = e => {
      setStudies(prevState => prevState.filter(study => study.id !== e.target.id))
   }

   const editItem = e => {
      let study = studies.find(elem => elem.id == e.target.id)
      setId(study.id)
      setUniv(study.univ)
      setFrom(study.from)
      setTo(study.to)
      setTitle(study.title)
      setShowForm(true)
      deleteItem(e)
   }

   return (
      <section className="studies container">
         <h1>Education <button onClick={() => setShowForm(true)}>+</button></h1>
         <div className="form-wrapper">{displayForm(showForm)}</div>
         <Steps data={studies} deleteStep={deleteItem} editStep={editItem} />
      </section>
   )
}

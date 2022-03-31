import React, { useState, useEffect } from "react";
import './sections.css'

export default function PersonalInfo() {
   const [showForm, setShowForm] = useState(false)
   const setForm = () => setShowForm(true);
   // const info = { name: 'Set Fullname', email: 'Set Email adress', phone: 'Set Phone number'}

   const [information, setInformation] = useState({
      name: 'Set Fullname',
      email: 'Set Email adress',
      phone: 'Set Phone number'
   })

   const updateInfo = (receivedInfo) => {
      setInformation({
         name: receivedInfo.name,
         phone: receivedInfo.phone,
         email: receivedInfo.email
      }) 
      setShowForm(false)
   }

   return (
      <section className="personal-info container">
         <h1>Personal Information <button onClick={setForm}>+</button></h1>
         <div className={"form " + (showForm ? '' : 'hidden') }>
               <Form data={information} callback={updateInfo} />
            </div>
         <h2><strong>Fullname : </strong>{information.name}</h2>
         <h2><strong>Email : </strong>{information.email}</h2>
         <h2><strong>Phone number : </strong>{information.phone}</h2>
      </section>
   )

}

function Form(props) {
   const [name, setName] = useState(props.data.name)
   const [phone, setPhone] = useState(props.data.phone)
   const [email, setEmail] = useState(props.data.email)

   const submit = e => {
      e.preventDefault()
      props.callback({name, phone, email})
   }

   const updateState = e => {
      if (e.target.id === 'name') {
         setName(e.target.value)
      } else if (e.target.id === 'email') {
         setEmail(e.target.value)
      } else if (e.target.id === 'phone') {
         setPhone(e.target.value)
      }
   }

   return (
      <form onSubmit={submit}>
         <p>
            <label>Fullname : </label>
            <input id='name' placeholder={name} onChange={updateState} required></input>
         </p>
         <p>
            <label>Email : </label>
            <input type='email' id='email' placeholder={email} onChange={updateState} required></input>
         </p>
         <p>
            <label>Phone : </label>
            <input type='tel' id='phone' placeholder={phone} onChange={updateState} required></input>
         </p>
         <p><button>Submit</button></p>
      </form>
   )
}
import React, { useState, useEffect } from "react";
import './sections.css';
import './perso.css';

export default function PersonalInfo() {
   const [showForm, setShowForm] = useState(false)
   const setForm = () => setShowForm(true);
   // const info = { name: 'Set Fullname', email: 'Set Email adress', phone: 'Set Phone number'}

   const [information, setInformation] = useState({
      name: 'Set Fullname',
      email: 'Set Email adress',
      phone: 'Set Phone number',
      social: {
         name: 'User name',
         media: 'Social media',
         link: '#'
      }
   })

   const updateInfo = (receivedInfo) => {
      setInformation({
         name: receivedInfo.name,
         phone: receivedInfo.phone,
         email: receivedInfo.email,
         image: receivedInfo.image,
         social: receivedInfo.social
      }) 
      setShowForm(false)
   }

   return (
      <section className="personal-info">
         <div className={"form " + (showForm ? '' : 'hidden') }>
            <Form data={information} callback={updateInfo} cancel={() => setShowForm(false)} />
         </div>
         <h1><strong>{information.name}</strong></h1>
         <div style={{textAlign: "center"}}><img src={information.image} alt='candidate'></img></div>
         <article>
            <h1>
               <strong>Contact </strong>
               <button onClick={setForm}>+</button>
            </h1>
            <h2><strong>Email</strong><br/>{information.email}</h2>
            <h2><strong>Phone number</strong><br/>{information.phone}</h2>
            <h2>
               <strong>{information.social.media}</strong><br/>
               <a href={information.social.link} target="_blank">{information.social.name}</a>
            </h2>
         </article>
      </section>
   )

}

function Form(props) {
   const [name, setName] = useState(props.data.name)
   const [image, setImage] = useState(null)
   const [phone, setPhone] = useState(props.data.phone)
   const [email, setEmail] = useState(props.data.email)
   const [social, setSocial] = useState(props.data.social)

   const submit = e => {
      e.preventDefault()
      props.callback({name, phone, email, image, social})
   }

   const updateState = e => {
      if (e.target.id === 'name') {
         setName(camelCase(e.target.value))
      } else if (e.target.id === 'email') {
         setEmail(e.target.value)
      } else if (e.target.id === 'phone') {
         setPhone(e.target.value)
      } else if (e.target.id === 'social-media') {
         setSocial({ ...social, media : e.target.value })
      } else if (e.target.id === 'social-link') {
         setSocial({ ...social, link : capitalize(e.target.value) })
      } else if (e.target.id === 'social-name') {
         setSocial({ ...social, name : camelCase(e.target.value) })
      } else if (e.target.id === 'image') {
         setImage(URL.createObjectURL(e.target.files[0]))
         // or
         // const img = document.querrySelector('img');
         // const fr = new FileReader();
         // fr.onload = function () {
            //    document.getElementById(outImage).src = fr.result;
            // }
            // fr.readAsDataURL(files[0]);
         // or
         // const reader = new FileReader();
         // reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
         // reader.readAsDataURL(e.target.files[0]); // should delete src attribute of img
      }
   }

   return (
      <form onSubmit={submit}>
         <p>
            <label>Fullname : </label>
            <input id='name' placeholder={name} onChange={updateState} required></input>
         </p>
         <p>
            <label>Photo : </label>
            <input type="file" id='image' placeholder={phone} onChange={updateState} accept='image/*'></input>
         </p>
         <p>
            <label>Email : </label>
            <input type='email' id='email' placeholder={email} onChange={updateState} required></input>
         </p>
         <p>
            <label>Phone : </label>
            <input type='tel' id='phone' placeholder={phone} onChange={updateState} required></input>
         </p>
         <p>
            <label htmlFor="social-media">Social media : </label>
            <input list="social-medias" id="social-media" name="social-media" onChange={updateState}></input>
            <datalist id="social-medias">
               <option value="LinkedIn"/>
               <option value="Facebook"/>
            </datalist>
         </p>
         <p>
            <label htmlFor="social-name">Profile Name : </label>
            <input type="text" id="social-name" onChange={updateState}></input>
         </p>
         <p>
            <label htmlFor="social-link">Link : </label>
            <input type="text" id="social-link" onChange={updateState}></input>
         </p>
         <div className="buttons"><button type="submit">Submit</button><button type="button" onClick={props.cancel}>Cancel</button></div>
      </form>
   )
}

function camelCase(txt){
   const arr = txt.split(' ');
   return arr.map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}
function capitalize(txt){
   return txt[0].toUpperCase() + txt.slice(1)
}
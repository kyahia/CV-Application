import React from "react";
import PersonalInfo from './componenents/Perso';
import Education from './componenents/Educ';
import Experience from './componenents/Experience';

class App extends React.Component{

  render(){
    return (
      <div>
        <PersonalInfo />
        <Education />
        <Experience />
      </div>
    )
  }
}

export default App;

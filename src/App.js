import React from "react";
import PersonalInfo from './componenents/Perso';
import Education from './componenents/Educ';
import Experience from './componenents/Experience';

function App () {
  return (
    <div className="app-wrapper">
      <aside>
      <PersonalInfo />
      </aside>
      <main>
      <Education />
      <div id="separator"></div>
      <Experience />
      </main>
    </div>
  )
}

export default App;

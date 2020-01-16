import React from 'react';
import axios from 'axios';
const Home = () => {

  const test = () => {
    axios.get('/users/test').then(res => console.log(res));
}

    return (
        <div>Home Component
          <button onClick={test}>Test</button>
        </div>
      )
}

export default Home;
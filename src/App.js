import { useState } from 'react';

import shuffle from 'utils/shuffle';
import Card from 'components/card';

import './App.css';

import { data } from 'config';

function App() {
  const [show, setShow] = useState(false);

  return (
    <div onClick={() => setShow(!show)} className="App">
      <div className="card-wrapper">
        {data.map(({ image }) => (
          <Card cardImage={image} />
        ))}
      </div>
    </div>
  );
}

export default App;

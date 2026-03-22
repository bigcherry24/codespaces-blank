import { useState } from 'react';
import UserProfile from './components/UserProfile';

export default function App() {

  // const [count, setCount] = useState(0);

  // return <button onClick={() => setCount(count + 1)}>Count: {count}</button>

  return (
      <div><UserProfile userId={1} /></div>
  )
}
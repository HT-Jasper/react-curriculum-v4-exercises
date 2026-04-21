// src/exercises/lesson-03/BugMutatedState.jsx

/*
  BUG #2 — State Issue

  This component displays a count and updates it when the button is clicked.
  However, the way the count is being changed causes the component to behave
  incorrectly.
*/

import { useState } from 'react';
export default function BugMutatedState() {
  let [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Bug 2 Count: {count}</p>
      <button onClick={handleAdd}>Add 1</button>
    </div>
  );
}

// Explanation:
/*
count++ change the state variable directly, which would cause a bug in React as React doesn't detect direct mutation 
correct way should be function handleAdd() {
    setCount(count + 1) or  setCount(prev => prev + 1)
  }
*/

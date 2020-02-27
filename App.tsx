// import useState next to FunctionComponent
import React, { useState, useReducer } from 'react';

interface CounterInterface {
  initial?: number
}

// our components props accept a number for the initial value
// and again typescript "shines" here, maybe I'm missing something but in incoming prop, if not defined
// it will `fall back` to 0 value, but in interface it has to be specified as optional, meaning that value can
// be undefined, which would make sense if it only would check for incoming prop, but, not when fall back
// value is actually specified.. sketchy.. very sketchy
const Counter = ({ initial = 0 }: CounterInterface) => {
  // since we pass a number here, clicks is going to be a number.
  // setClicks is a function that accepts either a number or a function returning
  // a number
  const [clicks, setClicks] = useState(initial);
  return <>
    <p>Clicks: {clicks}</p>
    <button onClick={() => setClicks(clicks+1)}>+</button>
    <button onClick={() => setClicks(clicks-1)}>-</button>
  </>
}


// Couple questions to this, originally in redux documentation, in defining action type
// constants had to be used to 'aviod' typing errors, now it's gone, have people learned to code without making typing mistakes? wth.. really..
// subsequently action has to be wrapped into a function rather than dispatching action type straight away
// something that again was specified in redux documentation, but now looks like also gone.
// so, conclusion, if wee add two things above, yes, boilertplate is increased, but, then, its 1:1 as it was with redux
// question - why would you reinvent the wheel?? wth..

type ActionType = {
  type: 'reset' | 'decrement' | 'increment'
}
interface StateInterface {
  count: number
}

const initialState = { count: 0 };

// We only need to set the type here ...
function Counter2Reducer(state: StateInterface, action: ActionType) {
  switch (action.type) {
    // ... to make sure that we don't have any other strings here ...
    case 'reset':
      return initialState;
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter2({ initialCount = 0 }) {
  const [state, dispatch] = useReducer(Counter2Reducer, { count: initialCount });
  return (
    <>
      Count: {state.count}
      { /* and can dispatch certain events here */ }
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}




const App:React.FC<{}> = () => {
  return (
    <>
    <h1>Counter Variations</h1>
    <h2>Counter Simple</h2>
    <Counter />
    <h2>Counter With Reducer</h2>
    <Counter2 />
    </>
  )
}

export default App;
//below code is for counter app without redux

// import { useEffect, useState, useRef } from "react";
// import "./styles.css";

// const COUNTER_STATE = {
//   IDLE: "IDLE",
//   PROGRESS: "PROGRESS",
//   RESET: "RESET",
//   PAUSE: "PAUSE"
// };

// export default function App() {
//   const [counter, setCounter] = useState(0);
//   const counterRef = useRef(null);
//   const [counterState, setCounterState] = useState(COUNTER_STATE.IDLE);

//   function changeCounterState(newCounterState) {
//     setCounterState(newCounterState);
//   }
//   function clearCounterInterval() {
//     if (counterRef.current) {
//       clearInterval(counterRef.current);
//     }
//   }
//   useEffect(function () {
//     return clearCounterInterval;
//   }, []);

//   useEffect(
//     function () {
//       if (counterState == COUNTER_STATE.RESET) {
//         clearCounterInterval();
//         setCounter(0);
//         changeCounterState(COUNTER_STATE.IDLE);
//       } else if (counterState == COUNTER_STATE.PROGRESS) {
//         clearCounterInterval();

//         counterRef.current = setInterval(function () {
//           setCounter(($counter) => $counter + 1);
//         }, 1000);
//       } else if (counterState == COUNTER_STATE.PAUSE) {
//         clearCounterInterval();
//       }
//     },
//     [counterState]
//   );

//   const buttonText =
//     counterState === COUNTER_STATE.PAUSE
//       ? COUNTER_STATE.PROGRESS
//       : COUNTER_STATE.PAUSE;
//   return (
//     <div className="App">
//       <pre>
//         {JSON.stringify(
//           {
//             counter,
//             counterState
//           },
//           null,
//           2
//         )}
//       </pre>
//       <div className="header-counter">
//         <h1>{counter}</h1>
//       </div>
//       <div>
//         <button
//           disabled={[COUNTER_STATE.PAUSE, COUNTER_STATE.PROGRESS].includes(
//             counterState
//           )}
//           onClick={changeCounterState.bind(this, COUNTER_STATE.PROGRESS)}
//         >
//           Start Counter
//         </button>
//       </div>
//       <div>
//         <button
//           disabled={[COUNTER_STATE.IDLE, COUNTER_STATE.RESET].includes(
//             counterState
//           )}
//           onClick={changeCounterState.bind(this, buttonText)}
//         >
//           {buttonText} Counter
//         </button>
//       </div>
//       <div>
//         <button
//           disabled={[
//             COUNTER_STATE.IDLE,
//             COUNTER_STATE.RESET,
//             COUNTER_STATE.PROGRESS
//           ].includes(counterState)}
//           onClick={changeCounterState.bind(this, COUNTER_STATE.RESET)}
//         >
//           Reset Counter
//         </button>
//       </div>
//     </div>
//   );
// }

//below code is for counter with redux

import { useSelector, useDispatch, useStore } from "react-redux";
import { changeState, changeCounter, incCounter } from "./store/actions";
import { useRef, useEffect } from "react";

const App = () => {
  const COUNTER_STATE = {
    IDLE: "IDLE",
    PROGRESS: "PROGRESS",
    RESET: "RESET",
    PAUSE: "PAUSE"
  };
  const $store = useStore();
  const { counter, counterState } = useSelector(
    (state) => state.changeCounterProp
  );

  const counterRef = useRef(null);
  const dispatch = useDispatch();

  function clearCounterInterval() {
    if (counterRef.current) {
      clearInterval(counterRef.current);
    }
  }

  function changeCounterState(newCounterState) {
    dispatch(changeState(newCounterState));
  }

  useEffect(function () {
    return clearCounterInterval;
  }, []);

  useEffect(
    function () {
      if (counterState == COUNTER_STATE.RESET) {
        clearCounterInterval();
        dispatch(changeCounter(0));
        // setCounter(0);
        changeCounterState(COUNTER_STATE.IDLE);
      } else if (counterState == COUNTER_STATE.PROGRESS) {
        clearCounterInterval();

        console.log(counter, "counter");
        counterRef.current = setInterval(function () {
          dispatch(
            changeCounter($store.getState().changeCounterProp.counter + 1)
          );
          // dispatch(incCounter(($counter) => $counter + 10));
        }, 1000);
      } else if (counterState == COUNTER_STATE.PAUSE) {
        clearCounterInterval();
      }
    },
    [counterState]
  );

  const buttonText =
    counterState === COUNTER_STATE.PAUSE
      ? COUNTER_STATE.PROGRESS
      : COUNTER_STATE.PAUSE;

  return (
    <>
      <div className="App">
        <pre>
          {JSON.stringify(
            {
              counter,
              counterState
            },
            null,
            2
          )}
        </pre>
        <div className="header-counter">{/* <h1>{counter}</h1> */}</div>
        <div>
          <button
            disabled={[COUNTER_STATE.PAUSE, COUNTER_STATE.PROGRESS].includes(
              counterState
            )}
            onClick={changeCounterState.bind(this, COUNTER_STATE.PROGRESS)}
          >
            Start Counter
          </button>
        </div>
        <div>
          <button
            disabled={[COUNTER_STATE.IDLE, COUNTER_STATE.RESET].includes(
              counterState
            )}
            onClick={changeCounterState.bind(this, buttonText)}
          >
            {buttonText} Counter
          </button>
        </div>
        <div>
          <button
            disabled={[
              COUNTER_STATE.IDLE,
              COUNTER_STATE.RESET,
              COUNTER_STATE.PROGRESS
            ].includes(counterState)}
            onClick={changeCounterState.bind(this, COUNTER_STATE.RESET)}
          >
            Reset Counter
          </button>
        </div>
      </div>
    </>
  );
};

export default App;

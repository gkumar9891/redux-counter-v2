import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h3>
        {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </h3>
    </div>
  );
}

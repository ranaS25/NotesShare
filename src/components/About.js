import { useState } from "react";

const About = (props) => {
    const [count, setCount] = useState(1);
    console.log("count: " + count);
    return (
      <div
        className="bg-slate-400 p-3"
      >
        <h2>About Section</h2>
        <p>Count { count}</p>
        <button
          type="button"
          onClick={() => {
              setCount(count + 1);
          }}
        >
          Increment
        </button>
      </div>
    );
}

export default About;
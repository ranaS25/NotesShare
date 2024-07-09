import { useState } from "react";

const About = (props) => {
    const [count, setCount] = useState(1);
    console.log("count: " + count);
    return (
      <div
        className="card-cont"
        style={{ padding: "24px", border: "1px solid black" }}
      >
        <h2>Card</h2>
        <p>description</p>
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
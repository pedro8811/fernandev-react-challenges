import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
    console.log(newDot);
    setList((prev) => [...prev, newDot]);
    setUndid([])
  };

  const handleUndo = (event) => {
    event.stopPropagation();

    if (list.length === 0) {
      return;
    }

    const lastItem = list[list.length - 1];
    setUndid(prev => [...prev, lastItem])

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  };

  const handleRedo = (event) => {
    event.stopPropagation();
    console.log("Redo");

    if(undid.length === 0){
      return;
    }

    const recoveredDot = undid[undid.length - 1];
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
    setList(prev => [...prev, recoveredDot])
  };

  return (
    <div id="page" onClick={handleClick}>
      <button className="btn btn-light" onClick={handleUndo}>
        Desfazer
      </button>
      <button className="btn btn-light" onClick={handleRedo}>
        Refazer
      </button>
      {list.map((item, index) => (
        <span
        key={index}
          className="dot"
          style={{ left: item.clientX, top: item.clientY }}
        />
      ))}
    </div>
  );
}

export default App;

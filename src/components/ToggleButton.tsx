import { useState } from "react";

interface ToggleButton {
  onToggle: (state: string) => void;
}

function ToggleButton({ onToggle }: ToggleButton) {
  const [toggled, setToggled] = useState("KMP");

  return (
    <div className="btn-group toggle-style">
      <a
        href="#"
        className={
          toggled == "KMP" ? "btn btn-primary active" : "btn btn-primary"
        }
        aria-current="page"
        onClick={() => {
          setToggled("KMP");
          onToggle("KMP");
        }}
      >
        KMP
      </a>
      <a
        href="#"
        className={
          toggled == "BM" ? "btn btn-primary active" : "btn btn-primary"
        }
        onClick={() => {
          setToggled("BM");
          onToggle("BM");
        }}
      >
        BM
      </a>
    </div>
  );
}

export default ToggleButton;

import "./style-loader.css";

import { useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <div className="container">
      <div className="playScreen">
        <h1>Loading Experience</h1>

        <div className="lds-ripple">
          <div></div>
          <div>{progress} % loaded</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
import "./style-loader.css";

import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="container-loader">
        <div className="loadScreen">
          <h1>Loading Experience</h1>

          <div>
            <div></div>
            <div>{progress} % loaded</div>
            <div></div>
          </div>
        </div>
      </div>
    </Html>
  );
}

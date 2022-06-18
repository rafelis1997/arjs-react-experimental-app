import "./style-loader.css";

import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html>
      <div className="container-loader">
        <div className="loadScreen">
          <h1>Loading Experience</h1>

          <div>
            <div><h2><strong>{Math.round(progress)} % loaded</strong></h2></div>
          </div>
        </div>
      </div>
    </Html>
  );
}

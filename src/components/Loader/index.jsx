import "./style-loader.css";

import { useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
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
  );
}

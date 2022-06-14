import { Suspense, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import "./styles.css";
import Model from "./components/Model";

const App = () => {
  const [play, setPlay] = useState(false);
  const [marker, setMarker] = useState(false);

  function handlePlayButton() {
    let setDisplay = !play;
    setPlay(setDisplay);
  }

  function handleMarkerFound() {
    let setMarkerDetected = !marker;
    console.log(setMarkerDetected);
    setMarker(setMarkerDetected);
  }

  function handleMarkerLost() {
    let setMarkerDetected = !marker;
    setMarker(setMarkerDetected);
  }

  return (
    <>
      <div
        className="container"
        style={play ? { background: "transparent" } : { background: "#ff6b6b" }}
      >
        {play ? (
          <ARCanvas
            className="AR"
            shadows
            camera={{ position: [0, 0, 0], near: 0.01, far: 1000 }}
            onCreated={({ gl }) => {
              gl.setSize(window.innerWidth, window.innerHeight);
            }}
            gl={{
              alpha: true,
              antialias: true,
              precision: "highp",
              logarithmicDepthBuffer: true
            }}
          >
            <ARMarker
              type={"pattern"}
              patternUrl={"data/hiro.patt"}
              onMarkerFound={handleMarkerFound}
              onMarkerLost={handleMarkerLost}
            >
              <ambientLight />
              <Suspense fallback={null}>
                <Model
                  rotation={[-90, 0, 0]}
                  position={[0, 2, 0]}
                  scale={[1, 1, 1]}
                  marker={marker}
                />
              </Suspense>
              <OrbitControls />
            </ARMarker>
          </ARCanvas>
        ) : (
          <div className="playScreen">
            <h1>Start experience</h1>

            <button onClick={handlePlayButton}>Play!</button>
          </div>
        )}

        <p className="footer">
          Desenvolvido por {""}
          <span>Rafael de Almeida</span>
        </p>
      </div>
      {!marker ? (
        <div className="scanMarkerImg">
          <img src="./ScanMarkerInst.png" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;

import { Suspense, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import { usePinch } from "@use-gesture/react";

import "./styles.css";
import Model from "./components/Model";


const App = () => {
  const [play, setPlay] = useState(false);
  const [marker, setMarker] = useState(false);
  const [scale, setScale] = useState([1, 1, 1])
  const [newAngle, setNewAngle] = useState([-90,0,0]);
  const [dist, setDist] = useState(0);

  document.addEventListener('gesturestart', (e) => e.preventDefault())
  document.addEventListener('gesturechange', (e) => e.preventDefault())

  const bind = usePinch(({ offset: [scale, angle], da : [d,a] }) => { 
    setScale([scale,scale,scale]);
    let angleThreshold = Math.abs((newAngle[1] - angle)/newAngle[1]);
    let distThreshold = Math.abs((dist - d)/d)
    if(angleThreshold > 0.3 && distThreshold < 0.2) { 
      setNewAngle([-90,angle*0.2,0]);
    }
  })

  function handlePlayButton() {
    let setDisplay = !play;
    const playScreen = document.querySelector('.playScreen');
    playScreen.style.transition = "opacity 0.6s ease-out";
    playScreen.style.opacity = 0;
    setTimeout(() => {
      setPlay(setDisplay);
    },600)
  }

  function handleMarkerFound() {
    let setMarkerDetected = true;
    console.log(setMarkerDetected);
    setMarker(setMarkerDetected);
  }

  function handleMarkerLost() {
    let setMarkerDetected = false;
    setMarker(setMarkerDetected);
  }


  function handleVideoStreamReady() {
    const loadScreen = document.querySelector('.container-loader');
    loadScreen.style.transition = "opacity 0.4s ease-out";
    loadScreen.style.opacity = 0;
    setTimeout(()=>{
      loadScreen.style.display = 'none';
    }, 600);

  }

  function handleVideoStreamError(){
   
  }

  return (
    <>
      <div
        className="container"
        style={play ? { background: "transparent", transition: "background 0.8s ease-in", transitionDelay:"0.8s"} : { background: "#ff6b6b" }}
      >
         
        {play ? (
          <>
          
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
            // onCameraStreamReady={handleVideoStreamReady}
            // onCameraStreamError={handleVideoStreamError} //
            sourceType = "webcam"
            {...bind()}
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
                  rotation={newAngle}
                  position={[0, 2, 0]}
                  scale={scale}
                  marker={marker}
                />
              </Suspense>
              <OrbitControls />
            </ARMarker>
          </ARCanvas>
          
          </>
        ) : (
          <div className="playScreen">
            <h1>Start experience</h1>

            <button onClick={handlePlayButton}>Play!</button>
          </div>
        )}  
        <p className="footer">
          Developed by {""}
          <span>Rafael de Almeida</span>
        </p>
      </div>
      {!marker ? (
              <div className="scanMarkerImg">
                <img src="./ScanMarkerInst.png" />
              </div>
      ):(<></>)}
    </>
  );
};

export default App;

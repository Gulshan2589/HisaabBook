import React, { useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Webcam from "react-webcam";

function Face() {
    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);
    const navigate = useNavigate();
    const videoRef = React.useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = React.useRef();


    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = 'https://github.com/justadudewhohacks/face-api.js-models';
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
                await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

                setModelsLoaded(true);
            } catch (error) {
                console.error('Error loading models:', error);
            }
        };

        loadModels();
    }, []);

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("error:", err);
            });
    }

    const handleVideoOnPlay = async () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight
                }

                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                localStorage.setItem('faceMatcher', JSON.stringify(detections));
                //console.log(detections);
                canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

                // await axios.post('/api/face/faceregister', JSON.stringify(detections));
                const matchdata = JSON.parse(localStorage.getItem('faceMatcher'));
                //console.log(matchdata);
                // console.log("face : " + resizedDetections + "\n" + "match : " + matchdata);
                // console.log(resizedDetections === matchdata)
                // if (JSON.stringify(matchdata) === JSON.stringify(resizedDetections)) {
                //     console.log('login');
                // } else {
                //     navigate('login f');
                // }

                const results = await faceapi
                    .detectAllFaces()
                    .withFaceLandmarks()
                    .withFaceDescriptors()
            }
        }, 1000)
    }

    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
    }


    return (
        <>
            <div className="face">
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    {
                        captureVideo && modelsLoaded ?
                            <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                                Close Webcam
                            </button>
                            :
                            <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                                Open Webcam
                            </button>
                    }
                </div>
                {
                    captureVideo ?
                        modelsLoaded ?
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                    <video ref={videoRef} height={videoHeight} width={videoWidth}
                                        onPlay={handleVideoOnPlay}
                                        style={{ borderRadius: '10px' }} />
                                    <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                                </div>
                            </div>
                            :
                            <div>loading...</div>
                        :
                        <>
                        </>
                }
            </div>
        </>
    );
};

export default Face
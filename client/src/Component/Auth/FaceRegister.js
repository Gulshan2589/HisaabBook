import { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import '../Face/Face.css';

const Register = () => {
    const imgRef = useRef();
    const canvasRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState();

    useEffect(() => {
        async function loadModels() {
            await faceapi.loadSsdMobilenetv1Model('/models');
            await faceapi.loadFaceLandmarkModel('/models');
            await faceapi.loadFaceRecognitionModel('/models');
            setIsLoading(false);
        }
        loadModels();
    }, []);

    function handleChange (e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }






    const handleSubmit = async () => {
        // Get the image element
        const image = imgRef.current;
        const canvas = faceapi.createCanvasFromMedia(image);
        const displaySize = { width: image.width, height: image.height };
        faceapi.matchDimensions(canvas, displaySize);
        // Detect the faces in the image
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        //setIsLoading(false);

    }

    return (
        <div className='face'>
            <div className='container'>
                {isLoading ? (<p>Loading models...</p>) : (
                    <>
                        <h1>Face Registeration</h1>
                        <form className='form'onSubmit={handleSubmit} >
                            <img src={file} ref={imgRef} />
                            <input type="file" accept="image/*" onChange={handleChange} /><br />
                            <input type='text' name='user' /><br />
                            <button type="submit">Register</button><br />
                        </form>
                    </>)}
            </div>
        </div>
    )
}

export default Register;
import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

function Face() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [registering, setRegistering] = useState(false);

    // Load the face detection and recognition models
  

    const RenderLoginForm = () => {
        const [imageUrl, setImageUrl] = useState(null);
        const imgElement = useRef(null);

        const handleChange = (event) => {
            const file = event.target.files[0];
            setImageUrl(URL.createObjectURL(file));
        };

        const handleLogin = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
            // Perform face detection and recognition
            const detections = await faceapi.detectSingleFace(imgElement.current).withFaceLandmarks().withFaceDescriptor();
            if (!detections) {
                setError('Could not detect a face in the image');
                return;
            }
            const descriptor = detections.descriptor;

            // Check if the descriptor matches any registered users in local storage
            const registeredDescriptors = JSON.parse(localStorage.getItem('descriptors')) || [];
            const matchingDescriptor = registeredDescriptors.find((d) => d.toString() === descriptor.toString());
            if (matchingDescriptor) {
                setUser({ name: 'User' });
                setError(null);
                setLoggedIn(true);
            } else {
                setError('No matching descriptor found');
            }
        };

        return (
            <>
                <input type="file" accept="image/*" onChange={handleChange} />
                <button onClick={handleLogin}>Log In</button>
                {error && <div>{error}</div>}
                {imageUrl && <img style={{width: '450px', height: '300px'}} src={imageUrl} alt="Preview"
                    ref={imgElement} />}
            </>
        );
    };
    const RenderRegisterForm = () => {
        const [imageUrl, setImageUrl] = useState(null);
        const imgElement = useRef(null);

        const handleChange = (event) => {
            const file = event.target.files[0];
            setImageUrl(URL.createObjectURL(file));
        };

        const handleRegister = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
            // Perform face detection and recognition
            const detections = await faceapi.detectSingleFace(imgElement.current).withFaceLandmarks().withFaceDescriptor();
            if (!detections) {
                setError('Could not detect a face in the image');
                return;
            }
            const descriptor = detections.descriptor;

            // Save the user's descriptor to local storage
            const registeredDescriptors = JSON.parse(localStorage.getItem('descriptors')) || [];
            registeredDescriptors.push(descriptor);
            localStorage.setItem('descriptors', JSON.stringify(registeredDescriptors));
            setUser({ name: 'User' });
            setError(null);
            setRegistering(false);
        };

        return (
            <>
                <input type="file" accept="image/*" onChange={handleChange} />
                <button onClick={handleRegister}>Register</button>
                {error && <div>{error}</div>}
                {imageUrl && <img style={{width: '450px', height: '300px'}} src={imageUrl} alt="Preview" ref={imgElement} />}
            </>
        );
    };

    const RenderUserInfo = () => {
        return (
            <>
                <h2>Welcome, {user.name}!</h2>
                <button onClick={() => setLoggedIn(false)}>Log Out</button>
            </>
        );
    };
    return (
        <div>
            {loggedIn ? (
                <RenderUserInfo />
            ) : registering ? (
                <RenderRegisterForm />
            ) : (
                <RenderLoginForm />
            )}
            <button onClick={() => setRegistering(true)}>Sign Up</button>
        </div>
    );
}

export default Face;
// import React, { useRef, useEffect } from "react";
// import * as faceapi from 'face-api.js';
// // import Webcam from "react-webcam";

// function Face() {
//     const inputRef = useRef();
//     const inputRef2 = useRef();
//     const imageRef = useRef();
//     const imgRef1 = useRef();
    

//     useEffect(() => {
//         async function handleFileChange(event) {
//             const image = event.target.files[0];
//             const imageUrl = URL.createObjectURL(image);
//             imageRef.current.src = imageUrl;
//         }
//         inputRef.current.addEventListener('change', handleFileChange);
//         async function handleFileChange2(event) {
//             const image = event.target.files[0];
//             const imageUrl1 = URL.createObjectURL(image);
//             imgRef1.current.src = imageUrl1;
//         }
//         inputRef2.current.addEventListener('change', handleFileChange2);
       
//     }, []);

//     function loadLabeledImages() {
//       const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
//       return Promise.all(
//         labels.map(async label => {
//           const descriptions = []
//           for (let i = 1; i <= 2; i++) {
//            // Blob = require('node-fetch');
//            // global.Blob = require('blob');
//             const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
//             const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//             descriptions.push(detections.descriptor)
//           }
    
//           return new faceapi.LabeledFaceDescriptors(label, descriptions);
//         })
//       )
//     }
    

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const MODEL_URL = process.env.PUBLIC_URL + '/models';
//         // Load the models
//         await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

//         // Get the image element
//         const image = imageRef.current;

//         // Detect the faces in the image
//         const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
//         const displaySize = { width: image.width, height: image.height };
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         // // Extract the facial features
//         // const facialFeatures = predictions[0].descriptor;
//         // localStorage.setItem('detection', JSON.stringify(facialFeatures));
//         // const matchdata = JSON.parse(localStorage.getItem('detection'));
//         // console.log("face : " + facialFeatures + "\n" + "match : " + matchdata)
//         // console.log(facialFeatures === matchdata)
//         // if (JSON.stringify(matchdata) === JSON.stringify(facialFeatures)) {

//         console.log('resizedDetections', resizedDetections);
//         // } else {
//         //     console.log('second');
//         // }
//         const labeledFaceDescriptors = await loadLabeledImages();
//         const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
//         if (resizedDetections) {
//             const bestMatch = faceMatcher.findBestMatch(resizedDetections.descriptor)
//             console.log(bestMatch.toString());
//           }
//     };
    
//     return (
//         <div className="margin" >
//         <form onSubmit={handleSubmit}>
//             <input ref={inputRef} type="file" accept="image/*" />
//             <button type="submit">Submit</button><br/>
//             <img style={{width: '450px', height: '300px'}} ref={imageRef} id='img' alt="myimg" /><br/>
//             <input ref={inputRef2} type='file' accept="image/*"/><br/>
//             <img  style={{width: '450px', height: '300px'}} ref={imgRef1}/>
//         </form>
//         </div>
//     );
// };

// export default Face;
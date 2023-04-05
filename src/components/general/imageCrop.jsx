import { useState } from "react";
import ReactCrop from "react-image-crop";

function ImageCrop(props) {
    const [crop, setCrop] = useState(props.cropConfig || { unit: '%', width: 30, aspect: 3 / 4 });
    const [imageRef, setImageRef] = useState({});

    function getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
            blob.name = fileName;
            resolve(blob);
            }, 'image/jpeg', 1);
        });
    }

    async function cropComplete() {
        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imageRef,
                crop,
                'newFile.jpeg'
            );

            const reader = new FileReader();
            reader.readAsDataURL(croppedImageUrl);
            reader.onloadend = () => {
                const base64 = reader.result;
                props.onCrop({ base64: base64, blob: croppedImageUrl });
            }
        }
    }

    return (
        <>
            <ReactCrop ruleOfThirds locked onComplete={cropComplete} src={props.src} crop={crop} onImageLoaded={img => setImageRef(img)} onChange={newCrop => setCrop(newCrop)} />
        </>
    )
}

export default ImageCrop;
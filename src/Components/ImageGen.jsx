import React, { useState } from "react";
import Api from "./api"
const ImageGenerator = () => {
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${Api}`
                },
                body: JSON.stringify({ inputs: input }),
            }
        );
        const blob = await res.blob();
        setImage(URL.createObjectURL(blob));
    };
    const handleDownload = () => {
        if (!image) return;
        const a = document.createElement("a");
        a.href = image;
        a.download = "image.png";
        a.click();
    }
    return (
        <div className="container">
            <h1 className="Image-text">Text to Image Translator</h1>
            <form onSubmit={handleSubmit} className="gen-form">
                <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)} />
                <button type="submit" >
                    Image Generator
                </button>
            </form>
            {image && (<>
                <div className="result-image ">
                    <img src={image} alt="art" />
                </div>
                <button onClick={handleDownload} className="button-download">
                    Download
                </button>
            </>)}
        </div>
    );
};


export default ImageGenerator; 
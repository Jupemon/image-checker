import React from 'react';
import './imagelinkform.css'

const ImageLinkForm = ({ onInputChange, onSubmit, isLoadingImage}) => {
    return ( 
        <div>
            <p className="f3">
            Give me a image address and i will outline any faces in it
            </p> 
            <div className="center">
                <div className=" form pa4 br3 shadow-5">
                    <input onChange={onInputChange} defaultValue="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Arnold_Schwarzenegger_-_2019_%2833730956438%29_%28cropped%29.jpg/250px-Arnold_Schwarzenegger_-_2019_%2833730956438%29_%28cropped%29.jpg" className="f4 pa2 w-70 center" type="text"/>
                    <button onClick={onSubmit} disabled={/*isLoadingImage*/false} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">{isLoadingImage ? "Loading..." : "Detect"}</button>
                </div>
            </div>
        </div>
     );
}
 
export default ImageLinkForm;
import React, { useState } from 'react'
import axios from 'axios'
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'

export const Homepage = () => {
  const [formData, setFormData] = useState({
    Latitude: '',
    Longitude: '',
    Depth: '',
    'Root Mean Square': ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setResult(res.data);
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <ShaderGradientCanvas
      style={{
            position : 'absolute',
            inset : '0',
            zIndex: "5",
           
      }}
      pointerEvents='none'>
        
        <ShaderGradient 
  control="query"
  urlString="https://www.shadergradient.co/customize?animate=off&axesHelper=off&bgColor1=%23833688&bgColor2=%23320e8c&brightness=1.8&cAzimuthAngle=180&cDistance=6&cPolarAngle=90&cameraZoom=1&color1=%23835a54&color2=%233d052a&color3=%23000084&destination=onCanvas&embedMode=off&envPreset=lobby&format=gif&fov=50&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=2.8&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=13.6&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=0&uDensity=0.9&uFrequency=5.5&uSpeed=0&uStrength=1.2&uTime=13.6&wireframe=false"
/>

      </ShaderGradientCanvas>

      <div className='w-1/2 mx-auto relative z-10'>
        <h1 className='text-3xl text-center p-15 text-white font-LilitaOne'>Earthquake Prediction</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4 justify-items-center p-10'>
              <div className='p-10'>
                <p className='text-2xl pb-5 text-white font-LilitaOne'>Latitude</p>
                <input
                  type="number"
                  name="Latitude"
                  value={formData.Latitude}
                  onChange={handleChange}
                  className='w-75 h-16 px-4 py-3 rounded-full bg-white text-gray-800 border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                  placeholder='eg : 39.9  all ranges over the world'
                  required
                />
              </div>
              <div className='p-10'>
                <p className='text-2xl pb-5 text-white font-LilitaOne'>Longitude</p>
                <input
                  type="number"
                  name="Longitude"
                  value={formData.Longitude}
                  onChange={handleChange}
                  className='w-75 h-16 px-4 py-3 rounded-full bg-white text-gray-800 border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                  placeholder='eg : 139.9  all ranges over the world'
                  required
                />
              </div>
              <div className='p-10'>
                <p className='text-2xl pb-5 text-white font-LilitaOne'>Depth</p>
                <input
                  type="number"
                  name="Depth"
                  value={formData.Depth}
                  onChange={handleChange}
                  className='w-75 h-16 px-4 py-3 rounded-full bg-white text-gray-800 border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                  placeholder='eg : 39.9  all ranges over the world'
                  required
                />
              </div>
              <div className='p-10'>
                <p className='text-2xl pb-5 text-white font-LilitaOne'>Root Mean Square</p>
                <input
                  type="number"
                  name="Root Mean Square"
                  value={formData['Root Mean Square']}
                  onChange={handleChange}
                  className='w-75 h-16 px-4 py-3 rounded-full bg-white text-gray-800 border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                  placeholder='eg :1.0909'
                  required
                />
              </div>
              <div className='col-span-2 text-center mt-4'>
                <button
                  type="submit"
                  className='w-55 h-16 px-4 py-3 rounded-full bg-[#301934] text-white border border-[#301934] placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 font-LilitaOne text-2xl'
                >
                  Predict
                </button>
              </div>
            </div>
          </form>
          <p className='font-LilitaOne text-3xl text-center text-white pb-10'>Results</p>
          {result && (
            <div className='text-center p-5 bg-gray-200 rounded-full '>
              <h2 className='text-xl font-bold text-green-600'>Predicted Magnitude: {result.Magnitude}</h2>
              <h2 className='text-xl font-bold text-blue-600'>Predicted Type: {result.Type}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

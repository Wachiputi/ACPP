// Filename - pages/Services.js

//import React from "react";
import React, {useState} from 'react';
import axios from 'axios'

export const Services = () => {
	return (
		<div className="services">
			<h1>information about the services that we provide</h1>
		</div>
	);
};




export const ServicesOne = () => {
    const [formData, setFormData] = useState({
        commodity: '',
        startDate: '',
        endDate: '',
        district: '',
        market: '',
        daysToForecast: '' // Added new feature
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            daysToForecast: parseInt(formData.daysToForecast)  // Ensure it's sent as an integer
        };
        console.log('Submitting form data:', formattedData);  // Debugging statement
        try {
            const response = await axios.post('http://localhost:5000/predict', formattedData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer' // To handle image response
            });
            const imageBlob = new Blob([response.data], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(imageBlob);
            setResult(imageUrl);
        } catch (error) {
            console.error('Error fetching the prediction:', error);
        }
    };

    return (
        <div className="services">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <form onSubmit={handleSubmit} style={{ flex: 1, marginRight: '20px' }}>
                    <div>
                        <label>Commodity:</label>
                        <input
                            type="text"
                            name="commodity"
                            value={formData.commodity}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>District:</label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Market:</label>
                        <input
                            type="text"
                            name="market"
                            value={formData.market}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Forecast Days:</label>
                        <input
                            type="number"
                            name="daysToForecast"
                            value={formData.daysToForecast}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Predict</button>
                </form>
                {result && (
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <h5>Prediction Result:</h5>
                        <img src={result} alt="Prediction Result" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export const ServicesTwo = () => {
	const [formData, setFormData] = useState({
        commodity: '',
        startDate: '',
        endDate: '',
        district: '',
        market: ''
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/historical', formData, {
                responseType: 'arraybuffer' // To handle image response
            });
            const imageBlob = new Blob([response.data], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(imageBlob);
            setResult(imageUrl);
        } catch (error) {
            console.error('Error fetching the analysis:', error);
        }
    };

    return (
        <div className="services">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Commodity:</label>
                    <input
                        type="text"
                        name="commodity"
                        value={formData.commodity}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Start-date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>End-date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>District:</label>
                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Market:</label>
                    <input
                        type="text"
                        name="market"
                        value={formData.market}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Analyze</button>
            </form>
            {result && <div>
                <h2>Analysis Result:</h2>
                <img src={result} alt="Analysis Result" />
            </div>}
        </div>
    );
};

export const ServicesThree = () => {
	return (
		<div className="services">
			<h1>for future use</h1>
		</div>
	);
};
export default Services;
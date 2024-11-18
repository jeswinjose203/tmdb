import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chat = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI('AIzaSyDbBgPbzbOlx7VcIECEflTnkct7OiHlwP8'); // Replace with your actual API key
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const result = await model.generateContent("Create a content for deadpool and wolverine cinema");
            let originalResponse = result.response.text();
            
            // Modify the response format here
            let formattedResponse = originalResponse
                .replace(/Hey there,.*?(\n)/, '') // Remove the greeting line
                .replace(/(.*?I'm really good with names.*?)(?=\n)/, '') // Remove introduction about names
                .trim(); // Trim whitespace
            setResponse(formattedResponse);
        } catch (error) {
            console.error('Error generating content:', error);
            setResponse('An error occurred while fetching the response.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
             <h1>Gemini Prompt</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter your prompt"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Submit'}
                </button>
            </form> 

            {response && <p>Response: {response}</p>}
        </div>
    );
};

export default Chat;
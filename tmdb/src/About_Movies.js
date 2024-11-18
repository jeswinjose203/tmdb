import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovieDetails } from './tmdbService';
import { Layout, Input, Button } from 'antd';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import the AI model

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

const AboutMovies = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get('movieId');

  const [movieDetails, setMovieDetails] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize the Google Generative AI with your API key
  const genAI = new GoogleGenerativeAI('AIzaSyDbBgPbzbOlx7VcIECEflTnkct7OiHlwP8'); // Replace with your actual API key
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const fetchMovieDetails = useCallback(async () => {
    if (!movieId) return;

    try {
      const details = await getMovieDetails(movieId);
      setMovieDetails(details);
      console.log(details);
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmitQuestion = async () => {
    setLoading(true);
    setResponse(''); // Clear previous response

    try {
      const result = await model.generateContent('Answer relating to '+movieDetails.title+'question is:'+question);
      let originalResponse = result.response.text();


      let formattedResponse = originalResponse
        .trim(); 

      setResponse(formattedResponse);
    } catch (error) {
      console.error('Error generating content:', error);
      setResponse('An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }

    setQuestion(''); // Clear the input after submission
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'black' }}>
      <Header style={{ backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
        <h1>{movieDetails ? movieDetails.title : 'Loading...'}</h1>
      </Header>
      <Content style={{ padding: '20px', color: 'white' }}>
        <div>
          {movieDetails && (
            <div>
              <p>Release Date: {movieDetails.release_date}</p>
              <p>Overview: {movieDetails.overview}</p>
              {movieDetails.homepage && (
                <iframe
                  title="Movie Homepage"
                  src={movieDetails.homepage}
                  style={{ width: '100%', height: '600px', border: 'none' }}
                />
              )}
              <div style={{ marginTop: '20px' }}>
                <TextArea
                  rows={4}
                  value={question}
                  onChange={handleQuestionChange}
                  placeholder="Ask a question..."
                  style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }}
                />
                <Button
                  type="primary"
                  onClick={handleSubmitQuestion}
                  style={{ marginTop: '10px' }}
                  loading={loading}
                >
                  Submit Question
                </Button>
              </div>
              {response && (
                <div style={{ marginTop: '20px', color: 'white' }}>
                  <h2>Response:</h2>
                  <p>{response}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'black', color: 'white' }}>
        © 2024 NATTER
      </Footer>
    </Layout>
  );
};

export default AboutMovies;


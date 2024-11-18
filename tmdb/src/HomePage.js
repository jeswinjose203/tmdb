import React, { useState, useEffect } from 'react';
import { Layout, Card } from "antd"; // Ensure you import Layout and Card from Ant Design
import { getPopularMovies } from './tmdbService'; // Adjust the path as necessary
import './HomePage.css'; // Ensure this CSS file is linked correctly
import Button from './Button';
import Footer1 from './Footer1';
const { Header, Content } = Layout;

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async (page) => {
    try {
      let popularMovies = await getPopularMovies(page);
      console.log(popularMovies);
      setMovies(popularMovies.results);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);
 
  const handlePageChange = (page) => {
    if (page < 1) return; // Prevent going to a negative page
    setCurrentPage(page);
  };

  return (
    <Layout>
<Header style={{ backgroundColor: '#630202', display: 'flex', alignItems: 'center' }}>
  <img 
    src={`${process.env.PUBLIC_URL}/Create_a_logo_named_NATTER-removebg-preview.png`} 
    alt="NATTER Logo"
    style={{ height: '100px' }} // Adjust the height according to your needs
  />
</Header>
      <Layout>
        {/* <Sider width={200} style={{ backgroundColor: '#fff' }}>
          <div>Jeswin</div>
          <div>Vinayak</div>
          <div>Gouri</div>
        </Sider> */}
        <Layout>
          {/* Add background image to Content */}
          <Content style={{ 
                    padding: '20px', 
                backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_large.jpg')`, 
                backgroundSize: 'auto', // Original size
                backgroundRepeat: 'repeat', // Repeat the image
                backgroundPosition: 'center', 
                minHeight: '100vh' // Ensure it covers the full viewport height
                }}>

            <div className="App">
              <div className="flex-container">
                {movies.map((movie, index) => (
                 <Card style={{ backgroundColor: '#0A0101', border: 'none' }} key={movie.id} hoverable>
                    <div style={{ color: 'white', fontWeight: 'bold', textAlign: 'center',fontSize: '24px' }}>
    {movie.title}
  </div>
                    {/* Dynamically display the movie poster */}
                    {movie.poster_path && (
                      <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        width="50%" 
                        alt={`${movie.title} Poster`} 
                      />
                    )}
                    <p style={{ color: 'white' }}>
                      {movie.overview.length > 100 
                        ? `${movie.overview.substring(0, 100)}...` 
                        : movie.overview}
                    </p>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        position: 'absolute', 
                        bottom: '10px', 
                        right: '10px',
                      }}>
                    <Button movieId={movie.id} />
                    </div>  
                  </Card>
                ))}
              </div>
              <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </div>
            </div>
          </Content>
        </Layout>
        {/* <Sider width={200} style={{ backgroundColor: '#fff' }}>Right Sidebar</Sider> */}
      </Layout>
      <Footer1/>
    </Layout>
  );
}

export default HomePage;

import React from 'react';
import { getMovieDetails } from './tmdbService'; // Import the function to get movie details
import { Button as AntButton } from 'antd'; // Import Ant Design's Button
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const Button = ({ movieId }) => {
  const { styles } = useStyle();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = async () => {
    try {
      const movieDetails = await getMovieDetails(movieId);
      console.log('Movie Details:', movieDetails);
      
      // Route to '/about_movies' with movieId as a query parameter
      navigate(`/about_movies?movieId=${movieId}`);
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    }
  };

  return (
    <AntButton 
      type="primary" 
      onClick={handleClick} 
      className={styles.linearGradientButton} 
    >
      More
    </AntButton>
  );
};

export default Button;

import React from 'react';
import { Carousel } from 'react-materialize'
import seatsC from '../img/seatsC.jpg'
import sunsetC from '../img/sunsetC.jpg'
const Home = () => {
    return (

        <Carousel
            carouselId="Carousel-2"
            images={[
                seatsC,
                sunsetC
            ]}

            options={{
                fullWidth: true,
                indicators: true
            }} />

    );
}
export default Home;
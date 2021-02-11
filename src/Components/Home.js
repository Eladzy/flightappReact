import React from 'react';
import { Carousel } from 'react-materialize'
import seatsC from '../img/seatsC.jpg'
const Home = () => {
    return (

        <Carousel
            carouselId="Carousel-2"
            images={[
                seatsC,
                'img\seatsC.jpg',
                '../img\sunsetC.jpg',

            ]}

            options={{
                fullWidth: true,
                indicators: true
            }} />

    );
}
export default Home;
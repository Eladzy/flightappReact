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
                'https://picsum.photos/250/250?image=0',
            ]}
           
            options={{
                fullWidth: true,
                indicators: true
            }} />

    );
}
export default Home;
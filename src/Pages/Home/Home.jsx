import React from 'react';
import SimpleSlider from './Carousel/SimpleSlider';
import PetsCategory from '../Home/petcategory/PetCategoies';
import CallToAction from '../Home/petcategory/CallToAction';
import AboutUs from '../Home/petcategory/AboutUs';
import { Separator } from '../../components/components/ui/separator';
import SlickSlider from './petcategory/silder/SlickSlider';
import WelComePage from './petcategory/WelComePage';
import NewsletterAndDonation from './petcategory/NewsLetterAndDonation';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <SimpleSlider/>
            <Separator className="my-4"/>
            <PetsCategory/>
            <Separator className="my-4"/>
            <CallToAction/>
            <SlickSlider/>
            <Separator className="my-4"/>
            <WelComePage/>
            <Separator className="my-4"/>
            <NewsletterAndDonation/>
            <Separator className="my-4"/>
            <AboutUs/>
            <Separator className="my-4"/>
        </div>
    );
};

export default Home;
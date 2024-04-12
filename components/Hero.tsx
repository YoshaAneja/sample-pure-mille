"use client";

import React from 'react';
import Image from 'next/image';
import CustomButton from './CustomButton';

const Hero = () => {
    const handleScroll = () => {

    }

  return (
    <div className='hero'>
        <div className='flex-1 pt-36 padding-x'>
            <h1 className='hero__title'>PureMille</h1>
            <p className='hero__subtitle'>a pure millet company</p>

            <CustomButton
                title="Explore our Catalogue"
                containerStyles="bp-primary-blue text-white rounded-full mt-10"
                handleClick= {handleScroll}
            />
        </div>
    </div>
  )
}

export default Hero
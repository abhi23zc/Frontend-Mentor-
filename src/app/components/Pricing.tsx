"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export default function PricingComponent() {
  const [pageviews, setPageviews] = useState(100); 
  const [isYearly, setIsYearly] = useState(false);
  const [price, setPrice] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Predefined price tiers
  const pricingData = [
    { views: 10, price: 8 },
    { views: 50, price: 12 },
    { views: 100, price: 16 },
    { views: 500, price: 24 },
    { views: 1000, price: 36 },
  ];

  useEffect(() => {
   
    let selectedPlan = pricingData[2]; 
    
    if (pageviews <= 10) {
      selectedPlan = pricingData[0];
    } else if (pageviews <= 50) {
      selectedPlan = pricingData[1]; 
    } else if (pageviews <= 100) {
      selectedPlan = pricingData[2]; 
    } else if (pageviews <= 500) {
      selectedPlan = pricingData[3]; 
    } else {
      selectedPlan = pricingData[4]; 
    }

    const basePrice = selectedPlan.price;
    setPrice(isYearly ? basePrice * 0.75 : basePrice);
  }, [pageviews, isYearly]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageviews(Number(e.target.value)); 
  };


  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center font-sans ${isDarkMode ? 'dark' : ''}`}>
      <div className="w-full max-w-2xl mx-auto p-6">
    
        <div className="flex justify-end mb-4">
          <span className="text-gray-500 mr-2">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          <Switch checked={isDarkMode} onClick={toggleDarkMode} />
        </div>

        <div className="relative z-20">
          <Image
            src="/pattern-circles.svg"
            alt="Circles pattern"
            width={146}
            height={145}
            className="absolute opacity-60 top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="mt-20 z-20">
          <h1 className="text-3xl font-bold text-center text-[#293356] dark:text-white mb-2">
            Simple, traffic-based pricing
          </h1>
          <p className="text-center text-[#858FAD] dark:text-gray-400 mb-8">
            Sign-up for our 30-day trial. No credit card required.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 mt-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <span className="text-[#858FAD] dark:text-gray-400 uppercase tracking-wider mb-4 md:mb-0">
              {pageviews === 1000 ? '1M' : `${pageviews}K`} Pageviews
            </span>
            <div className="text-center md:text-right">
              <span className="text-4xl font-bold text-[#293356] dark:text-white">
                ${price.toFixed(2)}
              </span>
              <span className="text-[#858FAD] dark:text-gray-400"> / month</span>
            </div>
          </div>

          <div className="relative mb-8">
            <input
              type="range"
              min="10"
              max="1000"
              value={pageviews}
              onChange={handleSliderChange}
              className="w-full h-2 bg-[#ECF0FB] dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #A5F3EB 0%, #A5F3EB ${
                  (pageviews / 1000) * 100
                }%, ${isDarkMode ? '#555' : '#ECF0FB'} ${(pageviews / 1000) * 100}%, ${
                  isDarkMode ? '#555' : '#ECF0FB'
                } 100%)`,
                transition: "background 0.3s ease",
              }}
            />
            <div
              className="absolute w-10 h-10 bg-[#10D8C4] rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out"
              style={{ left: `calc(${(pageviews / 1000) * 100}% - 20px)`, top: "-4px" }}
            >
              <Image
                src="/icon-slider.svg"
                alt="Slider"
                width={22}
                height={13}
              />
            </div>
          </div>

          <div className="flex items-center justify-end mb-8">
            <span className="text-[#858FAD] dark:text-gray-400 mr-2">Monthly Billing</span>
            <Switch
              className="data-[state=checked]:bg-cyan-400 data-[state=unchecked]:bg-gray-300"
              color="indigo"
              checked={isYearly}
              onClick={() => setIsYearly(!isYearly)}
            />
            <span className="text-[#858FAD] dark:text-gray-400 ml-2">Yearly Billing</span>
            <span className="ml-2 bg-[#FEEDE8] dark:bg-gray-600 text-[#FF8D68] dark:text-gray-400 text-xs font-bold px-2 py-1 rounded-full">
              25% discount
            </span>
          </div>

          <div className="border-t border-[#ECF0FB] dark:border-gray-600 pt-8 flex items-center justify-between">
            <ul className="mb-8">
              <li className="flex items-center mb-2">
                <Image
                  src="/icon-check.svg"
                  alt="Check"
                  width={9}
                  height={8}
                  className="mr-4"
                />
                <span className="text-[#858FAD] dark:text-gray-400">Unlimited websites</span>
              </li>
              <li className="flex items-center mb-2">
                <Image
                  src="/icon-check.svg"
                  alt="Check"
                  width={9}
                  height={8}
                  className="mr-4"
                />
                <span className="text-[#858FAD] dark:text-gray-400">100% data ownership</span>
              </li>
              <li className="flex items-center">
                <Image
                  src="/icon-check.svg"
                  alt="Check"
                  width={9}
                  height={8}
                  className="mr-4"
                />
                <span className="text-[#858FAD] dark:text-gray-400">Email reports</span>
              </li>
            </ul>

            <button className="bg-[#293356] dark:bg-white text-white dark:text-gray-700 font-bold py-3 px-6 rounded-full hover:bg-[#293356]/90 dark:hover:bg-gray-300 transition-colors">
              Start my trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

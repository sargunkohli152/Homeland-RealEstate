import React, {useState, useEffect, createContext} from 'react';
import {housesData} from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({children}) => {

  const[houses, setHouses] = useState(housesData);
  const[country, setCountry] = useState('Location (any)');
  const[countries, setCountries] = useState([]);
  const[property, setProperty] = useState('Property type (any)');
  const[properties, setProperties] = useState([]);
  const[price, setPrice] = useState('Price range (any)');
  const[loading, setLoading] = useState(false);

  useEffect( () => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    //remove duplicates
    const uniqueCountires = ['Location (any)', ... new Set(allCountries)];

    setCountries(uniqueCountires);
  }, [])

  useEffect( () => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    //remove duplicates
    const uniqueProperties = ['Location (any)', ... new Set(allProperties)];

    setProperties(uniqueProperties);
  }, [])

  const handleClick = () => {
    //set loading
    setLoading(true);

    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };

    const minPrice = parseInt(price.split(' ')[0]);
    const maxPrice = parseInt(price.split(' ')[2]);
    const newHouses = housesData.filter( (house) => {
      const housePrice = parseInt(house.price);

        if(house.country === country 
        && house.type === property
        && housePrice >= minPrice 
        && housePrice <= maxPrice){
          return house;
        }

        //if all values are default
        if(isDefault(country) 
        && isDefault(property)
        && isDefault(price)){
          return house;
        }

        //if country is not default
        if(!isDefault(country) 
        && isDefault(property)
        && isDefault(price)){
          return house.country === country;
        }

        //if property is not default
        if(isDefault(country) 
        && !isDefault(property)
        && isDefault(price)){
          return house.type === property;
        }

        //if price is not default
        if(isDefault(country) 
        && isDefault(property)
        && !isDefault(price)){
          return housePrice >= minPrice 
          && housePrice <= maxPrice;
        }

        //if country & property is not default
        if(!isDefault(country) 
        && !isDefault(property)
        && isDefault(price)){
          return house.country === country
          && house.type === property;
        }

        //if country & price is not default
        if(!isDefault(country) 
        && isDefault(property)
        && !isDefault(price)){
          return house.country === country 
          && housePrice >= minPrice
          && housePrice <= maxPrice;
        }

        //if property and price are not default
        if(isDefault(country) 
        && !isDefault(property)
        && !isDefault(price)){
          return house.type === property
          && housePrice >= minPrice
          && housePrice <= maxPrice;
        }
    })
    
    setTimeout(() => {
      return newHouses.length < 1 ? 
      setHouses([]) : setHouses(newHouses),
      setLoading(false);
    }, 1000)
  }
  
  return (
    <HouseContext.Provider 
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
        loading
      }}>
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;

import { createContext, useState, useEffect } from 'react';
import { housesData } from '../data';

export const HouseContext = createContext('');

const HouseProvider = ({ children }) => {

    const [houses, setHouses] = useState(housesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [country, setCountry] = useState('Select Country');
    const [countries, setCountries] = useState([]);
    const [price, setPrice] = useState('Select Price');
    const [property, setProperty] = useState('Select type');
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const allCountries = houses.map(house => {
            return house.country;
        })
        const uniqueCountries = [...new Set(allCountries)];
        setCountries(uniqueCountries);
    }, []);

    useEffect(() => {
        const allPropertyTypes = houses.map(house => {
            return house.type;
        })
        const uniquePropertyTypes = [...new Set(allPropertyTypes)];
        setProperties(uniquePropertyTypes);
    }, []);

    const searchHandler = () => {
        setIsLoading(true);

        // checking selection 
        const isDefault = (str) => {
            return str.split(' ').includes('Select');
        }
        const minPrice = parseInt(price.split(' ')[0]);
        const maxPrice = parseInt(price.split('- ')[1]);

        const filteredHouses = housesData.filter(house => {
            const housePrice = parseInt(house.price);

            // no selection 
            setHouses(housesData)
            console.log(searchQuery)
            if (isDefault(country) && isDefault(price) && isDefault(property)) {
                return searchQuery === '' ? house : house.name.toLowerCase() === searchQuery.toLowerCase();
            }

            // country is selected
            if (!isDefault(country) && isDefault(price) && isDefault(property)) {
                return searchQuery === '' ? house.country === country : house.country === country && house.name.toLowerCase() === searchQuery.toLowerCase();
            }

            // price is selected
            if (isDefault(country) && !isDefault(price) && isDefault(property)) {
                return searchQuery === '' ? (housePrice >= minPrice) && (housePrice <= maxPrice) : (housePrice >= minPrice) && (housePrice <= maxPrice) && house.name.toLowerCase() === searchQuery.toLowerCase();
            }

            // property is selected
            if (isDefault(country) && isDefault(price) && !isDefault(property)) {
                return searchQuery === '' ? house.type === property : house.type === property && house.name.toLowerCase() === searchQuery.toLowerCase();
            }

            // country & price is selected
            if (!isDefault(country) && !isDefault(price) && isDefault(property)) {
                return searchQuery === '' ? house.country === country && (housePrice >= minPrice) && (housePrice <= maxPrice) : house.country === country && (housePrice >= minPrice) && (housePrice <= maxPrice) && house.name.toLowerCase() === searchQuery.toLowerCase();

            }

            // country & property is selected
            if (!isDefault(country) && isDefault(price) && !isDefault(property)) {
                return searchQuery === '' ? house.country === country && house.type === property : house.country === country && house.type === property && house.name.toLowerCase() === searchQuery.toLowerCase();
            }

            // price & property is selected
            if (isDefault(country) && !isDefault(price) && !isDefault(property)) {
                return searchQuery === '' ? (housePrice >= minPrice) && (housePrice <= maxPrice) && house.type === property : (housePrice >= minPrice) && (housePrice <= maxPrice) && house.type === property && house.name.toLowerCase() === searchQuery.toLowerCase();
            }

            // all are selected 
            if (house.country === country && housePrice >= minPrice && housePrice <= maxPrice && house.type === property) {
                return searchQuery === '' ? house : house.name.toLowerCase() === searchQuery.toLowerCase();
            }
        })

        // setHouses(filteredHouses)
        setTimeout(() => {
            filteredHouses.length > 0 ? setHouses(filteredHouses) : setHouses([]);
            setIsLoading(false);
        }, 1000);
    }

    return (
        <HouseContext.Provider value={{
            houses,
            country,
            setCountry,
            countries,
            price,
            setPrice,
            property,
            setProperty,
            properties,
            searchHandler,
            isLoading,
            setSearchQuery
        }}>
            {children}
        </HouseContext.Provider>
    )
}

export default HouseProvider;
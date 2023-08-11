import Banner from '../components/Banner'
import Search from '../components/Search/Search'
import HouseList from '../components/Houses/HouseList';
import { useContext, useEffect } from 'react';
import { HouseContext } from '../context/HouseContext';

const Home = () => {
  const { searchHandler } = useContext(HouseContext);

  useEffect(() => {
    searchHandler();
  }, [])

  return (
    <>
      <Banner />
      <Search />
      <HouseList />
    </>
  )
}

export default Home;
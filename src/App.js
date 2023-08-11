import { Routes, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react'

import Home from './Pages/Home';
import PropertyDetails from './Pages/PropertyDetails';
import HouseDetails from './components/PropertyDetails/HouseDetails';
import Layout from './components/Layout';

const App = () => {
  return (
    <Container maxW='100%' px='6'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='property-details' element={<PropertyDetails />} >
            <Route path=":propertyId" element={<HouseDetails />} />
          </Route>
        </Route>
        <Route path="*"
          element={<main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
          }
        />
      </Routes>
    </Container>
  )
}

export default App
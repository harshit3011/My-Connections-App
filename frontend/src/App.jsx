import { useState } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import Navbar from './components/Navbar.jsx'
import PersonCard from './components/PersonCard.jsx'
import PersonGrid from './components/PersonGrid.jsx'

function App() {

  return (
      <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
        <Navbar></Navbar>
        <Box mt={12} px={{ base: 4, md: 8, lg: 16 }}>  {/* Adds a margin-top to the PersonGrid */}
        <PersonGrid />
      </Box>
      </Box>
  )
}

export default App

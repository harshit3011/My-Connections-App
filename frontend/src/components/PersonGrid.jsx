import { Heading, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import PersonCard from './PersonCard.jsx'

const PersonGrid = () => {
    const [persondata, setPersondata] = useState([])
    const updatePerson = (updatedPerson) => {
        setPersondata((prev) =>
          prev.map((person) =>
            person._id === updatedPerson._id ? updatedPerson : person
          )
        );
      };
      
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/connection")
            if (response.ok) {
                const data = await response.json()
                console.log(data.connections)
                setPersondata(data.connections)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    if (persondata.length === 0) {
        return (
            <>
                <Heading pt={10} size="lg" textAlign={"center"}>Oops! No Connections! You gotta add some</Heading>
            </>
        )
    }

    return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
            {
                persondata.map((person) => (
                    <PersonCard
                        key={person._id}
                        id={person._id}
                        name={person.name}
                        designation={person.designation}
                        description={person.description}
                        updatePerson={updatePerson}
                    />
                ))
            }
        </SimpleGrid>
    )
}

export default PersonGrid

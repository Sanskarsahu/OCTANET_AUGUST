import React from 'react'
import styled from 'styled-components';
export default function Hedder() {
    return (
        <Heading>
            <h1>
                To Do's List
            </h1>
            <h2>
                for website project
            </h2>
            
        </Heading>
    )
}
const Heading = styled.div`
color:white;
  h1{
    padding-top: 100px;
    font-size: 4rem;
  }
`

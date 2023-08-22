import React from 'react'
import { styled } from 'styled-components'
import Currenttrack from './Currenttrack'
import Controls from './Controls'
import Volume from './Volume'
export default function Footer() {
  return (
    <Foot>
      <Currenttrack/>
      <Controls/>
      <Volume/>
    </Foot>
  )
}
const Foot =styled.div`
  height: 100%;
  background-color: #181818;
  width:100%;
  border-top: 1px solid #282828 ;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content:center ;
  padding: 0 1rem;
`
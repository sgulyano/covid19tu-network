import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const Container = styled.div`
  font-size: 16px;
  display: grid;
  grid-row-gap: 10px;
  overflow: auto;
`

const DoubleCell = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
`

const A = styled.a`
  display: inline-block;
  padding-bottom: 10px;
`

function Cell({ name, children }) {
  const CellContainer = styled.div`
    font-family: 'Lato', sans-serif;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #e7e7e7;
    padding: 15px 20px;
  `

  const Name = styled.div`
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 10px;
  `

  return (
    <CellContainer>
      <Name>{name}</Name>
      <div>{children}</div>
    </CellContainer>
  )
}

export default function DataGrid(patient) {
  const {
    group,
    color,
    type,
    age,
    org,
    emptype,
    gender,
    blood,
    ismedstaff,
    bloodres,
    province,
  } = patient;

  return (
    <Container>
      <DoubleCell>
        <Cell name="Group">{group ? group : '-'}</Cell>
        <Cell name="Color">{color ? color : '-'}</Cell>
      </DoubleCell>
      <DoubleCell>
        <Cell name="Sex">{gender ? gender : '-'}</Cell>
        <Cell name="Age">{age ? age : '-'}</Cell>
      </DoubleCell>
      <DoubleCell>
        <Cell name="Blood">{blood ? blood : '-'}</Cell>
        <Cell name="Blood Result">{bloodres ? bloodres : '-'}</Cell>
      </DoubleCell>
      <DoubleCell>
        <Cell name="Medical Personnel‎">{ismedstaff ? 'เป็น' : 'ไม่เป็น'}</Cell>
        <Cell name="Province">{province ? province : '-'}</Cell>
      </DoubleCell>
      <DoubleCell>
        <Cell name="Job">{type? type : '-'}</Cell>
        <Cell name="Position">{emptype ? emptype : '-'}</Cell>
      </DoubleCell>
      <Cell name="Department">{org ? org : '-'}</Cell>
      
    </Container>
  )
  // const {
  //   notes,
  //   gender,
  //   ageEstimate,
  //   state,
  //   city,
  //   district,
  //   status,
  //   reportedOn,
  //   sources,
  // } = patient;

  // const genderInitCap = gender.charAt(0).toUpperCase() + gender.slice(1);

  // return (
  //   <Container>
  //     <DoubleCell>
  //       <Cell name="Gender">{gender ? genderInitCap : '-'}</Cell>
  //       <Cell name="Age">{ageEstimate ? ageEstimate : '-'}</Cell>
  //     </DoubleCell>
  //     <DoubleCell>
  //       <Cell name="State">{state ? state : '-'}</Cell>
  //       <Cell name="District/City">{city ? city : district}</Cell>
  //     </DoubleCell>
  //     <Cell name="Status">{status}</Cell>
  //     <Cell name="Reported On">{reportedOn}</Cell>
  //     <Cell name="Notes">{notes}</Cell>
  //   </Container>
  // )
}

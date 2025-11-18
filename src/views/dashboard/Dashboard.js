import React from 'react'
import { CCard, CCardBody } from '@coreui/react'
import MainChart from './MainChart'

const Dashboard = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <MainChart />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard

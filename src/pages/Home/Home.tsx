import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'

const Home = () => {
    
  return (
    <div>
        <Header/>
        <h2>Welcome back, Scholar</h2>
        <p>You have 13 tasks scheduled for today. Here's a quick overview of your progress.</p>

    </div>
  )
}

export default Home
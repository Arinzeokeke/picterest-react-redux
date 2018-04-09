import React from 'react'

const Banner = ({ appName, token }) => {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">{appName.toLowerCase()}</h1>
        <p> An Imageboard for artisans. </p>
      </div>
    </div>
  )
}

export default Banner

import React from 'react'
import { useSearchParams } from 'react-router-dom'

const ThankYouPage = () => {
  const searchQuery = useSearchParams()[0]
  const referenceNum = searchQuery.get("reference")
  // const sign = searchQuery.get("sign")

  return (
    
    <div>thankYouPage

      <h1>Reference No: {referenceNum}</h1> <br />
      {/* <p>sign: {sign}</p> */}
    </div>

  )
}

export default ThankYouPage
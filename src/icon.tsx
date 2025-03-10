import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Sharp from 'sharp'

// An example of image generation with Sharp and React

export default function Icon() {
  return (
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        strokeWidth="3"
        fill="red"
      />
    </svg>
  )
}

export async function createImage() {
  const svgStr = renderToStaticMarkup(<Icon />)
  return Sharp(Buffer.from(svgStr)).png()
}

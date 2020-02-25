import { generateMedia } from 'styled-media-query'

// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

export const breakpoints = {
 // Mega small devices (landscape phones, 400px and up)
 msm: '400px',
 // Very small devices (landscape phones, 500px and up)
 vsm: '500px',
 // Small devices (landscape phones, 576px and up)
 sm: '576px',
 // Medium devices (tablets, 768px and up)
 md: '768px',
 // Large medium devices (desktops, 1024px and up)
 lmd: '1000px',
 // Large devices (desktops, 992px and up)
 lg: '1150px',
 // Extra large devices (large desktops, 1200px and up)
 xl: '1460px'
}

const media = generateMedia(breakpoints)

export default media
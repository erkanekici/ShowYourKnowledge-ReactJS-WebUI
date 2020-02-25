import React from 'react'
import CustomScroll from './styled'

const CustomScrollbar = ({ children, unsuccess }) => (
 <CustomScroll unsuccess={unsuccess}>
  <div className="scroll-content">{children}</div>
 </CustomScroll>
)

export default CustomScrollbar
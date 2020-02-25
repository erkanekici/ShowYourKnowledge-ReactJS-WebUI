import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Accordion, AccordionContent } from './styled'

class Information extends Component {
 state = {
  isOpen: false
 }

 componentDidMount() {
  this.setState({ isOpen: true })
 }

 render() {
  const { scrollContent = false } = this.props
  return (
   <Fragment>
    <Accordion >
     <AccordionContent
      scroll={scrollContent}>
      {this.state.isOpen && this.props.children}
     </AccordionContent>
    </Accordion>
   </Fragment>
  )
 }
}

Information.propTypes = {
 title: PropTypes.string,
 scrollContent: PropTypes.bool,
 children: PropTypes.node
}

export default Information
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Accordion, H3, AccordionContent } from './styled'

class Information extends Component {
 state = {
  isOpen: false
 }

 render() {
  const { scrollContent = false } = this.props

  return (
   <Fragment>
    <Accordion>
     <H3
      className={this.state.isOpen ? 'open' : ''}
      onClick={() => this.setState({ isOpen: !this.state.isOpen })}
     >
      {this.props.title}
      <span className={this.state.isOpen ? 'icon-up' : 'icon-down'} />
     </H3>
     <AccordionContent scroll={scrollContent}>
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
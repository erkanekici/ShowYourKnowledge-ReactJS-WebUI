import React from 'react'
import { Wrapper, ModalOverlay, ModalHead, ModalBody } from './styled'
import CustomScrollbar from '../Scrollbars'

const clickOutside = (e, close) => {
 if(e.target){
  if(e.target.className.animVal !== undefined){
   close(e)
  }
  else if(e.target.className.includes('modal-overlay')){
   close(e)
  }
 }
}

const Modal = ({smallModal, title, children, show, unsuccess, onClose = () => {} }) => (
 <ModalOverlay
  isActive={show}
  onClick={e => clickOutside(e, onClose)}
  className="modal-overlay"
 >
  <Wrapper smallModal={smallModal} unsuccess={unsuccess}>
   {title && (
    <ModalHead unsuccess={unsuccess}>
     <h2>{title}</h2>
     <button type="button" onClick={onClose}>
      <span className="icon-icons-close" />
     </button>
    </ModalHead>
   )}
   <ModalBody>
   {title && (
    <CustomScrollbar unsuccess={unsuccess}>{children}</CustomScrollbar>
   )}
   {!title && (children)}
   </ModalBody>
  </Wrapper>
 </ModalOverlay>
)

export default Modal
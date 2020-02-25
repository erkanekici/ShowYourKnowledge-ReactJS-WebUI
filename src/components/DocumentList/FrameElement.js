import React, { Component } from 'react'

class FrameElement extends Component {
 constructor(props) {
  super(props)

  this.iframeRef = React.createRef()
 }

 handleOnload = () => {
  const applicationDocumentsCodes = ["74","35","1"]
  const usageDocumentsCodes = ["53","34","388"]
  if(applicationDocumentsCodes.includes(this.props.item._documentCode)){
   window.scrollTo(0,200)
  }
  if(usageDocumentsCodes.includes(this.props.item._documentCode)){
   window.scrollTo(0,380)
  }

 }

 // handleOnload = () => {
 //  const iframe =
 //   this.iframeRef.current &&
 //   (this.iframeRef.current.contentDocument ||
 //    this.iframeRef.current.contentWindow.document)
 //  const viewer = iframe.getElementById('viewerContainer')
 //  this.viewerScrollHandler(viewer)
 // }

 // viewerScrollHandler = viewer => {
 //  const scrollHandler = e => {
 //   const scrollPosition = viewer.scrollTop + viewer.offsetHeight
 //   if (scrollPosition >= viewer.scrollHeight) {
 //    this.props.enableAggrement()
 //    viewer.removeEventListener('scroll', scrollHandler, false)
 //   }
 //  }

 //  viewer.addEventListener('scroll', scrollHandler)
 // }

 render() {
  return (
   <iframe
    id={this.props.item._documentCode}
    title={this.props.item.documentName}
    src={`/pdf-viewer/web/viewer.html?file=${
     window.APP_CONFIG.document_base_url
    }/${this.props.item.documentId}/${this.props.transactionId}`}
    height="350"
    width="100%"
    ref={this.iframeRef}
    onLoad={this.handleOnload}
   />
  )
 }
}

export default FrameElement
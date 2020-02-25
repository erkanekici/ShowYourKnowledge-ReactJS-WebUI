import { connect } from 'react-redux'
import { get } from 'lodash-es'

const PrmProvider = ({ Prm = {}, prmName, render }) => {
 const prmData = get(Prm, prmName, [])
 return render(prmData) || null
}

const mapStateToProps = state => {
 return { Prm: state.prm }
}

export default connect(
 mapStateToProps,
 null
)(PrmProvider)
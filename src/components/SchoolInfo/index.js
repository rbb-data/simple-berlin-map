import { h, Component } from 'preact'
import _ from './styles.sass'
import colors from '@shared/styles/colors.sass'

export default class SchoolInfo extends Component {

  render (props) {
    const { name, öffentlich_privat } = props.properties

    return <div>
      {name} ist {öffentlich_privat}
    </div>
  }
}

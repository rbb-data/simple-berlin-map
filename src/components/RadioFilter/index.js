import { h, Component } from 'preact'
import _ from './styles.sass'

class RadioFilter extends Component {
  constructor (props) {
    super(props)
    if (!this.props.onChange) this.props.onChange = ({ selectedValue }) => {}
  }

  select = (e) => {
    this.props.onChange({ selectedValue: e.target.value })
  }

  render ({ id, options, title, selectedValue, className, showFakeInput }) {
    return <div class={`${_.radioFilter} ${className}`}>
      <ul title={title}>
        { options.map((option, i) => <li class={option.value === selectedValue && _.active}>
          <input id={`${id}-${i}`}
            type='radio'
            name={id}
            value={option.value}
            checked={option.value === selectedValue}
            onChange={this.select} />
          { showFakeInput && <label for={`${id}-${i}`} class={_.fakeInput} /> }
          <label for={`${id}-${i}`}>{ option.display }</label>
        </li>)}
      </ul>
    </div>
  }
}

export default RadioFilter

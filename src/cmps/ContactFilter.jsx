import { Component } from 'react'

export class ContactFilter extends Component {
  state = {
    filterBy: null,
  }

  componentDidMount() {
    const { filterBy } = this.props
    this.setState({ filterBy: { ...filterBy } }) //spreading filterby to break pointers.
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
        // case 'range':
        value = +value
        break
      // case 'checkbox':
      // value = target.checked
      // break
      default:
        break
    }

    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => this.props.onFilterBy({ ...this.state.filterBy })
    )
  }

  render() {
    const { filterBy } = this.state
    if (!filterBy) return <div></div>

    const { term } = filterBy

    return (
      <section className='contact-filter'>
        <form className='contact-form'>
          <label htmlFor='term'>Free Text</label>
          <input
            ref={this.handleRef}
            onChange={this.handleChange}
            value={term}
            type='text'
            name='term'
            id='term'
            placeholder='Search'
          />
        </form>
      </section>
    )
  }
}

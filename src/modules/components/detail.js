import React from 'react';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      id: 3
    }
  }

  onClickSubmit = () => {
    this.setState({
      name: this.props.name,
      email: this.props.email,
      id: this.props.id + 1
    });
    this.props.onSubmit(this.state);
  }

  handleInput = (event) => {
    let name = {[event.target.name]: event.target.value }
    this.setState(() => ( name ))
  }

  render() {
    return (
      <div>
        <h2 className='details__title title'>Detail</h2>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Name: </label>
            <input type='text' value={this.props.name} className='form-control' placeholder='Enter name' name='name' onChange={ this.handleInput }/>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input type='email' value={this.props.name} className='form-control' placeholder='Enter email' name='email' onChange={ this.handleInput }/>
          </div>
          <div className='form-group'>
            <button type='button' className='btn btn--cancel mr-2' onClick={this.props.cancel}>Cancel</button>
            <button type='button' className='btn btn-primary' onClick={this.onClickSubmit}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Detail;
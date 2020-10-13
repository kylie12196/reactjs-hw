import React from 'react';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.curr.name,
      email: this.props.curr.email,
      id: this.props.curr.id,
      fields: {},
      errors: {}
    }
  }

  onClickSubmit = (e) => {
    e.preventDefault();

    if(!this.validate()){
      alert('Form has errors.')
    } else {
      this.setState({
        name: this.state.fields.name,
        email: this.state.fields.email,
        id: this.props.users.length + 1,
      });
      this.props.onSubmit(this.state);
    }
  }

  handleInput = (field, e) => {
    let fields = this.state.fields;
    let name = {[e.target.name] : e.target.value};
    fields[field] = e.target.value;
    this.setState(() => (name));
    this.setState(() => [fields]);
  }

  validate = (event) => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(!fields['name']){
      formIsValid = false;
      errors['name'] = 'Cannot be empty';
    }

    if(!fields['email']){
      formIsValid = false;
      errors['email'] = 'Cannot be empty';
    }

    if(typeof fields['email'] !== 'undefined'){
      let lastAtPos = fields['email'].lastIndexOf('@');
      let lastDotPos = fields['email'].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields['email'].indexOf('@@') === -1 && lastDotPos > 2 && (fields['email'].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors['email'] = 'Email is not valid';
      }
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  render() {
    return (
      <div>
        <h2 className='details__title title'>Detail</h2>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Name: </label>
            <input type='text' value={this.state.fields['name']} className='form-control' placeholder='Enter name' name='name' onBlur={this.validate} onChange={this.handleInput.bind(this, 'name')}/>
            <span className='error'>{this.state.errors['name']}</span>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input type='email' value={this.state.fields['email']} className='form-control' placeholder='Enter email' name='email' onBlur={this.validate} onChange={ this.handleInput.bind(this, 'email') }/>
            <span className='error'>{this.state.errors['email']}</span>
          </div>
          <div className='form-group'>
            <button type='button' className='btn btn--cancel mr-2' onClick={() => this.props.cancel()}>Cancel</button>
            <button type='button' className='btn btn-primary' onClick= {this.onClickSubmit.bind(this)}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Detail;
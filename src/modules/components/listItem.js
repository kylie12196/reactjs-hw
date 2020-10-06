import React from 'react';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idEdit: '',
      idDelete: ''
    }
  }

  onClickEdit = (e) => {
    this.setState({
      idEdit: e,
    })
    this.props.edit(this.state);
  }

  onClickDelete = (e) => {
    this.setState({
      idDelete: e,
    })
    this.props.delete(this.state);
  }

  render() {
    var listItems = this.props.users.map(e => (
      <tr className={`item ${this.props.isEdit ? 'item--edit': ''}`} key={ e.id }>
        <td className='item__name w-40'>{ e.name }</td>
        <td className='item__email w-40'>{ e.email }</td>
        <td className='item__edit w-10'>
          <button className={`btn btn--edit ${this.props.isEdit ? 'disabled': 'enable'}`} name='edit' onClick={() => this.onClickEdit(e.id)}>Edit</button>
        </td>
        <td className='item__delete w-10'>
          <button className={`btn btn--delete ${this.props.isEdit ? 'disabled': 'enable'}`} name='delete' onClick={() => this.onClickDelete(e.id)}>Delete</button>
        </td>
      </tr>
    ));
    return (
      <div>
        <div className='list__header'>
          <h2 className='title'>List user</h2>
          <button type='button' name='add' className='btn btn--edit' onClick={ this.props.clickShow } >
            Add user
          </button>
        </div>
        <table className="list__table table">
          <thead>
            <tr className='item'>
              <th className='item__title w-40'>Name</th>
              <th className='item__title w-40'>Email</th>
              <th className='item__title w-10'>Edit</th>
              <th className='item__title w-10'>Delete</th>
            </tr>
          </thead>
          <tbody>
          { listItems }
          </tbody>
        </table>
      </div>
    )
  }
}

import React from 'react';
import Pagination from '../components/paginate';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: localStorage.getItem('users'),
      idEdit: '',
      idDelete: '',
      isEdit: false,
      currentPage: 1,
      itemsPerPage: 3,
      isPrevBtnActive: 'disabled',
      isNextBtnActive: '',
    }
  }

  useKeyboard = (e) => {
  }

  render() {
    return (
      <div>
        <div className='list__header'>
          <h2 className='title'>List user</h2>
          <button type='button' name='add' className='btn btn--edit' onClick={() => this.props.clickShow() } >
            Add user
          </button>
        </div>
        <table className="list__table table" onMouseOver={ this.useKeyboard }>
          <thead>
            <tr className='item'>
              <th className='item__title w-40'>Name</th>
              <th className='item__title w-40'>Email</th>
              <th className='item__title w-10'>Edit</th>
              <th className='item__title w-10'>Delete</th>
            </tr>
          </thead>
          <Pagination items={ this.props.users } currentPage={ this.state.currentPage } ></Pagination>
        </table>
      </div>
    )
  }
}
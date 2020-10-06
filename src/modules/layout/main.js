import React from 'react';
import ListItem from '../components/listItem';
import Detail from '../components/detail';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      users: [
        {
          name: 'Pham Nguyet',
          email: 'pham.thi.minh.nguyet@sun-asterisk.com',
          id: '1'
        },
        {
          name: 'Pham Nguyet',
          email: 'phamminhnguyet96@gmail.com',
          id: '2'
        },
      ],
      show: false,
      isEdit: false,
      keyEdit: 3,
      currentUser: {
        name: '',
        email: '',
        id: ''
      }
    }
  }

  addUser = () => {
    this.setState({
      show: true,
      isEdit: true,
    });
  }

  handleCancel = (e) => {
    this.setState({
      show: false,
      isEdit: false,
    });
  }

  editUser = (key) => {
    this.setState({
      show: true,
      isEdit: true,
      idEdit: key.idEdit
    });
  }

  deleteUser = (key) => {
    let index = this.state.users.findIndex(item => item.id === key.idDelete)
    this.state.users.splice(index, key.idDelete)
    this.setState({
      show: false,
      isEdit: false,
      idDelete: key.idDelete
    });
  }

  componentDidUpdate() {
  }

  submitForm = (data) => {
    this.setState({
      users: [...this.state.users,
        {
          name: data.name,
          email: data.email,
          id: this.state.keyEdit +1
        }
      ],
      show: false,
      isEdit: false,
    });
  }

  render() {
    return (
      <div className='app__main'>
        <div className='list'>
          <ListItem
            users= { this.state.users }
            isEdit= { this.state.isEdit }
            clickShow={() => this.addUser()}
            edit={this.editUser}
            delete={this.deleteUser}
          />
        </div>
        <div className='details'>
          { this.state.show ?
            <Detail
              users= { this.state.users }
              curr= { this.state.currentUser }
              onSubmit={this.submitForm}
              handleInput={() => this.changeInput()}
              cancel={() => this.handleCancel()}
            />
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default Main;

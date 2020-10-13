import React from 'react';
import ListItem from '../components/listItem';
import Detail from '../components/detail';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      users: [],
      show: false,
      isEdit: false,
      isAdd: false,
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
      isAdd: true,
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
      idEdit: key.id,
      currentUser: {
        name: key.name,
        email: key.email,
        id: key.id
      }
    });
    localStorage.setItem('users', JSON.stringify(this.state.users));
  }

  deleteUser = (key) => {
    let index = this.state.users.findIndex(item => item.id === key.idDelete)
    this.state.users.splice(index, key.idDelete)
    this.setState({
      show: false,
      isEdit: false,
      idDelete: key.idDelete
    });
    localStorage.setItem('users', JSON.stringify(this.state.users));
  }

  componentDidMount() {
    if (localStorage.getItem('users') !== '') {
      this.setState({
        users: JSON.parse(localStorage.getItem('users')),
      });
    } else {
      localStorage.setItem('users', JSON.stringify(this.state.users));
    }
  }

  submitForm = (data) => {
    if (this.state.currentUser.id === this.state.idEdit) {
      let users = this.state.users
      let index = this.state.users.findIndex(item => item.id === data.id)
      let userEdit = {id: data.id, name: data.name, email: data.email}

      this.setState({
        show: false,
        isEdit: false,
        isAdd: false,
      });
      users[index] = userEdit;
    } else {
      const user =  {
        name: data.name,
        email: data.email,
        id: this.state.users.length + 1
      };
      this.setState({
        show: false,
        isEdit: false,
        isAdd: false,
      });
      this.state.users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(this.state.users));
  }

  onActive = (e) => {
    console.log(e);
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
            onHoverItems= {this.onActive}
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

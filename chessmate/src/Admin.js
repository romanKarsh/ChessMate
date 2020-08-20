import React, { Component } from 'react'
import Axios from 'axios';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import './Admin.css';



class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          myId: this.props.user._id,
          users: [],
          usersFilter: ''
        }
        Axios.get('http://localhost:5000/users')
          .then(response => {
            this.setState({ users: response.data });
          })

        this.changeBan = this.changeBan.bind(this)
        this.filterHandler = this.filterHandler.bind(this)
    }

    changeBan(e) {
      const user = e.target.getAttribute('user');
      const userId = e.target.getAttribute('userId');
      const isBanned = e.target.getAttribute('isBanned');
      Axios.post('http://localhost:5000/ban', {
          myId: this.state.myId,
          userId: userId,
          isBanned: (isBanned == 'true')
      }).then(response => {
        if ("message" in response.data) {
          alert(response.data.message)
        } else {
          Axios.get('http://localhost:5000/users')
            .then(response => {
              this.setState({ users: response.data });
            })
        }
      });
    }

    filterHandler(e) {
      let filter = e.target.value.trim();
      if (e.target.id === 'icon_prefix') {
        this.setState(prevState => ({
          myId: prevState.myId,
          users: prevState.users,
          usersFilter: filter
        }))
      }
    }

    renderTableData() {
        let usersToShow = this.state.users.filter(user => user.username.includes(this.state.usersFilter));
        return usersToShow.map((data) => {
            const [username, wins, losses, draws, banned] = [
              data.username, data.multi.win, data.multi.loss,
              data.multi.draw, data.isBanned];
            let banned_arr = [];
            if (banned) {
                banned_arr.push("Un-ban user");
            } else {
                banned_arr.push("Ban user");
            }
            let bannedStr = banned == null ? banned : banned.toString();
            return (
                <tr>
                    <td>{username}</td>
                    <td>{wins}</td>
                    <td>{losses}</td>
                    <td>{draws}</td>
                    <td> <a user={username} userId={data._id} isBanned={bannedStr} onClick={this.changeBan} className="btn">{banned_arr}</a> </td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = ["username", "wins", "losses", "draws", "Ban/UnBan"]
        return header.map((key) => {
            return <th>{key.toUpperCase()}</th>
        })
    }

    renderStats() {

      const usersTotal = this.state.users.length;
      const bannedUsersTotal = this.state.users.reduce((acc, cur) => cur.isBanned ? ++acc : acc, 0);

      return (
        <tbody>
        <tr>
          <td className='center'>Total users: {usersTotal}</td>
        </tr>
        <tr>
          <td className='center'>Banned users: {bannedUsersTotal}</td>
        </tr>
        </tbody>
      )
    }

    render() {
        return (
            <div>
                <br />
                <div className="row">
                    <div className='col s1'></div>
                    <div className="col s3 wrapper card blue-grey darken-1 z-depth-5 admin_container">
                        <table id='stats_table' className='striped'>
                            <h4> Site Statistics </h4>
                            <br />
                            {this.renderStats()}
                        </table>
                    </div>
                    <div className='col s2'></div>
                    <div className="col s5 wrapper card blue-grey darken-1 z-depth-5 admin_container">
                        <h4> Manage Users </h4>
                        <br />
                        <div className="input-field col s12">
                            <input id="icon_prefix" type="text" className="validate center" value={this.state.usersFilter} onChange={this.filterHandler}/>
                            <label htmlFor="icon_prefix">Search username</label>
                        </div>

                        <table id='users_table' className='striped'>
                            <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        )
    }
}

export default Admin;

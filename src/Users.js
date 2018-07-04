import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import User from './User';
import Form from './Form';

export default class Users extends Component {

    state = {
        users: [{
            name: 'Mark Zuckerberg',
            address: '2200 Pennsylvania Ave NW, Washington, DC 20600, USA',
            phone: '3423423423',
            imageURL: 'https://research.fb.com/wp-content/uploads/2016/11/post00006_image0002.jpg'
          },{
            name: 'Donald Trump',
            address: '1600 Pennsylvania Ave NW, Washington, DC 20500, USA',
            phone: '4434242342',
            imageURL: 'https://qph.fs.quoracdn.net/main-thumb-t-28717-200-qylrwevlxgcnoddancubpsnfajpuqoba.jpeg'
          },{
              name: 'Tom Hanks',
              address: '1900 Pennsylvania Ave NW, Washington, DC 20500, USA',
              phone: 32424234,
              imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQosuAjXzMnceYUQ5VVhzJant2qDDG6kJDC71GU4CoLConC-PK2jQ'
          },{
            name: 'Sundar Pichai',
            address: '99234 Pennsylvania Ave NW, Washington, DC 20500, USA',
            phone: 23423234,
            imageURL: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Hi_Res_1x1s_0015_Sundar.max-200x200.jpg'
        },{
            name: 'Steve Jobs',
            address: '5321 Pennsylvania Ave NW, Washington, DC 20500, USA',
            phone: 423423443,
            imageURL: 'http://www.absfly.com/wp-content/uploads/2018/04/steve-jobs.jpg'
        }]
    }

    

    handleAddUser = (user) => {
        this.setState((prevState) => ({users: prevState.users.concat(user)}));
    }

    handleDeleteUser = (userToDelete) => {
        this.setState((prevState) => ({users: prevState.users.filter((user) => user !== userToDelete)}));
    }

    handleUpdateUser = (userToUpdate, updates) => {
        this.setState((prevState) => ({
            users: prevState.users.map((user) => {
                if(user === userToUpdate){
                    return {
                        ...user,
                        ...updates
                    }
                }else{
                    return { ...user }
                }
            })
        }));
    }

    onFormSubmit = (user) => {
        this.handleAddUser(user);
    }

    render(){
        return (
            <div> 
                <Form 
                    color='blue'
                    text='Create new user'
                    onFormSubmit={this.onFormSubmit}
                />

                <Table celled striped textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            <Table.HeaderCell>Image</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.users.map((user, index) => {
                            return <User
                                    user={user} 
                                    key={index}
                                    handleDeleteUser={this.handleDeleteUser}
                                    handleUpdateUser={this.handleUpdateUser}
                                    />
                        })
                    }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { Table, Image, Button, Modal, Icon } from 'semantic-ui-react';
import Form from './Form';
import './Users.css';
const DefaultImage = './images/defaultImage.png';

export default class User extends Component {

    state = { open: false }

    show = () => this.setState({ open: true });
    handleCancel = () => this.setState({ open: false });
    handleConfirm = () => {
        this.props.handleDeleteUser(this.props.user);
        this.handleCancel();
    }

    onFormSubmit = (updates) => {
        this.props.handleUpdateUser(this.props.user, updates);
    }
    render(){
        const user = this.props.user;
        return (
            <Table.Row>
                <Table.Cell>
                    {user.name}
                </Table.Cell>
                <Table.Cell>
                    {user.address}
                </Table.Cell>
                <Table.Cell>
                    {user.phone}
                </Table.Cell>
                <Table.Cell>
                    <Image 
                    src={user.imageURL ? user.imageURL : DefaultImage} 
                    size='tiny'
                    verticalAlign='middle'
                     />
                </Table.Cell>
                <Table.Cell>
                    <Button.Group>
                        <Form 
                            onFormSubmit={this.onFormSubmit}
                            user={user} 
                            color='green' 
                            text='Update' 
                        />
                        <Button.Or />
                        <Button color='red' content='Delete' onClick={this.show} />
                    </Button.Group>
                    <Modal
                        open={this.state.open}
                        size='mini'
                        centered={false}
                        >
                        <Modal.Content>
                        <p>
                            Are you sure you want to delete {user.name} ?
                        </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.handleCancel} color='red'>
                                <Icon name='remove' /> No
                            </Button>
                            <Button onClick={this.handleConfirm} color='green'>
                                <Icon name='checkmark' /> Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Table.Cell>
            </Table.Row>
        );
    }
}
import React, { Component } from 'react';
import { Button, Modal, Image, Form } from 'semantic-ui-react';
const DefaultImage = './images/defaultImage.png';

export default class CreateModal extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            openModal: false,
            name: props.user ? props.user.name : '',
            address: props.user ? props.user.address : '',
            phone: props.user ? props.user.phone : '',
            imageURL: props.user ? props.user.imageURL : '',
            nameValidation: false,
            addressValidation: false,
            phoneValidation: false,
        }
    }

    closeModal = () => {
        this.setState({
            openModal: false,
            nameValidation: false,
            addressValidation: false,
            phoneValidation: false
        });
    }

    openModal = () => {
        this.setState({ openModal: true });
    };

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState({
            name,
            nameValidation: false
        })
    };

    onAddressChange = (e) => {
        const address = e.target.value;
        this.setState({
            address,
            addressValidation: false
        })
    };

    onPhoneChange = (e) => {
        const phone = e.target.value;
        this.setState({
            phone,
            phoneValidation: false
        })
    };
    

    onImageChanged = (e) => {
        const imageURL = e.target.value;
        this.setState({imageURL});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name;
        const address = this.state.address;
        const phone = this.state.phone;
        const imageURL = this.state.imageURL;

        if(!name || !phone || !address){
            if(!name){
                this.setState({nameValidation: true});
            }
            if(!address){
                this.setState({addressValidation: true});
            }
            if(!phone){
                this.setState({phoneValidation: true});
            }
        }else{
            this.props.onFormSubmit({
                name,
                phone,
                address,
                imageURL
            });

            if(!this.props.user){
                this.setState({
                    name: '',
                    address: '',
                    phone: '',
                    imageURL: ''
                });
            }
            this.closeModal();
        }    
    }

    render() {
        const {
            nameValidation, 
            phoneValidation, 
            addressValidation,
        } = this.state;

        return (
            <Modal 
                trigger={<Button color={this.props.color} onClick={this.openModal}>{this.props.text}</Button>}
                open={this.state.openModal}
                closeOnEscape={false} 
                closeOnRootNodeClick={false} 
                centered={false}
                >
                    <Modal.Content image>
                    <Image wrapped size='small' src={this.state.imageURL ? this.state.imageURL : DefaultImage} />
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <Form.Input 
                                        error={nameValidation}
                                        value={this.state.name}
                                        type='text' 
                                        placeholder={nameValidation ? '* Name is required' : 'Name' }
                                        onChange={this.onNameChange}
                                        />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input 
                                        error={phoneValidation}
                                        value={this.state.phone} 
                                        type='text'  
                                        placeholder={phoneValidation ? '* Phone is required' : 'Phone'} 
                                        onChange={this.onPhoneChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <Form.Input 
                                    error={addressValidation}
                                    value={this.state.address} 
                                    type='text' 
                                    placeholder={addressValidation ? '* Address is required' : 'Address'} 
                                    onChange={this.onAddressChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    onChange={this.onImageChanged} 
                                    placeholder='Image URL'
                                    value={this.state.imageURL}
                                />
                            </Form.Field>
                            <Button color='green' type='submit'>Save</Button>
                            <Button onClick={this.closeModal} color='red'>Close</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
        )
    }
}
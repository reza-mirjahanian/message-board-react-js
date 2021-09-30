import React, {useEffect, useState} from 'react';

import {Button, Card, CardBody,  CardTitle, FormGroup } from "reactstrap";
import {useDispatch} from "react-redux";
import {handlePostMessage, handleUpdateActivePage} from "../redux/action";


function Edit() {
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(handlePostMessage(newMessage));
        setNewMessage('');
        dispatch(handleUpdateActivePage('message_section'))
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setNewMessage(value);
    }

    useEffect(() => {
        return () => {
            setNewMessage('');
        }
    }, [])

    useEffect(() => {
        setIsButtonDisabled(newMessage.length < 1)
    }, [newMessage]);

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    Post a new message :)
                </CardTitle>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <textarea
                            onChange={handleChange}
                            value={newMessage}
                            cols="100"
                            rows="5"
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        disabled={isButtonDisabled}
                        color= {isButtonDisabled ? 'secondary' : 'success'}
                    >
                        Save!
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}

export default Edit;

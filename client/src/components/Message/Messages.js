import React from 'react';
import {Card, CardBody} from "reactstrap";
import Message from "./Message";
import {useSelector} from "react-redux";

function Messages() {
    const { messages } = useSelector(state => state.messageBoard);
    return (
        <Card>
            <CardBody>
        {
            messages.length > 0 ? (
                <ol>

                    {messages.map(message => (
                        <Message message={message} key={message.cid}/>
                    ))}

                </ol>
            ) : (
                <h6>
                           You Can add new message with "Post Message"
                </h6>
            )
        }
            </CardBody>
        </Card>
    );
}

export default Messages;

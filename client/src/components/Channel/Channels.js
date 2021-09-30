import React, {useEffect} from 'react';
import {Card, CardBody, CardTitle} from "reactstrap";
import Channel from "./Channel";
import {useDispatch, useSelector} from "react-redux";
import {handleChannels} from "../../redux/action";

function Channels() {
    const { channels } = useSelector((state => state.messageBoard))
    const dispatch = useDispatch()
    const {selectedChannel} = useSelector(state => state.messageBoard);
    const selectedChannelName =  selectedChannel.name ? selectedChannel.name : null;
    useEffect(() => {
        dispatch(handleChannels());
    }, [])
    return (
            <Card>
                <CardBody>
                    <CardTitle>
                        Channel list:
                    </CardTitle>

                       <ul>
                           {channels.map((channel) => (
                               <Channel
                                   channel={channel}
                                   selectedChannelName={selectedChannelName}
                                   key={channel.cid}
                               />
                           ))}
                       </ul>




                </CardBody>
            </Card>
    );
}

export default Channels;

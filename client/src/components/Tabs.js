import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {When, Switch, Case, Default} from 'react-if';
import {useDispatch, useSelector} from "react-redux";
import {handleUpdateActivePage} from "../redux/action";
import Channels from "./Channel/Channels";
import Messages from "./Message/Messages";
import Edit from "./Edit";

function Tabs() {
    const dispatch = useDispatch()
    const {currentPage} = useSelector(state => state.common);
    const {selectedChannel} = useSelector(state => state.messageBoard);
    const handleUpdatePage = (route) => {
        dispatch(handleUpdateActivePage((route)))
    }


    const ChannelNav = <NavItem
        className="m-2"
        onClick={() => {
            handleUpdatePage('channel_section')
        }}
    >
        <NavLink active={currentPage === ''}>
            Navigation panel: [{selectedChannel.name}]
        </NavLink>
    </NavItem>;


    const MessageNav = <NavItem
        className="m-2"
        onClick={() => {
            handleUpdatePage('message_section')
        }}
    >
        <NavLink active={currentPage === 'message_section'}>
            Messages Board
        </NavLink>
    </NavItem>;

    const EditNav = <NavItem
        className="m-2"
        onClick={() => {
            handleUpdatePage('edit_section')
        }}
    >
        <NavLink active={currentPage === 'edit_section'}>
            Post Message
        </NavLink>
    </NavItem>;
    return (
        <>
            <Nav tabs className="mt-3 border-bottom-0">
                {ChannelNav}
                <When condition={selectedChannel.name}>
                    {MessageNav}
                    {EditNav}
                </When>

            </Nav>
            <Switch>
                <Case condition={'message_section' === currentPage}>
                    <Messages/>
                </Case>
                <Case condition={'edit_section' === currentPage}>
                    <Edit/>
                </Case>
                <Default>
                    <Channels/>
                </Default>
            </Switch>
        </>

    );
}

export default Tabs;

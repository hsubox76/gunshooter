import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Container from './Container';
import RoomMap from './RoomMap';

function mapStateToProps(state) {
 return {
     roomsById: state.roomsById,
     currentRoomId: state.currentRoomId
 };
}

class RoomContainer extends Component {
    render() {
        const currentRoom = this.props.roomsById[this.props.currentRoomId];
        return (
            <Container
                id="room"
                displayName={currentRoom.title}>
                <RoomMap exits={currentRoom.exits} />
                <div className="room-content">
                    <div>{currentRoom.description}</div>
                </div>
            </Container>
        );
    }
}

RoomContainer.propTypes = {

};

export default connect(mapStateToProps)(RoomContainer);
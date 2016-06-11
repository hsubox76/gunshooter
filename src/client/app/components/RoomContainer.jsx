import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Container from './Container';

function mapStateToProps(state) {
 return {
     rooms: state.rooms,
     currentRoomId: state.currentRoomId
 };
}

class RoomContainer extends Component {
    render() {
        const currentRoom = this.props.rooms[this.props.currentRoomId];
        return (
            <Container
                id="room"
                displayName={currentRoom.title}>
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
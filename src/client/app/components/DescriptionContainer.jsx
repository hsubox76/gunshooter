import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Container from './Container';

function mapStateToProps(state) {
 return {
     roomsById: state.roomsById,
     currentRoomId: state.currentRoomId
 };
}

class DescriptionContainer extends Component {
    render() {
        const currentRoom = this.props.roomsById[this.props.currentRoomId];
        return (
            <Container
                id="description"
                displayName={currentRoom.title}>
                <div className="description-content">{currentRoom.description}</div>
            </Container>
        );
    }
}

DescriptionContainer.propTypes = {

};

export default connect(mapStateToProps)(DescriptionContainer);
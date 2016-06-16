import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Container from './Container';
import RoomMap from './RoomMap';
import _ from 'lodash';
import DescriptionKeyword from './DescriptionKeyword';

function mapStateToProps(state) {
 return {
     rooms: state.rooms,
     items: state.items,
     currentRoomId: state.currentRoomId
 };
}

class RoomContainer extends Component {
    render() {
        const currentRoom = this.props.rooms[this.props.currentRoomId];
        let desc = [currentRoom.description];
        const itemDescriptions = _.each(currentRoom.itemIds, (itemId) => {
            const item = this.props.items[itemId];
            desc = desc.concat(item.groundDescription);
        });
        const fragments = desc.join(' ').split('|');
        const descriptionLines = _.map(fragments, (fragment, index) => {
            if (fragment[0] !== '~') {
                return (<span key={index}>{fragment}</span>);
            }
            const keyword = fragment.split(':')[1];
            const keywordId = fragment.match(/~(.*):/)[1];
            return (<DescriptionKeyword key={index} word={keyword} wordId={keywordId} />);
        });
        return (
            <Container
                id="room"
                displayName={currentRoom.title}>
                <RoomMap exits={currentRoom.exits} />
                <div className="room-content">
                    <div>
                        {descriptionLines}
                    </div>
                </div>
            </Container>
        );
    }
}

RoomContainer.propTypes = {

};

export default connect(mapStateToProps)(RoomContainer);
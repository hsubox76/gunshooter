import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from './Container';
import RoomMap from './RoomMap';
import _ from 'lodash';
import DescriptionKeyword from './DescriptionKeyword';

import Actions from '../actions/actions';

function mapStateToProps(state) {
 return {
     rooms: state.rooms,
     items: state.items,
     roomLoaded: state.gameState.roomLoaded,
     currentRoom: state.currentRoom
 };
}

function mapDispatchToActions(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

class RoomContainer extends Component {
    render() {
        const currentRoom = this.props.currentRoom;
        let desc = [currentRoom.description];
        _.each(currentRoom.itemIds, (itemId) => {
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
        const innerContent = this.props.roomLoaded ? (
            <div className="room-content">
                <RoomMap exits={currentRoom.exits} />
                <div className="room-text">
                    {descriptionLines}
                </div>
            </div>
        ) : null;
        return (
            <Container
                id="room"
                displayName={currentRoom.title}>
                {innerContent}
            </Container>
        );
    }
}

RoomContainer.propTypes = {

};

export default connect(mapStateToProps)(RoomContainer);
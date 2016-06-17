import React, {Component, PropTypes} from 'react';
import DirectionButton from './DirectionButton';

class RoomMap extends Component {
    render() {
        const exits = this.props.exits;
        const style = {
            borderTopStyle: exits.n ? 'dotted' : 'solid',
            borderRightStyle: exits.e ? 'dotted' : 'solid',
            borderBottomStyle: exits.s ? 'dotted' : 'solid',
            borderLeftStyle: exits.w ? 'dotted' : 'solid'
        };
        const directionButtons = _(exits)
            .map((exit, key) => {
                if (!exit) {
                    return null;
                }
                return (
                    <DirectionButton
                        key={key}
                        destinationRoom={exit}
                        direction={key} />);
            })
            .filter((exit) => exit)
            .value();
        return (
            <div className="room-map">
                <div className="room-cube" style={style}>
                    {directionButtons}
                </div>
            </div>
        );
    }
}

RoomMap.propTypes = {
    exits: PropTypes.object
};

export default RoomMap;
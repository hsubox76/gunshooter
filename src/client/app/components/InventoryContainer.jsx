import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Container from './Container';
import * as Actions from '../actions';

function mapStateToProps(state) {
 return {
     inventory: state.inventory
 };
}

function mapDispatchToActions(dispatch) {
    return { actions: bindActionCreators(Actions, dispatch) };
}

class InventoryContainer extends Component {
    constructor(props) {
        super(props);
        this.onItemClick = this.onItemClick.bind(this);
    }
    onItemClick(itemWord) {
        this.props.actions.addCommandWord(_.extend({}, itemWord, { wordType: 'item' }))
    }
    render() {
        return (
            <Container
                id="inventory"
                displayName="Inventory">
                {_.map(this.props.inventory, (item) => {
                    return (
                        <div
                            className="inventory-item"
                            onClick={_.wrap(item, this.onItemClick)}
                            key={item.word}>
                                {item.article} {item.word}
                        </div>
                        );
                })}
            </Container>
        );
    }
}

InventoryContainer.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToActions)(InventoryContainer);
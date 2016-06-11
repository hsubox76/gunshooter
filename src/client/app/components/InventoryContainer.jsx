import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Container from './Container';

function mapStateToProps(state) {
 return {
     inventory: state.inventory
 };
}

class InventoryContainer extends Component {
    render() {
        return (
            <Container
                id="inventory"
                displayName="Inventory">
                {_.map(this.props.inventory, (item) => {
                    return (<div className="inventory-item">{item.article} {item.name}</div>);
                })}
            </Container>
        );
    }
}

InventoryContainer.propTypes = {

};

export default connect(mapStateToProps)(InventoryContainer);
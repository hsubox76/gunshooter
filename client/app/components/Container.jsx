import React, { PropTypes } from 'react';

class Container extends React.Component {
    render() {
        return (
            <div className={"container " + this.props.id + "-container"}>
                <div className="container-header">{this.props.displayName}</div>
                {this.props.children}
            </div>  
        );
    }
}

Container.propTypes = {
    id: PropTypes.string,
    displayName: PropTypes.string,
    children: PropTypes.node
}

export default Container;
import React, { Component } from 'react';

class ContestItem extends Component {
    render() {
        return (
            <div className={"contest " + this.props.type}>
                <div className="contest-title">
                    {this.props.title}
                </div>
                <div className="contest-details">
                    {this.props.details}
                </div>
            </div>
        );
    }
}
export default ContestItem;
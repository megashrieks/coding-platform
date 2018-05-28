import React, { Component } from 'react';
import './ContestItem.css';
class ContestItem extends Component {
    state = {
        active: false
    };
    toggleInfo = () => {
        this.setState((prevState) =>  ({ active: !prevState.active }));
    }
    render() {
        var active = this.state.active ? " active" : "";
        return (
            <div className={"contest " + this.props.type+active}>
                <div className="contest-title">
                    {this.props.title}
                </div>
                <div className="contest-details">
                    {this.props.details}
                </div>
                <div className="info-toggle" onClick={this.toggleInfo}>
                    <i className = "fa fa-info-circle"></i>
                </div>
                <div className="additional-info">
                    {this.props.additionalDetails}
                </div>
            </div>
        );
    }
}
export default ContestItem;
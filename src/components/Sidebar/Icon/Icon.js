import React, { Component } from 'react';
import './Icon.css';
class Icon extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }
    render() {
        let closeIcon = this.props.onActive || this.props.icon;
        let showIcon = this.props.active ? closeIcon : this.props.icon;
        let listener = this.props.Activate ? {
            onClick: this.props.Activate
        } : {};
        return (
            <div className="icon-component" {...listener}>
                <div className = "icon">
                    <i className={"fa " + showIcon}></i>
                </div>
                <div className="title">
                    {this.props.title}
                </div>
            </div>
        );
    }
}
export default Icon;

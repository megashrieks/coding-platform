import React, { Component } from 'react';
import Icon from './Icon/Icon';
import './Sidebar.css';
class Sidebar extends Component{
    state = {
        active: false
    };
    Activate = () => {
        console.log("Activating");
        this.setState((prevState)=>({ active: !prevState.active }));
    }
    render() {
        let activeClassName = this.state.active ? " active" : "";
        return (
            <div className={"sidebar"+activeClassName}>
                <Icon
                    icon="fa-bars"
                    onActive="fa-close"
                    Activate={this.Activate} title=""
                    active={this.state.active} />
                <Icon
                    icon="fa-user"
                    title="Profile"
                    active={this.state.active}/>
                <Icon
                    icon="fa-edit"
                    title="Editor"
                    active={this.state.active}/>
                <Icon
                    icon="fa-info"
                    title="About"
                    active={this.state.active}/>
            </div>
        )
    }
}
export default Sidebar;
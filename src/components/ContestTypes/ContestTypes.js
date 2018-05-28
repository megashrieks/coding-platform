import React, { Component } from 'react';
import './ContestTypes.css';
class ContestTypes extends Component{
    state = {
        active: 0
    };
    activeTab = (index) => {
        this.setState({
            active: index
        });
        this.props.onActive(index);
    }
    render() {
        let typeList = this.props.types.map((element, index) => {
            return (
                <div
                    className={"tab" + (this.state.active === index ? " active" : "")}
                    key={'tab' + index}
                    onClick={ () => { this.activeTab(index) } }
                >{element.title}</div>
            )
        })
        return (
            <div className = "contest-types">
                {typeList}
            </div>
        );
    }
}
export default ContestTypes;
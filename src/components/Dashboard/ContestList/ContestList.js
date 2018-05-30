import axios from 'axios';
import React, { Component } from 'react';
import ContestItem from '../ContestItem/ContestItem';
import './ContestList.css';
class ContestList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }
    unmounted = false;
    componentDidMount() {
        axios.get('http://localhost:5000/api/contests')
            .then((data) => {
                this.setState({ data: data.data.data })
            })
        .catch((err) => console.log(err));
    }
    componentWillUnmount() {
        this.unmounted = true;
    }
    render() {
        let contestListElements = this.state.data.map((element, index) => {
            if (this.props.activeParameter !== element.type &&
                this.props.activeParameter !== 'all')
                return null;
            return (
                <ContestItem
                    {...element}
                    index={index}
                    key={element._id}
                />
            );
        });
        return (
            <div className="contest-list">
                {contestListElements}
            </div>
        );
    }
}
export default ContestList;
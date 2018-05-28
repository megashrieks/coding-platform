import React, { Component } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import './Main.css';
class Main extends Component {
    render() {
        return (
            <div className="main">
                <Dashboard/>
            </div>
        );
    }
}
export default Main;
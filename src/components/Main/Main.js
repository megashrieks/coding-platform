import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContestPage from '../ContestPage/ContestPage';
import Dashboard from '../Dashboard/Dashboard';
import QuestionPage from '../QuestionPage/QuestionPage';
import './Main.css';
class Main extends Component {
    render() {
        return (
            <div className="main">
                <Route path="/" component={Dashboard} exact />
                <Route path="/contests/:contestId" component={ContestPage} exact />
                <Route path="/contests/:contestId/questions/:questionId"
                    component={QuestionPage}
                    exact />
            </div>
        );
    }
}
export default Main;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './QuestionItem.css';
class QuestionItem extends Component{
    render() {
        let status = "";
        switch (this.props.element.solved) {
            case "full": status = "Solved";
                break;
            case "partial": status = "Partially Solved";
                break;
            case "no": status = "Not Solved"
                break;
            default: status = "Not Attempted"
        }
        return (
            <Link to={this.props.contestId.contestId+"/questions/" + this.props.element.question_id}
                className="link-question">
                <div className={"question " + this.props.element.solved}>
                    <div className="question-title">
                        {this.props.element.title}
                        <div className="question-status">{status}</div>
                    </div>
                    <div className="info">
                        <div className="item">
                            difficulty : <span>{this.props.element.difficulty}%</span>
                        </div>
                        <div className="item">
                            solved by : <span>{this.props.element.solvedBy} contestants</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}
export default QuestionItem;
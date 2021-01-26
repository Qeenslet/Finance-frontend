import React from "react";
import StatCompare from "./StatCompare";
import '../bootstrap.css';

export default class Category extends React.Component {
    render () {
        let badge = "badge";
        if (this.props.context === 'in') {
            badge += " badge-success";
        } else {
            badge += " badge-warning";
        }
        let compare = (this.props.entry.pure / (this.props.entry.average / 100)) - 100;

        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                {this.props.entry.categName}&nbsp;<StatCompare value={compare}
                                                          context={this.props.context}
                                                          small={true}/>
                <span className={badge}>{this.props.entry.balance}</span>
            </li>
        );
    }
}
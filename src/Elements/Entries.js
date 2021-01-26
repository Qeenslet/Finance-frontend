import React from 'react';
import '../bootstrap.css';
const styling = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
};

class Entries extends React.Component {
    render () {
        return (
            <div className="card">
                <div className="card-header">
                    <div style={styling}>
                        <div>
                            <h4 className="card-title">Entries</h4>
                        </div>
                        <div>
                            <button className="btn btn-success" onClick={() => this.props.newElement()}>New</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amt</th>
                            <th scope="col">Act</th>
                        </tr>
                        </thead>
                        <tbody>{this.props.children}</tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default Entries;
import React from "react";
import '../bootstrap.css';
import '../index.css';

export default class Modal extends React.Component {
    render () {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {
                                this.props.header && <h3 className="modal-title">
                                    {this.props.header}
                                </h3>
                            }
                            <button type="button" className="close" onClick={() => {this.onClose()}}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
            );
    }
    onClose = () => {
        this.props.onClose();
    }
}
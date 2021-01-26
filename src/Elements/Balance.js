import React from 'react';

function Balance(props) {
    const styling = {
        color: "red"
    }
    if (props.balance > 0){
        styling.color = 'green';
    }
    return (<span style={styling}>{props.format(props.balance)}</span>);
}

export default Balance;
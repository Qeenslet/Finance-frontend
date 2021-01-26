import React from "react";

function StatCompare(props) {
    if (!props.value) return null;
    if (isFinite(props.value)) {
        let value = Math.round(props.value);
        let combine = 'primary';
        const color = {};
        let symbol;
        if ((value > 0 && props.context === 'out') || (value < 0 && props.context === 'in')) {
            combine = 'danger';
            color.color = 'red';
        } else if ((value < 0 && props.context === 'out') || (value > 0 && props.context === 'in')) {
            combine = 'success';
            color.color = 'green';
        }
        if (!props.small) {
            if (value > 0) value = '+' + value;
            return (<span title="Percent" className={'badge badge-pill badge-' + combine}>{value}&nbsp;%</span>);
        } else {
            symbol = value > 0 ? String.fromCharCode(9652) : String.fromCharCode(9662);
            if (value > 0) value = '+' + value;
            return (<span style={color} title={value + '%'}>{symbol}</span>)
        }

    }
    return null;
}
export default StatCompare;
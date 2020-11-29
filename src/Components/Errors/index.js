import React from 'react';

export default function TextoError(props) {
    return (
        <small className="alert alert-danger alert-dismissible fade show">
            {props.children}
        </small>
    )
}
import React from 'react';

export default function Alert({ msg }) {
    return(
        <div className="alert alert-danger text-center">
            { msg }
        </div>
    );
}
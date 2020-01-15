import React from 'react';

export default function SubscriberCard({ student }) {
    return (
        <div class="card bg-dark mb-3">
            <h4 class="card-header card-title text-white">Subscriber's Data</h4>
            <div class="card-body">
                <p className="font-weight-bold text-white">
                    Name: 
                    <span className="font-weight-normal"> { student.name } </span>
                </p>
                <p className="font-weight-bold text-white">
                    ID: 
                    <span className="font-weight-normal"> { student.code } </span>
                </p>
                <p className="font-weight-bold text-white">
                    Career: 
                    <span className="font-weight-normal"> { student.career } </span>
                </p>
            </div>
        </div>
    );
}
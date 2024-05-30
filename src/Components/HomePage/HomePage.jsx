import React from 'react';

export default function Widget() {
    return (
        <div className="bg-white text-black py-5 px-3 text-center">
            <h1 className="text-danger display-4 font-weight-bold mb-4">Join Us in Making a Difference</h1>
            <p className="lead mb-4">Explore unique items and experiences while supporting a great cause.</p>
            <button className="btn btn-danger btn-lg rounded-pill">Start Bidding</button>
            <img className="img-fluid d-block mx-auto mt-4 rounded-lg shadow" src={process.env.PUBLIC_URL + '/home-bg.png'} alt="Charity Bidding Platform" />
        </div>
    );
}

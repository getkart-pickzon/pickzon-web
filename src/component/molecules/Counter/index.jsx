import React from 'react'
import CountUp from 'react-countup';

const CounterNumber = ({ endNumber, alphabet, icon }) => {
    return (
        <>
            <CountUp end={endNumber} duration={2.5} enableScrollSpy={"true"} /><span>{alphabet}{icon}</span>
        </>
    )
}

export default CounterNumber

import React from 'react'


const Loader = () => {
    return (
        <>
            <div style={{ margin: "100px" }} className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </>
    )
}

export default Loader
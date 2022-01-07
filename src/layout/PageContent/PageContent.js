import React from 'react'

function PageContent({ children }) {
    const styles = {
        height: "100vh",
        width: '100vw',
        backgroundColor: "#979797"
    }
    return (
        <div style={styles}>
            {children}
        </div>
    )
}

export default PageContent

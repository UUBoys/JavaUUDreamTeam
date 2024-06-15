import React from 'react'

import Navbar from '@/common/components/Navbar'

function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <React.Fragment>
            <Navbar/>
            {children}
        </React.Fragment>
    )
}

export default MainLayout

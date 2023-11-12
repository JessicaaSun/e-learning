import SideNav from '@/components/common/SideNav'
import React from 'react'

const LayoutCourse = ({children}) => {
    return (
      <div>
        <SideNav/>
        {children}
      </div>
    )
  }

export default LayoutCourse

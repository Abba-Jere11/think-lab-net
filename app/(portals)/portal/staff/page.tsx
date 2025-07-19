import RoleBasedWrapper from '@/components/RoleBasedWrapper'
import React from 'react'

export default function page() {
  return (
    <RoleBasedWrapper allowedRoles={["STAFF"]}>
        <h2>Welcome Staff</h2>
    </RoleBasedWrapper>
  )
}

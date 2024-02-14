import React from 'react'
import ChangePasswordForm from './components/Changepasswordorm'
import Breadcrumb from '@/app/common/Breadcrumbs/Breadcrumb'

const Page = () => {
  return (
    <>
      <Breadcrumb pageName="Change Password"/>
      <ChangePasswordForm/>
    </>
  )
}

export default Page

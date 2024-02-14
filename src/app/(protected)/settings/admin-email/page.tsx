import Breadcrumb from '@/app/common/Breadcrumbs/Breadcrumb'
import React from 'react'
import AdminEmailForm from './components/AdminEmailForm'

const Page = () => {
  return (
    <>
        <Breadcrumb pageName="Admin Email"/>
        <AdminEmailForm/>
    </>
  )
}

export default Page

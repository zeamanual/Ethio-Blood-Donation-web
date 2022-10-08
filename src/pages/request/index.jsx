import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/layout'

function RequestDetail() {
    let router = useRouter()
    console.log(router.query)
  return (
    <Layout>RequestDetail
    {router.query.reqId}
    </Layout>
  )
}

export default RequestDetail
"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const ImportQuestion = () => {
  const { id } = useParams()
  return (
    <div>{id}</div>
  )
}

export default ImportQuestion

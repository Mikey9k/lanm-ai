'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

const ShareDownloadButtons = () => {
  const handleShare = () => {
    alert('Share logic goes here!')
  }

  const handleDownload = () => {
    alert('Download logic goes here!')
  }

  return (
    <div className="flex space-x-2">
      <Button variant="secondary" onClick={handleShare}>
        Share
      </Button>
      <Button variant="default" onClick={handleDownload}>
        Download
      </Button>
    </div>
  )
}

export default ShareDownloadButtons

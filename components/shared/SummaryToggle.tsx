'use client'

import React, { useState } from 'react'
import { Switch } from '@/components/ui/switch'

const SummaryToggle = () => {
  const [showSummary, setShowSummary] = useState<boolean>(false)

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={showSummary}
        onCheckedChange={(value) => setShowSummary(value)}
      />
      <span>Summary</span>
      {showSummary && (
        <p className="bg-gray-100 p-2 text-sm rounded">
          Here is a short summary of how discipline bridges the gap between goals and accomplishments...
        </p>
      )}
    </div>
  )
}

export default SummaryToggle

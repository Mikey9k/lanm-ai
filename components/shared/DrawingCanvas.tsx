import React from 'react'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface DrawingCanvasProps {
  showSummary: boolean
  setShowSummary: (value: boolean) => void
  /** 
   * Whether to display the reload button 
   */
  showReloadButton?: boolean 
  /**
   * Custom reload callback (optional). 
   * Defaults to `window.location.reload()` if not provided.
   */
  onReload?: () => void 
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  showSummary,
  setShowSummary,
  showReloadButton = false,
  onReload,
}) => {
  // Fallback reload logic if no custom handler is passed
  const handleReload = () => {
    if (onReload) {
      onReload()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="w-[600px] image-container">
      <Image
        src="/assets/images/placeholder.png"
        alt="Placeholder"
        width={800}
        height={600}
        className="styled-image"
      />

      {/* Bottom-left controls container */}
      <div className="bottom-left-switch flex items-center space-x-2">
        <Switch checked={showSummary} onCheckedChange={setShowSummary} />
        <Label htmlFor="display-quote">Display Quote</Label>

        {/* <span className="switch-label">Summary</span> */}
      </div>


      {/* Conditionally show the reload button if enabled */}
      {showReloadButton && (
        <div className="reload-button-container">
          <Button variant="outline" onClick={handleReload}>
            Reload
          </Button>
        </div>
      )}


    </div>
  )
}

export default DrawingCanvas

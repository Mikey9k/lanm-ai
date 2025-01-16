import React from 'react'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import { Card } from '@/components/ui/card'



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
  image: {
    width: number,
    height: number,
    publicId: string,
    title: string
  }
  title: string
  type: string
  isTransforming?: boolean
  setIsTransforming?: (value: boolean) => void
  hasDownload?: boolean
  resetCanvas?: boolean
  setResetCanvas?: (value: boolean) => void
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  showSummary,
  setShowSummary,
  showReloadButton = false,
  onReload,
  image,
  title,
  type,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
  resetCanvas,
  setResetCanvas
}) => {
  // Fallback reload logic if no custom handler is passed
  const handleReload = () => {
    if (onReload) {
      onReload()
    } else {
      window.location.reload()
    }
  }

  const handleShare = () => {
    alert(`Share logic goes here! {isTransforming: ${isTransforming}}`)
  }

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
    }), title)
  }

  console.log(`yomumma: ${resetCanvas}`)
  const newKey = resetCanvas ? Date.now() : 'default-key';
  console.log(`newKey: ${newKey}`)
  console.log(`publicId: ${image?.publicId}`)
  console.log(`hasDownload: ${hasDownload}`)
  console.log(`setResetCanvas: ${setResetCanvas}`)


  return (

    <div>
      <div className="w-[600px] image-container">
        {/* <Image
          src="/assets/images/placeholder.png"
          alt="Placeholder"
          width={800}
          height={600}
          className="styled-image"
        /> */}

        <div className="">

          {image?.publicId ? (
            <div className="relative">
              <CldImage 
                key={`${newKey}-${image?.publicId}`}
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={image?.publicId}
                alt={image.title}
                sizes={"(max-width: 767px) 100vw, 50vw"}
                placeholder={dataUrl as PlaceholderValue}
                className="transformed-image"
                onLoad={() => {
                  if (setIsTransforming) {
                    setIsTransforming(false);
                  }
                }}
                onError={() => {
                  debounce(() => {
                    if (setIsTransforming) {
                      setIsTransforming(false);
                    }
                  }, 8000)()
                }}
              />

              <CldImage
                src={image?.publicId}
                alt={image.title}
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
              />

              {isTransforming && (
                <div className="transforming-loader">
                  <Image 
                    src="/assets/icons/spinner.svg"
                    width={50}
                    height={50}
                    alt="spinner"
                  />
                  <p className="text-white/80">Please wait...</p>
                </div>
              )}
            </div>
          ): (
            <div className="transformed-placeholder">
              Transformed Image
            </div>
          )}
        </div>

        {/* Bottom-left controls container */}
        <div className="bottom-left-switch flex items-center space-x-2 p-4">

        <Card className="flex items-center space-x-4 p-2 shadow-md rounded-md">
          <Switch checked={showSummary} onCheckedChange={setShowSummary} />
          <Label htmlFor="display-quote" className="text-sm font-medium">
            Display Quote
          </Label>
        </Card>

          {/* <span className="switch-label">Summary</span> */}
        </div>

        {/* Conditionally show the reload button if enabled */}
        {showReloadButton && (
          <div className="reload-button-container m-4">
            <Button variant="outline" onClick={handleReload}>
              Reload
            </Button>
          </div>
        )}




      </div>
    
      <div className="button-group" style={{ display: 'flex', gap: '8px' }}>
        <Button variant="secondary" onClick={handleShare}>
          Share
        </Button>
        <Button variant="default" onClick={handleDownload}>
          Download
        </Button>
      </div>
    
    </div>
  )
}

export default DrawingCanvas

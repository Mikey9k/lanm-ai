'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, Star } from 'lucide-react'

const FeedbackBar = () => {
  const [visualRating, setVisualRating] = useState<number>(0)
  const [textRating, setTextRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')

  const handleSubmit = () => {
    // Send these values to your backend or API
    alert(
      `Submitted:\nVisual Rating: ${visualRating}\nText Rating: ${textRating}\nComment: ${comment}`
    )
    // Clear or keep as needed
  }

  return (
    <div className="mt-6 bg-purple-900 text-white p-4 rounded">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Visual Rating */}
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Tell us how you felt about the visual</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setVisualRating(num)}
                className="p-1"
              >
                <Heart
                  fill={num <= visualRating ? 'currentColor' : 'none'}
                  className="text-white w-5 h-5"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Text Rating */}
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Tell us how you felt about the text</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setTextRating(num)}
                className="p-1"
              >
                <Heart
                  fill={num <= textRating ? 'currentColor' : 'none'}
                  className="text-white w-5 h-5"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment + Submit */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Type feedback here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-white text-black w-full md:w-60"
          />
          <Button variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackBar

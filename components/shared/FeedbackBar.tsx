'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'


interface FeedbackBarProps {

  payload: {
    quote: string;
    theme: string;
    color: string;
    formality: string;
    style: number; // Changed from string to number
    isQuoteDisplayed: boolean;
    isSummaryDisplayed: boolean;
    activeTemplate: string; // Changed from number to string
    showSummary: boolean;
    userId: string;
    textRating: number;
    visualRating: number;
    comment: string;
  };

}



const FeedbackBar: React.FC<FeedbackBarProps> = ({ payload }) => {
  const [visualRating, setVisualRating] = useState<number>(0)
  const [textRating, setTextRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')
  const { toast } = useToast()


  const handleSubmit = async () => {
    // Send these values to your backend or API
    // alert(
    //   `Submitted:\nVisual Rating: ${visualRating}\nText Rating: ${textRating}\nComment: ${comment}`
    // )
    // Clear or keep as needed

    const feedbackData = {
      ...payload,
      visualRating,
      textRating,
      comment
    }

    console.log(feedbackData)


    try {
      const response = await fetch('http://localhost:3333/api/submitFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Feedback submitted successfully');
      toast({
        title: "Thank You! Feedback Submitted",
        description: "A credit has been added to your account...",
        duration: 5000,
        className: "success-toast",
    })

      
    } catch (error) {
      console.error('There was a problem with the submission:', error);
    }
  }


  return (
    <div className="mt-6 bg-purple-900 text-white p-4 rounded flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
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
          <Button 
            variant="secondary" 
            onClick={handleSubmit}
            disabled={visualRating === 0 || textRating === 0 || payload["quote"] === "" || payload["theme"] === ""}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackBar

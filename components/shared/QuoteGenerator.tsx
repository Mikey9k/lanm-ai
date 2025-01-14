'use client'

import React from 'react'
import { Button } from '@/components/ui/button'           // Adjust if your Button is in a different path
import { Textarea } from '@/components/ui/textarea'       // Adjust if your Textarea is in a different path

interface QuoteGeneratorProps {
  quote: string;
  setQuote: (quote: string) => void;
  generatingTheme: boolean;
  setGeneratingTheme: (generating: boolean) => void;
}

const QuoteGenerator: React.FC<QuoteGeneratorProps> = ({ quote, setQuote, generatingTheme, setGeneratingTheme }) => {

  const handleGenerate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    // Implementation for generating or updating the quote
    setGeneratingTheme(true)
    // alert('Generate logic goes here!')
  }

  return (
    <div className="w-full max-w-xl mt-3">
      <form className="flex flex-col space-y-4 p-2">
        <Textarea
          ref={(textarea) => {
            // Auto-resize the Textarea based on its scrollHeight
            if (textarea) {
              textarea.style.height = '0px'
              textarea.style.height = textarea.scrollHeight + 'px'
            }
          }}
          placeholder="Type your text here..."
          className="flex-grow p-4 text-lg placeholder:text-lg border border-gray-300 rounded-lg"
          style={{ fontSize: '1rem' }}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <Button
          onClick={handleGenerate}
          className="w-full p-4 text-lg bg-blue-500 text-white rounded-lg"
        >
          {generatingTheme ? 'Generating...' : 'Generate Perspectives'}
        </Button>
      </form>
    </div>
  )
}

export default QuoteGenerator
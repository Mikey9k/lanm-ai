"use client"

import React, { useState, useEffect, useCallback } from 'react'
import DrawingCanvas from '@/components/shared/DrawingCanvas'
import QuoteGenerator from '@/components/shared/QuoteGenerator'
import PerspectiveSelector from '@/components/shared/PerspectiveSelector'
import StyleSelector from '@/components/shared/StyleSelector'
import ToneSelector from '@/components/shared/ToneSelector'
import ImageButtons from '@/components/shared/ImageButtons'
import { Card } from '@/components/ui/card'
import { updateCredits } from '@/lib/actions/user.actions'
import { creditFee } from '@/constants'
import { useToast } from '@/hooks/use-toast'
import { IImage } from '@/lib/database/models/image.model'
import { getCldImageUrl } from 'next-cloudinary'
import { addImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"
import FeedbackBar from './FeedbackBar'




interface TemplateData {
  image: string
  text: string
  model: string
}

interface Templates {
  // You can keep adding templates here as needed
  bridge?: TemplateData
  braid?: TemplateData
  fish?: TemplateData
  newton?: TemplateData
  // ... if you add more templates in the future
}

interface TransformationFormProps {
    userId: string;
    creditBalance: number;
    data?: IImage | null;   
}

const TransformationForm: React.FC<TransformationFormProps> = ({ userId, creditBalance, data = null }) => {

    console.log(userId + " is the user id");

    // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const [isTransforming, setIsTransforming] = useState(false)
    const [quote, setQuote] = useState('')
    const [activePerspective, setActivePerspective] = useState('')
    const [activeTone, setActiveTone] = useState('balance')
    const [activeStyle, setActiveStyle] = useState('sketch')
    const [activeTemplate, setActiveTemplate] = useState(1)

    const [generatingTheme, setGeneratingTheme] = useState(false)

    const [showSummary, setShowSummary] = useState(false)

    const [perspectives, setPerspectives] = useState([
        { id: '1', label: 'Discipline as the Key Connector' },
        { id: '2', label: 'Goals vs. Accomplishments' },
        { id: '3', label: 'Discipline as a Habit. Not Motivation' }
    ])

    // This state will hold your various templates (e.g., "bridge", "braid", etc.),
    // each storing image, text, and model.
    const [templates, setTemplates] = useState<Templates>({})


    const [image, setImage] = useState(data)
    const router = useRouter()

    const [payload, setPayload] = useState({
        quote: quote,
        theme: activePerspective,
        color: 'black',
        formality: activeTone,
        style: activeStyle,
        isQuoteDisplayed: true,
        isSummaryDisplayed: true,
        activeTemplate,
        showSummary,
        userId,
        textRating: 0,
        visualRating: 0,
        comment: ''
    });

    // console.log(payload);
    



    // 1) If you want to dynamically generate a theme from the user’s quote
    const generateTheme = useCallback(async () => {
        console.log("Generating Theme");
        if (quote) {
        try {
            setGeneratingTheme(true);
            const response = await fetch('http://localhost:3333/api/v1/dalle/theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: quote }),
            });
            const data = await response.json();
            setPerspectives([
            { id: '1', label: data.theme1 },
            { id: '2', label: data.theme2 },
            { id: '3', label: data.theme3 }
            ])
        } catch (error) {
            console.error(error);
        } finally {
            setGeneratingTheme(false);
        }
        }
    }, [quote])

    useEffect(() => {
        if (generatingTheme) {
        generateTheme()
        }
    }, [generatingTheme, quote, generateTheme])

    // 2) The function that calls your back end to generate images (and text/model, too)
    const generateImage = useCallback(async () => {
        console.log("Generating Images...");
        if (!quote) return


        if(data || image) {
            const transformationUrl = getCldImageUrl({
              width: image?.width,
              height: image?.height,
              src: image?.publicId || '',
            })
            
      
            const imageData = {
              title: image?.title || '',
              publicId: image?.publicId || '',
              width: image?.width || 0,
              height: image?.height || 0,
              secureURL: image?.secureURL || '',
              transformationURL: transformationUrl,
            //   aspectRatio: values.aspectRatio,
            //   prompt: values.prompt,
            //   color: values.color,
            }

            console.log(imageData);
      

            try {
                const newImage = await addImage({
                    image: imageData,
                    userId,
                    path: '/'
                })
        
                if(newImage) {
                    // form.reset()
                    setImage(data)
                    router.push(`/transformations/${newImage._id}`)
                }
            } catch (error) {
                console.log(error);
            }

        }




        try {
            updateCredits(userId, creditFee)
            console.log(creditBalance)
            const response = await fetch('http://localhost:3333/api/v1/dalle', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                prompt: quote,
                // If you have more fields, pass them along below:
                theme: activePerspective,
                color: "black",
                formality: activeTone,
                style: activeStyle,
                isQuoteDisplayed: true,
                isSummaryDisplayed: true,
                userId,
                }),  
            })
            const data = await response.json()

            /*
                Instead of manually setting every single field in state,
                you can store them in a “templates” object keyed by template name.
                That way, as you add more templates on the backend (like “bridge”, “braid”,
                “fish”, “newton”, etc.), you simply update the object accordingly.
            */
            setTemplates({
                ...templates,
                bridge: {
                image: `data:image/jpeg;base64,${data.photo}`,  // or data.bridge
                text: data.textBridge,
                model: data.modelBridge
                },
                braid: {
                image: `data:image/jpeg;base64,${data.braid}`,
                text: data.textBraid,
                model: data.modelBraid
                },
                fish: {
                image: `data:image/jpeg;base64,${data.fish}`,
                text: data.textFish,
                model: data.modelFish
                },
                newton: {
                image: `data:image/jpeg;base64,${data.newton}`,
                text: data.textNewton,
                model: data.modelNewton
                }
            })

        } catch (error) {
            console.error('Error generating images:', error);
        } finally {
            setIsTransforming(false)
        }
    }, [quote, templates, activePerspective, activeStyle, activeTone, creditBalance, data, image, router, userId])


    const { toast } = useToast()

    const handlePerspectiveChange = (newPerspective: string) => {
        setActivePerspective(newPerspective);
        setIsTransforming(true);
        console.log("Perspective Changed");
        toast({
            title: "Perspective Changed",
            description: "1 credit used, generating new image...",
            duration: 5000,
            className: "success-toast",
        })

        setPayload({
            ...payload,
            quote: quote,
            theme: newPerspective,
            color: 'black',
            formality: activeTone,
            style: activeStyle,
            isQuoteDisplayed: true,
            isSummaryDisplayed: true,
            activeTemplate,
            showSummary,
            userId,
            textRating: 0,
            visualRating: 0,
            comment: ''
        });

        console.log(payload);

        generateImage();
        

    };



    return (

        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5 p-8">

                {/* Left Column: Controls */}
                <Card className="space-y-4 md:col-span-2 p-4" style={{ backgroundColor: '#E6E6FA' }}>
                <QuoteGenerator
                    quote={quote}
                    setQuote={setQuote}
                    generatingTheme={generatingTheme}
                    setGeneratingTheme={setGeneratingTheme}
                />

                <PerspectiveSelector
                    activePerspective={activePerspective}
                    setActivePerspective={handlePerspectiveChange}
                    perspectives={perspectives}
                />

                <ToneSelector
                    activeTone={activeTone}
                    setActiveTone={setActiveTone}
                />

                <StyleSelector
                    activeStyle={activeStyle}
                    setActiveStyle={setActiveStyle}
                />

                {/* Example button to trigger generateImage */}
                {/* Button to trigger image generation */}
                {/* <button
                    onClick={generateImage}
                    disabled={generatingImg}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {generatingImg ? "Generating..." : "Generate Image"}
                </button> */}
                </Card>

                {/* Right Column: Canvas + Actions */}
                <div className="md:col-span-3 space-y-4">
                {/* Put DrawingCanvas and ImageButtons side by side */}
                <div className="flex gap-4">
                    <DrawingCanvas
                        showSummary={showSummary}
                        setShowSummary={setShowSummary}
                        showReloadButton={true}
                        onReload={() => {
                            // Custom logic, e.g., clearing canvas, re-initializing data, etc.
                            console.log("Reloading canvas...")
                        }}
                        type="defaultType" // Replace "defaultType" with the appropriate type value
                        image={{ width: 800, height: 800, publicId: userId, title: "Sample Title" }}
                        title={"hello"}
                        isTransforming={isTransforming}
                        setIsTransforming={setIsTransforming}
                    />
                    <ImageButtons 
                        activeTemplate={activeTemplate}
                        setActiveTemplate={setActiveTemplate}
                    />
                </div>


                {/* <ShareDownloadButtons /> */}

                {/* Example: Display the returned images/text */}
                {/* {Object.keys(templates).map((key) => {
                    const template = templates[key as keyof Templates]
                    if (!template) return null

                    return (
                    <div key={key} className="border p-4 my-2">
                        <h2 className="text-lg font-bold">{key}</h2>
                        <img src={template.image} alt={`${key} template`} />
                        <p>{template.text}</p>
                        <p>{template.model}</p>
                    </div>
                    )
                })} */}
                </div>

                
            </div>

            <FeedbackBar payload={payload} />

        </div>
    )
}

export default TransformationForm

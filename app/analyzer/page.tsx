"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'
import { toast } from 'react-hot-toast'

export default function Analyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setAnalysis("")
    }
  }

  const handleSubmit = async () => {
    if (selectedFile) {
      setIsAnalyzing(true)
      const formData = new FormData()
      formData.append('image', selectedFile)

      try {
        const response = await fetch('/api/analyze-prescription', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setAnalysis(data.analysis)
        toast.success('Analysis complete!')
      } catch (error) {
        console.error('Error:', error)
        setAnalysis('An error occurred while analyzing the image.')
        toast.error('Failed to analyze image. Please try again.')
      } finally {
        setIsAnalyzing(false)
      }
    } else {
      toast.error('Please select an image to analyze')
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setAnalysis('')
    setPreviewUrl(null)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">DETECT AND READ HANDWRITTEN WORDS</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* File upload card */}
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle className="text-gray-900">Input Image</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="file" onChange={handleFileChange} accept="image/*" />
            {previewUrl && (
              <div className="mt-4">
                <Image
                  src={previewUrl}
                  alt="Prescription Preview"
                  width={300}
                  height={400}
                  layout="responsive"
                  className="rounded-lg cursor-pointer"
                  onClick={() => window.open(previewUrl, '_blank')}
                />
              </div>
            )}
            <div className="flex justify-between mt-4">
              <Button onClick={handleSubmit} disabled={!selectedFile || isAnalyzing}>
                {isAnalyzing ? 'Analyzing...' : 'Submit'}
              </Button>
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis card */}
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle className="text-gray-900">Analysis:</CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <p>Analyzing prescription...</p>
            ) : (
              <div className="prose max-w-none">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
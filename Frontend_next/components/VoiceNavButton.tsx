"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mic, X, Volume2 } from "lucide-react"

export default function VoiceNavButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")

  const handleStartListening = () => {
    setIsListening(true)
    setTranscript("")

    // Simulate voice recognition
    setTimeout(() => {
      setTranscript("Show me my health insurance policy")
      setIsListening(false)
    }, 3000)
  }

  const handleVoiceCommand = () => {
    // Process the voice command
    setIsOpen(false)

    // In a real app, you would navigate or perform actions based on the transcript
    // For demo purposes, we'll just close the voice UI
  }

  return (
    <>
      <motion.button
        className="h-12 w-12 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <Mic className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-20 w-[300px] h-[300px] bg-card rounded-xl shadow-xl border overflow-hidden z-50 flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">Voice Navigation</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6">
              {isListening ? (
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="h-16 w-16 rounded-full bg-primary/10"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="h-12 w-12 rounded-full bg-primary/20"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                      />
                    </div>
                    <div className="relative h-20 w-20 rounded-full bg-primary flex items-center justify-center">
                      <Volume2 className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <p className="text-muted-foreground">Listening...</p>
                </div>
              ) : transcript ? (
                <div className="text-center space-y-4">
                  <p className="text-lg font-medium">"{transcript}"</p>
                  <Button onClick={handleVoiceCommand}>Process Command</Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground mb-4">Tap the microphone and speak a command</p>
                  <Button size="lg" className="rounded-full h-16 w-16" onClick={handleStartListening}>
                    <Mic className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


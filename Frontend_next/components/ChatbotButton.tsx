"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Send, Mic } from "lucide-react"
import { Input } from "@/components/ui/input"
import axios from "axios"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm your AI assistant. How can I help you with insurance today?", isUser: false },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: inputValue, isUser: true }])
    const userMessage = inputValue
    setInputValue("")

    // Scroll to bottom after user message
    setTimeout(scrollToBottom, 100)

    try {
      // Send user input to backend
      const response = await axios.post("http://localhost:5000/chat", { query: userMessage })
      setMessages((prev) => [...prev, { text: response.data.response, isUser: false }])
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error: Unable to connect to the chatbot server.", isUser: false }])
    }

    // Scroll to bottom after receiving response
    setTimeout(scrollToBottom, 100)
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      <motion.button
        className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 w-[350px] sm:w-[400px] h-[500px] bg-card rounded-xl shadow-xl border overflow-hidden z-50"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
              <h3 className="font-medium">AI Insurance Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary/90"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col h-[calc(100%-128px)] overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none"
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center mb-1">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <MessageSquare className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-xs font-medium">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

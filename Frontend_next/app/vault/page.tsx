"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/FileUploader"
import { FileText, FolderOpen, Lock, Shield, AlertCircle, X } from "lucide-react"

export default function VaultPage() {
  const [pinVerified, setPinVerified] = useState(false)
  const [pin, setPin] = useState(["", "", "", ""])
  const [pinError, setPinError] = useState("")
  const [showForgotPin, setShowForgotPin] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (value && !isNaN(Number(value))) {
      const newPin = [...pin]
      newPin[index] = value
      setPin(newPin)

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`)
        if (nextInput) {
          nextInput.focus()
        }
      }
    } else if (value === "") {
      const newPin = [...pin]
      newPin[index] = ""
      setPin(newPin)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const verifyPin = () => {
    const enteredPin = pin.join("")

    // For demo purposes, we'll use "1234" as the correct PIN
    if (enteredPin === "1234") {
      setPinVerified(true)
      setPinError("")
    } else {
      setPinError("Incorrect PIN. Please try again.")
      // Clear the PIN fields
      setPin(["", "", "", ""])
      // Focus the first PIN field
      const firstInput = document.getElementById("pin-0")
      if (firstInput) {
        firstInput.focus()
      }
    }
  }

  const resetPin = () => {
    setPinVerified(false)
    setPin(["", "", "", ""])
    setPinError("")
    setShowForgotPin(false)
  }

  const documents = [
    { id: 1, name: "Health_Insurance_Policy.pdf", type: "pdf", size: "2.4 MB", category: "Health", date: "2023-05-15" },
    {
      id: 2,
      name: "Vehicle_Insurance_Certificate.pdf",
      type: "pdf",
      size: "1.8 MB",
      category: "Vehicle",
      date: "2023-04-22",
    },
    { id: 3, name: "Life_Insurance_Terms.pdf", type: "pdf", size: "3.2 MB", category: "Life", date: "2023-03-10" },
    { id: 4, name: "Home_Insurance_Policy.pdf", type: "pdf", size: "2.1 MB", category: "Home", date: "2023-02-18" },
    { id: 5, name: "ID_Proof.jpg", type: "jpg", size: "1.2 MB", category: "Personal", date: "2023-01-05" },
    { id: 6, name: "Address_Proof.jpg", type: "jpg", size: "0.9 MB", category: "Personal", date: "2023-01-05" },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-8 text-primary">Secure Document Vault</h1>

        {!pinVerified ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Secure Access
              </CardTitle>
              <CardDescription>Enter your 4-digit PIN to access your document vault</CardDescription>
            </CardHeader>
            <CardContent>
              {showForgotPin ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">Reset Your PIN</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For security reasons, we'll send a PIN reset link to your registered email address.
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Input type="email" placeholder="Enter your email address" />
                      </div>
                      <div className="flex gap-2">
                        <Button className="w-full">Send Reset Link</Button>
                        <Button variant="outline" onClick={() => setShowForgotPin(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3].map((index) => (
                      <Input
                        key={index}
                        id={`pin-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        className="w-12 h-12 text-center text-xl"
                        value={pin[index]}
                        onChange={(e) => handlePinChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                      />
                    ))}
                  </div>

                  {pinError && (
                    <div className="flex items-center gap-2 p-2 rounded-md bg-red-50 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {pinError}
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <Button onClick={verifyPin} disabled={pin.some((digit) => digit === "")}>
                      Access Vault
                    </Button>
                    <Button variant="link" className="text-sm" onClick={() => setShowForgotPin(true)}>
                      Forgot PIN?
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <Shield className="h-5 w-5 text-primary" />
                    <p className="text-xs text-muted-foreground">
                      Your documents are encrypted and securely stored. Only you can access them with your PIN.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Documents</h2>
              <Button variant="outline" onClick={resetPin}>
                <Lock className="h-4 w-4 mr-2" />
                Lock Vault
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">All Documents</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="upload">Upload New</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Documents</CardTitle>
                    <CardDescription>View and manage all your securely stored documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center p-3 rounded-lg border">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>{doc.size}</span>
                              <span className="mx-2">•</span>
                              <span>{doc.category}</span>
                              <span className="mx-2">•</span>
                              <span>Uploaded: {doc.date}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insurance">
                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Documents</CardTitle>
                    <CardDescription>View and manage your insurance-related documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents
                        .filter((doc) => ["Health", "Vehicle", "Life", "Home"].includes(doc.category))
                        .map((doc) => (
                          <div key={doc.id} className="flex items-center p-3 rounded-lg border">
                            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{doc.name}</h4>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>{doc.size}</span>
                                <span className="mx-2">•</span>
                                <span>{doc.category}</span>
                                <span className="mx-2">•</span>
                                <span>Uploaded: {doc.date}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Documents</CardTitle>
                    <CardDescription>View and manage your personal identification documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents
                        .filter((doc) => doc.category === "Personal")
                        .map((doc) => (
                          <div key={doc.id} className="flex items-center p-3 rounded-lg border">
                            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{doc.name}</h4>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>{doc.size}</span>
                                <span className="mx-2">•</span>
                                <span>{doc.category}</span>
                                <span className="mx-2">•</span>
                                <span>Uploaded: {doc.date}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upload">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload New Documents</CardTitle>
                    <CardDescription>Add new documents to your secure vault</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-center gap-2 mb-4">
                          <FolderOpen className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Upload Documents</h3>
                        </div>

                        <FileUploader
                          onFilesSelected={(newFiles) => setFiles([...files, ...newFiles])}
                          maxFiles={10}
                          acceptedFileTypes={[".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"]}
                          maxFileSizeMB={20}
                        />
                      </div>

                      {files.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Files to Upload</h3>
                          <div className="space-y-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center p-2 rounded bg-muted/30">
                                <FileText className="h-4 w-4 mr-2" />
                                <span className="text-sm">{file.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-auto"
                                  onClick={() => {
                                    const newFiles = [...files]
                                    newFiles.splice(index, 1)
                                    setFiles(newFiles)
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button>Upload All Files</Button>
                            <Button variant="outline" onClick={() => setFiles([])}>
                              Clear All
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <Shield className="h-5 w-5 text-primary" />
                        <p className="text-xs text-muted-foreground">
                          All uploaded documents are encrypted and securely stored. Only you can access them with your
                          PIN.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </motion.div>
    </div>
  )
}


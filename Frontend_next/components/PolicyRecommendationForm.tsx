"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X, CheckCircle } from "lucide-react"

interface PolicyRecommendationFormProps {
  onClose: () => void
}

export default function PolicyRecommendationForm({ onClose }: PolicyRecommendationFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    insuranceType: "",
    income: 50000,
    dependents: "",
    existingConditions: "",
    occupation: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Policy Recommendation</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {submitted ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            Based on your information, we've prepared personalized insurance recommendations for you.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium mb-2">Health Gold Plan</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Comprehensive health coverage with $500 deductible and 90% coverage for most medical services.
              </p>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium mb-2">Term Life Essential</h4>
              <p className="text-sm text-muted-foreground mb-2">
                $250,000 coverage with affordable monthly premiums and optional riders for additional protection.
              </p>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium mb-2">Vehicle Protection Plus</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Comprehensive coverage with roadside assistance and rental car benefits.
              </p>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
          <Button className="mt-6" onClick={onClose}>
            Close
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup value={formData.gender} onValueChange={(value) => handleChange("gender", value)} required>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceType">Insurance Type</Label>
                  <Select
                    value={formData.insuranceType}
                    onValueChange={(value) => handleChange("insuranceType", value)}
                    required
                  >
                    <SelectTrigger id="insuranceType">
                      <SelectValue placeholder="Select insurance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health Insurance</SelectItem>
                      <SelectItem value="life">Life Insurance</SelectItem>
                      <SelectItem value="vehicle">Vehicle Insurance</SelectItem>
                      <SelectItem value="home">Home Insurance</SelectItem>
                      <SelectItem value="travel">Travel Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Annual Income</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[formData.income]}
                      min={10000}
                      max={200000}
                      step={5000}
                      onValueChange={(value) => handleChange("income", value[0])}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">$10,000</span>
                      <span className="text-sm font-medium">${formData.income.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">$200,000+</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Select
                    value={formData.dependents}
                    onValueChange={(value) => handleChange("dependents", value)}
                    required
                  >
                    <SelectTrigger id="dependents">
                      <SelectValue placeholder="Select number of dependents" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existingConditions">Existing Medical Conditions</Label>
                  <Select
                    value={formData.existingConditions}
                    onValueChange={(value) => handleChange("existingConditions", value)}
                    required
                  >
                    <SelectTrigger id="existingConditions">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="minor">Minor (e.g., allergies)</SelectItem>
                      <SelectItem value="moderate">Moderate (e.g., asthma)</SelectItem>
                      <SelectItem value="major">Major (e.g., diabetes, heart disease)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Enter your occupation"
                    value={formData.occupation}
                    onChange={(e) => handleChange("occupation", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button type="submit">Get Recommendations</Button>
              </div>
            </motion.div>
          )}
        </form>
      )}
    </div>
  )
}


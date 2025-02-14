import React from 'react'
import Card from './Card'

function Plans() {
    const plansData = [
        { image: "https://tse3.mm.bing.net/th?id=OIP.uS5RCuXcAFnwr2mlNAhYlAHaHa&pid=Api&P=0&h=180", title: "Car", subtitle: "Insurance" },
        { image: "https://tse3.mm.bing.net/th?id=OIP.zl-mEq8yHmLSHkTSa3a7JAAAAA&pid=Api&P=0&h=180", title: "Health", subtitle: "Insurance" },
        { image: "https://tse1.mm.bing.net/th?id=OIP.4RHxqOkwdvW8PRs_1TBrNgHaFN&pid=Api&P=0&h=180", title: "Life", subtitle: "Insurance" },
        { image: "https://tse3.mm.bing.net/th?id=OIP.CPqCjV6VkiZ2XmADJXda5QAAAA&pid=Api&P=0&h=180", title: "Travel", subtitle: "Insurance" },
        { image: "https://tse1.mm.bing.net/th?id=OIP.QBWi8lU-QygqEdNqXoEBNQHaHa&pid=Api&P=0&h=180", title: "Home", subtitle: "Insurance" },
        { image: "https://tse4.mm.bing.net/th?id=OIP.Z8HjQhNsZyU41gl1FVTf3gHaHa&pid=Api&P=0&h=180", title: "Bike", subtitle: "Insurance" },
        { image: "https://tse3.mm.bing.net/th?id=OIP.uS5RCuXcAFnwr2mlNAhYlAHaHa&pid=Api&P=0&h=180", title: "Car", subtitle: "Insurance" },
        { image: "https://tse3.mm.bing.net/th?id=OIP.zl-mEq8yHmLSHkTSa3a7JAAAAA&pid=Api&P=0&h=180", title: "Health", subtitle: "Insurance" },
        { image: "https://tse1.mm.bing.net/th?id=OIP.4RHxqOkwdvW8PRs_1TBrNgHaFN&pid=Api&P=0&h=180", title: "Life", subtitle: "Insurance" },
        { image: "https://tse3.mm.bing.net/th?id=OIP.CPqCjV6VkiZ2XmADJXda5QAAAA&pid=Api&P=0&h=180", title: "Travel", subtitle: "Insurance" },
        { image: "https://tse1.mm.bing.net/th?id=OIP.QBWi8lU-QygqEdNqXoEBNQHaHa&pid=Api&P=0&h=180", title: "Home", subtitle: "Insurance" },
        { image: "https://tse4.mm.bing.net/th?id=OIP.Z8HjQhNsZyU41gl1FVTf3gHaHa&pid=Api&P=0&h=180", title: "Bike", subtitle: "Insurance" },
      ];
    
  return (
    <div className="container mx-auto p-6">
    <h2 className="text-xl font-bold mb-4 text-center ">Our Insurance Plans</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 ">
      {plansData.map((plan, index) => (
        <Card key={index} {...plan} />
      ))}
    </div>
  </div>
  )
}

export default Plans
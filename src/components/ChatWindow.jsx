"use client"
import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function ChatWindow() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input) return;
    setMessages(prev => [...prev, { from: 'user', text: input }])
    setLoading(true)
    try {
      const res = await axios.post('/api/ask', { question: input })
      setMessages(prev => [...prev, { from: 'user', text: input }, { from: 'bot', text: res.data.answer }])
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: "Sorry, something went wrong." }])
    }
    setInput("")
    setLoading(false)
  }

  return (
    <div className="flex flex-col max-w-xl mx-auto p-4 space-y-2 min-h-screen bg-gray-50">
      <div className="flex-1 space-y-2">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg ${msg.from==='user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}
          >
            {msg.text}
          </motion.div>
        ))}
        {loading && <div className="italic text-gray-400">Thinking...</div>}
      </div>
      <div className="flex mt-4">
        <input 
          className="flex-1 border p-2 rounded-l-lg"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask anything..."
        />
        <button 
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r-lg"
        >Send</button>
      </div>
    </div>
  )
}

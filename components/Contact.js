"use client"
import { useState } from "react"

export default function Contact() {
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState(""); 

    const handleInput = (e) => {
        setInputs((state) => {return  { ...state, [e.target.name]:e.target.value} })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(process.env.NEXT_PUBLIC_API_URL+'/enquiry', {
            method:'POST',
            body: JSON.stringify(inputs)
        })
        .then((res) => res.json())
        .then((res) => {
            setMessage(res.message);
            setInputs({});
            setTimeout(() => {
                setMessage("")
            }, 3000)
        })
    }

    return  <main class="container mx-auto px-4 py-6">
                <h2 class="text-4xl font-bold mb-4">Contact Us</h2>
                <form onSubmit={handleSubmit} class="w-full max-w-lg">
                    <div class="flex items-center mb-4">
                        <label htmlFor="name" class="w-1/4">Name:</label>
                        <input type="text" name="name" onChange={handleInput} id="name" value={inputs.name??""} class="border rounded px-2 py-1 w-3/4" />
                    </div>
                    <div class="flex items-center mb-4">
                        <label htmlFor="email" class="w-1/4">Email:</label>
                        <input type="email" name="email"  onChange={handleInput} id="email" value={inputs.email??""} class="border rounded px-2 py-1 w-3/4" />
                    </div>
                    <div class="flex items-center mb-4">
                        <label htmlFor="message" class="w-1/4">Message:</label>
                        <textarea id="message" name="message" onChange={handleInput} value={inputs.message??""} class="border rounded px-2 py-1 w-3/4" rows="4"></textarea>
                    </div>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
                </form>
                {message && <p>{message}</p>}
            </main>
}
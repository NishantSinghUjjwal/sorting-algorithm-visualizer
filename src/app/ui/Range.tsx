'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
const Range = () => {
    const [range, setRange] = useState(5)
    const router = useRouter()
    const handleRange = (ran: number) => {
        setRange((ran))
    }
    const generateRandomNo=()=>{
            const randNo=Math.ceil(Math.random()*1000)
            setRange(randNo);
            router.push(`/?range=${randNo.toString()}`)
            router.refresh()
    }
    return (
        <div className=' flex justify-end w-full border gap-2'>
            <input value={range} min={2} max={1000} onChange={e => handleRange(parseInt(e.target.value))} type='number' />
            <button className=' px-2 bg-black text-white hover:bg-white hover:text-black' onClick={() => {
                router.push(`/?range=${range.toString()}`)
                router.refresh()
            }}>Generate</button>
            <button className=' px-2 bg-black text-white hover:bg-white hover:text-black' onClick={generateRandomNo}>Random</button>
        </div>
    )
}

export default Range
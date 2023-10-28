import { useEffect, useRef, useState } from "react"

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function Home() {
    const inputRef = useRef()
    const [inputValue, setInputValue] = useState('')

    useEffect(()=>{
        inputRef.current.focus()
    }, [inputRef])

    return (
        <main
            className={'flex h-screen w-screen flex-col items-center p-4 pt-10'}
        >
            <div className="flex p-4 items-center text-xl">
                <div className="mr-4">
                    Search
                </div>
                <input
                    ref = {inputRef}
                    value = {inputValue}
                    className='rounded-full w-96 bg-white pl-4 pr-9 text-neutral-900 text-base py-2 font-normal outline-0'
                    onChange={(e)=>{
                        setInputValue(e.target.value)
                    }}
                />
                <MagnifyingGlassIcon className='-ml-8 h-6 w-6 text-neutral-800 z-10' />
            </div>
        </main>
    )
}
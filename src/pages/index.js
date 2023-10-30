import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Home() {
    const inputRef = useRef();
    const [inputValue, setInputValue] = useState("");
    const [memeResult, setMemeResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    function updateSearchResults(query) {
        const axios = require('axios');
        const accKey = '0ib56Ag_eQs9cbpkH0ZkBsKVSZnm7dKHsS7D9Dy-T6k';

        axios.get(`https://api.unsplash.com/photos?page=1&per_page=20&query=${query}&client_id=${accKey}`)
            .then(function (res) {
                // xử trí khi thành công
                setMemeResult(res?.data)
            })
            .catch(function (error) {
                // xử trí khi bị lỗi
                setMemeResult([])
            })
    }

    function initList() {
        const axios = require('axios');
        const accKey = '0ib56Ag_eQs9cbpkH0ZkBsKVSZnm7dKHsS7D9Dy-T6k';

        axios.get(`https://api.unsplash.com/photos?page=1&per_page=20&client_id=${accKey}`)
            .then(function (res) {
                // xử trí khi thành công
                setMemeResult(res.data)
            })
            .catch(function (error) {
                // xử trí khi bị lỗi
                setMemeResult([])
            })

    }

    useEffect(() => {
        setIsLoading(true);
        initList();
        setIsLoading(false);
    }, [])

    return (
        <main className={"flex h-screen w-screen flex-col items-center mt-10"}>
            <div className="flex p-4 items-center">
                <div className="mr-4 text-xl">Search</div>
                <input
                    ref={inputRef}
                    value={inputValue}
                    className="rounded-full w-96 bg-white pl-5 pr-10 text-neutral-900 text-base py-2 font-normal outline-0"
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                />
                <MagnifyingGlassIcon 
                    className="-ml-9 h-6 w-6 text-neutral-800 z-10 hover:cursor-pointer" 
                    onClick={()=>{
                        setIsLoading(true);
                        updateSearchResults(inputValue);
                        setIsLoading(false);
                        console.log(memeResult)
                    }
                    }

                />
            </div>
            <div className="flex flex-col p-4 items-center">
                <div className="mr-4 text-xl">Result</div>
                <div className="grid place-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-4">
                    {
                        isLoading == true ? (
                            <div class="animate-pulse flex items-center justify-center w-56 h-56 bg-neutral-700 hover:bg-neutral-600 rounded-md mb-2 p-4">
                                <svg class="w-10 h-10 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                            </div>
                        )
                            :
                            memeResult?.map((meme, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="w-56 h-full mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4"
                                    >
                                        <img
                                            src={meme?.urls?.thumb}
                                            alt={meme?.alt_description}
                                            className="h-52 w-52"
                                        />
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </main>
    );
}

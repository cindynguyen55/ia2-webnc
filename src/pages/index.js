import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Home() {
    const inputRef = useRef();
    const [inputValue, setInputValue] = useState("");
    const [memeResult, setMemeResult] = useState([]);
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    function updateSearchResults(query) {
        const axios = require('axios');
        const accKey = '0ib56Ag_eQs9cbpkH0ZkBsKVSZnm7dKHsS7D9Dy-T6k';

        axios.get(`https://api.unsplash.com/photos?page=1&per_page=10&query=${query}&client_id=${accKey}`)
            .then(function (res) {
                // xử trí khi thành công
                setMemeResult(res?.data)
            })
            .catch(function (error) {
                // xử trí khi bị lỗi
                setMemeResult([])
            })
    }

    useEffect(() => {
        loadmore(1, '');
    }, [])

    // useEffect(() => {
    //     updateSearchResults(searchValue);
    // }, [searchValue])

    const loadmore = (page = 1, query) => {
        const axios = require('axios');
        const accKey = '0ib56Ag_eQs9cbpkH0ZkBsKVSZnm7dKHsS7D9Dy-T6k';

        console.log(page)

        if (!query)
        {
            axios.get(`https://api.unsplash.com/photos?page=1&per_page=10&query=${query}&client_id=${accKey}`)
            .then(function (res) {
                // xử trí khi thành công
                setMemeResult([...memeResult, ...res?.data])
            })
            .catch(function (error) {
                // xử trí khi bị lỗi
                setMemeResult([...memeResult, ...memeResult])
            })
        }
        else{
            axios.get(`https://api.unsplash.com/photos?page=1&per_page=10&client_id=${accKey}`)
            .then(function (res) {
                // xử trí khi thành công
                setMemeResult([...memeResult, ...res?.data])
            })
            .catch(function (error) {
                // xử trí khi bị lỗi
                setMemeResult([...memeResult, ...memeResult])
            })
        }  
    }

    return (
        <main className={"flex h-screen w-screen flex-col items-center mt-10 box-border"}>
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
                    onClick={() => {
                        setSearchValue(inputValue);
                        loadmore(1 ,searchValue)
                    }
                    }

                />
            </div>
            <div className="flex flex-col p-4 items-center">
                <div className="mr-4 text-xl">Result</div>
                <InfiniteScroll
                    dataLength={memeResult.length}
                    hasMore={true}
                    next={loadmore(searchValue)}
                    loader={<div role="status" className=" col-span-full m-auto">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>}
                    className="grid place-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-4 h-96"
                >
                    {
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
                </InfiniteScroll>
            </div>
        </main>
    );
}

'use client'
import React, { useEffect, useState } from 'react'
export interface GraphStick {
    value: number,
    selected: boolean
}
const Graph = ({ range }: { range: number }) => {

    const createArrayWithRandomNos = () => {
        const arr = new Array((range))
        for (let i = 0; i < (range); i++) {
            let randNo = Math.floor(Math.random() * range)
            while (arr.findIndex(el => el?.value == randNo || el === randNo) !== -1) {
                randNo = Math.ceil(Math.random() * range)
            }
            arr[i] = { value: randNo, selected: false }
        }
        return arr;
    }

    const checkIfGraphSorted = async (arr: GraphStick[]) => {
        for (let i = 0; i < arr.length; i++) {
            await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    setGraph(prev => {
                        const newArr = [...prev];
                        newArr[i].selected = true;
                        return newArr
                    })
                    console.log("graph is sorted for", i)
                    resolve()
                }, 0)
            })
          
        }
    }
    const bubbleSort = async (arr: GraphStick[]) => {
        for (let i = 0; i < arr.length; i++) {
            // setGraph(prev => {
            //     const newArr = [...prev];
            //     newArr[i].selected = true;
            //     return newArr
            // })
            for (let j = i + 1; j < arr.length; j++) {
                setGraph(prev => {
                    const newArr = [...prev];
                    newArr[j].selected = true;
                    return newArr
                })
                await new Promise<void>((resolve, reject) => {
                    setTimeout(() => {

                        setGraph(prev => {
                            const newArr = [...prev]
                            if (newArr[i].value > newArr[j].value) {
                                const temp = newArr[i].value;
                                newArr[i].value = newArr[j].value;
                                newArr[j].value = temp
                            }
                            newArr[i].selected = false;
                            newArr[j].selected = false
                            return newArr
                        }
                        )
                        resolve()
                    }, 0)
                })
            }
        }
    }
    const sortGraph = async () => {
        await bubbleSort(graph)
        console.log("graph after sorting",graph)
        await checkIfGraphSorted(graph)
    }
    const [graph, setGraph] = useState(createArrayWithRandomNos);
    useEffect(() => {
        console.log("arr regenerated")
        setGraph(createArrayWithRandomNos)
    }, [range])
    // useEffect(() => {
    //     setGraph(graph)
    // }, [graph])
    return (
        <div className=' w-full h-full'>
            <button className=' px-2 bg-black text-white hover:bg-white hover:text-black' onClick={sortGraph}>Sort</button>
            <div className=' w-full h-[500px] bg-black flex items-end justify-end'>
                {graph.map(el => <div className=' w-full bg-black border border-white' style={{ height: `${(el.value / range) * 100}%`, background: el.selected ? "green" : "black" ,backgroundImage:"linear-gradient(to bottom,black 50%,#ffffff3d )"}}></div>)}
            </div>
        </div>
    )
}

export default Graph
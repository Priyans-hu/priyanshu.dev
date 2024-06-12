"use client";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card.tsx";
import Link from "next/link";

export function ThreeDCard() {
    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-950 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-gray-900 w-auto sm:w-[30rem] xl:w-[40rem] h-auto rounded-xl p-6">
                <CardItem translateZ="100" className="w-full mb-4">
                    <Image
                        src='https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWNvbW1lcmNlJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D'
                        height="1000"
                        width="1000"
                        className="h-60 xl:h-[18rem] w-full object-cover rounded-xl group-hover/card:shadow-xl pointer-events-none"
                        alt="thumbnail"
                    />
                </CardItem>
                <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-center text-neutral-600 dark:text-white"
                >
                    UrbanKicks
                </CardItem>
            </CardBody>
        </CardContainer>
    );
}

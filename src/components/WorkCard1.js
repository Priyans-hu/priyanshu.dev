"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card.tsx";

export function ThreeDCard({ title, img }) {
    return (
        <CardContainer className="inter-var cursor-pointer">
            <Link href={`/${title.toLowerCase().replace(/ /g, '-')}`} className="block">
                <CardBody className="bg-gray-950 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-gray-900 w-auto sm:w-full xl:w-[40rem] h-auto rounded-xl p-6">
                    <CardItem translateZ="100" className="w-full mb-4">
                        <Image
                            src={img}
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
                        {title}
                    </CardItem>
                </CardBody>
            </Link>
        </CardContainer>
    );
}
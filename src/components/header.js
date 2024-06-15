import React from "react";
import Link from "next/link";

const Header = ({ secondary }) => {
    const secondaryLink = secondary === 'home' ? '/' : `/${secondary}`;

    return (
        <header className="w-full fixed z-50">
            <div className="m-auto p-8 lg:w-2/3 text-xl flex items-center justify-between lg:p-4 py-12 lg:py-12 text-gray-400 z-50">
                <Link href="/"><h1 className="font-semibold hover:underline cursor-pointer">Priyanshu</h1></Link>
                <Link href={secondaryLink} className="font-semibold hover:underline capitalize cursor-pointer">{secondary}</Link>
            </div>
        </header>
    );
};

export default Header;
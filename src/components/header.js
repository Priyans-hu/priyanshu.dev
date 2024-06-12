import React from "react";

const Header = ({ secondary }) => {
    return (
        <header className="w-full fixed z-50">
            <div className="m-auto w-2/3 text-xl flex items-center justify-between p-4 py-12 text-gray-400 z-50">
                <a href="/"><h1 className="font-semibold hover:underline">Priyanshu</h1></a>
                <a href={`/${secondary}`} className="font-semibold hover:underline capitalize">{secondary}</a>
            </div>
        </header>
    );
};

export default Header;
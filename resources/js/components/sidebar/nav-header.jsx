import React from "react";

export default function NavHeader() {
    return (
        <div className="flex items-center justify-between  py-4">
            <div className="flex items-center space-x-5">
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-8 w-8 rounded-full"
                />
                <span className="text-lg font-bold">ImmoG</span>
            </div>
        </div>
    );
}

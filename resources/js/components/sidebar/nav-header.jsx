import { usePage } from "@inertiajs/react";
import React from "react";

export default function NavHeader() {
    const { setting } = usePage().props;

    return (
        <div className="flex items-center justify-between  py-4">
            <div className="flex items-center space-x-5">
                <img
                    src={setting.logo_url}
                    alt="Logo"
                    className="h-8 w-8 rounded-full"
                />
                <span className="text-lg font-bold">{setting.name}</span>
            </div>
        </div>
    );
}

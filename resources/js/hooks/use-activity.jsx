import React from "react";
import { getDate } from "../helper/helper";

export default function useActivity() {
    const columns = [
        {
            key: "user_name",
            label: "Utilisateurs",
            sortable: true,
        },
        { key: "action", label: "Actions", sortable: true },
        {
            key: "country",
            label: "Pays & Adresse IP",
            sortable: true,
            render: (activity) => (
                <div className="flex flex-col gap-2 text-center">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        {activity.country !== "" && activity.country !== null
                            ? activity.country
                            : "Pays introuvable"}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {activity.ip !== null
                            ? activity.ip
                            : "Adresse IP introuvable"}
                    </span>
                </div>
            ),
        },
        { key: "navigator", label: "Navigateur", sortable: true },
        {
            key: "created_at",
            label: "Date",
            sortable: false,
            render: (activity) => getDate(activity.created_at),
        },
    ];

    return {
        columns,
    };
}

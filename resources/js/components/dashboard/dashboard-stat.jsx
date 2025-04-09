import { Activity, Clock, Flame, TrendingUp } from "lucide-react";
import React from "react";

export default function DashboardStats() {
    const stats = [
        {
            name: "Workouts Completed",
            value: 12,
            icon: Activity,
            color: "bg-blue-500",
        },
        {
            name: "Calories Burned",
            value: "3,500",
            icon: Flame,
            color: "bg-red-500",
        },
        {
            name: "Total Time",
            value: "8h 30m",
            icon: Clock,
            color: "bg-green-500",
        },
        {
            name: "Progress",
            value: "15%",
            icon: TrendingUp,
            color: "bg-purple-500",
        },
    ];
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, key) => (
                <div
                    key={key}
                    className="bg-white overflow-hidden shadow rounded-lg"
                >
                    <div className="p-5">
                        <div className="flex items-center">
                            <div
                                className={`flex-shrink-0 ${stat.color} rounded-md p-3`}
                            >
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        {stat.name}
                                    </dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            {stat.value}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

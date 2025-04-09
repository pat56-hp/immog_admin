import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Edit, Plus, Search, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const bookingData = [
    {
        id: 1,
        name: "Ram Kailash",
        phone: "9905598912",
        bookingId: "SDK89635",
        nights: 2,
        roomType: "1 King Room",
        guests: 2,
        paid: "rsp.150",
        cost: "rsp.1500",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 2,
        name: "Samira Karki",
        phone: "9815394203",
        bookingId: "SDK89635",
        nights: 4,
        roomType: ["1 Queen", "1 King Room"],
        guests: 5,
        paid: "paid",
        cost: "rsp.5500",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 3,
        name: "Jeevan Rai",
        phone: "9865328452",
        bookingId: "SDK89635",
        nights: 1,
        roomType: ["1 Deluxe", "1 King Room"],
        guests: 3,
        paid: "rsp.150",
        cost: "rsp.2500",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 4,
        name: "Bindu Sharma",
        phone: "9845653124",
        bookingId: "SDK89635",
        nights: 3,
        roomType: ["1 Deluxe", "1 King Room"],
        guests: 2,
        paid: "rsp.150",
        cost: "rsp.3000",
        avatar: "/placeholder.svg?height=32&width=32",
    },
];

export default function DashboardContrat() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Rechercher"
                        className="pl-8 w-full text-sm focus:border-transparent active:border-transparent"
                    />
                </div>
                <Button className="bg-red-400 hover:bg-red-500 hover:cursor-pointer text-white">
                    <Plus className="h-4 w-4" />
                    Ajouter
                </Button>
            </div>
            <div className="overflow-x-auto rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="whitespace-nowrap">
                                NAME
                            </TableHead>
                            <TableHead className="whitespace-nowrap">
                                BOOKING ID
                            </TableHead>
                            <TableHead className="whitespace-nowrap">
                                NIGHTS
                            </TableHead>
                            <TableHead className="whitespace-nowrap">
                                ROOM TYPE
                            </TableHead>
                            <TableHead className="whitespace-nowrap">
                                GUESTS
                            </TableHead>
                            <TableHead className="whitespace-nowrap">
                                PAID
                            </TableHead>
                            <TableHead className="whitespace-nowrap">
                                COST
                            </TableHead>
                            <TableHead className="whitespace-nowrap">
                                ACTION
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookingData.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>
                                    <div className="flex items-center">
                                        <Avatar className="h-8 w-8 mr-3">
                                            <AvatarImage
                                                src={booking.avatar}
                                                alt={booking.name}
                                            />
                                            <AvatarFallback>
                                                {booking.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">
                                                {booking.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {booking.phone}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{booking.bookingId}</TableCell>
                                <TableCell>{booking.nights}</TableCell>
                                <TableCell>
                                    {Array.isArray(booking.roomType) ? (
                                        <div>
                                            {booking.roomType.map(
                                                (type, index) => (
                                                    <p key={index}>{type}</p>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        booking.roomType
                                    )}
                                </TableCell>
                                <TableCell>{booking.guests} Guests</TableCell>
                                <TableCell>
                                    {booking.paid === "paid" ? (
                                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
                                            paid
                                        </span>
                                    ) : (
                                        booking.paid
                                    )}
                                </TableCell>
                                <TableCell>{booking.cost}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-end mt-4">
                <Button
                    variant="link"
                    className="text-red-400 hover:text-red-500"
                >
                    Consulter plus de liste
                </Button>
            </div>
        </>
    );
}

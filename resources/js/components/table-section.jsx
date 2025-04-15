import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

export default function TableSection({ columns, children }) {
    return (
        <div className="overflow-x-auto rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, key) => (
                            <TableHead key={key} className="whitespace-nowrap">
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                {children}
            </Table>
        </div>
    );
}

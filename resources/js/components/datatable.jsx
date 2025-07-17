import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    ChevronUp,
    Search,
} from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

export default function Datatable({
    data,
    columuns,
    caption = null,
    seachable = true,
    itemsPerPage = 25,
    showPagination = true,
    buttons = false,
    pagination = null, // nouvelle prop
    onPageChange = null, // nouvelle prop
    onSearchChange = null, // nouvelle prop
    searchValue = "", // nouvelle prop
}) {
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    });
    const [searchTerm, setSearchTem] = useState(searchValue);
    const [currentPage, setCurrentPage] = useState(1);

    // Synchronise searchTerm avec searchValue externe
    useEffect(() => {
        setSearchTem(searchValue);
    }, [searchValue]);

    // Détecte si on est en mode pagination backend
    const isBackendPaginate = pagination && Array.isArray(pagination.data);

    // Recherche : côté backend, on ne filtre pas (on affiche la page courante)
    const filteredData = useMemo(() => {
        if (isBackendPaginate) return pagination.data;
        return data.filter((item) =>
            Object.values(item).some((value) =>
                value
                    ?.toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm, isBackendPaginate, pagination]);

    // Tri : côté backend, on ne trie que la page courante
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal == null || bVal == null) return 0;
            return sortConfig.direction === "asc"
                ? aVal > bVal
                    ? 1
                    : -1
                : aVal < bVal
                ? 1
                : -1;
        });
    }, [filteredData, sortConfig]);

    // Pagination
    const totalPages = isBackendPaginate
        ? pagination.last_page
        : Math.ceil(sortedData.length / itemsPerPage);

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const currentItems = isBackendPaginate
        ? sortedData // backend gère la page courante
        : showPagination
        ? sortedData.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage)
        : sortedData;

    // Pagination controls
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        if (isBackendPaginate && onPageChange) {
            onPageChange(newPage);
        }
    };

    // Recherche : côté backend, déclenche le callback parent
    const handleSearch = (e) => {
        setSearchTem(e.target.value);
        if (isBackendPaginate && onSearchChange) {
            onSearchChange(e.target.value);
        }
    };

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc")
            direction = "desc";
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key)
            return <ChevronsUpDown className="h-4 w-4" />;
        return sortConfig.direction === "asc" ? (
            <ChevronUp className="h-4 w-4" />
        ) : (
            <ChevronDown className="h-4 w-4" />
        );
    };

    return (
        <>
            <div className="mt-3 mb-6 gap-4">
                <div className="flex justify-between">
                    {seachable && (
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Filtrer"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="mx-2 pl-8 w-full text-sm focus:border-transparent active:border-transparent"
                            />
                        </div>
                    )}
                    {buttons &&
                        buttons.map((button, key) => (
                            <div key={key} className="gap-2">
                                {button}
                            </div>
                        ))}
                </div>
            </div>
            <div className="overflow-x-auto rounded-md">
                <Table>
                    {caption && <TableCaption>{caption}</TableCaption>}
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            {columuns.map((col) => (
                                <TableHead
                                    key={col.key}
                                    onClick={
                                        col.sortable
                                            ? () => handleSort(col.key)
                                            : undefined
                                    }
                                    className={`whitespace-nowrap ${
                                        col.sortable ? "cursor-pointer" : ""
                                    }`}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.label.toUpperCase()}
                                        {col.sortable && getSortIcon(col.key)}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.length > 0 ? (
                            currentItems.map((row, index) => (
                                <TableRow key={index}>
                                    {columuns.map((col) => (
                                        <TableCell
                                            key={col.key}
                                            className="truncate"
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : row[col.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columuns.length}
                                    className="h-24 text-center"
                                >
                                    Aucun resultat trouvé
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {showPagination && (
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-muted-foreground">
                        {isBackendPaginate ? (
                            <>
                                Affichage {pagination.from} à {pagination.to}{" "}
                                sur {pagination.total}
                            </>
                        ) : (
                            <>
                                Affichage {indexOfFirstItem + 1}-
                                {Math.min(
                                    indexOfFirstItem + itemsPerPage,
                                    sortedData.length
                                )}{" "}
                                à {sortedData.length}
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="text-sm">
                            Page {currentPage} à {totalPages || 1}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={
                                currentPage === totalPages || totalPages === 0
                            }
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

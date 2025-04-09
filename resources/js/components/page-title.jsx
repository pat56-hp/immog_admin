import React from "react";
import BreadcrumbUi from "./breadcrumb-ui";

export default function PageTitle({ title, breadcrumb }) {
    return (
        <div className="title-section flex justify-between">
            <h2 className="text-xl md:text-xl font-bold tracking-tight">
                {title}
            </h2>
            <BreadcrumbUi breadcrumb={breadcrumb} />
        </div>
    );
}

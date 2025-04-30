import React from "react";

export default function FormProprietaire() {
    return (
        <form
            onSubmit={(data) => console.log(data)}
            className="mt-3 mb-6 space-y-4 grid md:grid-cols-2 gap-2"
        >
            <div></div>
        </form>
    );
}

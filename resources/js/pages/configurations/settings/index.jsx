import React, { useState } from "react";
import ContentLayout from "../../../layouts/content-layout";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import InputError from "../../../components/InputError";
import Required from "../../../components/required";
import { PhoneInput } from "react-international-phone";
import { Separator } from "../../../components/ui/separator";
import { Button } from "../../../components/ui/button";
import { useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
import { showFile } from "../../../helper/helper";
import { toast } from "sonner";

export default function Setting({ module, title, setting }) {
    const [previewLogo, setPreviewLogo] = useState(setting?.logo_url ?? null);
    const [previewFavicon, setPreviewFavicon] = useState(
        setting?.favicon_url ?? null
    );

    //Navigation
    const breadcrumbs = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Paramètres applications",
        },
    ];

    //Initialisation des datas
    const { data, setData, post, processing, errors } = useForm({
        name: setting?.name ?? "",
        email: setting?.email ?? "",
        phone: setting?.phone ?? "",
        address: setting?.address ?? "",
        facebook: setting?.facebook ?? "",
        instagram: setting?.instagram ?? "",
        linkedin: setting?.linkedin ?? "",
        tweeter: setting?.tweeter ?? "",
        keywords: setting?.keywords ?? "",
        description: setting?.description ?? "",
        logo: setting?.logo ?? "",
        favicon: setting?.favicon ?? "",
    });

    //Affichage du logo
    const handleChangeLogo = (e) => {
        const file = e.target.files[0];
        setData("logo", file);
        showFile(file, setPreviewLogo);
    };

    //Affichage du favicon
    const handleChangeFavicon = (e) => {
        const file = e.target.files[0];
        setData("favicon", file);
        showFile(file, setPreviewFavicon);
    };

    //Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("settings.store"), {
            preserveScroll: true,
            onSuccess: () =>
                toast.success("Informations enregistrées avec succès"),
        });
    };

    return (
        <ContentLayout
            module={module}
            title={title}
            subtitle="Paramétrage de l'application"
            breadcrumb={breadcrumbs}
        >
            <form onSubmit={handleSubmit}>
                <div className="mt-3 mb-5">
                    <h3 className="mb-3 font-medium">Informations basiques</h3>
                </div>
                <div className="mt-3 mb-6 space-y-4 grid md:grid-cols-2 gap-2">
                    <div className="">
                        <Label htmlFor="name">
                            Libéllé <Required />
                        </Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={"mt-2 w-full"}
                            placeholder="Libéllé de l'application"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            type="email"
                            className={"mt-2 w-full"}
                            placeholder="Email de l'application"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="contact">Contact</Label>
                        <PhoneInput
                            className="mt-2 w-full"
                            placeholder="Contact de l'application"
                            defaultCountry="ci"
                            value={data.phone}
                            onChange={(phone) => setData("phone", phone)}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                            id="address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className={"mt-2 w-full"}
                            placeholder="Adresse"
                        />
                    </div>
                </div>
                <div className="mt-3 mb-5">
                    <Separator className="mb-3" />
                    <h3 className="mb-3 font-medium">Réseaux sociaux</h3>
                </div>
                <div className="mt-3 mb-6 space-y-4 grid md:grid-cols-2 gap-2">
                    <div className="">
                        <Label htmlFor="fb">Facebook</Label>
                        <Input
                            id="fb"
                            type="url"
                            value={data.facebook}
                            onChange={(e) =>
                                setData("facebook", e.target.value)
                            }
                            className={"mt-2 w-full"}
                            placeholder="Lien facebook"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="insta">Instagram</Label>
                        <Input
                            id="insta"
                            value={data.instagram}
                            onChange={(e) =>
                                setData("instagram", e.target.value)
                            }
                            type="url"
                            className={"mt-2 w-full"}
                            placeholder="Lien instagram"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="linkedin">Linkedin</Label>
                        <Input
                            id="linkedin"
                            value={data.linkedin}
                            onChange={(e) =>
                                setData("linkedin", e.target.value)
                            }
                            type="url"
                            className={"mt-2 w-full"}
                            placeholder="Lien linkedin"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="tweeter">Tweeter</Label>
                        <Input
                            id="tweeter"
                            value={data.tweeter}
                            onChange={(e) => setData("tweeter", e.target.value)}
                            type="url"
                            className={"mt-2 w-full"}
                            placeholder="Lien tweeter"
                        />
                    </div>
                </div>
                <div className="mt-3 mb-5">
                    <Separator className="mb-3" />
                    <h3 className="mb-3 font-medium">
                        Informations de référencement
                    </h3>
                </div>
                <div className="mt-3 mb-6 space-y-4 grid md:grid-cols-1 gap-2">
                    <div className="">
                        <Label htmlFor="keywords">Mots clés</Label>
                        <Input
                            id="keywords"
                            type="text"
                            value={data.keywords}
                            onChange={(e) =>
                                setData("keywords", e.target.value)
                            }
                            className={"mt-2 w-full"}
                            placeholder="Mots clés de l'application"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            rows={4}
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Description de l'application"
                            className="mt-2 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        ></textarea>
                        <InputError />
                    </div>
                </div>
                <div className="mt-3 mb-5">
                    <Separator className="mb-3" />
                    <h3 className="mb-3 font-medium">
                        Images de l'application
                    </h3>
                </div>
                <div className="mt-3 mb-6 space-y-4 grid md:grid-cols-2 gap-2">
                    <div className="">
                        <Label htmlFor="logo">Logo</Label>
                        <Input
                            id="logo"
                            type="file"
                            accept="image/*"
                            className={"mt-2 w-full"}
                            onChange={handleChangeLogo}
                        />
                        <InputError message={errors.logo} />
                        {previewLogo && (
                            <div className="mt-2">
                                <img
                                    src={previewLogo}
                                    alt="Aperçu logo"
                                    className="w-30 h-auto"
                                />
                            </div>
                        )}
                    </div>
                    <div className="">
                        <Label htmlFor="favicon">Favicon</Label>
                        <Input
                            id="favicon"
                            type="file"
                            accept="image/*"
                            className={"mt-2 w-full"}
                            onChange={handleChangeFavicon}
                        />
                        <InputError message={errors.favicon} />
                        {previewFavicon && (
                            <div className="mt-2">
                                <img
                                    src={previewFavicon}
                                    alt="Aperçu logo"
                                    className="w-30 h-auto"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-center">
                    <Button
                        type="submit"
                        className="w-2xl h-12 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                    >
                        Sauvegarder
                        {processing && <Loader />}
                    </Button>
                </div>
            </form>
        </ContentLayout>
    );
}

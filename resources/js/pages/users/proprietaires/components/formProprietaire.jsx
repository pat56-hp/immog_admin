import React, { useEffect, useState } from "react";
import { Label } from "../../../../components/ui/label";
import Required from "../../../../components/required";
import { Input } from "../../../../components/ui/input";
import InputError from "../../../../components/InputError";
import { PhoneInput } from "react-international-phone";
import {
    RadioGroup,
    RadioGroupItem,
} from "../../../../components/ui/radio-group";
import ImageComponent from "../../../../components/imageComponent";
import { Button } from "../../../../components/ui/button";
import { Loader } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function FormProprietaire({ proprietaire, isUpdate = false }) {
    const [image, setImage] = useState(
        isUpdate ? [{ data_url: proprietaire.image }] : []
    );

    const { data, setData, processing, post, errors, reset } = useForm({
        name: proprietaire?.name ?? "",
        email: proprietaire?.email ?? "",
        phone: proprietaire?.phone ?? "",
        address: proprietaire?.address ?? "",
        picture: null,
        type: proprietaire?.type?.toLowerCase() ?? "particulier",
        status: proprietaire?.status ?? true,
        _method: isUpdate ? "PATCH" : "POST",
    });

    const onChangeImage = (image) => {
        if (image.length && image[0]?.file instanceof File) {
            setImage(image);
            setData("picture", image[0].file);
        } else {
            setImage([]);
            setData("picture", null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(
            route(
                isUpdate ? "proprietaires.update" : "proprietaires.store",
                proprietaire?.id
            ),
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => console.log(errors),
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3 mb-6">
            <RadioGroup
                value={data.type}
                className="flex gap-6 items-center justify-center mb-10"
                onValueChange={(type) => setData("type", type)}
            >
                <div className="flex space-x-2 items-center">
                    <RadioGroupItem value="particulier" id="particulier" />
                    <Label htmlFor="particulier">Particulier</Label>
                </div>
                <div className="flex space-x-2 items-center">
                    <RadioGroupItem value="agence" id="agence" />
                    <Label htmlFor="agence">Agence</Label>
                </div>
            </RadioGroup>

            <div className="grid md:grid-cols-2 gap-2 space-y-4">
                <div>
                    <Label htmlFor="name">
                        Nom & prénom(s) <Required />
                    </Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-2"
                        placeholder="Nom complet"
                        required
                    />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <Label htmlFor="email">
                        Email <Required />
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="mt-2"
                        placeholder="Adresse email"
                        required
                    />
                    <InputError message={errors.email} />
                </div>
                <div>
                    <Label htmlFor="phone">
                        Contact <Required />
                    </Label>
                    <PhoneInput
                        className="mt-2"
                        value={data.phone}
                        onChange={(phone) => setData("phone", phone)}
                        placeholder="Numéro de téléphone"
                        defaultCountry="ci"
                        id="phone"
                    />
                    <InputError message={errors.phone} />
                </div>
                <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                        id="address"
                        type="text"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="mt-2"
                        placeholder="Localisation"
                    />
                    <InputError message="" />
                </div>
                <div>
                    <Label htmlFor="photo">Photo</Label>
                    <ImageComponent
                        multiple={false}
                        image={image}
                        onChangeImage={onChangeImage}
                        imageMaxNumber={1}
                    />
                    <InputError message="" />
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
    );
}

import AppLayout from "@/Layouts/app-layout";
import PageTitle from "../../components/page-title";
import { useForm, usePage } from "@inertiajs/react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import InputError from "../../components/InputError";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import Required from "../../components/required";

export default function Edit() {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () =>
                toast.success("Informations modifiées avec succes"),
            onError: (errors) => {
                console.log(errors);
                toast.error("Une erreur est survenue");
            },
        });
    };

    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Mon profil",
            link: route("profile.edit"),
        },
    ];

    return (
        <AppLayout>
            <PageTitle title="Modifier mon profil" breadcrumb={breadcrumb} />
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Informations du profil
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Modification des informations de votre profil
                            </p>
                        </header>

                        <form onSubmit={submit} className="mt-6 space-y-4">
                            <div>
                                <Label htmlFor="name">
                                    Nom & prénom(s) <Required />
                                </Label>

                                <Input
                                    id="name"
                                    className="mt-2 block w-full h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Nom & prénom(s)"
                                    required
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">
                                    Email <Required />
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-2 block w-full h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    autoComplete="username"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Contact</Label>
                                <PhoneInput
                                    className="mt-2 w-full"
                                    placeholder="Entrer votre contact"
                                    onChange={(e) => setData("phone", e)}
                                    value={data.phone}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    className="h-12 w-50 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                                >
                                    {processing && <Loader />} Enregistrer
                                </Button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

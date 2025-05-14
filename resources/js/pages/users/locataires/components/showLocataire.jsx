import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Eye } from "lucide-react";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";
import { getFormattedDate } from "../../../../helper/helper";

export default function ShowLocataire({ locataire }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-white-500 border-1 hover:cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <Eye className="h-4 w-4" />
            </Button>
            <ActionAlertDialog
                open={open}
                onOpenChange={setOpen}
                title={`Détail du locataire ${locataire.nom_complet}`}
                confirmButton={false}
                className="min-w-200 overflow-auto"
                description={
                    <span>
                        <span className="flex justify-between items-center gap-2 ">
                            <span className="space-y-2 text-base">
                                <span className="flex gap-2">
                                    <span className="font-bold">
                                        Nom & prénom(s):
                                    </span>
                                    <span>{locataire.nom_complet}</span>
                                </span>
                                <span className="flex gap-2">
                                    <span className="font-bold">Email :</span>
                                    <span>
                                        {locataire.email ??
                                            "Aucune adresse email"}
                                    </span>
                                </span>
                                <span className="flex gap-2">
                                    <span className="font-bold">
                                        Téléphone :
                                    </span>
                                    <span>{locataire.telephone}</span>
                                </span>
                                <span className="flex gap-2">
                                    <span className="font-bold">
                                        Date de naissance :
                                    </span>
                                    <span>
                                        {getFormattedDate(
                                            locataire.date_naissance
                                        )}
                                    </span>
                                </span>
                                <span className="flex gap-2">
                                    <span className="font-bold">
                                        Profession :
                                    </span>
                                    <span>
                                        {locataire.profession ?? "Aucune info"}
                                    </span>
                                </span>
                                <span className="flex gap-2">
                                    <span className="font-bold">Adresse :</span>
                                    <span>
                                        {locataire.adresse ?? "Aucune info"}
                                    </span>
                                </span>
                                <span className="flex gap-2">
                                    <span className="font-bold">Notes :</span>
                                    <span>
                                        {locataire.notes ?? "Aucune info"}
                                    </span>
                                </span>
                            </span>
                            <span className="overflow-hidden w-50 h-50">
                                <a target="_blank" href={locataire.image}>
                                    <img
                                        src={locataire.image}
                                        className="rounded-md wi-full h-full object-cover"
                                    />
                                </a>
                            </span>
                        </span>
                        <span className="mt-5 mb-5 border-1 border-secondary block" />
                        <span className="flex flex-col space-y-1">
                            <span className="font-bold text-base">
                                Justificatifs D'identité
                            </span>
                            <span className="flex gap-2 mt-3">
                                {locataire.justificatif_identite
                                    ? JSON.parse(
                                          locataire.justificatif_identite
                                      ).map((image, key) => (
                                          <span key={key} className="w-20 h-20">
                                              <a target="_blank" href={image}>
                                                  <img
                                                      src={image}
                                                      className="rounded-md w-full h-full object-cover"
                                                  />
                                              </a>
                                          </span>
                                      ))
                                    : "Aucun justificatif d'identité"}
                            </span>
                        </span>
                    </span>
                }
            />
        </>
    );
}

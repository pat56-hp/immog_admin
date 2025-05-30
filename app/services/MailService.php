<?php

namespace App\Services;

use App\Models\Contrat;
use App\Models\Facture;
use App\Models\Proprietaire;
use App\Notifications\LocataireNotification;
use App\Notifications\ProprietaireNotification;

class MailService
{
    public function __construct() {}

    /**
     * Envoie du contrat aux deux parties (Proprietaire & Locataire)
     * 
     * @param Contrat $contrat
     * @return void
     */
    public function sendContratToPart(Contrat $contrat)
    {
        $data['view'] = 'mails.contrat';
        $data['contrat'] = $contrat;

        try {
            //Envoie de notification au proprietaire
            $data['subject'] = 'Contrat de location du locataire ' . $contrat->locataire->nom_complet;
            $data['user_type'] = 'proprietaire';
            $data['contrat_to'] = 'le contrat de bail du locataire ' . $contrat->locataire->nom_complet;
            $contrat->proprietaire->notify(new ProprietaireNotification($data));

            //Envoie de notification au locataire
            $data['subject'] = 'Votre contrat de location';
            $data['user_type'] = 'locataire';
            $data['contrat_to'] = 'votre contrat de bail';
            $contrat->locataire->notify(new LocataireNotification($data));
        } catch (\Throwable $th) {
            logger()->error('Erreur survenue lors de l\'envoie du contrat aux deux parties', [$th->getMessage()]);
        }
    }

    /**
     * Envoie de la facture au locataire
     *
     * @param Facture $facture
     * @return void
     */
    public function sendFactureToLocataire(Facture $facture)
    {
        $data['view'] = 'mails.factures.locataire';
        $data['facture'] = $facture;

        try {
            //Envoie de la notification
            $data['subject'] = 'Facture de ' . $facture->typeModel->type . ' N° ' . $facture->typeModel->ref;
            $facture->typeUser->notify(new LocataireNotification(($data)));
        } catch (\Throwable $th) {
            logger()->error('Erreur survenue lors de l\'envoie de la facture ' . $facture->ref . ' au locataire ' . $facture->typeUser->nom_complet, [$th->getMessage()]);
        }
    }
}

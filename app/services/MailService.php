<?php

namespace App\Services;

use App\Models\Contrat;
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
}

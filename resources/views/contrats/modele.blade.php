<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
</head>

<body>
    <style></style>
    <div style="margin: 20px 20px; font-size: 14px">
        <h1 style="font-size: 22px; text-align: center; margin: 20px 40px">
            CONTRAT DE BAIL
        </h1>
        <p>
            Entre les soussignés {{ $nom_proprietaire }}<br />
            Agissant au nom et comme mandataire de Propriétaire, désigné
            dans tout ce qui va suivre, « le bailleur » ><br />
            Cel : {{ $contact_proprietaire }}<br />
            Email : {{ $email_proprietaire }}<br />
            Adresse : {{ $adresse_proprietaire }}<br />
            <span style="text-align: end; display: block">D'une part</span>
        </p>
        <p>
            Et {{ $nom_locataire }}<br />
            Locataire, désigné dans tout ce qui va suivre, « le preneur »<br />
            Cel : {{ $contact_locataire }}<br />
            Email : {{ $email_locataire }}<br />
            Adresse : {{ $adresse_locataire }}<br />
            <span style="text-align: end; display: block">D'autre part</span>
        </p>
        <p>
            Il a été convenu et arrêté ce qui suit :<br />
            Le bailleur loue les présentes au preneur qui accepte, les
            locaux dont la désignation suit :
        </p>

        <h4 style="font-size: 16px; text-align: center">DÉSIGNATION</h4>
        <div style="margin-bottom: 20px">
            <p>
                Il est précisé que l’emplacement est livré nu, et que le
                preneur devra supporter les coûts et frais de peinture,
                électricité, téléphone et en général ; tous les travaux
                d’aménagement.
            </p>
            <p>
                Tel au surplus des coûts se poursuit et se comporte sans
                plus ample description, le preneur déclarant avoir vu,
                visité et parfaitement connaitre les locaux loués, qu’il
                consent à occuper dans son état actuel.
            </p>
        </div>

        <h4 style="font-size: 16px; text-align: center">OBJET</h4>
        <div style="margin-bottom: 20px">
            <p>
                Le bailleur donne en location au preneur, qui accepte, le
                local situé à {{ $adresse_appartement }}, en vue de l’exercice
                de {{ $contrat_type }}.
            </p>
            <p>
                Avant l’entrée en jouissance du bien loué par le preneur, le
                bailleur et le preneur dresseront ensemble un état des lieux
                détaillé. Ce dernier fera partie intégrante du contrat. Le
                preneur s’engage à restituer le bien loué au bailleur dans
                le même état au terme du bail.
            </p>
        </div>

        <h4 style="font-size: 16px; text-align: center">DUREE</h4>
        <div style="margin-bottom: 20px">
            <p>
                Le présent bail est fait pour une durée de {{ $duree }} an(s) à
                partir du {{ $date_debut }} et jusqu’au {{ $date_fin }}.
            </p>
        </div>
        <h4 style="font-size: 16px; text-align: center">
            CLAUSES ET CONDITIONS
        </h4>
        <div style="margin-bottom: 20px">
            <p>
                Le présent bail est fait aux clauses et conditions suivantes
                que le preneur s’oblige à exécuter sans qu’il puisse
                réclamer aucune diminution du loyer ci-après et à peine de
                résiliation sur simple contestation des infractions s’il
                plait au bailleur ainsi que tous dommages et intérêts.
            </p>
            <p>
                <b>1er Usage </b>: Le preneur ne pourra donner aux locaux
                loués d’autre usage que {{ $contrat_type }} à l’exclusion de
                tout autre même temporaire. Il n’aura aucun recours contre
                le bailleur ni du fait de la concurrence que pourraient lui
                faire d’autre locataire de l’immeuble ni du fait de trouble
                de jouissance résultant d’actes quelconque de ces derniers.
            </p>
            <p>
                <b>2ème Mobilier </b>: Le preneur s’engage à garnir et tenir
                constamment garnis les lieux loués de meubles, marchandises
                et objets mobiliers de valeur et quantité suffisantes pour
                garantir le bailleur du paiement des loyers et de
                l’exécution de toutes les questions du bail.
            </p>
            <p>
                <b>3ème </b>: Le preneur occupera les lieux loués dans
                l’état où ils se trouveront au moment de l’entrée en
                jouissance sans pouvoir exercer aucun recours contre le
                bailleur pour vice de constructions, dégradations, voirie,
                insalubrité, humidité, infiltration, cas de force majeure et
                toutes autres causes intéressant l’état de l’état des lieux,
                le preneur se déclarant prêt à supporter tout autre
                inconvénient en résultant et à effectuer effectivement
                toutes les réparations nécessaires.
            </p>
            <p>
                <b>4ème Entretien, réparations </b>: Le preneur entretiendra
                les lieux loués en bonne état de réparations locatives en
                jouira en bon père de famille et les restituera en fin de
                bail en bon état. Le preneur devra en effet refaire les
                badigeons, peinture des boiseries, portes, persiennes,
                plafonnage etc., aussi souvent que besoin sera. Il devra de
                son propre chef communiquer les factures correspondantes au
                bailleur à titre de justification.
            </p>
            <p>
                A défaut d’entretien, le bailleur pourra y faire procéder au
                frais du preneur. <br />
                Le bailleur ne sera tenu d’exécuter au cours du bail que les
                grosses réparations qui pourraient devenir nécessaires
                toutes autres réparations quelles qu’elles soient restantes
                à la charge du preneur. <br />
                Bien que les réparations intéressant la toiture soient à la
                charge du propriétaire, le preneur devra aviser en temps
                utile le bailleur, par lettre recommandée, des réparations
                qu’il apparaitrait nécessaire d’y affecter au cours du bail
                et en raison du caractère de cas fortuit et de tornade que
                revêtent en Afrique les tornades, le bailleur ne pourra en
                aucun façon être tenu pour responsable des dégâts causés
                directement ou indirectement par la pluie, la rouille, la
                foudre ou le vent aux meubles meublant, matériels et
                marchandises se trouvant dans les lieux loués, s’il n’a pas
                été mis en demeure depuis huit jours par lettre recommandée
                d’avoir à effectuer les réparations devenues nécessaires.
                <br />
                Il est précisé que les bris de glace quelle qu’en soit leur
                cause, fût-ce même la guerre civil ou étrangère ou les
                troubles publics resteront à la charge du preneur qui en
                supportera les conséquences. <br />
                Dans le cas où le preneur aurait négligé de faire dresser
                l’état des lieux, ceux-ci seront réputé avoir été pris en
                bon état d’entretien. Un mois avant l’expiration de la
                location, le preneur devra faire établir contradictoirement
                avec le bailleur lui –même étant présent ou lui dûment
                appelé, un état des réparations lui incombant. A défaut
                d’exécution, le preneur devra régler le montant des dites
                réparations sans pouvoir élevé la moindre objection.
            </p>
            <p>
                <b>5ème Grosses réparations </b>: Le preneur souffrira les
                grosses réparations.et toutes transformations nécessaires ou
                que le bailleur jugera utile d’effectuer dans la cour du
                bail, quelles qu’en soient l’importance et la durée, sans
                pouvoir réclamer aucune indemnité ou ni diminution de loyer,
                quand bien même la durée de ces réparations serait
                supérieure à quarante jours. Il devra laisser pénétrer les
                ouvriers dans les lieux loués pour tous travaux jugés utiles
                par le bailleur.
            </p>
            <p>
                <b>6ème aménagements, transformations </b>: Le preneur ne
                pourra faire aucun aménagement aucun modification dans
                l’état et la disposition des locaux sans autorisation
                préalable expresse et par écrit du bailleur. Tous
                aménagements, embellissements, améliorations ou
                constructions nouvelles, meubles fixés au mur, sols ou
                plafonds, appartiendront de plein droit au bailleur en fin
                du bail sans aucune indemnité, à moins que le bailleur ne
                préfère la remise en état des lieux, au frais du preneur,
                tels qu’ils se trouvaient au moment de l’entrée en
                jouissance. <br />
                Les travaux seront effectués sous la surveillance de
                l’architecte du bailleur dont les honoraires seront à la
                charge du preneur.
            </p>
            <p>
                <b>7ème Règlements urbains </b>: Le preneur satisfera aux
                lieux et place du bailleur à toutes les prescriptions de
                police, de voirie et d’hygiène. Il exécutera à ses frais
                sans recours contre le bailleur tous travaux qui sont ou qui
                seront exigés par les lois, décrets, arrêtés ou règlements
                sur la santé publique nonobstant toutes dispositions
                contraires, le tout de manière que le bailleur ne soit
                jamais inquiété ni recherché à ce sujet.
            </p>
            <p>
                <b>8ème Cession de bail, sous-location </b>: La présente
                location a été consentie -au preneur intuitu personnae-
                Toute cession de bail, sous-location ou simple occupation
                des lieux par un tiers est rigoureusement interdite à peine
                de résiliation immédiate du présent contrat de location à la
                simple constatation de l’infraction et sans qu’il soit
                besoin de recourir à la procédure de mise en demeure.
            </p>
            <p>
                <b>9ème Impôts et patentes, taxes locatives </b>: Le preneur
                acquittera exactement les contributions, taxes et patentes
                et tous autres impôts pouvant exister ou être établis en
                raison de son commerce, de sa profession ou de son
                occupation des lieux loués. Il devra justifier de leur
                acquit à toute réquisition et notamment avant de déménager.
                Il versera au bailleur à chaque échéance de loyer le montant
                des taxes et notamment le montant de la taxe d’enlèvement
                des ordures ménagères.
            </p>
            <p>
                <b>10ème Grillages, moustiquaires </b>: Le preneur devra au
                bailleur le remboursement des frais d’installation et
                d’entretien des grillages moustiquaires si leur usage vient
                à être rétabli ou imposé notamment en cas d’épidémie. Le
                preneur doit détruire tout insecte sans que le bailleur ne
                soit puisse être inquiété à cet égard.
            </p>
            <p>
                <b>11ème Assurance </b>: Le preneur s’engage dès la
                signature du présent acte à assurer contre l’incendie son
                mobilier, son matériel, ses marchandises ainsi que les
                risques locatifs, bris de glace et le recours des voisins et
                à maintenir cette assurance pendant le cours du présent
                bail, à en acquitter exactement les primes et les
                cotisations annuelles et à justifier du tout à la première
                réquisition du bail. <br />
                Enfin, il s’engage à prévenir immédiatement le bailleur de
                tout sinistre, sous peine de tout dommage et intérêt pour
                indemniser le bailleur du préjudice.qui pourrait lui être
                causé par l’inobservation de cette clause
            </p>
            <p>
                <b>12ème Enseignes et étalages </b>: Le preneur n’aura le
                droit d’apposer sur la façade extérieur du magasin que les
                enseignes et plaques indicatrices relatives à son commerce
                et dont l’emplacement, les dimensions et la conformation
                auront été au préalable agréés par le bailleur.
            </p>
            <p>
                <b>13ème Marchandises inflammables et hasardeuses </b>: Le
                preneur s’engage à satisfaire exactement aux mesures qui
                sont ou qui pourraient être prescrites par l’autorité
                administrative pour l’emmagasinage ou la vente de
                marchandises inflammables ou hasardeuses. Il s’engage en
                outre à ne pas les transvaser ni les manipuler quel qu’en
                soit le degré ou la nature, à une lumière quelconque que
                l’électricité ou la lumière du jour.
            </p>
            <p>
                <b>14ème Visite des lieux </b>: Le preneur devra laisser le
                bailleur ou son représentant visiter les lieux loués chaque
                fois qu’il jugera utile, à charge pour lui de prévenir par
                lettre au moins 24 heures à l’avance. <br />
                En cas de mise en vente de l’immeuble par le propriétaire et
                également en vue de relocation devra laisser visiter
                acquéreurs et locataires éventuels les lieux loués les
                mardi, jeudi et samedi de 15heures à 18 heures
            </p>
            <p>
                <b>15ème Eau, électricité, charges diverses </b>: Le preneur
                paiera directement au concessionnaire et fournisseur le
                montant de ses abonnements d’eau et d’électricité et
                remboursera au propriétaire avec la première échéance de
                loyer suivante, les sommes que ce dernier sera amené à
                avancer de ce fait pour le compte du locataire. <br />
                Le preneur ne pourra formuler aucune réclamation pour cause
                d’interruption dans le service des eaux ou d’électricité
                pour quelque cause que se soit. <br />
                Il ne pourra non plus exiger du bailleur aucun indemnité ni
                diminution du loyer pour tous les accidents ou tous dégâts
                qui pourraient survenir par suite de rupture de canalisation
                d’eau ou d’électricité, renonçant dès à présent à exercer
                toutes actions de ce chef contre le bailleur. <br />
                Le bailleur pourra, à toute époque de la location, faire
                placer un compte divisionnaire sur le branchement desservant
                les lieux loués. De ce cas, le prix de l’eau et de
                l’électricité consommée d’après les indicateurs de ce
                compteur ainsi que les frais de pose, de branchement, de
                cautionnement, de location, d’entretien, de réparation et de
                relevé de compteur divisionnaire seront réglés directement
                par le preneur ou rembourser au bailleur dans le cas où ce
                dernier sera amené à les avancer. En cas d’absence de
                compteur divisionnaire, le montant des charges afférentes à
                chaque locataire au prorata de la superficie des locaux
                loués. Ce montant pourra être un montant révisable payable
                d’avance.
            </p>
            <p>
                La fourniture et le remplacement de tous les appareils
                d’éclairage et de toutes les ampoules sont exclusivement à
                la charge du preneur. Les frais afférents aux manœuvres
                chargés de l’entretien et du nettoyage des locaux communs à
                tous les locataires ainsi que ceux d’électricité des parties
                communes, ensemble sanitaire, seront le cas échéant répartis
                entre les locataires.
            </p>
            <p>
                <b>16ème Poêles mobiles </b>: Le preneur ne pourra avoir
                dans les lieux loués aucun poèle mobile ni aucun appareil
                nécessitant un conduit de fumée.
            </p>
            <p>
                <b> 17ème Réglementations diverses </b>: Le preneur ne
                pourra demander aucune indemnité ni diminution de loyer en
                raison des travaux occasionnés par une circonstance fortuite
                étrangère au bailleur.
            </p>
            <p>
                <b>Le preneur ne pourra : </b> <br />
            <ul>
                <li>avoir dans les lieux loués aucun animal vivant</li>
                <li>
                    mettre en dehors des vitrines ni ligne ou autre objets
                    quels qu’ils soient
                </li>
            </ul>
            Il ne pourra même après décès, cession de commerce ou d’entreprise, ni en cas de faillite, être fait en
            vente publique dans les lieux loués. <br>
            Le preneur s’engage formellement à appliquer les règlements de l’immeuble établis ou qui pourraient l’être
            par le bailleur. <br>
            En particulier, les commerçants et les commerçants ne fournisseurs ne pourront passer que par les accès
            prévu à cet effet et n’approvisionner les magasins chaque matin entre 6 heures et 8 heures.
            </p>
            <p>
                <b>18ème Accès et parties communes </b>: Le preneur s’interdit de déposer aucun matériaux, caisses,
                emballages, objet de toutes natures et détritus dans les parties de l’immeuble communes à tous les
                locataires. Il entretiendra les accès et les alentours des locaux qui lui sont loués, ainsi que les wc
                dont il userait en parfaite état de propreté. Les lieux loués doivent être toujours décemment occupés et
                exploités.
            </p>
            <p>
                <b>19ème Remise des clés </b>: Le jour de l’expiration de la location, le preneur devra remettre au
                bailleur, les clés des locaux. Dans le cas où par le fait du preneur, le bailleur n’aurait pu mettre en
                location ou laisser visiter les lieux ou faire la livraison à un nouveau locataire ou e reprendre la
                libre disposition si telle était son intention à l’expiration de la location, il aurait droit à une
                indemnité au moins égale à un terme du loyer du contrat du contrat sans préjudice de tous dommages et
                intérêts.
            </p>
            <p>
                <b>20ème Dégradations et vols </b>: Le preneur est responsable de toutes les dégradations ou vols
                quelconque qui pourraient être commis dans et sur les locaux loués par lui.
            </p>
            <p>
                <b>21ème Garantie </b>: A titre de provision pour la garantie de l’exécution des clauses du présent
                contrat, le preneur a versé au moment de la signature la somme de : {{ $garantie_amount }} correspond à
                {{ $garantie }} de loyer entre les mains du bail, dont quittance.
            </p>
            <p>
                Cette somme sera remboursée au preneur à l’expiration de la location, lors de la remise des clés et des
                locaux à la disposition du bail, déduction faite de toutes les sommes qui pourraient être dû par le
                preneur tant pour réparation que pour toute autre cause. De convention expresse, cette somme versée à
                titre de garantie demeurera improductive d’intérêt et sera réajustée aux mêmes époques et dans les mêmes
                proportions que le loyer lui-même suivant clause de révision ci-dessous.
            </p>
            <p>
                <b>22ème Frais </b>: Tous les frais, droits de timbre d’enregistrement et honoraires auxquelles
                pourraient donner lieu le présent acte et ses suites seront supporté par le preneur et sont payables
                d’avance.
            </p>

        </div>
        <h4 style="font-size: 16px; text-align: center">
            PRIX
        </h4>
        <div style="margin-bottom: 20px;">
            <p>
                <b>23ème </b> : Le présent bail est consenti et accepté moyennant le loyer {{ $loyer }}
                {{ $charges_formatted }}, payable d’avance, le premier jour de chaque trimestre en bonnes espèces de
                monnaie.
            </p>
            <p>
                <b>Clause de révision </b>: Le prix ci-dessus a été fixé et révisable annuellement au…………………………………………
                (date de révision du loyer) en fonction du salaire horaire du manœuvre ordinaire première catégorie de
                tous les travaux de bâtiments à ABIDJAN.
                Il a été établi en tenant compte d’un salaire horaire de …………………………………………… (montant du salaire horaire)
                francs.
                En conséquence, il est expressément convenu que dans le cas ou le salaire subirait une variation égale
                ou supérieure à 10 %, le loyer sera révisé et diminué ou augmenté dans la même proportion.

            </p>
            <p>
                En application des dispositions du décret du 30 Juin 1925, article 24, il est précisé que dans le cas où
                il surviendrait une contestation sur le montant du loyer tel qu’il a été défini entre les parties par le
                présent bail, le locataire devra en aviser le bailleur qui s’engage à s’en remettre à une expertise
                amiable.
            </p>
            <p>
                <b>Taxes et charges </b>: Il sera en outre payé par le preneur le cas échéant, au titre de charges, en
                même temps que le loyer la quote-part des taxes locatives et frais de gardiennage, entretien,
                électricité et eau des parties communes, elles sont payables d’avance.
            </p>
            <p>
                Les loyers et charges arriérés dont le montant sera égal ou supérieur à un terme du présent bail
                produiront intérêt au taux légal de 6% l’an à dater de leur échéance et sans que le bailleur ne soit
                tenu d’en faire la demande au locataire. Les intérêts dus pour une année entière deviendront à leur tour
                productif d’intérêts conformément à l’article 1154 du code civil.
            </p>
            <p>
                <b>24ème Clause résiliatoire </b>: A défaut de paiement d’un seul terme de loyer ou de charge à son
                échéance ou d’exécution d’une quelconque des clauses et conditions du bail, le présent contrat sera
                résilié de plein droit, si bon semble au bailleur et sans formalités judiciaires, huit jours après une
                simple mise en demeure, par lettre recommandée de payer ou de remplir les conditions du bail annonçant
                la volonté du bailleur d’user du bénéfice de cette clause et demeurée sans effet, quelle que soit la
                cause de cette carence et nonobstant toutes consignations ultérieures, l’expulsion sera prononcée par
                simple ordonnance de référé, le tout sans préjudice de dommages et intérêts.
            </p>
            <p>
                <b>25ème Election de domicile </b>: Pour l’exécution des présentes, les parties font l’élection de
                domicile entrainant attribution de juridiction.
            </p>
            <p>
                Par dérogation à l’article 25, il est précisé qu’en cas de litige, le Tribunal du commerce d’Abidjan
                sera seul compétent.
            </p>
            <p>
                Fait en deux exemplaires et de bonne foi
            </p>
            <p>{{ $contrat_adresse }}, le {{ $contrat_date }}</p>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <b style="text-decoration: underline;">Le preneur</b>
            <b style="text-decoration: underline;">Le bailleur</b>
        </div>
    </div>
</body>

</html>

@layout('mails.template')
@section('content')
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation"
        style="
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
  background-color: #f5f5f5;
" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                        role="presentation"
                        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #ffffff;
          color: #000000;
          width: 500px;
          margin: 0 auto;
        "
                        width="500">
                        <tbody>
                            <tr>
                                <td class="column column-1"
                                    style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                font-weight: 400;
                text-align: left;
                padding-bottom: 20px;
                padding-top: 15px;
                vertical-align: top;
              "
                                    width="100%">

                                    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2"
                                        role="presentation"
                                        style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                "
                                        width="100%">
                                        <tr>
                                            <td class="pad" style="text-align: center; width: 100%">
                                                <h1
                                                    style="
                        margin: 0;
                        color: #393d47;
                        direction: ltr;
                        font-family: Tahoma, Verdana, Segoe,
                          sans-serif;
                        font-size: 25px;
                        font-weight: normal;
                        letter-spacing: normal;
                        line-height: 1.2;
                        text-align: center;
                        margin-top: 0;
                        margin-bottom: 0;
                        mso-line-height-alt: 30px;
                        padding: 20px;
                      ">
                                                    <strong>Bonjour M./Mme/Mlle {{ $user->name }}</strong>
                                                </h1>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-3"
                                        role="presentation"
                                        style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
								padding: 20px
                              "
                                        width="100%">
                                        <tr>
                                            <td class="pad">
                                                <div
                                                    style="
                                      color: #393d47;
                                      font-family: Tahoma, Verdana, Segoe,
                                        sans-serif;
                                      font-size: 14px;
                                      line-height: 1.5;
                                      
                                      mso-line-height-alt: 21px;
                                    ">
                                                    <dive style="margin: 0; word-break: break-word">
                                                        <p style="word-break: break-word"><span
                                                                style="word-break: break-word">
                                                                Nous avons le plaisir de vous transmettre
                                                                {{ $contrat_to }} pour l'appartement de
                                                                <b>{{ $contrat->appartement->nombre_pieces }} pièces</b>
                                                                situé au : <b>{{ $contrat->adresse_name }}</b>.
                                                        </p>
                                                        <p style="word-break: break-word"><b>Détails de la location : </b>
                                                        </p>
                                                        <ul>
                                                            <li><b>Surface</b> :
                                                                {{ $contrat->appartement->superficie_formatted }}</li>
                                                            <li><b>Loyer mensuel</b> : {{ $contrat->loyer }}, Charges
                                                                {{ $contrat->appartement->charges_formatted }}</li>
                                                            <li><b>Caution de garantie</b> : {{ $contrat->garantie }} mois,
                                                                à hauteur de {{ $contrat->garantie_amount }}</li>
                                                            <li><b>Date d'entrée</b> : {{ $contrat->date_debut }}</li>
                                                            <li><b>Durée</b> : 1 an Renouvelable</li>
                                                        </ul>
                                                </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="15" cellspacing="0" class="button_block block-4"
                                        role="presentation"
                                        style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                                        width="100%">
                                        <tr>
                                            <td class="pad">
                                                <div align="center" class="alignment">
                                                    <a href={{ route('contrats.download', $contrat->id) }}
                                                        style="
                                                            color: #393d47;
                                                            text-decoration: none;
                                                        "
                                                        target="_blank"><!--[if mso]>
                                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.yourwebsite.com"  style="height:56px;width:268px;v-text-anchor:middle;" arcsize="34%" fillcolor="#ff6467">
                                                        <v:stroke dashstyle="Solid" weight="1px" color="#FF6467"/>
                                                        <w:anchorlock/>
                                                        <v:textbox inset="0px,0px,0px,0px">
                                                        <center dir="false" style="color:#393d47;font-family:Tahoma, Verdana, sans-serif;font-size:18px">
                                                        <!
                                                                                              [endif]--><span
                                                            class="button"
                                                            style="
                                          background-color: #ff6467;
                                          border-bottom: 1px solid #ff6467;
                                          border-left: 1px solid #ff6467;
                                          border-radius: 20px;
                                          border-right: 1px solid #ff6467;
                                          border-top: 1px solid #ff6467;
                                          color: #393d47;
                                          display: inline-block;
                                          font-family: Tahoma, Verdana, Segoe,
                                            sans-serif;
                                          font-size: 18px;
                                          font-weight: undefined;
                                          mso-border-alt: none;
                                          padding-bottom: 10px;
                                          padding-top: 10px;
                                          padding-left: 50px;
                                          padding-right: 50px;
                                          text-align: center;
                                          width: auto;
                                          word-break: keep-all;
                                          letter-spacing: normal;
                                        "><span
                                                                style="word-break: break-word"><span data-mce-style=""
                                                                    style="
                                              word-break: break-word;
                                              line-height: 36px;
                                            "><strong>Télécharger
                                                                        le
                                                                        contrat</strong></span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5"
                                        role="presentation"
                                        style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                                        width="100%">
                                        <tr>
                                            <td class="pad"
                                                style="
                                    padding-bottom: 5px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                  ">
                                                <div
                                                    style="
                                      color: #393d47;
                                      font-family: Tahoma, Verdana, Segoe,
                                        sans-serif;
                                      font-size: 13px;
                                      line-height: 1.5;
                                      text-align: center;
                                      mso-line-height-alt: 20px;
                                    ">
                                                    <p style="margin: 0; word-break: break-word">
                                                        <span style="word-break: break-word">Nous vous remercions de votre
                                                            confiance</span>
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
@endsection

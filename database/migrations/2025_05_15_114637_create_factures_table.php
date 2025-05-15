<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->string('ref');
            $table->string('type')->default('contrat');
            $table->bigInteger('type_id');
            $table->decimal('montant', 8, 2);
            $table->string('user_type')->default('locataire');
            $table->bigInteger('user_id');
            $table->enum('statut', ['payé', 'impayé']);
            $table->enum('etat', ['brouillon', 'validé']);
            $table->dateTime('date_emission');
            $table->dateTime('date_echeance');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};

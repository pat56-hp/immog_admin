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
            $table->string('type_model_type')->nullable();
            $table->unsignedBigInteger('type_model_id')->nullable();
            $table->decimal('montant', 8, 2);
            $table->string('user_type')->default('locataire');
            $table->bigInteger('user_id');
            $table->enum('statut', ['payée', 'impayée']);
            $table->enum('etat', ['brouillon', 'validée']);
            $table->dateTime('date_emission');
            $table->dateTime('date_echeance');
            $table->softDeletes();
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

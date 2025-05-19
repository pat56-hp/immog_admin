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
        Schema::create('contrats', function (Blueprint $table) {
            $table->id();
            $table->string('ref');
            $table->foreignId('locataire_id')->constrained('locataires')->onDelete('cascade');
            $table->foreignId('appartement_id')->constrained('appartements')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->date('date_debut');
            $table->date('date_fin');
            $table->decimal('loyer', 8, 2);
            $table->enum('statut', ['en cours', 'terminé', 'résilié', 'en attente'])->default('en attente');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contrats');
    }
};

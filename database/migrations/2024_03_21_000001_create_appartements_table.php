<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appartements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proprietaire_id')->constrained('proprietaires')->onDelete('cascade');
            $table->foreignId('type_appartement_id')->constrained('type_appartements')->onDelete('cascade');
            $table->string('libelle');
            $table->text('description')->nullable();
            $table->string('adresse');
            $table->string('ville');
            $table->string('pays')->default('ci');
            $table->integer('superficie')->nullable();
            $table->integer('nombre_pieces');
            $table->decimal('loyer_mensuel', 10, 2);
            $table->boolean('charges_incluses')->default(false);
            $table->enum('statut', ['disponible', 'occupé', 'en maintenance'])->default('disponible');
            $table->json('photos')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appartements');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLitigesTable extends Migration
{
    public function up()
    {
        Schema::create('litiges', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['vendeur_vs_fournisseur', 'client_vs_vendeur']);
            $table->text('description')->nullable();
            $table->enum('statut', ['ouvert', 'en_cours', 'resolu'])->default('ouvert');
            $table->foreignId('createur_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->foreignId('cible_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->dateTime('date_creation');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('litiges');
    }
}

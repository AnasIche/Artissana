<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesTable extends Migration
{
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('vendeur_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->dateTime('date_commande');
            $table->enum('statut', ['en_attente', 'confirmee', 'envoyee', 'livree', 'annulee'])->default('en_attente');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('commandes');
    }
}

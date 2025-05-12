<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommunicationsTable extends Migration
{
    public function up()
    {
        Schema::create('communications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('expediteur_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->foreignId('destinataire_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->string('sujet');
            $table->text('contenu');
            $table->dateTime('date_envoi');
            $table->boolean('est_lu')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('communications');
    }
}
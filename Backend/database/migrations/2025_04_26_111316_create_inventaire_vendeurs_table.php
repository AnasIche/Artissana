<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventaireVendeursTable extends Migration


{
    public function up()
    {
        Schema::create('inventaire_vendeur', function (Blueprint $table) {
            $table->unsignedBigInteger('vendeur_id');
            $table->unsignedBigInteger('produit_id');
            $table->integer('stock');

            $table->primary(['vendeur_id', 'produit_id']);

            $table->foreign('vendeur_id')
                  ->references('id')
                  ->on('utilisateurs')
                  ->onDelete('cascade');

            $table->foreign('produit_id')
                  ->references('id')
                  ->on('produits')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('inventaire_vendeur');
    }
}

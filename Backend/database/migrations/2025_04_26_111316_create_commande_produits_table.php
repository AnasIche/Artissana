<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandeProduitsTable extends Migration
{
    public function up()
    {
        Schema::create('commande_produits', function (Blueprint $table) {
            $table->unsignedBigInteger('commande_id');
            $table->unsignedBigInteger('produit_id');
            $table->integer('quantite');
            $table->decimal('prix_unitaire', 10, 2);

            $table->primary(['commande_id', 'produit_id']);

            $table->foreign('commande_id')
                  ->references('id')
                  ->on('commandes')
                  ->onDelete('cascade');

            $table->foreign('produit_id')
                  ->references('id')
                  ->on('produits')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('commande_produits');
    }
}

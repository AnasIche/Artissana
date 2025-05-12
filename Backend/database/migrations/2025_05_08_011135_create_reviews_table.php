<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewsTable extends Migration
{
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('produit_id');
            $table->unsignedBigInteger('vendeur_id');
            $table->integer('rating');
            $table->text('comment');
            $table->timestamps();

            $table->foreign('produit_id')
                  ->references('id')
                  ->on('produits')
                  ->onDelete('cascade');

            $table->foreign('vendeur_id')
                  ->references('id')
                  ->on('utilisateurs')
                  ->onDelete('cascade');

            // Un vendeur ne peut donner qu'un seul avis par produit
            $table->unique(['produit_id', 'vendeur_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reviews');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduitsTable extends Migration
{
    public function up()
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('categorie');
            $table->string('image_path')->nullable();
            $table->text('description')->nullable();
            $table->decimal('prix', 10, 2);
            $table->integer('quantite_disponible');
            $table->foreignId('fournisseur_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->boolean('est_actif')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('produits');
    }
}

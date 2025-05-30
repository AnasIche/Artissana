<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilisateursTable extends Migration
{
    public function up()
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['administrateur', 'fournisseur', 'vendeur']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('utilisateurs');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventaireVendeur extends Model
{
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}

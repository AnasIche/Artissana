<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model


{

 protected $fillable = ['vendeur_id', 'date_commande', 'statut'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'commande_produits')
                   ->withPivot('quantite', 'prix_unitaire');
    }


     public function vendeur()
    {
        return $this->belongsTo(User::class, 'vendeur_id');
    }

    // public function litige()
    // {
    //     return $this->hasOne(Litige::class);
    // }
}

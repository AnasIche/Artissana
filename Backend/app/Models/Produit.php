<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'prix',
        'quantite_disponible',
        'fournisseur_id',
        'categorie',
        'est_actif',
        'image_path'
    ];

    public function commandes()
    {
        return $this->belongsToMany(Commande::class, 'commande_produits')
                   ->withPivot('quantite', 'prix_unitaire');
    }

    public function inventaires()
    {
        return $this->hasMany(InventaireVendeur::class);
    }

    // 💡 C'est ici qu'on ajoute la relation correcte vers le modèle User
    public function fournisseur()
    {
        return $this->belongsTo(User::class, 'fournisseur_id');
        // ou si ton modèle utilisateur s'appelle User :
        // return $this->belongsTo(User::class, 'fournisseur_id');
    }
}

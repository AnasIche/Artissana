<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use App\Notifications\ProduitConfirme;


class ProduitController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate incoming request
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255',
                'description' => 'nullable|string',
                'prix' => 'required|numeric|min:0',
                'quantite_disponible' => 'required|integer|min:0',
                'categorie' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Handle file upload if an image is provided
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('produits', $filename, 'public');
                $imagePath = '/storage/' . $path;
            }

            // Create new product
            $produit = Produit::create([
                'nom' => $request->nom,
                'description' => $request->description,
                'prix' => $request->prix,
                'quantite_disponible' => $request->quantite_disponible,
                'categorie' => $request->categorie,
                'fournisseur_id' => Auth::id(),
                'est_actif' => true,
                'image_path' => $imagePath
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Produit ajouté avec succès',
                'produit' => $produit
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'ajout du produit',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        return response()->json(Produit::all());
    }

    public function show($id)
    {
        $product =Produit::findOrFail($id);
        return response()->json($product);
    }

    public function updateStock(Request $request, $id)
    {
        // Trouver le produit avec l'ID spécifié
        $product = Produit::find($id);

        // Si le produit n'existe pas, retourner une erreur 404
        if (!$product) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        // Validation des données de la requête (quantité à déduire)
        $request->validate([
            'quantite_disponible' => 'required|integer|min:1', // Utilisation de "quantite_disponible"
        ]);

        // Vérifier si la quantité demandée est disponible
        if ($product->quantite_disponible < $request->quantite_disponible) { // Utilisation de "quantite_disponible"
            return response()->json(['message' => 'Quantité demandée trop élevée'], 400);
        }

        // Mise à jour de la quantité en stock
        $product->quantite_disponible -= $request->quantite_disponible; // Utilisation de "quantite_disponible"

        // Sauvegarder les modifications dans la base de données
        $product->save();

        // Retourner la réponse avec le produit mis à jour
        return response()->json([
            'message' => 'Stock mis à jour avec succès',
            'product' => $product
        ]);
    }




    public function produitsEnAttente()
{
    $produits = Produit::where('statut', 'en_attente')->with('fournisseur')->get();
    return response()->json($produits);
}
//Route pour comfirmr un produit

 public function confirmerProduit($id)
{
    $produit = Produit::findOrFail($id);
    $produit->statut = 'confirme';
    $produit->save();

    // Notifier le fournisseur
    $fournisseur = $produit->fournisseur;

    if ($fournisseur) {
        $fournisseur->notify(new ProduitConfirme($produit));
    }

    return response()->json(['message' => 'Produit confirmé avec succès']);
}





public function produitsConfirmesFournisseur()
{
    $user = auth()->user();
    $produits = Produit::where('fournisseur_id', $user->id)
                ->where('statut', 'confirme')
                ->get();

    return response()->json($produits);
}






 public function destroy($id)
    {
        $produit = Produit::where('id', $id)->where('fournisseur_id', Auth::id())->first();

        if (!$produit) {
            return response()->json([
                'message' => 'Produit non trouvé ou vous n\'êtes pas autorisé à le supprimer.'
            ], 404);
        }

        $produit->delete();

        return response()->json([
            'message' => 'Produit supprimé avec succès.'
        ]);
    }

}

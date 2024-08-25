<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupère tous les articles depuis la base de données
        $articles = Article::all();

        // Retourne les articles en format JSON
        return response()->json($articles);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Non nécessaire pour une API RESTful, car la création se fait en envoyant un POST à la méthode store
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valide les données envoyées par le client
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Crée un nouvel article
        $article = Article::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
        ]);

        // Retourne l'article créé avec un statut 201 (Created)
        return response()->json($article, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Récupère l'article avec l'ID spécifié
        $article = Article::find($id);

        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }

        // Retourne l'article en format JSON
        return response()->json($article);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Non nécessaire pour une API RESTful, car l'édition se fait en envoyant un PUT/PATCH à la méthode update
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Récupère l'article avec l'ID spécifié
        $article = Article::find($id);

        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }

        // Valide les données envoyées par le client
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Met à jour l'article avec les nouvelles données
        $article->update($request->all());

        // Retourne l'article mis à jour en format JSON
        return response()->json($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Récupère l'article avec l'ID spécifié
        $article = Article::find($id);

        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }

        // Supprime l'article
        $article->delete();

        // Retourne une réponse vide avec un statut 204 (No Content)
        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Post;

use App\Http\Requests\UpdatePostRequest;
use Illuminate\Auth\Access\Gate;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate as FacadesGate;

class PostController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum',except:['index','show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields=$request->validate([
            'product_name'=>'required|max:255',
            'description'=>'required',
            'price' => 'required|numeric|min:0',
             'quantity'=> 'required|integer|min:0',
        ]);
       $post= $request->user()->posts()->create($fields);
        
        return ['post'=>$post];
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return $post;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        
        FacadesGate::authorize('modify',$post);

       $fields=$request->validate([
              'product_name'=>'required|max:255',
            'description'=>'required',
            'price' => 'required|numeric|min:0',
             'quantity'=> 'required|integer|min:0',
        ]);
       $post->update($fields);
        
        return $post;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {

        FacadesGate::authorize('modify',$post);
        $post->delete();

        return ['message'=>'The post was deleted'];
    }
}

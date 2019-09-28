<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function add_category(Request $request)
    {
        $this->validate($request, [
            'cat_name' => 'required|min:2|max:50'
        ]);
        $category = new Category();
        $category->cat_name = $request->cat_name;
        $category->save();
        return ['message' => 'Ok'];
    }

    public function all_category()
    {
        $categories = Category::all();
        return response()->json([
            'categories' => $categories
        ], 200);
    }

    public function category_delete($id)
    {
        $category = Category::find($id);
        $category->delete();
    }

    public function edit_category($id)
    {
        $category = Category::find($id);
        return response()->json([
            'category' => $category
        ], 200);
    }

    public function update_category(Request $request, $id)
    {
        $this->validate($request, [
            'cat_name' => 'required|min:2|max:50'
        ]);
        $category = Category::find($id);
        $category->cat_name = $request->cat_name;
        $category->save();
    }

    public function selected_category($id)
    {
        $all_id = explode(',', $id);
        foreach ($all_id as $id) {
            $category = Category::find($id);
            $category->delete();
        }
    }
}

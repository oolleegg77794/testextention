<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Tag;
use App\User;
use App\Models\Phone;
use App\Models\Article;
use App\Models\Role;
use App\Models\Comment;
use App\Models\Video;
use App\Models\Scroll;
use Sentinel;
use Activation;
use App\Models\Sites;



class ContentController extends Controller
{
    public function index()
    {
/*      $user = User::find(1);
        $sites = $user->articles()->get();
        return view('index');*/



    }


}
/*      //один к одному
       $user = User::find(2);
       $phone_user = $user->first();
       dump($phone_user);

       $phone = Phone::find(1);
       $user_phone = $phone->user;
       dump($user_phone);


       //один к многим
       $user = User::find(1);
       $articles = $user->articles()->get();

       foreach ($articles as $aticle) {
           echo $aticle->name;
       }
       // сохраняем новую статью для определенного юзера
       $article = new Article(['text' => 'A new text',
           'name' => 'A new name'
       ]);
       $user->articles()->save($article);



       //многие к многим
      $roles = Role::all();
       $user = User::find(2);
       foreach ($user->roles as $role){
           dump($role->name).'<br>';
       }


       //добавляем новую роль для юзера
       $role = new Role(['name' => 'co-founder']);
       $user->roles()->save($role);


       //полиморфные
       $video = Video::find(1);
       foreach ($video->comments as $comment) {
           dump($comment);
       }

       $article = Article::find(1);


       $video = Video::find(1);


       // добавляем новый тег для выбраной статьи
       $tag = new Tag(['name' => 'A new tag']);
       $article->tags()->save($tag);*/

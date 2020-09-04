<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class RedisController extends Controller
{
    public function redis(Request $request){

        $redis = Redis::connection();

        //строки
        $redis->set("string", 3);
        $redis->incr("string");
        $string = $redis->get("string");

        //списки
        $redis->lpush("languages", "french");
        $redis->rpush("languages", "arabic");
        $list = $redis->lrange("languages", 0, -1);

        //хеш таблицы
        $key = 'Hash';
        $redis->hset($key, 'age', 44);
        $redis->hmset($key, [
            'country' => 'finland',
            'occupation' => 'software engineer',
        ]);
        $hash = $redis->hgetall($key);

        //множества
        $country_name = $request->input('country');
        $redis->sadd('countries', $country_name);
        $sets = $redis->smembers('countries');

        //упорядоченные множества
        $key = "Sorted sets";
        $redis->expire($key, 3600);
        $sorted_sets = $redis->ttl($key);


        return view ('redis')
            -> with (['sets'=>$sets])
            -> with (['string'=>$string])
            -> with (['list'=>$list])
            -> with (['hash'=>$hash])
            -> with (['sorted_sets'=>$sorted_sets]);
    }
}


<div id="messages">
    <form method="POST" action="/redis">
        @csrf
        <input type="text" name= "country" autocomplete="off" autofocus="" placeholder="Type message...">
        <input type="submit" value="Send">
    </form>
    </div>


<?php




//string
    echo "This is STRING"."<p>";
    echo $string;
    echo "<p>";

//list
    echo "This is LIST"."<p>";
    foreach ($list as  $el_list){
        echo $el_list;
        echo "<br>";
    }
    echo "<p>";

//sets
    echo "This is SETS"."<p>";
    foreach ($sets as $el_sets){
        echo $el_sets;
        echo "<br>";
    }
    echo "<p>";

//hash
    echo "This is HASH"."<p>";
    foreach ($hash as $key => $el_hash){
        echo $key." - ";
        echo $el_hash;
        echo "<br>";
    }
    echo "<p>";

//Sorted sets



 ?>



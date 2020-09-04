<?php


namespace App\testpackage;


class Test
{

    public $a=4;

    /**
     * @param int $a
     */
    public function setA(int $a): void
    {
        $this->a = $a;
    }

    /**
     * @return int
     */
    public function getA(): int
    {
        return $this->a;
    }


    public function sayHello()
    {
        echo "Hello, from Facade class.";
    }

}

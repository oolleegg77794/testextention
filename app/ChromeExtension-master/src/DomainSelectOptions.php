<?php


namespace ChromeExtension;

/**
 * Class DomainSelectOptions
 * @package App\Packages\ChromeExtension\src
 */
class DomainSelectOptions
{
    private $columns = [
        'status', 'type', 'url_status', 'link_type', 'link_position', 'tech_status', 'country',
    ];

    private $status = [
        1 => 'url is not in DB',
        2 => 'url is in DB',
        3 => 'url is in DB, but site is under moderation ',
    ];

    private $type = [
        1 => 'CT',
        2 => 'AR',
        3 => 'FR',
        4 => 'LL',
        5 => 'PC',
        6 => 'HM',
        7 => 'FT',
        8 => 'MP',
        9 => 'SB',
    ];

    private $url_status = [
        1 => '200',
        2 => '404',
    ];

    private $link_type = [
        1 => 'DF',
        2 => 'ND',
        3 => 'RD',
        4 => 'IL',
    ];

    private $link_position = [
        1 => 'Up',
        2 => 'Middle',
        3 => 'Down',
    ];

    private $tech_status = [
        1 => 'rejected',
        2 => 'site does not work',
        3 => 'not thematic',
        4 => 'back link',
    ];

    private $country = [
        1 => 'EN',
        2 => 'FR',
        3 => 'ES',
        4 => 'UA',
    ];

    /**
     * @param string $option
     * @return array
     */
    public function getOption(string $option) : array
    {
        return $this->{$option};
    }
}

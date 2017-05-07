<?php

namespace Statamic\Addons\LinkOgData;

use Statamic\Extend\API;

class LinkOgDataAPI extends API
{
    private $linkogdata;

    protected function init()
    {
        $this->linkogdata = new LinkOgData;
    }

    public function getOgData($url)
    {
        return $this->linkogdata->getOgData($url);
    }
}

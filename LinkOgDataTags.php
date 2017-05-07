<?php

namespace Statamic\Addons\LinkOgData;

use Statamic\Extend\Tags;

class LinkOgDataTags extends Tags
{
    protected function init()
    {
        $this->linkogdata = new LinkOgData;
    }

    /**
     * The {{ link_og_data }} tag
     *
     * @return string|array
     */
    public function index()
    {
        // Get the url to lookup
        $url = $this->get('url');

        return $this->parse($this->linkogdata->getOgData($url));
    }
}

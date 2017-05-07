<?php

namespace Statamic\Addons\LinkOgData;

use Statamic\Extend\Listener;

class LinkOgDataListener extends Listener
{
    /**
     * The events to be listened for, and the methods to call.
     *
     * @var array
     */
    public $events = [
        'cp.add_to_head' => 'addToHead'
    ];

    public function addToHead()
    {
        return $this->css->tag('linkogdata.css');
    }
}

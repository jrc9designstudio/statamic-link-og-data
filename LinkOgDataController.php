<?php

namespace Statamic\Addons\LinkOgData;

use Statamic\Extend\Controller;
use Statamic\API\User;
use Statamic\API\Request;

class LinkOgDataController extends Controller
{
    protected function init()
    {
        $this->linkogdata = new LinkOgData;
    }

    /**
     * Maps to your route definition in routes.yaml
     *
     * @return Illuminate\Http\Response
     */
    public function index()
    {
        if (request()->user() === null ||
            request()->user()->cant('cp:access'))
        {
            abort(404);
        }

        if ($url = Request::get('url', false))
        {
            if (count($result = $this->linkogdata->getOgData($url)) > 0)
            {
                return $result;
            }
        }

        abort(404);
    }
}

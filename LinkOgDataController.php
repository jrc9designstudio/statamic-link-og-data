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
        $user = User::getCurrent();

        if ($user && $user->can('cp:access'))
        {
            if ($url = Request::get('url', false))
            {
                $result = $this->linkogdata->getOgData($url);

                if (count($result) > 0)
                {
                    return $result;
                }
            }

            abort(404);
        }

        abort(404);
    }
}

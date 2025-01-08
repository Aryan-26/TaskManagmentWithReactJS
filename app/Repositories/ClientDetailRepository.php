<?php
namespace App\Repositories;

use App\Models\ClientDetail;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Throwable;

class ClientDetailRepository extends BaseRepository{
    public function __construct(ClientDetail $model )
    {
        parent::__construct($model);    
    }
}
<?php

namespace App\Enums;

use App\Traits\OptionsTrait;
use App\Traits\Values;

enum StatusEnum: string
{
    use OptionsTrait, Values;

    case PANDING  = 'pending	';
    case In_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
}

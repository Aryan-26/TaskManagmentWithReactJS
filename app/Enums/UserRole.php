<?php

namespace App\Enums;

use App\Traits\OptionsTrait;
use App\Traits\Values;

enum UserRole: string
{
     use OptionsTrait, Values;

     case Admin = 'admin';
     case Employee = 'employee';
     case Client = 'client';
}

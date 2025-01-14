<?php

namespace App\Traits;

use Str;

trait OptionsTrait
{
    public static function options(): array
    {
        $cases = static::cases();
        $options = [];
        foreach ($cases as $case) {
            $label = $case->name;
            if (Str::contains($label, '_')) {
                $label = Str::replace('_', ' ', $label);
            }
            $options[] = [
                'value' => $case->value,
                'label' => Str::title($label),
            ];
        }

        return $options;
    }

    public static function getCollection()
    {
        $cases = static::cases();
        $options = collect();
        foreach ($cases as $case) {
            $label = $case->name;
            if (Str::contains($label, '_')) {
                $label = Str::replace('_', ' ', $label);
            }
            $options->put($case->value, Str::title($label));
        }

        return $options;
    }
}

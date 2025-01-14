<?php

namespace App\Traits;

trait FilterableTrait
{
    public array $filterFields;

    public array $attachFilterFields;

    public function setFilterFields(array $filters)
    {
        $this->filterFields = $filters;
    }

    public function getFilterFields()
    {
        return $this->filterFields;
    }

    public function attachFilters(array $filters)
    {
        $this->attachFilterFields = $filters;
    }

    public function getAttachFilters()
    {
        return $this->attachFilterFields;
    }
}

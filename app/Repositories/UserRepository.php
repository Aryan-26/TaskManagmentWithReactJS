<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all users with the role of 'client'.
     */
    public function getAllClients()
    {
        // Ensure the query result is returned
        return $this->newQuery()
            ->where('role', 'client')
            ->get();
    }

    /**
     * Get all users with the role of 'employee', plucking name and id.
     */
    public function getAllEmployee()
    {
        // Ensure the query result is returned
        return $this->newQuery()
        ->where('role', 'employee')
        ->get(['id', 'name', 'email', 'role']);
    }

    public function count(): int
    {
        return $this->newQuery()->count();
    }

    public function countByRole(string $role): int
    {
        return $this->newQuery()
            ->where('role', $role)
            ->count();
    }

    public function getRecentUsersByRole(string $role, int $limit)
    {
        return $this->newQuery()
            ->where('role', $role)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->paginate(5);
    }
}

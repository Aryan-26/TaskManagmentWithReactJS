<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }


    // public function getAllClients()
    // {
    //     return $this->newQuery()
    //         ->where('role', 'client')
    //         ->get();
    // }

   
    // public function getAllEmployee()
    // {
    //     return $this->newQuery()
    //     ->where('role', 'employee')
    //     ->get(['id', 'name', 'email', 'role']);
    // }

    public function getAllByRole(string $role, array $columns = ['*'])
{
    return $this->newQuery()
        ->where('role', $role)
        ->get($columns);
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
    
    public function getCreatedByUsers()
    {
        return $this->newQuery()->where('role', 'creator')->get(); 
    }
    public function getUpdatedByUsers()
    {
        return $this->newQuery()->where('role', 'updater')->get(); 
    }

    public function getAssignedUsers()
    {
        return $this->newQuery()->where('role', 'assigned')->get(); 
    }

    public function getAuthenticatedUser()
    {
        return Auth::user();
    }
 
    
}

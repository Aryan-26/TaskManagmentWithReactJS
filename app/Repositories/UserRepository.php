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

    public function getAllByRole(string $role, array $columns = ['*'],array $relations = [])
{
    return $this->newQuery()
        ->where('role', $role)
        ->with(['clientDetail'])
        ->get($columns);
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
        return $this->newQuery()->with(['createdProjects'])->get();
    }
    public function getUpdatedByUsers()
    {
        return $this->newQuery()->with(['updatedProjects'])->get();
    }
   
    public function getAssignedUsersByProject($projectId)
    {
        return $this->newQuery()
            ->whereHas('projects', function ($query) use ($projectId) {
                $query->where('project_id', $projectId);
            })
            ->get(['id', 'name', 'email']);
    }
   
    public function getAssignedUsersByTask($taskId)
{
    return $this->newQuery()
        ->whereHas('assignedTasks', function ($query) use ($taskId) {
            $query->where('id', $taskId);
        })
        ->get(['id', 'name', 'email']);
}


    public function getAuthenticatedUser()
    {
        return Auth::user();
    }
 
    
}

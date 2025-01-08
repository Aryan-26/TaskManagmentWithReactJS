<?php

namespace App\Repositories;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Collection;

class ProjectRepository extends BaseRepository
{
  public function __construct(Project $model)
  {
      parent::__construct($model);
      $this->model = $model;
  }

  function getProjectsByEmployee($id)
    {
        return $this->newQuery()
            ->where('assigned_to', $id)
            ->get();
    }

    public function count(): int
    {
        return $this->newQuery()->count();
    }

    public function getRecentProjects(int $limit)
    {
        return $this->newQuery()
            ->with(['client', 'tasks'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->paginate(5);
    }

    public function getAllProjectsWithRelations()
    {
        return Project::with(['createdBy', 'updatedBy', 'assignedUser'])->get();
    }

    public function getCreatedByUsers()
    {
        return User::where('role', 'creator')->get(); // Example logic
    }

    public function getUpdatedByUsers()
    {
        return User::where('role', 'updater')->get(); // Example logic
    }

    public function getAssignedUsers()
    {
        return User::where('role', 'assigned')->get(); // Example logic
    }
   

}
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

    public function getProjectsByClient($clientId)
{
    return $this->newQuery()->
      where('client_id',$clientId)->limit(3)
      ->get();
}
   
    


    public function getAllProjectsWithRelations()
    {
        return $this->newQuery()
                    ->with(['createdBy', 'updatedBy', 'assignedUser','client'])->get();
    }

    
    public function getAssignedUsers($projectId)
    {
        return $this->model->find($projectId)->assignedUsers;
    }

   
   

}
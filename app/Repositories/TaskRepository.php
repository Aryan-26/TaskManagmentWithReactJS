<?php

namespace App\Repositories;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Collection;

class TaskRepository extends BaseRepository{
    
  function __construct(Task $model){
    parent::__construct($model);
  } 


  public function getTasksByClient($clientId)
{
    return $this->newQuery()
        ->whereHas('project', function ($query) use ($clientId) {
            $query->where('client_id', $clientId);
        })
        ->get();
}

  
  
     function getTasksByEmployee($id)
{
        return $this->newQuery()
            ->where('assigned_to', $id)
            ->get();
    }
    public function count(): int
    {
        return $this->newQuery()->count();
    }
    public function getRecentTasks(int $limit)
    {
        return $this->newQuery()
            ->with(['project', 'assignedUser'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->paginate(5);
    }

    public function getTasksWithRelations()
    {
        return $this->newQuery()->with(['createdBy','project','updatedBy', 'assignedUser'])->get();
    }


}
<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Inertia\Inertia;
use Throwable;

class TaskController extends BaseController
{
    protected TaskRepository $taskrepository;
    protected UserRepository $userRepository;
    protected ProjectRepository $projectRepository;

    public function __construct(TaskRepository $taskrepository, UserRepository $userRepository, ProjectRepository $projectRepository)
    {
        $this->taskrepository = $taskrepository;
        $this->userRepository = $userRepository;
        $this->projectRepository = $projectRepository;
    }



    public function index(Task $task)
    {
        $user =  $this->userRepository->getAuthenticatedUser();
        $tasks = $this->taskrepository->getAll(['createdBy','project','updatedBy', 'assignedUser']); 
        $projects = $this->projectRepository->getAllProjectsWithRelations();
        $createdBy = $this->userRepository->getCreatedByUsers();
        $updatedBy = $this->userRepository->getUpdatedByUsers();
        $assignedUser = $this->userRepository->getAssignedUsersByTask($task);
        
        return Inertia::render('Tasks/Index', compact('user','tasks', 'projects', 'createdBy', 'updatedBy', 'assignedUser'));
    }
   
   

    public function show(Task $task)
    {
        $project = $this->taskrepository->getTasksWithRelations();
        $createdBy = $this->userRepository->getCreatedByUsers();
        $updatedBy = $this->userRepository->getUpdatedByUsers();
        $assignedUser = $this->userRepository->getAssignedUsersByTask($task);

        $task = $this->taskrepository->getById($task->id, ['createdBy', 'project', 'updatedBy', 'assignedUser']);
        return Inertia::render('Tasks/Show', compact('task', 'project', 'createdBy', 'updatedBy', 'assignedUser'));
    }
    public function create()
    {
        $status = StatusEnum::options();
        $employees = $this->userRepository->getAllByRole('employee');
        $projects = $this->projectRepository->getAll(['users']);
        // dd($projects);
        return Inertia::render('Tasks/Create', compact('status', 'employees', 'projects'));
    }

    public function store(StoreTaskRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->taskrepository->store($request->getInsertableFields());
            DB::commit();
            return $this->sendRedirectResponse(route('tasks.index'), 'Task Added Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }
    
    public function edit(Task $task)
    {
        $status = StatusEnum::options();
        $task = $this->taskrepository->getById($task->id);
        $employees = $this->userRepository->getAllByRole('employee');
        $projects = $this->projectRepository->getAll(['users']);
        return Inertia::render('Tasks/Edit', compact('status','task', 'projects', 'employees'));
    }
        
        public function update(Task $task, UpdateTaskRequest $request)
        {
            DB::beginTransaction();
            try {
                Log::info('UpdateTaskRequest received:', $request->all());
                
                $this->taskrepository->update($task->id, $request->getUpdateableFields());
                Log::info('Task updated successfully.');
                
                DB::commit();
                
                        return redirect()->route('tasks.index')->with('success', 'Task Updated Succesfully');
        // return $this->sendRedirectBackResponse(route('tasks.index'), 'Task updated successfully.');
    } catch (\Throwable $e) {
        DB::rollBack();
        Log::error('Task update failed:', ['error' => $e->getMessage()]);
        
        return redirect(route('tasks.edit', ['task' => $task->id]))
            ->with('error', $e->getMessage());
    }
}

    public function destroy(Task $task)
    {
        // dd("vdyvuidui");
        DB::beginTransaction();
        try {
            $this->taskrepository->destroy($task->id);
            DB::commit();
            return redirect(route('tasks.index'))->with('success', 'Task Deleted Succesfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect(route('tasks.update'))->with('error', $e->getMessage());
        }
    }
}

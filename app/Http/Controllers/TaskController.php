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
use Illuminate\Http\RedirectResponse;
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



    public function index()
    {
        $tasks = $this->taskrepository->getAllProjectsWithRelations(); // Convert to array
        $projects = $this->projectRepository->getAllProjectsWithRelations();
        $createdBy = $this->projectRepository->getCreatedByUsers();
        $updatedBy = $this->projectRepository->getUpdatedByUsers();
        $assignedUser = $this->projectRepository->getAssignedUsers();
        return Inertia::render('Tasks/Index', compact('tasks', 'projects', 'createdBy', 'updatedBy', 'assignedUser'));
    }

    public function show(Task $task)
    {
        $project = $this->taskrepository->getAllProjectsWithRelations();
        $createdBy = $this->projectRepository->getCreatedByUsers();
        $updatedBy = $this->projectRepository->getUpdatedByUsers();
        $assignedUser = $this->projectRepository->getAssignedUsers();

        $task = $this->taskrepository->getById($task->id, ['createdBy', 'project', 'updatedBy', 'assignedUser']);
        return Inertia::render('Tasks/Show', compact('task', 'project', 'createdBy', 'updatedBy', 'assignedUser'));
    }
    public function create()
    {
        $status = StatusEnum::options();
        $employees = User::where('role', 'employee')->get();
        $projects = Project::all();
        return Inertia::render('Tasks/Create', compact('status', 'employees', 'projects'));
    }

    public function store(StoreTaskRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->taskrepository->store($request->getInsertableFields());
            DB::commit();
            return redirect(route('tasks.index'))->with('success', 'Task Added Succesfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('tasks.create')->with('error', $e->getMessage());
        }
    }
    public function edit(Task $task)
    {
        $task = $this->taskrepository->getById($task->id);
        $employees = $this->userRepository->getAllEmployee();
        $projects = $this->projectRepository->getAll();
        return Inertia::render('Tasks/Edit', compact('task', 'projects', 'employees'));
    }

    public function update(Task $task, UpdateTaskRequest $request)
    {
        DB::beginTransaction();
        try {
            // dd("dhgui");
            $this->taskrepository->update($task->id, $request->getUpdateableFields());
            DB::commit();
            return redirect()->route('tasks.index')->with('success', 'Task Updated Succesfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect('tasks.update')->with('error', $e->getMessage());
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

<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProjectRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Repositories\ProjectRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Models\Project;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class ProjectController extends BaseController
{
    protected $projectRepository;
    protected $userRepository;
    function __construct(ProjectRepository $projectRepository, UserRepository $userRepository)
    {
        $this->projectRepository = $projectRepository;
        $this->userRepository = $userRepository;
    }
    
  
    public function index(Project $project)
    {
        $user = $this->userRepository->getAll();
        $projects = $this->projectRepository->getAllProjectsWithRelations();
        $createdBy = $this->userRepository->getCreatedByUsers();
        $updatedBy = $this->userRepository->getUpdatedByUsers();
        // $assignedUser = $this->userRepository->getAssignedUsers();
        
        $assignedUser = $project->load(['assignedUser']);
        // dd($assignedUser);
        
        return Inertia::render('Projects/Index', compact('user', 'projects', 'createdBy', 'updatedBy', 'assignedUser'));
    }



    public function create()
    {
        $projects = $this->projectRepository->getAllProjectsWithRelations(['users']);
        $clients = $this->userRepository->getAllByRole('client');
        $employees = $this->userRepository->getAllByRole('employee');
        return Inertia::render('Projects/Create', compact('clients', 'employees', 'projects'));
    }


 

    public function store(StoreProjectRequest $request)
{
    DB::beginTransaction();
    try {

        $validatedData = $request->getInsertableFields();
        
        
        $project = $this->projectRepository->store($validatedData);

        
        if ($request->has('employee_ids') && !empty($request->employee_ids)) {
            $project->users()->attach($request->employee_ids);
        }

        DB::commit();

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    } catch (Throwable $e) {
        DB::rollBack();

       
        Log::error('Error storing project: ' . $e->getMessage());

        return redirect()->route('projects.create')->with('error', 'Failed to create the project.');
    }
}


    public function show(Project $project)
    {


        $project->load('users', 'client', 'tasks', 'createdBy', 'updatedBy', 'assignedUser');

        return Inertia::render('Projects/Show', compact('project'));
    }


    public function edit(Project $project)
    {
        $project = $this->projectRepository->getById($project->id, ['users']);
        $clients = $this->userRepository->getAllByRole('client', ['id', 'name', 'email', 'role']);
        $employees = $this->userRepository->getAllByRole('employee', ['id', 'name', 'email', 'role']);
        return Inertia::render('Projects/Edit', compact('project', 'clients', 'employees'));
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        DB::beginTransaction();
        try {
            $this->projectRepository->update($project->id, $request->getInsertableFields());
    
            if ($request->has('employee_ids') && !empty($request->employee_ids)) {
                $project->users()->sync($request->input('employee_ids', []));
            }
    
            DB::commit();
            return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
            // $this->sendRedirectResponse(route('projects.index'),'Project updated successfully.');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('projects.index')->with('error', $e->getMessage());
        }
    }
    

    public function destroy(Project $project)
    {

        DB::beginTransaction();
        try {
            $this->projectRepository->destroy($project->id);
            DB::commit();
            return redirect(route('projects.index'))->with('success', 'Task Deleted Succesfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect(route('projects.update'))->with('error', $e->getMessage());
        }
    }

    public function getAssignedEmployees(Project $project)
    {
        $employees = $project->users()->select('id', 'name')->get();
        return $employees->map(function ($employee) {
            return [
                'value' => $employee->id,
                'label' => $employee->name,
            ];
        });
    }
}

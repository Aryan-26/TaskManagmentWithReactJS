<?php
// namespace App\Http\Controllers\Admin;
namespace App\Http\Controllers;


use App\Http\Requests\UpdateProjectRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Models\Project;

use App\Repositories\ProjectRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Throwable;

class ProjectController extends BaseController
{
    protected $projectRepository;
    protected $userRepository;
    function __construct(ProjectRepository $projectRepository,UserRepository $userRepository){
        $this->projectRepository=$projectRepository;
        $this->userRepository=$userRepository;
    }
   
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = $this->projectRepository->getAllProjectsWithRelations();
        
        // Fetch related users separately if needed
        $createdBy = $this->projectRepository->getCreatedByUsers();
        $updatedBy = $this->projectRepository->getUpdatedByUsers();
        $assignedUser = $this->projectRepository->getAssignedUsers();
        
        // dd($projects);
        return Inertia::render('Projects/Index',compact('projects','createdBy','updatedBy','assignedUser'));
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = $this->projectRepository->getAllProjectsWithRelations();
        $clients=$this->userRepository->getAllClients();
        $employees=$this->userRepository->getAllEmployee();
        return Inertia::render('Projects/Create' ,compact('clients', 'employees','projects')) ;
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(StoreProjectRequest $request)
    // {
    //     $validatedData = $request->getInsertableFields();
    //     // dd("jkdcg"); 
    //     // dd($request->employee_ids);
          
    //     $projects =  $this->projectRepository->store($validatedData);
    
    //     // Correctly access employee_ids from the request
    //     if ($request->has('employee_ids') && !empty($request->employee_ids)) {
    //         $projects->users()->attach($request->employee_ids);
    //     }
        
        
    //     return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    // }
    // App\Http\Controllers\ProjectController.php

public function store(StoreProjectRequest $request)
{
    $validatedData = $request->getInsertableFields();
      
    $project =  $this->projectRepository->store($validatedData);
    // Correctly access employee_ids from the request
    if ($request->has('employee_ids') && !empty($request->employee_ids)) {
        $project->users()->attach($request->employee_ids);
    }
    
    
    return redirect()->route('projects.index')->with('success', 'Project created successfully.');
}



    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {

        // $project = $this->projectRepository->getById($id);
        $project->load('users','client','tasks','createdBy', 'updatedBy', 'assignedUser');
        // dd($project->load('project','createdBy', 'updatedBy', 'assignedUser'));
        return Inertia::render('Projects/Show', compact('project'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        
        // $project = $this->projectRepository->getById($id);
        $clients = $this->userRepository->getAllClients();
        $assignedUser = $this->projectRepository->getAssignedUsers();
        $employees = $this->userRepository->getAllEmployee();

        return Inertia::render('Projects/Edit', compact('project','clients','assignedUser','employees'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request,Project $project): RedirectResponse
    {
        // $validated = $request->validated();
// dd('uiigeg');
        // $project = $this->projectRepository->getById($id);
        $this->projectRepository->update($project->id, $request->getInsertableFields());
// dd($request->employee_ids);
        if ($request->has('employee_ids') && !empty($request->employee_ids)) {
            $project->employees()->sync($request->input('employee_ids', [])); 
            // $project->users()->sync($request->employee_ids);
        }
        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }


    // public function destroy(Project $project): RedirectResponse
    // {
    //     $this->projectRepository->destroy($project->id); // Use destroy instead of destroyByIds

    //     return redirect(route('projects.index'))->with('message','Deleted Project'); // Redirect to projects.index
    // }
    public function destroy(Project $project)
    {
        // dd("vdyvuidui");
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
}

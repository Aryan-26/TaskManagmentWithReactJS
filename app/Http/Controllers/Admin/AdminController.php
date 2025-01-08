<?php 
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends BaseController
{
    protected $projectRepository;
    protected $taskRepository;
    protected $userRepository;
    public function __construct(
        ProjectRepository $projectRepository,
        TaskRepository $taskRepository,
        UserRepository $userRepository
    ) {
        $this->projectRepository = $projectRepository;
        $this->taskRepository = $taskRepository;
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        $projectCount = $this->projectRepository->count();
        $taskCount = $this->taskRepository->count();
        $clientCount = $this->userRepository->countByRole('client');
        $employeeCount = $this->userRepository->countByRole('employee');

        $recentProjects = $this->projectRepository->getRecentProjects(5);
        $recentTasks = $this->taskRepository->getRecentTasks(5);
        $recentClients = $this->userRepository->getRecentUsersByRole('client', 5);
        $recentEmployees = $this->userRepository->getRecentUsersByRole('employee', 5);
// dd($recentProjects);
        return Inertia::render('Admin/Dashboard', compact(
            'projectCount',
            'taskCount',
            'clientCount',
            'employeeCount',
            'recentProjects',
            'recentTasks',
            'recentClients',
            'recentEmployees'
        ));
    }

    public function create()
    {
       
    }

    public function store(Request $request)
    {
       
    }

    public function show(string $id)
    {
        
    }

    public function edit(string $id)
    {
        
    }

    public function update(Request $request, string $id)
    {
        
    }

    public function destroy(string $id)
    {
        
    }
}

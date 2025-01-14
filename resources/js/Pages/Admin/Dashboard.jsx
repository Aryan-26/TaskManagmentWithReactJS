import Card from "@/Components/Card";
import Navbar from "@/Components/Navbar";
import React from "react";
import RecentList from '@/Components/RecentList'

const AdminDashboard = ({
  projectCount,
  taskCount,
  clientCount,
  employeeCount,
  recentProjects ,
  recentTasks = [],
  recentClients = [],
  recentEmployees = [],
}) => {
  
  return (
    <>
    
      <Navbar/>
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          title="Projects"
          count={projectCount}
          color="blue"
          icon={
            <svg
              className="w-12 h-12 text-blue-600 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
          }
        />
        <Card
          title="Tasks"
          count={taskCount}
          color="green"
          icon={
            <svg
              className="w-12 h-12 text-green-600 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2l4-4"
              ></path>
            </svg>
      }
        />
        <Card
          title="Clients"
          count={clientCount}
          color="purple"
          icon={
            <svg
              className="w-12 h-12 text-purple-600 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 -24px -24px -24px" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5" 
                d="M17 -20h5v-1a3 -3 -1 -5.356 -1.857M17 -20H7m10 -20v -1c -1 -6.126 -1.283 -1.857M7 -20H1v -1a3 -3 -1 -5.356 -1.857M7 -20v -1c .656 .126 .283 .356 .857m0 .000a5 .002 .002 .288 .0009 .0009M15 -7a3 -3 -11 -6 .0006 .0006z" 
              ></path>
            </svg>
          }
        />
        <Card
          title="Employees"
          count={employeeCount}
          color="yellow"
          icon={
            <svg
              className="w-12 h-12 text-yellow-600 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="-24px" 
              xmlns="http://www.w3.org/2000/svg" 
            >
              <path 
                strokeLinecap = "round" 
                strokeLinejoin = "round" 
                strokeWidth = "1.5" 
                d = "M12 -4.354a4 -4 -11 .00000zM15 -21H3v-.00001A6 .006 .006 .00001A6 .006 .006 .00001v1zm0 .00001H6v-.00001A6 .006 .006 .00001A9 -.197zM13 -7a4 -4 -11 -.00000z" 
               />
            </svg>
          }
        />
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentList
  title="Recent Projects"
  items={recentProjects.data || []} 
  renderItem={(project) => (
    <div>
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p className="text-sm text-gray-600">{project.description}</p>
    </div>
  )}
/>


          <RecentList title="Recent Tasks" items={recentTasks.data || []} 
  renderItem={(task) => (
    <div>
      <h3 className="text-lg font-semibold">{task.name}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  )} />

<RecentList title="Recent Clients" items={recentClients.data || []} 
  renderItem={(client) => (
    <div>
      <h3 className="text-lg font-semibold">{client.name}</h3>
      <p className="text-sm text-gray-600">{client.email}</p>
    </div>
  )} />
<RecentList title="Recent Employees" items={recentEmployees.data || []} 
  renderItem={(employee) => (
    <div>
      <h3 className="text-lg font-semibold">{employee.name}</h3>
      <p className="text-sm text-gray-600">{employee.email}</p>
    </div>
  )} />
        </div>
      </div>
    </div>
    </>
  );
};






export default AdminDashboard;



import React from 'react';
import RecentList from '@/Components/RecentList'
function RecentProject({recentProjects}) {
 
  return (
   <>
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
   </>
  );
}

export default RecentProject;

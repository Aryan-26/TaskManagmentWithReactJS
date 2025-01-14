import React from 'react';

function RecentTasks() {
 

  return (
   <>
        <RecentList title="Recent Tasks" items={recentTasks.data || []} 
  renderItem={(task) => (
    <div>
      <h3 className="text-lg font-semibold">{task.name}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  )} />
   </>
  );
}

export default RecentTasks;

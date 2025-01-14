import React from 'react';

function RecentEmployees() {
 

  return (
   <>
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

export default RecentEmployees;

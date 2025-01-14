import React from 'react';

function RecentClients() {
 

  return (
   <>
      <RecentList title="Recent Clients" items={recentClients.data || []} 
  renderItem={(client) => (
    <div>
      <h3 className="text-lg font-semibold">{client.name}</h3>
      <p className="text-sm text-gray-600">{client.email}</p>
    </div>
  )} />
   </>
  );
}

export default RecentClients;

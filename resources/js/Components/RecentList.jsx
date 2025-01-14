const RecentList = ({ title, items, renderItem }) => {
     // Ensure items is always an array
     const safeItems = Array.isArray(items) ? items : [];
     console.log(safeItems);
   
     return (
         <div className="bg-white rounded-lg shadow-md overflow-hidden w-full p-6">
             <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
             <div className="space-y-4">
                 {safeItems.length > 0 ? (
                     safeItems.map((item, index) => (
                         <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-md">
                             {renderItem(item)}
                         </div>
                     ))
                 ) : (
                     <p className="text-gray-500">No items available.</p>
                 )}
             </div>
         </div>
     );
   };

   export default RecentList;
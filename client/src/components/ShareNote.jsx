import React from 'react'

const ShareNote = ({noteId}) => {

  const [setQuery, users, loading]  = useSearchUsers();


  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-slate-700/50">
    <div className='flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-300 p-4'>

      <h2>Share With</h2>
      {/* search input */}
      <div>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        {/* search users list */}
      {loading && <p>Loading...</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      </div>
      
    </div>

      


      //selected users
      //div: total users | share button
    </div>
    </div>
  )
}

export default ShareNote
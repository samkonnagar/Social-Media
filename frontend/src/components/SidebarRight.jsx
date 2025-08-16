import React from "react";
import { users } from "../data/users";
import { Link } from "react-router-dom";

export default function SidebarRight() {
  return (
    <aside className="w-80 pl-6 hidden xl:block  sticky top-20">
      <div className="bg-white rounded-md shadow p-4">
        <h3 className="font-semibold mb-3">Suggested</h3>
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={u.avatar} className="h-10 w-10 rounded-full" alt="" />
                <div>
                  <Link to={`/profile/${u.id}`} className="font-medium">
                    {u.name}
                  </Link>
                  <div className="text-sm text-gray-500">@{u.handle}</div>
                </div>
              </div>
              <button className="px-3 py-1 bg-purple-600 text-white rounded">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

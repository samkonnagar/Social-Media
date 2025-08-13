import React from "react";
import { users } from "../data/users";
import { Link } from "react-router-dom";

export default function SidebarLeft() {
  const me = users[0];
  return (
    <aside className="w-72 pr-6 hidden xl:block">
      <div className="bg-white rounded-md shadow p-4 sticky top-20">
        <div className="flex items-center gap-3">
          <img src={me.avatar} alt="avatar" className="h-12 w-12 rounded-full" />
          <div>
            <Link to={`/profile/${me.id}`} className="font-semibold block">{me.name}</Link>
            <span className="text-sm text-gray-500">@{me.handle}</span>
          </div>
        </div>

        <div className="mt-4 border-t pt-3 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Friends</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Groups</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Marketplace</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Saved</button>
        </div>
      </div>
    </aside>
  );
}

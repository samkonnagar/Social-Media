import React from "react";
import { Link } from "react-router-dom";
import { dataObj } from "../context/authContext/AuthContext";

export default function SidebarLeft() {
  const { user } = dataObj();
  return (
    <aside className="w-72 pr-6 hidden xl:block sticky top-20">
      <div className="bg-white rounded-md shadow p-4">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar??"/dummy.png"}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <Link to={`/profile/${user._id}`} className="font-semibold block">
              {user.name}
            </Link>
          </div>
        </div>

        <div className="mt-4 border-t pt-3 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">
            Friends
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">
            Groups
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">
            Marketplace
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">
            Saved
          </button>
        </div>
      </div>
    </aside>
  );
}

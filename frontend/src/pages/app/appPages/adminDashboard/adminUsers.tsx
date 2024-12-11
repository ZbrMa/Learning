import { AdminUsersTable } from "../../../../ui/blocks/adminPage/adminUsers/adminUsers";
import { AdminDashboard } from "./adminDashboard";

export function AdminUsers() {
  return (
    <AdminDashboard>
      <div className="flex g-32 mb-32">
          <h2 className="h-lg xbold">Uživatelé</h2>
          
        </div>
      <AdminUsersTable />
    </AdminDashboard>
  );
}

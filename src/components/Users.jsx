import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import deleteService from "../services/DeleteService";

function Users() {
  const [users, setUsers] = useState([]);


  const handleDelete=async (userId)=>{
      console.log(userId)

     const request = 
     {
        "userId": userId
     };
     await deleteService("Admin/Users",request);
     fetchUsers();
  }
  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getData("Admin/Users");
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Kullanıcıları getirme hatası:", error);
    }
  };

  useEffect(() => {
       fetchUsers();
  }, []);
  return (
    <div style={{padding:"20px"}}>
      <h2>Kullanıcı Listesi</h2>
      <table className="table  table-striped">
        <thead>
          <tr>
            
            <th>ID</th>
            <th>Ad</th>
            <th>Email</th>
            <th>Fotograf</th>
            <th>Tarif Sayisi</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td><img src={user.imageUrl} alt="" style={{maxWidth:"5rem", maxHeight:"4rem", borderRadius:"60px"}}/></td>
              <td>{user.recipeCount}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-warning" 
                // onClick={handleEdit}
                >
                    <span class="bi bi-pencil-square"></span></button>
                <button className="btn btn-danger" 
                onClick={()=>handleDelete(user.userId)}
                >
                    <span class="bi bi-trash"></span></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

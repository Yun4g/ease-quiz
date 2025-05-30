import { create } from "zustand";


interface UserRole {
  UserRole : string;
  handleRole: ( role : string ) => void;
}





 const useUserRoleStore = create<UserRole>((set) => ({
  UserRole : "", 
  handleRole : (role)=> {
     set({UserRole: role})
  
  },



}))

export default useUserRoleStore
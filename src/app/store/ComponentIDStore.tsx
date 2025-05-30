
import { create } from "zustand";




     interface ComponentType {
           ComponentPage : string
         DisplayForm : ()=> void
         DisplayManageQuestion : ()=> void
     }


 const useComponentStore =  create<ComponentType>((set)=> ({
     ComponentPage : "Form",
      DisplayForm : ()=> {
          set({ComponentPage : "Form"})
      },
      DisplayManageQuestion : ()=> {
          set({ComponentPage : "ManageMent"})
      }
 }))

 export default useComponentStore
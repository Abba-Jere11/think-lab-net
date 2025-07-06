import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
console.log("API_BASE_URL:", API_BASE_URL);
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface ParentData {
  id?: string
  firstname: string
  lastname: string
  email: string
  phone?: string
  dob: string
  gender: string
  address?: string
  department: string
  nin?: string
  religion?: string
  password: string
  imageUrl?: string
  startingDate?: string
  description?: string
  stateOfOrigin?: string
  lga?: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

// Parent API functions
export const parentApi = {
  // Get all parents
  getAllParents: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get("/parents")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch parents")
    }
  },

  // Get parents by department
  getParentsByDepartment: async (department: string): Promise<ApiResponse<ParentData[]>> => {
    try {
      const response = await api.get(`/parents/department/${department}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch parents by department")
    }
  },

  // Get single parent
  getParent: async (id: string): Promise<ApiResponse<ParentData>> => {
    try {
      const response = await api.get(`/parents/${id}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch parent")
    }
  },

  // Create parent
  createParent: async (parentData: ParentData): Promise<ApiResponse<ParentData>> => {
    try {
      const response = await api.post("/parents", parentData)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create parent")
    }
  },

  // Update parent
  updateParent: async (id: string, parentData: Partial<ParentData>): Promise<ApiResponse<ParentData>> => {
   try {
      const response = await fetch(`/api/parents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parentData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update parent")
      }

      return { success: true, data }
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update parent",
      }
    }
  },

  // Delete parent
  deleteParent: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`/api/parents/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete parent")
      }

      return { success: true, data }
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete parent",
      }
    }
  },

  // Get parent stats
  getParentStats: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get("/parents/stats")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch parent stats")
    }
  },
}

// Keep staff API for backward compatibility if needed
export interface StaffData {
  id?: string
  firstname: string
  lastname: string
  email: string
  phone?: string
  dob: string
  gender: string
  address?: string
  department: string
  nin?: string
  religion?: string
  password: string
  imageUrl?: string
  startingDate?: string
  description?: string
  stateOfOrigin?: string
  
}


// export const staffApi = {
//   // Get all staff
//   getAllStaff: async (): Promise<ApiResponse<any>> => {
//     try {
//       const response = await api.get("/staffs")
//       return response.data
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to fetch staff")
//     }
//   },

//   // Get staff by department
//   getStaffByDepartment: async (department: string): Promise<ApiResponse<StaffData[]>> => {
//     try {
//       const response = await api.get(`/staffs/department/${department}`)
//       return response.data
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to fetch staff by department")
//     }
//   },

//   // Get single staff
//   getStaff: async (id: string): Promise<ApiResponse<StaffData>> => {
//     try {
//       const response = await api.get(`/staffs/${id}`)
//       return response.data
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to fetch staff")
//     }
//   },

//   // Create staff
//   createStaff: async (staffData: StaffData): Promise<ApiResponse<StaffData>> => {
//     try {
//       const response = await api.post("/staffs", staffData)
//       return response.data
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to create staff")
//     }
//   },

//   // Update staff
//   updateStaff: async (id: string, staffData: Partial<StaffData>): Promise<ApiResponse<StaffData>> => {
//    try {
//       const response = await fetch(`/api/staff/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(staffData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to update staff")
//       }

//       return { success: true, data }
//     } catch (error) {
//       console.error("API Error:", error)
//       return {
//         success: false,
//         message: error instanceof Error ? error.message : "Failed to update staff",
//       }
//     }
//   },

//   // Delete staff
//   deleteStaff: async (id: string): Promise<ApiResponse<any>> => {
//     try {
//       const response = await fetch(`/api/staff/${id}`, {
//         method: "DELETE",
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to delete staff")
//       }

//       return { success: true, data }
//     } catch (error) {
//       console.error("API Error:", error)
//       return {
//         success: false,
//         message: error instanceof Error ? error.message : "Failed to delete staff",
//       }
//     }
//   },

//   // Get department stats
//   getDepartmentStats: async (): Promise<ApiResponse<any>> => {
//     try {
//       const response = await api.get("/departments/stats")
//       return response.data
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to fetch department stats")
//     }
//   },
// }

export default api
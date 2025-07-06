"use client"

import FormFooter from "@/components/FormInputs/FormFooter"
import FormHeader from "@/components/FormInputs/FormHeader"
import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import TextArea from "@/components/FormInputs/TextAreaInput"
import TextInput from "@/components/FormInputs/TextInput"
import { departmentApi } from "@/lib/department-api"
import { DepartmentCreateProps } from "@/types/types"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
// import { departmentApi, type DepartmentData } from "@/lib/department-api"

export type SelectOptionProps = {
  label: string
  value: string
}

type SingleDepartmentProps = {
  editingId?: string | undefined
  initialData?: any | undefined | null
}

// ✅ Form schema to match Department model
export type DepartmentProps = {
  name: string
  code: string
  description?: string
  location?: string
  manager: string
  managerId: string
  established: string
}

export default function DepartmentForm({ editingId, initialData }: SingleDepartmentProps) {
  
  // You'll need to fetch management staff from your API for the manager dropdown
  const managementStaff = [
    { label: "John Doe - Academic Affairs", value: "mgmt-001" },
    { label: "Jane Smith - Administration", value: "mgmt-002" },
    { label: "Michael Johnson - Finance", value: "mgmt-003" },
    { label: "Sarah Williams - Human Resources", value: "mgmt-004" },
  ]

  // ✅ Form with correct field names matching Department schema
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DepartmentCreateProps>({
    defaultValues: {
      name: initialData?.name || "",
      code: initialData?.code || "",
      description: initialData?.description || "",
      location: initialData?.location || "",
      manager: initialData?.manager || "",
      managerId: initialData?.managerId || "",
      established: initialData?.established ? new Date(initialData.established).toISOString().split('T')[0] : "",
    },
  })

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // ✅ Save function for Department
  async function saveDepartment(data: DepartmentCreateProps) {
    try {
      setLoading(true)
      console.log("Form data being sent:", data)

      // ✅ Prepare department data according to schema
      const departmentData: DepartmentCreateProps = {
        name: data.name,
        code: data.code,
        description: data.description,
        location: data.location,
        manager: data.manager,
        managerId: data.managerId,
        established: data.established,
      }

      console.log("Department data being sent to API:", departmentData)

      if (editingId) {
        await departmentApi.updateDepartment(editingId, departmentData)
        toast.success("Department updated successfully!")
      } else {
        const response = await departmentApi.createDepartment(departmentData)
        console.log("API Response:", response)
        toast.success("Department created successfully!")
      }

      reset()
      router.push("/dashboard/staff")
    } catch (error: any) {
      console.error("Error creating/updating department:", error)
      toast.error(error.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Helper function for controlled inputs
  const handleSelectChange = (field: keyof DepartmentProps, value: string) => {
    setValue(field, value)
    
    // Auto-populate manager name when managerId is selected
    if (field === "managerId") {
      const selectedManager = managementStaff.find(staff => staff.value === value)
      if (selectedManager) {
        setValue("manager", selectedManager.label.split(" - ")[0]) // Extract name before the dash
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(saveDepartment)}>
      <FormHeader 
        href="/dashboard/departments" 
        parent="" 
        title="Department" 
        editingId={editingId} 
        loading={loading} 
      />

      <div className="grid grid-cols-12 gap-6 py-8 p-5">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput 
                register={register} 
                errors={errors} 
                label="Department Name" 
                name="name" 
                placeholder="e.g., Computer Science"
              />
              <TextInput 
                register={register} 
                errors={errors} 
                label="Department Code" 
                name="code" 
                placeholder="e.g., CS001"
              />
              <TextInput 
                register={register} 
                errors={errors} 
                label="Location" 
                name="location" 
                placeholder="e.g., Building A, Floor 2"
              />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Department Manager"
                options={managementStaff}
                value={watch("managerId")}
                onChange={(value) => handleSelectChange("managerId", value)}
                
                isSearchable={true}
              />
              
              <TextInput 
                register={register} 
                errors={errors} 
                label="Manager Name" 
                name="manager" 
                placeholder="Auto-populated from selection"
               
              />

              <TextInput 
                register={register} 
                errors={errors} 
                label="Date Established" 
                name="established" 
                type="date" 
              />
            </div>
            
            <div className="grid md:grid-cols-1 gap-3">
              <TextArea 
                register={register} 
                errors={errors} 
                label="Description" 
                name="description" 
                // placeholder="Brief description of the department's purpose and activities"
              />
            </div>
          </div>
        </div>
      </div>
      
      <FormFooter 
        href="/dashboard/departments" 
        editingId={editingId} 
        loading={loading} 
        title="Department" 
        parent="" 
      />
    </form>
  )
}
"use client"

import FormFooter from "@/components/FormInputs/FormFooter"
import FormHeader from "@/components/FormInputs/FormHeader"
import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import ImageInput from "@/components/FormInputs/ImageInput"
import PasswordInput from "@/components/FormInputs/PasswordInput"
import TextArea from "@/components/FormInputs/TextAreaInput"
import TextInput from "@/components/FormInputs/TextInput"
import { managementApi, ManagementData } from "@/lib/management-api"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
// import { managementApi, type ManagementData } from "@/lib/management-api"

export type SelectOptionProps = {
  label: string
  value: string
}

type SingleManagementProps = {
  editingId?: string | undefined
  initialData?: any | undefined | null
}

// ✅ Updated form schema to match Management model
export type ManagementProps = {
  firstName: string
  lastName: string
  email: string
  password?: string
  phone: string
  dob: string
  address?: string
  employeeId: string
  dateOfJoining: string
  experience?: string
  imageUrl?: string
  // Controlled fields
  gender: string
  department?: string
  StateOrigin?: string
  lga?: string
}

export default function ManagementForm({ editingId, initialData }: SingleManagementProps) {
  const statesAndLgas: { [key: string]: string[] } = {
    Lagos: [
      "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", 
      "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", 
      "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", 
      "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
    ],
    Kano: [
      "Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", 
      "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", 
      "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", 
      "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", 
      "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", 
      "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", 
      "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", 
      "Warawa", "Wudil"
    ]
  }

  const stateOptions = Object.keys(statesAndLgas).map((state) => ({
    label: state,
    value: state,
  }))

  // You'll need to fetch departments from your API
  const departments = [
    { label: "Academic Affairs", value: "academic-affairs" },
    { label: "Administration", value: "administration" },
    { label: "Finance", value: "finance" },
    { label: "Human Resources", value: "human-resources" },
  ]

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]

  // ✅ Updated form with correct field names
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ManagementProps>({
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      password: "",
      phone: initialData?.phone || "",
      dob: initialData?.dob ? new Date(initialData.dob).toISOString().split('T')[0] : "",
      address: initialData?.address || "",
      employeeId: initialData?.employeeId || "",
      dateOfJoining: initialData?.dateOfJoining ? new Date(initialData.dateOfJoining).toISOString().split('T')[0] : "",
      experience: initialData?.experience || "",
      imageUrl: initialData?.imageUrl || "",
      gender: initialData?.gender || "",
      department: initialData?.department || "",
      StateOrigin: initialData?.StateOrigin || "",
      lga: initialData?.lga || "",
    },
  })

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "/profile.png")

  // ✅ Watch form values for dependent dropdowns
  const watchedState = watch("StateOrigin")
  
  // Generate LGA options based on selected state
  const lgaOptions = watchedState && statesAndLgas[watchedState] 
    ? statesAndLgas[watchedState].map((lga) => ({
        label: lga,
        value: lga,
      }))
    : []

  // ✅ Updated save function for Management
  async function saveManagement(data: ManagementProps) {
    try {
      setLoading(true)
      console.log("Form data being sent:", data)

      // ✅ Prepare management data according to schema
      const managementData: ManagementData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        address: data.address,
        employeeId: data.employeeId,
        dateOfJoining: data.dateOfJoining ,
        experience: data.experience,
        imageUrl: imageUrl,
        stateOrigin: data.StateOrigin,
        lga: data.lga,
        department: data.department,
        password: data.password,
      }

      console.log("Management data being sent to API:", managementData)

      if (editingId) {
        await managementApi.updateManagement(editingId, managementData)
        toast.success("Management updated successfully!")
      } else {
        const response = await managementApi.createManagement(managementData)
        console.log("API Response:", response)
        toast.success("Management created successfully!")
      }

      reset()
      // router.push("/dashboard/users/management")
    } catch (error: any) {
      console.error("Error creating/updating management:", error)
      toast.error(error.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Helper functions for controlled inputs
  const handleSelectChange = (field: keyof ManagementProps, value: string) => {
    setValue(field, value)
    
    // Clear LGA when state changes
    if (field === "StateOrigin") {
      setValue("lga", "")
    }
  }

  return (
    <form onSubmit={handleSubmit(saveManagement)}>
      <FormHeader 
        href="/dashboard/management" 
        parent="" 
        title="Management" 
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
                label="First Name" 
                name="firstName" 
              />
              <TextInput 
                register={register} 
                errors={errors} 
                label="Last Name" 
                name="lastName" 
              />
              <TextInput 
                register={register} 
                errors={errors} 
                label="Email Address" 
                name="email" 
                type="email" 
              />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput 
                register={register} 
                errors={errors} 
                label="Date Of Birth" 
                name="dob" 
                type="date" 
              />
              
              <FormSelectInput 
                label="Gender" 
                options={genderOptions} 
                value={watch("gender")} 
                onChange={(value) => handleSelectChange("gender", value)} 
              />

              <TextInput 
                register={register} 
                errors={errors} 
                label="Phone Number" 
                name="phone" 
                type="tel" 
              />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="State Of Origin"
                options={stateOptions}
                value={watch("StateOrigin")}
                onChange={(value) => handleSelectChange("StateOrigin", value)}
              />
              
              <FormSelectInput 
                label="L.G.A" 
                options={lgaOptions} 
                value={watch("lga")} 
                onChange={(value) => handleSelectChange("lga", value)} 
              />

              <TextInput 
                register={register} 
                errors={errors} 
                label="Address" 
                name="address" 
              />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput 
                register={register} 
                errors={errors} 
                label="Employee ID" 
                name="employeeId" 
              />

              <TextInput 
                register={register} 
                errors={errors} 
                label="Date of Joining" 
                name="dateOfJoining" 
                type="date" 
              />

              <FormSelectInput
                label="Department"
                options={departments}
                value={watch("department")}
                onChange={(value) => handleSelectChange("department", value)}
                toolTipText="Add New Department"
                href="/dashboard/departments/new"
                isSearchable={true}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <TextArea 
                  register={register} 
                  errors={errors} 
                  label="Experience" 
                  name="experience" 
                />
              </div>
              
              <div className="space-y-3">
                <PasswordInput
                  register={register}
                  errors={errors}
                  label="Password"
                  name="password"
                  toolTipText="Password created will be used by management staff"
                />
                
                <ImageInput
                  title="Staff Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="staffImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FormFooter 
        href="/dashboard/management" 
        editingId={editingId} 
        loading={loading} 
        title="Management" 
        parent="" 
      />
    </form>
  )
}
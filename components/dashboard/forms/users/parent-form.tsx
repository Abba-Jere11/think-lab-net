"use client"

import FormFooter from "@/components/FormInputs/FormFooter"
import FormHeader from "@/components/FormInputs/FormHeader"
import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import ImageInput from "@/components/FormInputs/ImageInput"
import PasswordInput from "@/components/FormInputs/PasswordInput"
import TextArea from "@/components/FormInputs/TextAreaInput"
import TextInput from "@/components/FormInputs/TextInput"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { parentApi, type ParentData } from "@/lib/parent-api"

export type SelectOptionProps = {
  label: string
  value: string
}

type SingleParentProps = {
  editingId?: string | undefined
  initialData?: any | undefined | null
}

// ✅ Fixed: Updated form schema to match all fields
export type ParentProps = {
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  dob: string
  address: string
  nin: string
  starting: string
  description: string
  imageUrl: string
  // Added controlled fields
  gender: string
  department: string
  religion: string
  stateOfOrigin: string
  lga: string
}

export default function ParentForm({ editingId, initialData }: SingleParentProps) {
  const statesAndLgas: { [key: string]: string[] } = {
    // ... your existing states data
    Borno: [
      "Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", 
      "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", 
      "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", 
      "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"
    ],
    Lagos: [
      "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", 
      "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", 
      "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", 
      "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
    ],
    // Add more states as needed
  }

  const stateOptions = Object.keys(statesAndLgas).map((state) => ({
    label: state,
    value: state,
  }))

  const departments = [
    { label: "Guardian", value: "Guardian" },
    { label: "Parent", value: "Parent" },
    
  ]

  const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]

  const religion = [
    { label: "Islam", value: "islam" },
    { label: "Christianity", value: "christianity" },
  ]

  // ✅ Fixed: Use react-hook-form for all form management
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ParentProps>({
    defaultValues: {
      firstname: initialData?.firstname || "",
      lastname: initialData?.lastname || "",
      email: initialData?.email || "",
      password: "",
      phone: initialData?.phone || "",
      dob: initialData?.dob || "",
      address: initialData?.address || "",
      nin: initialData?.nin || "",
      starting: initialData?.startingDate || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      gender: initialData?.gender || "",
      department: initialData?.department || "",
      religion: initialData?.religion || "",
      stateOfOrigin: initialData?.stateOfOrigin || "",
      lga: initialData?.lga || "",
    },
  })

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "/profile.png")

  // ✅ Watch form values for dependent dropdowns
  const watchedState = watch("stateOfOrigin")
  
  // Generate LGA options based on selected state
  const lgaOptions = watchedState && statesAndLgas[watchedState] 
    ? statesAndLgas[watchedState].map((lga) => ({
        label: lga,
        value: lga,
      }))
    : []

  // ✅ Fixed: Simplified save function
  async function saveParent(data: ParentProps) {
    try {
      setLoading(true)
      console.log("Form data being sent:", data) // Debug log

      // ✅ Prepare parent data directly from form
      const parentData: ParentData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        address: data.address,
        department: data.department,
        nin: data.nin,
        religion: data.religion,
        password: data.password,
        imageUrl: imageUrl,
        startingDate: data.starting,
        description: data.description,
        stateOfOrigin: data.stateOfOrigin,
        lga: data.lga,
      }

      console.log("Parent data being sent to API:", parentData) // Debug log

      if (editingId) {
        await parentApi.updateParent(editingId, parentData)
        toast.success("Parent updated successfully!")
      } else {
        const response = await parentApi.createParent(parentData)
        console.log("API Response:", response) // Debug log
        toast.success("Parent created successfully!")
      }

      reset()
      // setImageUrl("/profile.png")
      router.push("/dashboard/users/parents")
    } catch (error: any) {
      console.error("Error creating/updating parent:", error)
      toast.error(error.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Helper functions for controlled inputs
  const handleSelectChange = (field: keyof ParentProps, value: string) => {
    setValue(field, value)
    
    // Clear LGA when state changes
    if (field === "stateOfOrigin") {
      setValue("lga", "")
    }
  }

  return (
    <form onSubmit={handleSubmit(saveParent)}>
      <FormHeader href="/dashboard/parents" parent="" title="Parents" editingId={editingId} loading={loading} />

      <div className="grid grid-cols-12 gap-6 py-8 p-5">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput register={register} errors={errors} label="First Name" name="firstname" />
              <TextInput register={register} errors={errors} label="Surname" name="lastname" />
              <TextInput register={register} errors={errors} label="Email Address" name="email" type="email" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput register={register} errors={errors} label="Date Of Birth" name="dob" type="date" />
              
              {/* ✅ Fixed: Connected to form */}
              <FormSelectInput 
                label="Gender" 
                options={gender} 
                value={watch("gender")} 
                onChange={(value) => handleSelectChange("gender", value)} 
              />

              <TextInput register={register} errors={errors} label="Phone Number" name="phone" type="tel" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="State Of Origin"
                options={stateOptions}
                value={watch("stateOfOrigin")}
                onChange={(value) => handleSelectChange("stateOfOrigin", value)}
              />
              
              <FormSelectInput 
                label="L.G.A" 
                options={lgaOptions} 
                value={watch("lga")} 
                onChange={(value) => handleSelectChange("lga", value)} 
              />

              <TextInput register={register} errors={errors} label="Permanent Address" name="address" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput register={register} errors={errors} label="NIN" name="nin" />

              <FormSelectInput
                label="Religion"
                options={religion}
                value={watch("religion")}
                onChange={(value) => handleSelectChange("religion", value)}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              <FormSelectInput
                label="Department"
                options={departments}
                value={watch("department")}
                onChange={(value) => handleSelectChange("department", value)}
                toolTipText="Add New Department"
                href="/dashboard/parents/new"
                isSearchable={true}
              />
              
              <PasswordInput
                register={register}
                errors={errors}
                label="Password"
                name="password"
                toolTipText="Password created will be used by parent"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <TextInput register={register} errors={errors} label="Starting Date" name="starting" type="date" />
                <div className="mt-3">
                  <TextArea register={register} errors={errors} label="Description" name="description" />
                </div>
              </div>
              
              <div>
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
      
      <FormFooter href="/dashboard/parents" editingId={editingId} loading={loading} title="Parent" parent="" />
    </form>
  )
}
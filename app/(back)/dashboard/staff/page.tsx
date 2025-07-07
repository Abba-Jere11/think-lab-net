"use client"
import { Building2, Users, Mail, Phone, MapPin, Calendar, Search, Plus, Edit, Trash2, Eye, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { staffApi } from "@/lib/api"
import { useEffect, useState } from "react"
import Link from "next/link"

// Define interfaces for type safety
interface StaffMember {
  id: string
  name: string
  firstname: string
  lastname: string
  role: string
  email: string
  phone: string
  avatar: string
  department: string
  hireDate: string
  address: string
  emergencyContact: string
}

interface Department {
  id: string
  name: string
  description: string
  manager: string
  staffCount: number
  location: string
  established: string
  staff: StaffMember[]
}

export default function DepartmentsPage() {
  const [departmentsData, setDepartmentsData] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDepartmentsList, setShowDepartmentsList] = useState(false)
  
  // Modal states
  const [viewStaffModal, setViewStaffModal] = useState<StaffMember | null>(null)
  const [editStaffModal, setEditStaffModal] = useState<StaffMember | null>(null)
  const [deleteStaffModal, setDeleteStaffModal] = useState<StaffMember | null>(null)
  const [editDepartmentModal, setEditDepartmentModal] = useState<Department | null>(null)
  const [deleteDepartmentModal, setDeleteDepartmentModal] = useState<Department | null>(null)

  // Fetch staff data on component mount
  useEffect(() => {
    fetchStaffData()
  }, [])

  const fetchStaffData = async () => {
    try {
      setLoading(true)
      const response = await staffApi.getAllStaff()

      if (response.success && response.data) {
        // Transform API data to match component structure
        const transformedData = Object.entries(response.data.staffByDepartment).map(
          ([deptName, staff]: [string, any]) => ({
            id: deptName.toLowerCase().replace(/\s+/g, "-"),
            name: deptName,
            description: `Managing ${deptName.toUpperCase()} operations and staff`,
            manager: staff[0]?.firstname + " " + staff[0]?.lastname || "No Manager",
            staffCount: staff.length,
            location: "Office Building",
            established: new Date().toISOString().split("T")[0],
            staff: staff.map((member: any) => ({
              id: member.id,
              name: `${member.firstname} ${member.lastname}`,
              firstname: member.firstname,
              lastname: member.lastname,
              role: member.role || "Staff Member",
              email: member.email,
              phone: member.phone || "N/A",
              avatar: member.imageUrl || "/placeholder.svg?height=40&width=40",
              department: deptName,
              hireDate: member.hireDate || new Date().toISOString().split("T")[0],
              address: member.address || "N/A",
              emergencyContact: member.emergencyContact || "N/A",
            })),
          }),
        )

        setDepartmentsData(transformedData)
        if (transformedData.length > 0) {
          setSelectedDepartment(transformedData[0])
        }
      }
    } catch (error: any) {
      console.error("Error fetching staff data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Staff action handlers
  const handleViewStaff = (staff: StaffMember) => {
    setViewStaffModal(staff)
  }

  const handleEditStaff = (staff: StaffMember) => {
    setEditStaffModal({ ...staff })
  }

  const handleDeleteStaff = (staff: StaffMember) => {
    setDeleteStaffModal(staff)
  }

  const handleSaveStaffEdit = async () => {
    if (!editStaffModal) return

    try {
      // Here you would call your API to update the staff member
      // await staffApi.updateStaff(editStaffModal.id, editStaffModal)
      
      // Update local state
      setDepartmentsData(prevData => 
        prevData.map(dept => ({
          ...dept,
          staff: dept.staff.map((staff: StaffMember) => 
            staff.id === editStaffModal.id ? editStaffModal : staff
          )
        }))
      )
      
      // Update selected department if it contains this staff member
      if (selectedDepartment) {
        setSelectedDepartment(prev => prev ? ({
          ...prev,
          staff: prev.staff.map((staff: StaffMember) => 
            staff.id === editStaffModal.id ? editStaffModal : staff
          )
        }) : null)
      }
      
      setEditStaffModal(null)
      alert("Staff member updated successfully!")
    } catch (error) {
      console.error("Error updating staff:", error)
      alert("Failed to update staff member.")
    }
  }

  const handleConfirmDeleteStaff = async () => {
    if (!deleteStaffModal) return

    try {
      // Here you would call your API to delete the staff member
      // await staffApi.deleteStaff(deleteStaffModal.id)
      
      // Update local state
      setDepartmentsData(prevData => 
        prevData.map(dept => ({
          ...dept,
          staff: dept.staff.filter((staff: StaffMember) => staff.id !== deleteStaffModal.id),
          staffCount: dept.staff.filter((staff: StaffMember) => staff.id !== deleteStaffModal.id).length
        }))
      )
      
      // Update selected department if it contains this staff member
      if (selectedDepartment) {
        const updatedStaff = selectedDepartment.staff.filter((staff: StaffMember) => staff.id !== deleteStaffModal.id)
        setSelectedDepartment(prev => prev ? ({
          ...prev,
          staff: updatedStaff,
          staffCount: updatedStaff.length
        }) : null)
      }
      
      setDeleteStaffModal(null)
      alert("Staff member deleted successfully!")
    } catch (error) {
      console.error("Error deleting staff:", error)
      alert("Failed to delete staff member.")
    }
  }

  // Department action handlers
  const handleEditDepartment = () => {
    if (selectedDepartment) {
      setEditDepartmentModal({ ...selectedDepartment })
    }
  }

  const handleDeleteDepartment = () => {
    setDeleteDepartmentModal(selectedDepartment)
  }

  const handleSaveDepartmentEdit = async () => {
    if (!editDepartmentModal) return

    try {
      // Here you would call your API to update the department
      // await departmentApi.updateDepartment(editDepartmentModal.id, editDepartmentModal)
      
      // Update local state
      setDepartmentsData(prevData => 
        prevData.map(dept => 
          dept.id === editDepartmentModal.id ? editDepartmentModal : dept
        )
      )
      
      setSelectedDepartment(editDepartmentModal)
      setEditDepartmentModal(null)
      alert("Department updated successfully!")
    } catch (error) {
      console.error("Error updating department:", error)
      alert("Failed to update department.")
    }
  }

  const handleConfirmDeleteDepartment = async () => {
    if (!deleteDepartmentModal) return

    try {
      // Here you would call your API to delete the department
      // await departmentApi.deleteDepartment(deleteDepartmentModal.id)
      
      // Update local state
      const updatedDepartments = departmentsData.filter(dept => dept.id !== deleteDepartmentModal.id)
      setDepartmentsData(updatedDepartments)
      
      // Set new selected department
      if (updatedDepartments.length > 0) {
        setSelectedDepartment(updatedDepartments[0])
      } else {
        setSelectedDepartment(null)
      }
      
      setDeleteDepartmentModal(null)
      alert("Department deleted successfully!")
    } catch (error) {
      console.error("Error deleting department:", error)
      alert("Failed to delete department.")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading departments...</div>
      </div>
    )
  }

  const filteredDepartments = departmentsData.filter((dept) =>
    dept.name.toUpperCase().includes(searchTerm.toUpperCase()),
  )

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6 bg-white">
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setShowDepartmentsList(!showDepartmentsList)}
        >
          <Building2 className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-gray-600 hidden md:block" />
          <h1 className="text-lg font-semibold">Departments</h1>
        </div>
        <div className="ml-auto">
          <Button
            size="sm"
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          >
            <Plus className="w-4 h-4 mr-2" />
            <Link href="/dashboard/departments/new">Add department</Link>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Departments List */}
        <div
          className={`w-full md:w-72 border-r bg-white flex flex-col flex-shrink-0 ${
            showDepartmentsList ? "block" : "hidden"
          } md:block h-full overflow-y-auto`}
        >
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredDepartments.map((department) => (
              <Card
                key={department.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedDepartment?.id === department.id
                    ? "ring-2 ring-red-500 bg-red-50 border-red-200"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => {
                  setSelectedDepartment(department)
                  setShowDepartmentsList(false) // Hide departments list on mobile after selection
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1 text-gray-900">{department.name}</h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {department.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{department.staffCount} staff</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{department.location.split(",")[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Panel - Department Details */}
        <div className="flex-1 overflow-y-auto bg-white">
          {selectedDepartment && (
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Department Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">{selectedDepartment.name}</h2>
                  <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {selectedDepartment.description}
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Total Staff</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{selectedDepartment.staffCount}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Manager</span>
                      </div>
                      <p className="text-sm font-semibold text-green-600">{selectedDepartment.manager}</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Location</span>
                      </div>
                      <p className="text-sm font-semibold text-purple-600">{selectedDepartment.location}</p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-900">Established</span>
                      </div>
                      <p className="text-sm font-semibold text-orange-600">
                        {new Date(selectedDepartment.established).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={handleEditDepartment}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                    onClick={handleDeleteDepartment}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Staff List */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Department Staff</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <Link href="/dashboard/staff/new">Add Staff</Link>
                  </Button>
                </div>

                <div className="grid gap-3 md:gap-4">
                 {selectedDepartment?.staff?.map((staff) => (
                    <Card key={staff.id} className="hover:shadow-md transition-shadow border-gray-200">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center gap-3 md:gap-4">
                          <Avatar className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                            <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs md:text-sm">
                              {staff.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                                {staff.name}
                              </h4>
                              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 w-fit">
                                {staff.role}
                              </Badge>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-gray-600">
                              <div className="flex items-center gap-1 truncate">
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{staff.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3 flex-shrink-0" />
                                <span>{staff.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-1 md:gap-2 flex-shrink-0">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover:bg-blue-100 h-8 w-8 p-0"
                              onClick={() => handleViewStaff(staff)}
                              title="View details"
                            >
                              <Eye className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover:bg-gray-100 h-8 w-8 p-0"
                              onClick={() => handleEditStaff(staff)}
                              title="Edit staff"
                            >
                              <Edit className="w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                              onClick={() => handleDeleteStaff(staff)}
                              title="Delete staff"
                            >
                              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Staff Modal */}
      <Dialog open={!!viewStaffModal} onOpenChange={() => setViewStaffModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Staff Details
            </DialogTitle>
          </DialogHeader>
          {viewStaffModal && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={viewStaffModal.avatar} alt={viewStaffModal.name} />
                  <AvatarFallback className="text-lg">
                    {viewStaffModal.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{viewStaffModal.name}</h3>
                  <Badge className="mt-1">{viewStaffModal.role}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {viewStaffModal.email}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-600">Phone</Label>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {viewStaffModal.phone}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-600">Department</Label>
                  <p className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {viewStaffModal.department}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-600">Hire Date</Label>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(viewStaffModal.hireDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-600">Address</Label>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {viewStaffModal.address}
                  </p>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-600">Emergency Contact</Label>
                  <p>{viewStaffModal.emergencyContact}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Staff Modal */}
      <Dialog open={!!editStaffModal} onOpenChange={() => setEditStaffModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Staff Member
            </DialogTitle>
          </DialogHeader>
          {editStaffModal && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    value={editStaffModal.firstname}
                    onChange={(e) => setEditStaffModal(prev => prev ? ({ ...prev, firstname: e.target.value, name: `${e.target.value} ${prev.lastname}` }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    value={editStaffModal.lastname}
                    onChange={(e) => setEditStaffModal(prev => prev ? ({ ...prev, lastname: e.target.value, name: `${prev.firstname} ${e.target.value}` }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editStaffModal.email}
                    onChange={(e) => setEditStaffModal(prev => prev ? ({ ...prev, email: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editStaffModal.phone}
                    onChange={(e) => setEditStaffModal(prev => prev ? ({ ...prev, phone: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={editStaffModal.role}
                    onChange={(e) => setEditStaffModal(prev => prev ? ({ ...prev, role: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hireDate">Hire Date</Label>
                  <Input
                    id="hireDate"
                    type="date"
                    value={editStaffModal.hireDate}
                    onChange={(e) => setEditStaffModal(prev => prev ? ({ ...prev, hireDate: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={editStaffModal.address}
                    onChange={(e) => setEditStaffModal(prev => prev ? ({ ...prev, address: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={editStaffModal.emergencyContact}
                    onChange={(e) => setEditStaffModal(prev => prev ? ({ ...prev, emergencyContact: e.target.value }) : null)}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditStaffModal(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStaffEdit} className="bg-red-600 hover:bg-red-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Staff Modal */}
      <Dialog open={!!deleteStaffModal} onOpenChange={() => setDeleteStaffModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              Delete Staff Member
            </DialogTitle>
          </DialogHeader>
          {deleteStaffModal && (
            <div className="space-y-4">
              <p>Are you sure you want to delete <strong>{deleteStaffModal.name}</strong>? This action cannot be undone.</p>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-800 text-sm">
                  This will permanently remove the staff member from the system and all associated data.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteStaffModal(null)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmDeleteStaff} className="bg-red-600 hover:bg-red-700">
              Delete Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Department Modal */}
      {/* <Dialog open={!!editDepartmentModal} onOpenChange={() => setEditDepartmentModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Department
            </DialogTitle>
          </DialogHeader>
          {editDepartmentModal && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deptName">Department Name</Label>
                <Input
                  id="deptName"
                  value={editDepartmentModal.name}
                  onChange={(e) => setEditDepartmentModal(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deptDescription">Description</Label>
                <Textarea
                  id="deptDescription"
                  value={editDepartmentModal.description}
                  onChange={(e) => setEditDepartmentModal(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deptLocation">Location</Label>
                <Input
                  id="deptLocation"
                  value={editDepartmentModal.location}
                  onChange={(e) => setEditDepartmentModal(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deptManager">Manager</Label>
                <Input
                  id="deptManager"
                  value={editDepartmentModal.manager}
                  onChange={(e) => setEditDepartmentModal(prev => ({ ...prev, manager: e.target.value }))}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDepartmentModal(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDepartmentEdit} className="bg-red-600 hover:bg-red-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Delete Department Modal */}
      <Dialog open={!!deleteDepartmentModal} onOpenChange={() => setDeleteDepartmentModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              Delete Department
            </DialogTitle>
          </DialogHeader>
          {deleteDepartmentModal && (
            <div className="space-y-4">
              <p>Are you sure you want to delete the <strong>{deleteDepartmentModal.name}</strong> department? This action cannot be undone.</p>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-800 text-sm">
                  This will permanently remove the department and all {deleteDepartmentModal.staffCount} staff members associated with it from the system.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDepartmentModal(null)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmDeleteDepartment} className="bg-red-600 hover:bg-red-700">
              Delete Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
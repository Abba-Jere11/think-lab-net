import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

const upcomingEvents = [
  {
    id: 1,
    title: "Company All-Hands Meeting",
    date: "Jul 15, 2025",
    time: "10:00 AM - 11:30 AM",
    location: "Board Room",
    type: "meeting",
    attendees: 45,
    description: "Quarterly review and upcoming goals discussion",
  },
  {
    id: 2,
    title: "Chairmans birthday Party",
    date: "Jul 02, 2025",
    time: "10:00 AM - 11:00 AM",
    location: "Chairmans Office",
    type: "event",
    attendees: 120,
    description: "Entertainment",
  },
  {
    id: 3,
    title: "Strategy Week",
    date: "Jul 16 - 2025",
    time: "All Day",
    location: "Company-wide",
    type: "event",
    attendees: 247,
    description: "Event",
  },
  
]

export function UpcomingEvents() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Company events and important dates</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-xl border hover:shadow-sm transition-shadow"
            style={{
              background:
                event.type === "meeting"
                  ? "linear-gradient(to right, #dbeafe, #bfdbfe)"
                  : event.type === "event"
                    ? "linear-gradient(to right, #dcfce7, #bbf7d0)"
                    : "linear-gradient(to right, #fef3c7, #fde68a)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-full ${
                  event.type === "meeting" ? "bg-blue-100" : event.type === "event" ? "bg-green-100" : "bg-orange-100"
                }`}
              >
                <div
                  className={`h-3 w-3 rounded-full ${
                    event.type === "meeting" ? "bg-blue-500" : event.type === "event" ? "bg-green-500" : "bg-orange-500"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      event.type === "meeting"
                        ? "border-blue-300 text-blue-700"
                        : event.type === "event"
                          ? "border-green-300 text-green-700"
                          : "border-orange-300 text-orange-700"
                    }`}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

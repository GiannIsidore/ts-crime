import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

//!template for profiles page

export default function Profile() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">John Doe</h1>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
          <Button variant="outline">Save Changes</Button>
        </div>
      </header>
      <main className="container mx-auto grid gap-8 p-4 sm:p-6 md:grid-cols-2 lg:grid-cols-3">
        <section>
          <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndoe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue="Software engineer, loves coding and traveling."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-semibold">Contact Details</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="San Francisco, CA" />
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-semibold">Account Settings</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notification-settings">
                Notification Settings
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select notification settings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="important">
                    Important Notifications Only
                  </SelectItem>
                  <SelectItem value="none">No Notifications</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

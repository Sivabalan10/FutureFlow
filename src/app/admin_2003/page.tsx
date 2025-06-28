"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updateEventDetails, deleteRegistration } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Registration {
    id: string;
    name: string;
    email: string;
    visibility: 'public' | 'secure';
}

interface EventDetails {
    topic: string;
    meetLink: string;
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [eventDetails, setEventDetails] = useState<EventDetails>({ topic: "", meetLink: "" });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Listener for registrations
    const registrationsQuery = collection(db, "registrations");
    const unsubscribeRegistrations = onSnapshot(registrationsQuery, (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Registration[];
        setRegistrations(usersData);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching registrations: ", error);
        setLoading(false);
    });

    // Listener for event details
    const eventDocRef = doc(db, "event", "details");
    const unsubscribeEvent = onSnapshot(eventDocRef, (doc) => {
        if (doc.exists()) {
            setEventDetails(doc.data() as EventDetails);
        }
    }, (error) => {
        console.error("Error fetching event details: ", error);
    });

    return () => {
        unsubscribeRegistrations();
        unsubscribeEvent();
    };
  }, []);

  const handleEventUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await updateEventDetails(eventDetails);
    if (result.success) {
        toast({ title: "Success", description: result.message });
    } else {
        toast({ variant: "destructive", title: "Error", description: result.message });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteRegistration(id);
    if (result.success) {
        toast({ title: "Success", description: result.message });
    } else {
        toast({ variant: "destructive", title: "Error", description: result.message });
    }
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Manage events and registered users for FutureFlow.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Event Management</CardTitle>
                        <CardDescription>Update event details and meeting links.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleEventUpdate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="event-topic">Event Topic</Label>
                                <Input 
                                    id="event-topic" 
                                    value={eventDetails.topic}
                                    onChange={(e) => setEventDetails({...eventDetails, topic: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="meet-link">Google Meet Link</Label>
                                <Input 
                                    id="meet-link"
                                    placeholder="https://meet.google.com/..." 
                                    value={eventDetails.meetLink}
                                    onChange={(e) => setEventDetails({...eventDetails, meetLink: e.target.value})}
                                />
                            </div>
                            <Button type="submit" className="w-full">Save Changes</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Registered Users ({registrations.length})</CardTitle>
                        <CardDescription>View and manage all registered participants.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Visibility</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
                                ) : registrations.length === 0 ? (
                                    <TableRow><TableCell colSpan={4} className="text-center">No registrations yet.</TableCell></TableRow>
                                ) : (
                                    registrations.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.visibility === 'public' ? 'outline' : 'default'}>
                                                {user.visibility}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem disabled>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Modify</span>
                                                    </DropdownMenuItem>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                <span>Delete</span>
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the registration for {user.name}.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(user.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}

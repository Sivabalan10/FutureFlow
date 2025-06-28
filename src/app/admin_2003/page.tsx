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

const users = [
    { name: 'Alice Johnson', email: 'alice@example.com', visibility: 'public' },
    { name: 'Bob Williams', email: 'bob@example.com', visibility: 'secure' },
    { name: 'Charlie Brown', email: 'charlie@example.com', visibility: 'public' },
    { name: 'Diana Miller', email: 'diana@example.com', visibility: 'secure' },
    { name: 'Ethan Davis', email: 'ethan@example.com', visibility: 'secure' },
];

export default function AdminPage() {
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
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="event-topic">Event Topic</Label>
                            <Input id="event-topic" defaultValue="The Rise of Quantum Computing" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meet-link">Google Meet Link</Label>
                            <Input id="meet-link" placeholder="https://meet.google.com/..." />
                        </div>
                         <Button className="w-full">Save Changes</Button>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Registered Users</CardTitle>
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
                                {users.map((user) => (
                                <TableRow key={user.email}>
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
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    <span>Modify</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                ))}
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

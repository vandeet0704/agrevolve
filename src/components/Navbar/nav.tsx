import Image from "next/image";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-primary text-white shadow">
            <Image
                className="m-0 p-0"
                src="/logo.png" // make sure the path to your image is correct
                alt="Logo"
                width={150} // replace with your image's width
                height={100} // replace with your image's height
            />
            <div className="flex items-center gap-4">
                <Button variant="secondary">Home</Button>
                <Button variant="menubtn">About</Button>
                <Button variant="menubtn">Services</Button>
                <Button variant="menubtn">Contact</Button>
            </div>
        </nav>
    );
}
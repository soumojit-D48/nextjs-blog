import { Button } from "@/components/ui/button";
import Link  from "next/link";


function Notfound() {
    return ( 
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Page not found!</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                The page you are looking doesn't exist or has been moved
            </p>
            <Button asChild>
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
     );
}

export default Notfound;
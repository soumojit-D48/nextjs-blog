import { cn } from "@/lib/utils"

interface ContainerProps {
    children: React.ReactNode,
    className?: string
}

export default function Container ({children, className} : ContainerProps){
    return ( 
        // cn is a utility function to marge multiple className together after ,className means there if any other class name the  cn will marge
        <div className={cn("container mx-auto px-4", className)}>
            {children}
        </div>
    )
}
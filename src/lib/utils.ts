import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function slugify (text : string) : string {
//   return text
//       .toLowerCase()
//       .replace(/[^W]+/g,"")
//       .replace(/ +/g, "-")
// }

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")         // replace spaces with -
    .replace(/-+/g, "-")          // collapse multiple -
}



// convert -> name surname hello to name-surname-hello
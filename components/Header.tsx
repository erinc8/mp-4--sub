import Link from "next/link";

export default function Header() {
    const linkStyling = "p-1 m-2 text-xl hover:underline";
    return(
        <header className="flex justify-between items-center h-20">
            <h2 className = "text-4x1 font-semibold p-4">MP-4 Assignment</h2>
            <nav className = "p-2 m-4" >
                <Link href="/" className = {linkStyling}>Home</Link>
                <Link href = "/about" className = {linkStyling}>Art</Link>
            </nav>
        </header>
    );
}

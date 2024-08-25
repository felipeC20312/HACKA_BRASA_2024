import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <div className="w-screen h-auto min-h-screen flex">
            <Navbar />
            <div className="flex-1 p-4">
                <p>Recebiveis</p>
            </div>
        </div>
    );
}
import ClientSetupForm from "@/components/forms/ClientSetupForm";

// 2 steps, choose account type and then fill in the details.
export default function Home() {

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-auto">
                <ClientSetupForm />
            </div>
        </div>
    );
}
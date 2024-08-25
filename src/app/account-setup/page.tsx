import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

// 2 steps, choose account type and then fill in the details.
export default function Home() {

    return (
        <div className="w-screen h-screen bg-black">
            <Card>
                <CardTitle className="text-blue-600">
                    Choose Account Type
                </CardTitle>
                <CardContent>
                    <Button>
                        Investor
                    </Button>
                    <Button>
                        Client
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
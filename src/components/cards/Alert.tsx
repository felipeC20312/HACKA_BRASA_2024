import { CircleX, Dot } from "lucide-react";

const Alert = ({ title, description, type, dia } : {title: string, description: string, type: string, dia: string}) => {
    return (
        <div className={`flex flex-col gap-1 py-8 mx-8 border-b`}>
            <div className="w-full flex flex-row justify-between">
                <span className="text-lg flex flex-row gap-1 items-center">
                    {title}
                    {type==="danger" ? <Dot className="text-red-600" size={40}/> : <Dot className="text-yellow-500" size={40}/>}
                </span>
                <span className="text-sm text-gray-400 items-center flex">{dia}</span>
            </div>
            <span className="text-sm text-gray-400">{description}</span>
            <div className="w-full flex flex-row justify-between pt-4">
                <button className="text-sm text-gray-200 hover:text-gray-100 underline">
                    Ver detalhes
                </button>
                <button className="text-sm text-gray-400 hover:text-gray-200">
                    <CircleX/>
                </button>
            </div>
        </div>
    );
};

export default Alert;
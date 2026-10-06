export default function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 my-4">
            <strong className="font-semibold">Error:</strong> {message}
        </div>
    );
}
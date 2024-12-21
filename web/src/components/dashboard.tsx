import { Navbar } from './navbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4">
        <Navbar />
      </div>
    </div>
  );
}

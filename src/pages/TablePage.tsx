import MultiplicationTable from '@/components/MultiplicationTable';

export default function TablePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Multiplication Table of 7
          </h1>
          <p className="text-slate-400 text-lg">
            Explore the complete times table for <span className="text-indigo-400 font-semibold">7</span> — from 1 to 20
          </p>
        </div>
        <MultiplicationTable number={7} upTo={20} />
      </div>
    </div>
  );
}

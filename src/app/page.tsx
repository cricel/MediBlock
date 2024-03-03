import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://cdn.discordapp.com/attachments/1096113129030701148/1213652399458353202/abhinaviswriting_A_doctor_and_a_patient_in_Rural_India_with_a_c_0c73b6d0-1895-4b0d-a53c-4b3e06fb821d.png?ex=65f640e0&is=65e3cbe0&hm=41aabb76a81681876b4042cb58f4d23e5fb7c920e3ef3fbc91a38913038d63e1&')" }}>
      <h1 className="text-6xl font-bold text-white mb-4">MEDIBLOCKS</h1>
      <Link href="/login">
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Login Now</button>
      </Link>  </main>
  );
}

import { RegistrationForm } from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Inscripción a Carritos
          </h1>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Index;